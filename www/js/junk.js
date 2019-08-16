//Saved original version of index.js
//This is the exact version obtained from the page template
//Replaced by index.js from BiddingBox04
//
/*
 * Licensed to the Apache Software Foundation (ASF)
 * http://www.apache.org/licenses/LICENSE-2.0
 */
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        console.log('Received Event: ' + id);

        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {
            inDuration: 0,
            outDuration: 0,
            startingTop: 0,
            endingTop: 0
        });

        $(document).ready(function () {
            $('.sidenav').sidenav();
        });
    }
};
///////////////////////////////////////////////////////////////////
// Saved original version of ModalDialog.js
//
///////////////////////////////////////////////////////////////////////////////
// Functions related to the popup box -- Version 2
// Using the Materialize library
// 
// 
var currentModalId;
//
/**
 * @description
 * A simple modal overlay containing a text message
 * and 0, 1 or 2 buttons (ok; yes/no).
 * 
 * @param {string} msgTitle : Any Text
 * @param {string} msgText  : Message content
 * @param {string} id       : Message Identifier, globally available as currentModalId
 * @param {string} okText   : OK Button label, if blank - no button
 * @param {string} yesText  : dito YES Button
 * @param {string} noText   : dito NO Button
 */
function popupBox(msgTitle, msgText, id, okText, yesText, noText) {
    
    currentModalId = id;

    var head = document.getElementById("dialog-header");
    head.innerHTML = msgTitle;
    var box = document.getElementById("dialog-text");
    box.innerHTML = msgText;

    var okBtn = document.getElementById("ok-button");
    var okSpan = document.getElementById("ok-span");
    if (okText != "") {
        okSpan.innerHTML = okText;
        okBtn.style.display = "inline-block";
    } else {
        okBtn.style.display = "none";
    }

    var yesBtn = document.getElementById("yes-button");
    var yesSpan = document.getElementById("yes-span");
    if (yesText != "") {
        yesSpan.innerHTML = yesText;
        yesBtn.style.display = "inline-block";
    } else {
        yesBtn.style.display = "none";
    }

    var noBtn = document.getElementById("no-button");
    var noSpan = document.getElementById("no-span");
    if (noText != "") {
        noSpan.innerHTML = noText;
        noBtn.style.display = "inline-block";
    } else {
        noBtn.style.display = "none";
    }

    var el = document.getElementById("modalDialog");
    var instance = M.Modal.getInstance(el);
    instance.open();
}
/**
 * @description
 * Erases the box permanently
 */
function hidePopupBox(){
    var el = document.getElementById("modalDialog");
    var instance = M.Modal.getInstance(el);
    instance.close();
}
/**
 * @description
 * OK Button was clicked
 */
function okModalClicked(){
    console.log("okModal ID= " + currentModalId);
}
/**
 * @description
 * YES Button was clicked
 */
function yesModalClicked(){
    console.log("yesModal ID= " + currentModalId);
}
/**
 * @description
 * NO Button was clicked
 */
function noModalClicked(){
    console.log("noModal ID= " + currentModalId);
}
//////////////////////////////////////////////
//Original template version of index.html
///////////////////////////////////////////////
<!DOCTYPE html>
<!--
    Copyright (c) 2012-2016 Adobe Systems Incorporated. All rights reserved.
    http://www.apache.org/licenses/LICENSE-2.0
-->
<!-- Using Materialize ccs and js; Material Icon Fonts; jQuery; etc. -->
<!-- Install all the fundamental Cordova Plugins, in particular Bluetooth-->
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, width=device-width" />
    <link rel="stylesheet" type="text/css" href="css/materialize.min.css" media="screen,projection" />
    <link rel="stylesheet" type="text/css" href="css/index.css" />
    <link rel="stylesheet" type="text/css" href="css/gridlayout.css" />
    <link rel="stylesheet" type="text/css" href="css/box.css" />
    <!--Additional Add-on: Material Icons in the form of fonts -->
    <!--located in www/fonts/  -->
    <title>BidBox05</title>
</head>

