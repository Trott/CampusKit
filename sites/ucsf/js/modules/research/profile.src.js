var ucsf = ucsf || {};
ucsf.ctsiProfile = {
    /* Callback for Profiles API */
    renderProfile: function (data) {
        "use strict";
        if (data.hasOwnProperty("Profiles")) {
            if ((data.Profiles instanceof Array) && (data.Profiles.length > 0)) {
                var myProfile = data.Profiles[0],
                    menu = document.getElementById('ctsi-menu'),
                    header = document.getElementById('ctsi-header'),
                    items,
                    profilePhoto,
                    headerHeight,
                    item,
                    anchor,
                    narrative,
                    narrativeTextShort,
                    keywords,
                    list,
                    limit,
                    i,
                    thisItem,
                    keywordsContainer,
                    publications,
                    pubList,
                    pubLimit,
                    j,
                    pubItem,
                    thisPublication,
                    thisAnchor,
                    publicationsContainer,
                    fullProfileItem,
                    fullProfileAnchor;

                if (myProfile.hasOwnProperty("Name")) {
                    header.innerHTML = myProfile.Name;

                    if (myProfile.hasOwnProperty("PhotoURL")) {
                        profilePhoto = document.createElement("img");
                        profilePhoto.setAttribute("src", "http://src.sencha.io/80/80/" + myProfile.PhotoURL);
                        profilePhoto.setAttribute("alt", "");
                        profilePhoto.setAttribute("style", "border-top-right-radius:0;border-bottom-left-radius:.5em;float:left");
                        headerHeight = header.clientHeight;
                        header.setAttribute("style", "height:52px;padding-top:20px");
                        menu.insertBefore(profilePhoto, header);
                    }
                }

                if (myProfile.hasOwnProperty("Narrative") && (typeof myProfile.Narrative === "string")) {
                    items = document.createElement("ol");
                    menu.appendChild(items);
                    item = document.createElement("li");
                    anchor = document.createElement("a");
                    anchor.setAttribute("href", "#");
                    anchor.setAttribute("onclick", "ucsf.ctsiProfile.toggleNarrative(); return false;");
                    narrative = document.createElement("span");
                    narrative.setAttribute("class", "smallprint");
                    narrative.setAttribute("id", "ctsi-narrative");
                    narrativeTextShort = myProfile.Narrative.substring(0, myProfile.Narrative.substring(0, 200).lastIndexOf(' '));
                    narrative.innerHTML = narrativeTextShort + '...';
                    document.getElementById("ctsi-narrative-hidden").innerHTML = myProfile.Narrative;
                    anchor.appendChild(narrative);
                    item.appendChild(anchor);
                    items.appendChild(item);
                    profilePhoto.setAttribute("style", "border-top-right-radius:0;float:left");

                }

                if (myProfile.hasOwnProperty("Keywords") && myProfile.Keywords.length > 0) {
                    keywords = myProfile.Keywords;
                    list = document.createElement("ol");
                    list.setAttribute("class", "research-interests");
                    limit = keywords.length > 5 ? 5 : keywords.length;
                    for (i = 0; i < limit; i = i + 1) {
                        thisItem = document.createElement("li");
                        thisItem.innerHTML = keywords[i];
                        list.appendChild(thisItem);
                    }
                    keywordsContainer = document.getElementById("ctsi-keywords");
                    keywordsContainer.innerHTML = '<h1 class="light">Research Interests</h1>';
                    keywordsContainer.appendChild(list);
                }

                if (myProfile.hasOwnProperty("Publications") && myProfile.Publications.length > 0) {
                    publications = myProfile.Publications;
                    pubList = document.createElement("ol");
                    pubLimit = publications.length > 5 ? 5 : publications.length;
                    for (j = 0; j < pubLimit; j = j + 1) {
                        if (publications[j].hasOwnProperty('PublicationTitle')) {
                            pubItem = document.createElement("li");
                            thisPublication = document.createElement("span");
                            thisPublication.setAttribute("class", "smallprint");
                            thisPublication.innerHTML = publications[j].PublicationTitle;

                            if (publications[j].hasOwnProperty('PublicationSource') &&
                                    (publications[j].PublicationSource[0].hasOwnProperty('PublicationSourceURL')) &&
                                    (publications[j].PublicationSource[0].PublicationSourceURL.length > 0)) {
                                thisAnchor = document.createElement("a");
                                thisAnchor.setAttribute("href", publications[j].PublicationSource[0].PublicationSourceURL);
                                thisAnchor.setAttribute("rel", "external");
                            } else {
                                thisAnchor = document.createElement("p");
                            }
                            thisAnchor.appendChild(thisPublication);
                            pubItem.appendChild(thisAnchor);
                            pubList.appendChild(pubItem);
                        }
                    }
                    publicationsContainer = document.getElementById("ctsi-publications");
                    publicationsContainer.innerHTML = '<h1 class="content-first light">Recent Publications</h1>';
                    publicationsContainer.appendChild(pubList);
                }

                if (myProfile.hasOwnProperty("ProfilesURL")) {
                    fullProfileItem = document.createElement("li");
                    fullProfileAnchor = document.createElement("a");
                    fullProfileAnchor.innerHTML = "Full Research Profile";
                    fullProfileAnchor.setAttribute("rel", "external");
                    fullProfileAnchor.setAttribute("href", myProfile.ProfilesURL);
                    document.getElementById("ctsi-full-profile");
                    fullProfileItem.appendChild(fullProfileAnchor);
                    document.getElementById('ctsi-full-profile').appendChild(fullProfileItem);
                }
            }
        }
    },

    toggleNarrative: function () {
        "use strict";
        var temp = document.getElementById("ctsi-narrative").innerHTML;
        document.getElementById("ctsi-narrative").innerHTML = document.getElementById("ctsi-narrative-hidden").innerHTML;
        document.getElementById("ctsi-narrative-hidden").innerHTML = temp;
    }
};

// Now that the callbacks are defined, let's append the <script> tag.
if (window.location.search) {
    window.onload = function () {
        "use strict";
        var queryString = decodeURIComponent(window.location.search),
            match = queryString.match(/[&?]fno=([\w.@]+)/),
            fno,
            deferred;
        if (match !== null) {
            fno = match[1];
            deferred = document.createElement('script');
            deferred.src = 'http://profiles.ucsf.edu/CustomAPI/v1/JSONProfile.aspx?FNO=' +
                fno +
                '&callback=ucsf.ctsiProfile.renderProfile&publications=full&mobile=on';
            document.body.appendChild(deferred);
        }
    };
}
