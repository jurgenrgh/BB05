# Project Generated from the Template `phonegap-bt-template`

## Usage

### Initial Problems

Compiled and loaded to external tablet using   
$ phonegap run android --device --target=HGCG8SKD  
which is in the bat file runSingle.sh.

The application compiled and loaded, however there were plugin-related error
messages and complaints about the platform 'Browser'.

So removed the browser as target, since not needed, by means of  
$ phonegap platform remove browser.  

After this still long lists of gibberish, beginning with  
"Failed to install 'cordova-plugin-file-transfer" etc

Attempted solution: Change versions in config.xml - doesn't help  

Replacing  versions in config.xml as follows:  
 
`<plugin name="cordova-plugin-file" version="4.3.3" />`   
`<plugin name="cordova-plugin-file-transfer" version="1.6.3"/>`

doesn't help either.  

What finally did help was to uninstall the plugin cordova-plugin-file (with --force) and then reinstall as cordova-plugin-file@4.3.3, i.e. older version. Now the thing compiles and loads without reams of senseless output. 

### The Test Application - Initial State
At this point the app consists of an index.html file and nothing else. It shows a title and a menu with no function. However, the index.html file loads  
1. materialize.css
2. index.css (local styles)
3. external js files: cordova, jquery, materialize
4. local js files: index.js, ModalDialog.js  

The remainder of the typical phonegap apps consists of an extension of the html file to display several pages, if required, and js code located in www/js/.  
The generation of separate pages is accomplished simply by making various divs visible or invisible by calling js functions triggered by navigation menu item clicks. 