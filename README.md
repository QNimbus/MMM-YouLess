# MagicMirrorModule-YouLess

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/). This module reads from a YouLess energy meter in your network to display realtime energy usage information.

This module is not yet finished; I intend to add more features and improve upon the display of the energy reading. (e.g. displaying power usage using an analog dial, sliding scale, history, graph, et cetera)

## Installation

1. Navigate into your MagicMirror's `modules` folder and run:
```
$ git clone https://github.com/QNimbus/MMM-YouLess.git
```
1. Install the dependencies: 
```
$ cd MMM-YouLess && npm install --only=production
```

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'MMM-YouLess',
            config: {
                // See below for configurable options
                youlessHost: "10.81.1.22", // or youless.home.network.nl
                updateInterval: 5000,
            }
        }
    ]
}
```

## Configuration options

| Option           | Description
|----------------- |-----------
| `youlessHost`| *Required* Your YouLess ip address or hostname<br><br>**Type:** `string`
| `symbol`| *Optional* Font Awesome icon to display in the module<br><br>**Default value:** `bolt`<br>**Type:** `string`<br>See: [Font Awesome Icons website](http://fontawesome.io/icons/)
| `updateInterval` | *Optional* Interval at which the module fetches new data<br><br>**Default value:** 10000 milliseconds (10 seconds)<br>**Type:** `int`(milliseconds)<br>
| `initialLoadDelay` | *Optional* Initial delay when module is first loaded<br><br>**Default value:** 0 milliseconds (0 seconds)<br>**Type:** `int`(milliseconds)<br>
| `retryDelay`     | *Optional* If no data is received, retry again after delay<br><br>**Default value:** 2000 milliseconds (2 seconds)<br>**Type:** `int`(milliseconds)<br>

## Building from TypeScript source

Todo...

## Screenshots

![alt text][ss_01]

[ss_01]: images/module_ss_01.png "Example of YouLess module at work"

![alt text][ss_02]

[ss_02]: images/module_ss_02.png "Example of YouLess module at work"