import QtQuick 2.8
import QtQuick.Window 2.2


import "myapp.js" as Code

Window {
    visible: true
    width: 640
    height: 480
    title: qsTr("Qt File Client")

    Rectangle {
        id : rect
        width: 900
        height: 600

        ListModel {
           id: list
        }

        Component.onCompleted: Code.init(list);

        MouseArea {
            id: mouseArea
            anchors.rightMargin: 0
            anchors.bottomMargin: -8
            anchors.leftMargin: 0
            anchors.topMargin: 8
            anchors.fill: parent
        }

        Text {
            id: text1
            x: 35
            y: 34
            width: 93
            height: 23
            text: qsTr("Current Folder :")
            font.pixelSize: 12
        }

        Text {
            id: cd
            x: 133
            y: 34
            width: 118
            height: 23
            text: qsTr("")
            font.pixelSize: 12
        }


        ListView {
            id: listView
            x: 54
            y: 100
            model: list
            height: listView.count * 40
            delegate: Item {
                id: mydeligate
                x: 5
                width: 80
                height: 40
                MouseArea {
                    anchors.fill: parent
                    onClicked: Code.listClickedAt(index);
                }
                Text {
                    text: name
                    font.bold: true
                    anchors.verticalCenter: parent.verticalCenter
                }
            }
        }


        Row {

            x: 54
            y: 100 + (listView.count +1 ) * 40
            layoutDirection : Qt.RightToLeft
            spacing: 20

            Rectangle {
                width: 80
                height: 20
                color: "steelblue"
                MouseArea {
                    anchors.fill: parent
                    onClicked: Code.createNewFolder();
                }
                Text{
                    text : "New Folder"
                    anchors.verticalCenter: parent.verticalCenter
                }
            }
            TextInput {
                width: 80
                height: 30
                id : nfl
                text: "Folder Name"
                anchors.verticalCenter: parent.verticalCenter

            }

        }
    }
}
