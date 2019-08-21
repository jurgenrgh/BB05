# Bluetooth Communication
Bluetooth functionality is provided by installing a plugin with the command

        phonegap plugin add cordova-plugin-networking-bluetooth
        
ref https://www.npmjs.com/package/cordova-plugin-networking-bluetooth  
This works for Android only. 

A useful overview of BT for Android is found at  
https://developer.android.com/guide/topics/connectivity/bluetooth 

## Initialization

When the application is launched and the pure function app{} in index.js is called 3 listeners are set up:

    networking.bluetooth.onReceive.addListener(onBtReceiveHandler);
    networking.bluetooth.onAccept.addListener(acceptInfo => onBtAcceptConnectionHandler);
    networking.bluetooth.onReceiveError.addListener(onBtReceiveError);  
    
Then getBtDevices() is called, which looks for paired devices.  

## Bluetooth API Functions
    networking.bluetooth.getAdapterState( adapterInfo => {}, errorMessage => {} ); 
    networking.bluetooth.requestEnable( () => {<enabled>}, () => {<cancelled>} );
    networking.bluetooth.enable( () => {<enabled>}, errorMessage => {<error>} );
    networking.bluetooth.getDevices( devices => {<make device list>} );
    networking.bluetooth.startDiscovery( () => {<start TO & then stop>} );
    networking.bluetooth.stopDiscovery();
    networking.bluetooth.requestDiscoverable( () => {<discoverable, TO>}, () => {<cancelled>});
    networking.bluetooth.connect(device.address, uuid, socketId => {<connected>}, errorMessage => {<failure>});
    networking.bluetooth.send(socketId, arrayBuffer, bytes_out => {<send action>}, errorMessage => {<failure>});
    networking.bluetooth.listenUsingRfcomm(uuid, serverSocketId => {<listening>}, errorMessage => {<error>});  
    networking.bluetooth.close(socketId);  
    networking.bluetooth.close(serverSocketId);

## Bluetooth API Events

    networking.bluetooth.onAdapterStateChanged.addListener( adapterInfo => {} );
    networking.bluetooth.onReceive.addListener( receiveInfo => {receive ArrayBuffer} );
    networking.bluetooth.onAccept.addListener( acceptInfo => {handle connect} );  
    networking.bluetooth.onDeviceAdded.addListener( () => {<update device list>} ); 
    networking.bluetooth.onReceiveError.addListener( errorInfo) => {<handle error>};

## Data

    adapterInfo = {
        address:      String  --> address of the adapter: 'XX:XX:XX:XX:XX:XX'.
        name:         String  --> human-readable adapter name.
        enabled:      Boolean --> adapter enabled.
        discovering:  Boolean --> adapter is currently discovering.
        discoverable: Boolean --> adapter is currently discoverable.
    }
    devices[] = {
        length:       int          --> nbr of devices, length of this array  
        address:      String       --> address of the device: 'XX:XX:XX:XX:XX:XX'.
        name:         String       --> human-readable name of the device.
        paired:       Boolean      --> paired with this tablet.
        uuids:        String array --> UUIDs of this device.
    } 
    acceptInfo = {
        socketId:       int         --> Server socket
        clientSocketId: int         --> Client Socket  
    }
    receiveInfo = {
        socketId:       int         --> socket id
        data            ArrayBuffer --> the transmitted data
    }
    errorInfo = {
        socketId:       int         --> the relevant socket
        errorMessage    String      --> arbitrary text info  
    }
    
# Bluetooth Handling

In order for Bluetooth-enabled devices to transmit data, they must first form a channel of communication using a **pairing process**. One device makes itself **discoverable**, the other device finds the discoverable device and issues a pairing request. In the pairing process the two devices exchange security keys and identiers. After the pairing process is complete, the two devices can set up a communication channel.

Pairing is done manually through the Android Bluetooth controls. The BiddingBox application assumes that this has been done as described below and sets up the required communication channels without further user intervention. Pairing needs to be done only once and persists even if the paired devices are temporarily out of each other's range and even if they have been turned off.

## System Setup

The BiddingBox application assumes that Bluetooth is turned on, that
one of the four tablets is paired with all 3 others, and that no other BT devices are paired with any of the four tablets. In other words, one tablet, the **server**, is paired with the other 3; each of the other 3, referred to as a **client**, is paired only with the server. It is a good idea to turn off WIFI, but this isn't a functional requirement. If BT is not available a message is issued and no connection is possible.

A further requirement, which will be removed later, is that the last character of the BT name of each device must differ from the others in such a way that the 4 ASCII codes of these characters are distinct modulo 4 (the simplest choice is 1,2,3,4 or any 4 successive digits).

If the above conditions are met the system will make the BT connections automatically as soon as the app is launched. After the connections have been established the server tablet (the one with connections to the other 3) will display the message "Client Tablets Connected". In addition, each tablet displays a colored dot in the upper right hand corner of the main page. This dot can be red, yellow or green according to the connection status. There is also a page devoted to BT that can be accessed from the menu in the upper left hand corner.

The BT connections can be reset; there is a "Reset" button on the the BT control page. The system will attempt to reestablish the connections after they are reset. (This currently works only if the server and all three clients are reset manually. The plan is to test the connections by pinging each client periodically, e.g. every five seconds.)

## Finding the Devices

**getBtDevices()**, called from app() in index.js  
- Gets names and addresses of all paired devices
- Calls **assignBtFunction(pairedBtNames, pairedBtAddresses)** to set up tablet[]  

      tablet[.] = { type: "server" or "client"
                    name: <device name>,
                    address: <device address>,
                    seatIx: <seat>,
                    uuid: uuid[.],
                    socket: <socket id>
                    }

- Calls **makeBtConnection()**

## Making the Connections
The communication setup is asymmetric for technical reasons. One tablet plays the role of a 'server' to which each of the other 3 connects directly as a 'client'. A messages between to clients must pass through the server. Client and server follow different procedure to set up the communication channel.

### Server Side

Calls **setBtConnectionState("server", "waiting")** to visually mark waiting status (yellow)  
Calls **startBtListening(tabIx)** which sets up the listener by calling the API function  
**networking.bluetooth.listenUsingRfcomm(tablet[tabIx].uuid, function (socketId){})**

The listening socket is assigned automatically. tabIx is the first unconnected entry in the tablet[.] array. The uuid is essential; it must match the uuid of the client that will be connected. There are 4 distinct uuid's, one for each tablet[.] entry.   

### Client Side
