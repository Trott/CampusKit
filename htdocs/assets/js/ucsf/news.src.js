var _newsq = _newsq || [];
var ucsf = ucsf || {};
ucsf.news = (function () {
    "use strict";
    var me = {};

    me.loadFromStorage = function (storageId) {
        var stored;
        if (Modernizr.localstorage) {
            stored = window.localStorage.getItem(storageId);
            if (stored !== null) {
                return JSON.parse(stored);
            }
        }
        return {};
    };

    me.render = function (container, storageId, feedUrl, options, template) {
        var feed;

        feed = new google.feeds.Feed(feedUrl);

        if (options.numEntries) {
            feed.setNumEntries(options.numEntries);
        }

        feed.load(function (result) {
            var i,
            thisEntry,
            dateTime,
            dateObject,
            hours,
            minutes,
            designation,
            content = {};

            if (! result.error) {
                content = {
                    "feed": this.feed
                };
                for (i = 0; i < content.feed.entries.length; i = i + 1) {
                    thisEntry = content.feed.entries[i];
                    dateTime = {};
                    dateObject = new Date(thisEntry.publishedDate);
                    dateTime.date = dateObject.toLocaleDateString();
                    if (options.showTime) {
                        minutes = dateObject.getMinutes();
                        if (minutes < 10) {
                            minutes = "0" + minutes;
                        }
                        hours = dateObject.getHours();
                        designation = hours < 12 ? 'AM' : 'PM';
                        if (hours > 12) {
                            hours = hours - 12;
                        }
                        if (hours === 0) {
                            hours = 12;
                        }

                        dateTime.time = hours + ':' +
                        minutes + ' ' +
                        designation;
                    }
                    thisEntry.dateTime = dateTime;
                }
                if (options.more) {
                    content.feed.entries.push(options.more);
                }
                if (Modernizr.localstorage) {
                    window.localStorage.setItem(storageId, JSON.stringify(content));
                }
            } else {
                content = ucsf.news.loadFromStorage(storageId);
            }
            container.innerHTML = template.render(content);
        });
    };

    me.headlines = function (container, storageId, feedUrl, options) {
        var template;
        options = options || {};

        template = typeof options.template !== "function" ?
            new Hogan.Template(function(c,p,i){var _=this;_.b(i=i||"");if(_.s(_.f("feed",c,p,1),c,p,0,9,313,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<div class=\"menu detailed\"><h2>");_.b(_.v(_.f("title",c,p,0)));_.b("</h2><ol>");if(_.s(_.f("entries",c,p,1),c,p,0,70,290,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("  <li>    <a class=\"no-ext-ind\" rel=\"external\" href=\"");_.b(_.v(_.f("link",c,p,0)));_.b("\"><span class=\"external\">");_.b(_.v(_.f("title",c,p,0)));_.b("</span>    <div class=\"smallprint light\">");_.b(_.v(_.d("dateTime.date",c,p,0)));_.b("</div>    <div class=\"smallprint light\">");_.b(_.v(_.d("dateTime.time",c,p,0)));_.b("</div></a>");});c.pop();}_.b("</ol></div>");});c.pop();}if(!_.s(_.f("feed",c,p,1),c,p,1,0,0,"")){_.b("<div class=\"content\"><p>Content could not be loaded.</p></div>");}return _.fl();}) :
            new Hogan.Template(options.template);

        if (! navigator.onLine) {
            container.innerHTML = template.render(me.loadFromStorage(storageId));
        } else {
            Modernizr.load([{load:'http://www.google.com/jsapi', callback: function() {
                google.load("feeds", "1",
                    {
                        nocss:true, callback:function () {
                            ucsf.news.render(container, storageId, feedUrl, options, template);
                        }
                    }
                );
            }}]);
        }
    };

    var oldq = typeof _newsq === "undefined" ? [] : _newsq;
    _newsq = {
        push: function (params) {
            if (params.length === 3) {
                params[3] = {};
            }
            return me.headlines(document.getElementById(params[0]), params[1], params[2], params[3]);
        }
    };

    for (var i=0, len=oldq.length; i<len; i++) {
        _newsq.push(oldq[i]);
    }

    return me;
}());