<body>
    <!--------------------------------------------------------------------------->
    <!--Modal Dialog Version 2, using Materialize-------------------------------->
    <!--------------------------------------------------------------------------->

    <!-- Modal Structure -->
    <div id="modalDialog" class="modal">
        <div class="modal-content">
            <h3 id="dialog-header" class="left-align">Modal Header</h3>
            <p id="dialog-text" class="left-align flow-text">A bunch of text</p>
            <a id="ok-button" href="javascript:void(0);" class="modal-close waves-effect waves-green btn-large"
                onclick="okModalClicked();"><span id="ok-span">OK</span></a>
            <a id="yes-button" href="javascript:void(0);" class="modal-close waves-effect waves-green btn-large"
                onclick="yesModalClicked();"><span id="yes-span">Yes</span></a>
            <a id="no-button" href="javascript:void(0);" class="modal-close waves-effect waves-green btn-large"
                onclick="noModalClicked();"><span id="no-span">No</span></a>
        </div>
    </div>

    <nav>
        <div class="nav-wrapper navstyles">
            <a href="#!" class="brand-logo black-text" style="font-size:1.5rem;">PhoneGap Template</a>
            <a href="#" class="sidenav-trigger black-text" data-target="mobile-nav">
                <i class="material-icons">menu</i>
            </a>
            <ul class="right hide-on-med-and-down">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </div>

        <ul class="sidenav" id="mobile-nav">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
    </nav>


    <!--JavaScript at end of body for optimized loading-->
    <script type="text/javascript" src="cordova.js"></script>
    <script type="text/javascript" src="js-external/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="js-external/materialize.min.js"></script>
    <script type="text/javascript" src="js/data.js"></script>
    <script type="text/javascript" src="js/globals.js"></script>
    <script type="text/javascript" src="js/messaging.js"></script>
    <script type="text/javascript" src="js/index.js"></script>
    <script type="text/javascript" src="js/bluetooth.js"></script>
    <script type="text/javascript" src="js/director.js"></script>
    <script type="text/javascript" src="js/ModalDialog.js"></script>
    <script type="text/javascript" src="js/record.js"></script>
    <script type="text/javascript" src="js/bidding.js"></script>
    <script type="text/javascript" src="js/box.js"></script>
    <script type="text/javascript" src="js/compass.js"></script>
    <script type="text/javascript" src="js/board.js"></script>

    <script>
        $(document).ready(function () {
            //Materialize Initializations
            $('.sidenav').sidenav();
            var elems = document.querySelectorAll('.modal');
            var instances = M.Modal.init(elems, {
                inDuration: 0,
                outDuration: 0,
                startingTop: 0,
                endingTop: 0
            });
            var dropdowns = document.querySelectorAll('.dropdown-trigger');
            for (var i = 0; i < dropdowns.length; i++) {
                M.Dropdown.init(dropdowns[i], {
                    constrainWidth: false
                });
            }
            elems = document.querySelectorAll('select');
            instances = M.FormSelect.init(elems);
            $('select').formSelect();

            elems = document.querySelectorAll('.timepicker');
            instances = M.Timepicker.init(elems);

        });
    </script>

    <!--This must stay at the very bottom to assure that everything is loaded before to any js action-->
    <script type="text/javascript">
        console.log("Calling App Init");
        app.initialize();
    </script>
</body>

</html>
////////////////////////////////////////////////////////////////////
$ phonegap plugin list
code-push 2.0.7 "CodePushAcquisition"
cordova-plugin-battery-status 1.1.2 "Battery"
cordova-plugin-camera 2.1.1 "Camera"
cordova-plugin-code-push 1.11.20 "CodePush"
cordova-plugin-compat 1.2.0 "Compat"
cordova-plugin-console 1.0.7 "Console"
cordova-plugin-contacts 2.0.1 "Contacts"
cordova-plugin-device 1.1.7 "Device"
cordova-plugin-device-motion 1.2.5 "Device Motion"
cordova-plugin-device-orientation 1.0.7 "Device Orientation"
cordova-plugin-dialogs 1.2.1 "Notification"
cordova-plugin-file 4.3.3 "File"
cordova-plugin-file-transfer 1.6.3 "File Transfer"
cordova-plugin-geolocation 2.1.0 "Geolocation"
cordova-plugin-globalization 1.0.9 "Globalization"
cordova-plugin-inappbrowser 1.3.0 "InAppBrowser"
cordova-plugin-media 2.2.0 "Media"
cordova-plugin-media-capture 1.2.0 "Capture"
cordova-plugin-network-information 1.2.1 "Network Information"
cordova-plugin-splashscreen 3.2.2 "Splashscreen"
cordova-plugin-statusbar 2.1.3 "StatusBar"
cordova-plugin-vibration 2.1.6 "Vibration"
cordova-plugin-whitelist 1.2.2 "Whitelist"
cordova-plugin-zip 3.1.0 "cordova-plugin-zip"

