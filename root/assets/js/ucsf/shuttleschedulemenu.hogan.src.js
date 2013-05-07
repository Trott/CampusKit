// require hogan
var hogan = require("hogan.js");

// construct template string
var template = '{{#route}}';
    template += '<h2>{{routeShortName}} Shuttle Schedule</h2>';
	template += '<ol id="ucsf-schedule-container" data-routeId="{{#id}}{{id}}{{/id}}">';
    template += '{{/route}}';
    template += '{{#stops}}';
    template += '<li><a href="#" data-stopId="{{#id}}{{id}}{{/id}}" onclick="ucsf.shuttle.renderSchedule.target=this;ucsf.shuttle.renderSchedule.startTime=new Date().setHours(0,0,0,0);UCSF.Shuttle.times({apikey:\'c631ef46e918c82cf81ef4869f0029d4\',{{#id}}stopId:\'{{id}}\',{{/id}}routeId:document.getElementById(\'ucsf-schedule-container\').getAttribute(\'data-routeId\'),startTime:ucsf.shuttle.renderSchedule.startTime,endTime:ucsf.shuttle.renderSchedule.startTime+86399999},ucsf.shuttle.renderSchedule);return false">{{stopName}}</a></li>';
    template += '{{/stops}}';
    template += '</ol>';
    template += '{{^stops}}';
    template += '<p>Could not load content.</p>';
    template += '{{/stops}}';

// compile template
var output = hogan.compile(template, {asString: true});

console.log(output);