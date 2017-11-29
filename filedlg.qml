import QtQuick 2.0
import QtQuick.Dialogs 1.0

import "myapp.js" as Code

Item {
    FileDialog {
        id: fileDialog
        title: "Please choose a Folder"
        folder: shortcuts.home
        selectFolder : true
        onAccepted: {
            console.log("You chose: " + fileDialog.fileUrls);
            Code.downloadproc(fileDialog.fileUrls);
        }
        onRejected: {
            console.log("Canceled")
        }
        Component.onCompleted: visible = true
    }
}
