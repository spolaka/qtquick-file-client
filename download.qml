import QtQuick 2.0
import com.blackgrain.qml.quickdownload 1.0

Item {
    Download {
            id: download1

            url: "http://localhost:3002/img/favicon.ico"
            destination: "file:///c:/tests/test.ico"

            running: false

            followRedirects: true
            onRedirected: console.log('Redirected',url,'->',redirectUrl)

            onStarted: console.log('Started download',url)
            onError: console.error(errorString)
            onProgressChanged: console.log(url,'progress:',progress)
            onFinished: console.info(url,'done')

        }
}
