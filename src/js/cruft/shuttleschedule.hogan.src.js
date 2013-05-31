// require hogan
var hogan = require("hogan.js");

// construct template string
var template = '<h3>{{formattedDate}}</h3>';
    template += '<button onclick="ucsf.shuttle.renderSchedule.startTime={{date}}-86400000;ucsf.shuttle.renderSchedule.target=this.parentNode.previousSibling;UCSF.Shuttle.times({apikey:\'c631ef46e918c82cf81ef4869f0029d4\',stopId:ucsf.shuttle.renderSchedule.target.getAttribute(\'data-stopId\'),routeId:document.getElementById(\'ucsf-schedule-container\').getAttribute(\'data-routeId\'),startTime:ucsf.shuttle.renderSchedule.startTime,endTime:ucsf.shuttle.renderSchedule.startTime+86399999},ucsf.shuttle.renderSchedule)">Previous Day</button>';
    template += '<button onclick="ucsf.shuttle.renderSchedule.startTime={{date}}+86400000;ucsf.shuttle.renderSchedule.target=this.parentNode.previousSibling;UCSF.Shuttle.times({apikey:\'c631ef46e918c82cf81ef4869f0029d4\',stopId:ucsf.shuttle.renderSchedule.target.getAttribute(\'data-stopId\'),routeId:document.getElementById(\'ucsf-schedule-container\').getAttribute(\'data-routeId\'),startTime:ucsf.shuttle.renderSchedule.startTime,endTime:ucsf.shuttle.renderSchedule.startTime+86399999},ucsf.shuttle.renderSchedule)">Next Day</button>';
    template += '<ol class="shuttle-times-listing">{{#times}}';
    template += '<li>{{formattedTime}} {{#trip}}{{tripHeadsign}}{{/trip}}</li>';
    template += '{{/times}}';
    template += '{{^times}}';
    template += '<li>No times found for selected date.</li>';
    template += '{{/times}}</ol>';

// compile template
var output = hogan.compile(template, {asString: true});

console.log(output);