
Array.prototype.attach = function(listmodel) {
     this.model = listmodel;
     this.flush();
}

Array.prototype.flush = function() {
    console.log(this.length);
     var i;
     while (this.model.count > this.length)
         this.model.remove(this.model.count-1);
     for (i = 0; i < this.model.count; i++)
         this.model.set(i, this[i]);
     for (;i < this.length; i++)
         this.model.append(this[i]);
}


var myArray = [];
var component;
var sprite;

var init = function(listModel) {
    myArray.attach(listModel);
    myArray.push({ name: '/' , path : '/' , fld : true });
    myArray.flush();    
}

var createNewFolder = function(){

    if(cd.text != ''){
        var doc = new XMLHttpRequest();
        doc.onreadystatechange = function() {
            console.log(doc.readyState);
            if (doc.readyState == XMLHttpRequest.DONE) {
                populateFolders();
            }
        }
        doc.open('POST', "http://localhost:3002/nwfld");
        doc.setRequestHeader('Content-type', 'application/json')
        doc.send( JSON.stringify({nfldr : nfl.text , fldr : cd.text}));
    }
}

var populateFolders = function(){

    while(myArray.length) {
        myArray.pop();
    }
    if(cd.text != ''){
        var cdi = cd.text.substring(0 , cd.text.lastIndexOf("/") );
        if(cdi === '' && cd.text.length > 1){
            cdi = '/';
        }
        myArray.push({ name: '..' , path : cdi , fld : true });

        var doc = new XMLHttpRequest();
        doc.onreadystatechange = function() {
            console.log(doc.readyState);
            if (doc.readyState == XMLHttpRequest.DONE) {
                console.log(doc.responseText);
                var d = eval('new Object(' + doc.responseText + ')');
                var a = d.Results;
                for (var ii = 0; ii < a.length; ++ii) {
                    var ins = '{ name: ' + a[ii].name  + ' , path : ' + a[ii].path + ', fld : ' + a[ii].fld + ' }';
                    console.log(ins);
                    myArray.push({name : a[ii].name , path : a[ii].path , fld : a[ii].fld});
                }
                myArray.flush();
            }
        }

        doc.open('GET', "http://localhost:3002/Folder?fldr=" + encodeURIComponent(cd.text));
        doc.send();

    }
    else{
        myArray.push({ name: '/' , path : '/' , fld : true });
        myArray.flush();
    }
}


var downloadproc = function(dest , sourcepath){
    console.log(sourcepath);
    console.log(dest);
    var qmls = "import QtQuick 2.0; import com.blackgrain.qml.quickdownload 1.0; ";
    qmls += "Item { Download { id: download1 ; url: ";
    qmls += "\"http://localhost:3002" + sourcepath + "\" ; ";
    qmls += "destination: \"" + dest + sourcepath.substring(sourcepath.lastIndexOf("/") ) + "\" ; ";
    qmls += "running : true; ";
    qmls += "followRedirects: true; ";
    qmls += "onError: console.error(errorString); ";
    qmls += " } } "
    console.log(qmls);
    Qt.createQmlObject(qmls , rect, "dl");
}

var downloadFile = function(fpath){
    console.log(fpath);
    var qmls = "import QtQuick 2.0; import QtQuick.Dialogs 1.0; import \"myapp.js\" as Code; ";
    qmls += "Item { x : 0 ; y : 0 ; FileDialog { id: fileDialog ; title: ";
    qmls += "\"Please choose a Folder\" ; ";
    qmls += "folder: shortcuts.home; ";
    qmls += "selectFolder : true; ";
    qmls += "onAccepted: { Code.downloadproc(fileDialog.fileUrls , \"" + fpath + "\"); } ";
    qmls += "Component.onCompleted: visible = true; "
    qmls += " } } "
    console.log(qmls);
    Qt.createQmlObject(qmls , rect, "dlo");

}

var listClickedAt = function(index) {
    var pd = cd.text;
    if(myArray[index].fld){
        cd.text = myArray[index].path;
        populateFolders();
    }
    else{
        downloadFile(myArray[index].path);
    }
}
