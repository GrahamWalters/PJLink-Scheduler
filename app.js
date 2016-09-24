'use strict';
/* jslint node:true, esversion:6 */

var schedule = require('node-schedule');
var Projector = require('./projector');

var p1 = new Projector('192.168.1.10', 4352, 'password');
var p2 = new Projector('192.168.1.11', 4352, 'password');


var everyDay = function(hour, job) {
    var rule = new schedule.RecurrenceRule();
    rule.hour = hour;
    rule.dayOfWeek = new schedule.Range(0,6);

    return schedule.scheduleJob(rule, job);
};

everyDay(19, () => {
    p1.on()
            .then(console.log)
            .then(() => {
                p1.setInput({
                            source: 'rgb',
                            channel: 1
                        })
                        .then(console.log)
                        .catch(console.error);
            })
            .error(console.error);


    p2.on()
            .then(console.log)
            .then(() => {
                p2.setInput({
                            source: 'rgb',
                            channel: 1
                        })
                        .then(console.log)
                        .catch(console.error);
            })
            .error(console.error);
});

everyDay(2, () => {
    p1.off()
            .then(console.log)
            .error(console.error);

    p2.off()
            .then(console.log)
            .error(console.error);
});
