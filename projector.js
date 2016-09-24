'use strict';
/* jslint node:true, esversion:6 */

var pjlink = require('PJLink');
var Projector = function(ip, port, password) {
    this.ip = ip;
    this.port = port;
    this.password = password;

    this.beamer = new pjlink(this.ip, this.port, this.password);
};


Projector.prototype.on = function() {
    var self = this;

    return new Promise((resolve, reject) => {
        self.beamer.powerOn((error) => {
            self.beamer.disconnect();

            if (error) reject(error);

            resolve('Projector '+self.ip+' turned on');
        });
    });
};

Projector.off = function() {
    var self = this;

    return new Promise((resolve, reject) => {
        self.beamer.powerOff((error) => {
            self.beamer.disconnect();

            if (error) reject(error);

            resolve('Projector '+self.ip+' turned off');
        });
    });
};

Projector.getState = function() {
    var self = this;

    /**
        Four possible power states:
        * 0 /   pjlink.POWER.OFF
        * 1 /   pjlink.POWER.ON
        * 2 /   pjlink.POWER.COOLING_DOWN
        * 3 /   pjlink.POWER.WARMING_UP
    **/
    return new Promise((resolve, reject) => {
        self.beamer.getPowerState((error, state) => {
            self.beamer.disconnect();

            if (error) reject(error);

            resolve(state);
        });
    });
};

Projector.getInput = function() {
    var self = this;

    return new Promise((resolve, reject) => {
        self.beamer.getInput((error, input) => {
            self.beamer.disconnect();

            if (error) reject(error);

            resolve(input);
        });
    });
};

Projector.setInput = function(input) {
    var self = this;

    return new Promise((resolve, reject) => {
        self.beamer.setInput(input, (error) => {
            self.beamer.disconnect();

            if (error) reject(error);

            resolve('Projector '+self.ip+' changed input');
        });
    });
};


module.exports = Projector;
