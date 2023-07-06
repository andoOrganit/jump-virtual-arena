/*jslint browser: true, evil: true */

// define correct path for files inclusion
var scripts = document.getElementsByTagName('script'),
    path = scripts[scripts.length - 1].src.split('?')[0],
    guardcatForceCDN = (guardcatForceCDN === undefined) ? '' : guardcatForceCDN,
    cdn = (guardcatForceCDN === '') ? path.split('/').slice(0, -1).join('/') + '/' : guardcatForceCDN,
    alreadyLaunch = (alreadyLaunch === undefined) ? 0 : alreadyLaunch,
    guardcatForceLanguage = (guardcatForceLanguage === undefined) ? '' : guardcatForceLanguage,
    guardcatForceExpire = (guardcatForceExpire === undefined) ? '' : guardcatForceExpire,
    guardcatCustomText = (guardcatCustomText === undefined) ? '' : guardcatCustomText,
    timeExipre = 31536000000,
    guardcatProLoadServices,
    guardcatNoAdBlocker = false;



var guardcat = {
    "version": 1,
    "cdn": cdn,
    "user": {},
    "lang": {},
    "services": {},
    "added": [],
    "idprocessed": [],
    "state": [],
    "launch": [],
    "parameters": {},
    "isAjax": false,
    "reloadThePage": false,
    "events": {
        "init": function () {},
        "load": function () {},
    },
    "init": function (params) {
        "use strict";
        var origOpen;

        guardcat.parameters = params;
        if (alreadyLaunch === 0) {
            alreadyLaunch = 1;
            if (window.addEventListener) {
                window.addEventListener("load", function () {
                    guardcat.load();
                    guardcat.fallback(['guardcatOpenPanel'], function (elem) {
                        elem.addEventListener("click", function (event) {
                            guardcat.userInterface.openPanel();
                            event.preventDefault();
                        }, false);
                    }, true);
                }, false);
                window.addEventListener("scroll", function () {
                    var scrollPos = window.pageYOffset || document.documentElement.scrollTop,
                        heightPosition;
                    if (document.getElementById('guardcatAlertBig') !== null && !guardcat.highPrivacy) {
                        if (document.getElementById('guardcatAlertBig').style.display === 'block') {
                            heightPosition = document.getElementById('guardcatAlertBig').offsetHeight + 'px';

                            if (scrollPos > (screen.height * 2)) {
                                guardcat.userInterface.respondAll(true);
                            } else if (scrollPos > (screen.height / 2)) {
                                document.getElementById('guardcatDisclaimerAlert').innerHTML = '<strong>' + guardcat.lang.alertBigScroll + '</strong> ' + guardcat.lang.alertBig;
                            }

                           
                        }
                    }
                }, false);

                window.addEventListener("keydown", function (evt) {
                    if (evt.keyCode === 27) {
                        guardcat.userInterface.closePanel();
                    }
                }, false);
                window.addEventListener("hashchange", function () {
                    if (document.location.hash === guardcat.hashtag && guardcat.hashtag !== '') {
                        guardcat.userInterface.openPanel();
                    }
                }, false);
                window.addEventListener("resize", function () {
                    if (document.getElementById('guardcat') !== null) {
                        if (document.getElementById('guardcat').style.display === 'block') {
                            guardcat.userInterface.jsSizing('main');
                        }
                    }

                    if (document.getElementById('guardcatCookiesListContainer') !== null) {
                        if (document.getElementById('guardcatCookiesListContainer').style.display === 'block') {
                            guardcat.userInterface.jsSizing('cookie');
                        }
                    }
                }, false);
            } else {
                window.attachEvent("onload", function () {
                    guardcat.load();
                    guardcat.fallback(['guardcatOpenPanel'], function (elem) {
                        elem.attachEvent("onclick", function (event) {
                            guardcat.userInterface.openPanel();
                            event.preventDefault();
                        });
                    }, true);
                });
                window.attachEvent("onscroll", function () {
                    var scrollPos = window.pageYOffset || document.documentElement.scrollTop,
                        heightPosition;
                    if (document.getElementById('guardcatAlertBig') !== null && !guardcat.highPrivacy) {
                        if (document.getElementById('guardcatAlertBig').style.display === 'block') {
                            heightPosition = document.getElementById('guardcatAlertBig').offsetHeight + 'px';

                            if (scrollPos > (screen.height * 2)) {
                                guardcat.userInterface.respondAll(true);
                            } else if (scrollPos > (screen.height / 2)) {
                                document.getElementById('guardcatDisclaimerAlert').innerHTML = '<strong>' + guardcat.lang.alertBigScroll + '</strong> ' + guardcat.lang.alertBig;
                            }
                            if (guardcat.orientation === 'top') {
                                document.getElementById('guardcatPercentage').style.top = heightPosition;
                            } else {
                                document.getElementById('guardcatPercentage').style.bottom = heightPosition;
                            }
                            document.getElementById('guardcatPercentage').style.width = ((100 / (screen.height * 2)) * scrollPos) + '%';
                        }
                    }
                });
                window.attachEvent("onkeydown", function (evt) {
                    if (evt.keyCode === 27) {
                        guardcat.userInterface.closePanel();
                    }

                    if ( evt.keyCode === 9 && focusableEls.indexOf(evt.target) >= 0) {
                        if ( evt.shiftKey ) /* shift + tab */ {
                            if (document.activeElement === firstFocusableEl) {
                                lastFocusableEl.focus();
                                evt.preventDefault();
                            }
                        } else /* tab */ {
                            if (document.activeElement === lastFocusableEl) {
                                firstFocusableEl.focus();
                                evt.preventDefault();
                            }
                        }
                    }

                });
                window.attachEvent("onhashchange", function () {
                    if (document.location.hash === guardcat.hashtag && guardcat.hashtag !== '') {
                        guardcat.userInterface.openPanel();
                    }
                });
                window.attachEvent("onresize", function () {
                    if (document.getElementById('guardcat') !== null) {
                        if (document.getElementById('guardcat').style.display === 'block') {
                            guardcat.userInterface.jsSizing('main');
                        }
                    }

                    if (document.getElementById('guardcatCookiesListContainer') !== null) {
                        if (document.getElementById('guardcatCookiesListContainer').style.display === 'block') {
                            guardcat.userInterface.jsSizing('cookie');
                        }
                    }
                });
            }

            if (typeof XMLHttpRequest !== 'undefined') {
                origOpen = XMLHttpRequest.prototype.open;
                XMLHttpRequest.prototype.open = function () {

                    if (window.addEventListener) {
                        this.addEventListener("load", function () {
                            if (typeof guardcatProLoadServices === 'function') {
                                guardcatProLoadServices();
                            }
                        }, false);
                    } else if (typeof this.attachEvent !== 'undefined') {
                        this.attachEvent("onload", function () {
                            if (typeof guardcatProLoadServices === 'function') {
                                guardcatProLoadServices();
                            }
                        });
                    } else {
                        if (typeof guardcatProLoadServices === 'function') {
                            setTimeout(guardcatProLoadServices, 1000);
                        }
                    }

                    try {
                        origOpen.apply(this, arguments);
                    } catch (err) {}
                };
            }
        }

        if(guardcat.events.init) {
            guardcat.events.init();
        }
    },
    "load": function () {
        "use strict";
        var cdn = guardcat.cdn,
            language = guardcat.getLanguage(),
            pathToLang = cdn + 'lang/guardcat.' + language + '.js?v=' + guardcat.version,
            pathToServices = cdn + 'guardcat.services.js?v=' + guardcat.version,
            linkElement = document.createElement('link'),
            defaults = {
                "adblocker": false,
                "hashtag": '#guardcat',
                "cookieName": 'guardcat',
                "highPrivacy": false,
                "orientation": "top",
                "removeCredit": false,
                "showAlertSmall": true,
                "cookieslist": true,
                "handleBrowserDNTRequest": false,
                "AcceptAllCta" : false,
                "moreInfoLink": true,
                "privacyUrl": "",
                "useExternalCss": false
            },
            params = guardcat.parameters;

        // Step 0: get params
        if (params !== undefined) {

            for (var k in defaults) {
                if(!guardcat.parameters.hasOwnProperty(k)) {
                    guardcat.parameters[k] = defaults[k];
                }
            }
        }

        // global
        guardcat.orientation = guardcat.parameters.orientation;
        guardcat.hashtag = guardcat.parameters.hashtag;
        guardcat.highPrivacy = guardcat.parameters.highPrivacy;
        guardcat.handleBrowserDNTRequest = guardcat.parameters.handleBrowserDNTRequest;


        // Step 1: load css
        if ( !guardcat.parameters.useExternalCss ) {
            linkElement.rel = 'stylesheet';
            linkElement.type = 'text/css';
            linkElement.href = cdn + 'css/guardcat.css?v=' + guardcat.version;
            document.getElementsByTagName('head')[0].appendChild(linkElement);
        }
        // Step 2: load language and services
        guardcat.addScript(pathToLang, '', function () {

          if(guardcatCustomText !== ''){
            guardcat.lang = guardcat.AddOrUpdate(guardcat.lang, guardcatCustomText);
          }
            guardcat.addScript(pathToServices, '', function () {

                var body = document.body,
                    div = document.createElement('div'),
                    html = '',
                    index,
                    orientation = 'Top',
                    cat = ['ads', 'analytic', 'api', 'comment', 'social', 'support', 'video', 'other'],
                    i;

                cat = cat.sort(function (a, b) {
                    if (guardcat.lang[a].title > guardcat.lang[b].title) { return 1; }
                    if (guardcat.lang[a].title < guardcat.lang[b].title) { return -1; }
                    return 0;
                });

                // Step 3: prepare the html
                html += '<div id="guardcatPremium"></div>';
                html += '<button id="guardcatBack" onclick="guardcat.userInterface.closePanel();" aria-label="' + guardcat.lang.close + '"></button>';
                html += '<div id="guardcat" role="dialog" aria-labelledby="dialogTitle">';
                   html += '   <br/><br/>';
                html += '   <button id="guardcatClosePanel" onclick="guardcat.userInterface.closePanel();">';
                html += '       ' + guardcat.lang.close;
                html += '   </br></br>&#10005</br></br></button>';
                html += '   <div id="guardcatServices">';
                html += '      <div class="guardcatLine guardcatMainLine" id="guardcatMainLineOffset">';
                html += '         <span class="guardcatH1" role="heading" aria-level="h1" id="dialogTitle"><br/><svg height="80" width="80" style="margin-top:0px; text-align:center;" id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 73.4 78"><defs><style>.cls-1{fill-rule:evenodd;}</style></defs><title>iconmonstr-cat-4</title><path class="cls-1" d="M3.55,13.37S6.29,12,7,11.63s.8-1.52,1.32-2.52A1.68,1.68,0,0,1,10,8a22.22,22.22,0,0,0,4.19-.71,9,9,0,0,1,10-5.77s2,4.64-5.16,10.05a4.28,4.28,0,0,0,4.48,3.68c4.07,0,10.83-4.16,18.93-4.16S59.06,16.27,64,20.91,72.79,34.35,72.79,41s-2.1,9-2.1,17.6,2.39,12.67,4,14.51,2.84,3.13,1.19,3.58-6.8-3.48-8.67-8.22-1.9-10.41-1.9-14.57,1.68-18-6-25.21a13,13,0,0,1-3.45,5.45c-2.74,2.67-4.54,4.06-4.54,8.15a20.62,20.62,0,0,0,3.58,11.8A42.6,42.6,0,0,0,58,58.56c.68.74.61,1.13-.29,2.39s-5.45,9.18-5.45,13.76-1.58,4.67-1.9,4.67-1.06.23-2-2.25a10.58,10.58,0,0,1-.22-6.61c.51-2.29,2.48-7.09,2.48-10.28s-3.84-7.1-6.48-10.19a26.29,26.29,0,0,1-5.45-16,13.16,13.16,0,0,1,4.23-10,13.58,13.58,0,0,0-6.77,8.32,26.27,26.27,0,0,1-4-1.87c-2.29-1.29-2.35-1.32-3-1.32s-2.93,1.35-4.48,2.44a17.53,17.53,0,0,0-3.58,3.13s.1.71,1.45.71,1.58-.64,1.84-1.48a1.59,1.59,0,0,1,1.77-1.16,1.67,1.67,0,0,1,1.68,2.25,5.58,5.58,0,0,1-5.19,3.65c-3,0-6.19-2.45-6.19-4.61,0-.94,3-3.36,3.26-3.55s-.45-.84-1.07-1.45a27.06,27.06,0,0,1-4.67-7.25,41.17,41.17,0,0,1-2-5.22c-.16-.55-.58-.49-1.1-.29a10.45,10.45,0,0,1-3.06.48,9.15,9.15,0,0,1-4-1.42C2.84,14.79,3.55,13.37,3.55,13.37Z" transform="translate(-3.3 -1.39)"/></svg><br/><br/>'+ guardcat.lang.title + '</span>';

                html += '  '
                html += '         <div id="guardcatInfo" class="guardcatInfoBox">';
                html += '         ' + guardcat.lang.disclaimer;
                if (guardcat.parameters.privacyUrl !== "") {
                    html += '<br/>';

                }
                html += '         </div>';
                html += '         <div class="guardcatName">';
          
                html += '            <span class="guardcatH2" role="heading" aria-level="h2">' + guardcat.lang.all + '</span>';
                html += '         </div>';
                html += '         <div class="guardcatAsk" id="guardcatScrollbarAdjust">';
                html += '            <button id="guardcatAllAllowed" class="guardcatAllow" onclick="guardcat.userInterface.respondAll(true);">';
                html += '               ' + guardcat.lang.allowAll;
                html += '            </button> ';
                html += '            <button id="guardcatAllDenied" class="guardcatDeny" onclick="guardcat.userInterface.respondAll(false);">';
                html += '                ' + guardcat.lang.denyAll;
                html += '            </button>';
                html += '         </div>';
                html += '      </div>';
                html += '      <div class="guardcatBorder">';
                html += '         <div class="clear"></div><ul>';
                for (i = 0; i < cat.length; i += 1) {
                    html += '         <li id="guardcatServicesTitle_' + cat[i] + '" class="guardcatHidden">';
                    html += '            <div class="guardcatTitle">';
                    html += '               <button onclick="guardcat.userInterface.toggle(\'guardcatDetails' + cat[i] + '\', \'guardcatInfoBox\');return false">&#10011; ' + guardcat.lang[cat[i]].title + '</button>';
                    html += '            </div>';
                    html += '            <div id="guardcatDetails' + cat[i] + '" class="guardcatDetails guardcatInfoBox">';
                    html += '               ' + guardcat.lang[cat[i]].details;
                    html += '            </div>';
                    html += '         <ul id="guardcatServices_' + cat[i] + '"></ul></li>';
           
                }
                html += '         </ul>';
                html += '         <div class="guardcatHidden" id="guardcatScrollbarChild" style="height:20px;display:block"></div>';
                if (guardcat.parameters.removeCredit === false) {
                    html += '     <a class="guardcatSelfLink" href="https://2points13.fr/rgpd.html" rel="nofollow" target="_blank" rel="noopener" title=":13 ' + guardcat.lang.newWindow + '"> ' + guardcat.lang.credit + '</a>';
                }
                html += '       </div>';
                html += '   </div>';
                html += '</div>';



                if (guardcat.parameters.orientation === 'bottom') {
                    orientation = 'Bottom';
                }

                if (guardcat.parameters.highPrivacy && !guardcat.parameters.AcceptAllCta) {
                    html += '<div id="guardcatAlertBig" class="guardcatAlertBig' + orientation + '">';
                    html += '   <span id="guardcatDisclaimerAlert">';
                    html += '       ' + guardcat.lang.alertBigPrivacy;
                    html += '   </span>';
                    html += '   <button id="guardcatPersonalize" onclick="guardcat.userInterface.openPanel();">';
                    html += '       ' + guardcat.lang.personalize;
                    html += '   </button>';

                    if (guardcat.parameters.privacyUrl !== "") {
                        html += '   <button id="guardcatPrivacyUrl" onclick="document.location = guardcat.parameters.privacyUrl">';
                        html += '       ' + guardcat.lang.privacyUrl;
                        html += '   </button>';
                    }

                    html += '</div>';
                } else {
                    html += '<div id="guardcatAlertBig" class="guardcatAlertBig' + orientation + '">';

                    html += '   <span id="guardcatDisclaimerAlert">';

                    if (guardcat.parameters.highPrivacy) {
                        html += '       ' + guardcat.lang.alertBigPrivacy;
                    } else {
                        html += '       ' + guardcat.lang.alertBigClick + ' ' + guardcat.lang.alertBig;
                    }

                    html += '   </span>';
                    html += '   <button id="guardcatPersonalize" onclick="guardcat.userInterface.respondAll(true);">';
                    html += '     ' + guardcat.lang.acceptAll;
                    html += '   </button>';
                    html += '   <button id="guardcatCloseAlert" onclick="guardcat.userInterface.openPanel();">';
                    html += '       ' + guardcat.lang.personalize;
                    html += '   </button>';

                    if (guardcat.parameters.privacyUrl !== "") {
                        html += '   <button id="guardcatPrivacyUrl" onclick="document.location = guardcat.parameters.privacyUrl">';
                        html += '       ' + guardcat.lang.privacyUrl;
                        html += '   </button>';
                    }

                    html += '</div>';
                    html += '<div id="guardcatPercentage"></div>';
                }

                if (guardcat.parameters.showAlertSmall === true) {
                    html += '<div id="guardcatAlertSmall" class="guardcatAlertSmall' + orientation + '">';
                    html += '   <button id="guardcatManager" onclick="guardcat.userInterface.openPanel();">';
                    html += '       ' + guardcat.lang.alertSmall;
                    html += '       <span id="guardcatDot">';
                    html += '           <span id="guardcatDotGreen"></span>';
                    html += '           <span id="guardcatDotYellow"></span>';
                    html += '           <span id="guardcatDotRed"></span>';
                    html += '       </span>';
                    if (guardcat.parameters.cookieslist === true) {
                        html += '   </button><!-- @whitespace';
                        html += '   --><button id="guardcatCookiesNumber" onclick="guardcat.userInterface.toggleCookiesList();">0</button>';
                        html += '   <div id="guardcatCookiesListContainer">';
                        html += '       <button id="guardcatClosePanelCookie" onclick="guardcat.userInterface.closePanel();">';
                        html += '           ' + guardcat.lang.close;
                        html += '        &#10005</button>';
                        html += '       <div class="guardcatCookiesListMain" id="guardcatCookiesTitle">';
                        html += '            <span class="guardcatH2" role="heading" aria-level="h2" id="guardcatCookiesNumberBis">0 cookie</span>';
                        html += '       </div>';
                        html += '       <div id="guardcatCookiesList"></div>';
                        html += '    </div>';
                    } else {
                        html += '   </div>';
                    }
                    html += '</div>';
                }

                guardcat.addScript(guardcat.cdn + 'advertising.js?v=' + guardcat.version, '', function () {
                    if (guardcatNoAdBlocker === true || guardcat.parameters.adblocker === false) {

                        // create a wrapper container at the same level than guardcat so we can add an aria-hidden when guardcat is opened
                        /*var wrapper = document.createElement('div');
                        wrapper.id = "contentWrapper";

                        while (document.body.firstChild)
                        {
                            wrapper.appendChild(document.body.firstChild);
                        }

                        // Append the wrapper to the body
                        document.body.appendChild(wrapper);*/

                        div.id = 'guardcatRoot';
                        body.appendChild(div, body);
                        div.innerHTML = html;

                        if (guardcat.job !== undefined) {
                            guardcat.job = guardcat.cleanArray(guardcat.job);
                            for (index = 0; index < guardcat.job.length; index += 1) {
                                guardcat.addService(guardcat.job[index]);
                            }
                        } else {
                            guardcat.job = []
                        }

                        guardcat.isAjax = true;

                        guardcat.job.push = function (id) {

                            // ie <9 hack
                            if (typeof guardcat.job.indexOf === 'undefined') {
                                guardcat.job.indexOf = function (obj, start) {
                                    var i,
                                        j = this.length;
                                    for (i = (start || 0); i < j; i += 1) {
                                        if (this[i] === obj) { return i; }
                                    }
                                    return -1;
                                };
                            }

                            if (guardcat.job.indexOf(id) === -1) {
                                Array.prototype.push.call(this, id);
                            }
                            guardcat.launch[id] = false;
                            guardcat.addService(id);
                        };

                        if (document.location.hash === guardcat.hashtag && guardcat.hashtag !== '') {
                            guardcat.userInterface.openPanel();
                        }

                        guardcat.cookie.number();
                        setInterval(guardcat.cookie.number, 60000);
                    }
                }, guardcat.parameters.adblocker);

                if (guardcat.parameters.adblocker === true) {
                    setTimeout(function () {
                        if (guardcatNoAdBlocker === false) {
                            html = '<div id="guardcatAlertBig" class="guardcatAlertBig' + orientation + '" style="display:block" role="alert" aria-live="polite">';
                            html += '   <p id="guardcatDisclaimerAlert">';
                            html += '       ' + guardcat.lang.adblock + '<br/>';
                            html += '       <strong>' + guardcat.lang.adblock_call + '</strong>';
                            html += '   </p>';
                            html += '   <button id="guardcatPersonalize" onclick="location.reload();">';
                            html += '       ' + guardcat.lang.reload;
                            html += '   </button>';
                            html += '</div>';
                            html += '<div id="guardcatPremium"></div>';

                            // create wrapper container
                            /*var wrapper = document.createElement('div');
                            wrapper.id = "contentWrapper";

                            while (document.body.firstChild)
                            {
                                wrapper.appendChild(document.body.firstChild);
                            }

                            // Append the wrapper to the body
                            document.body.appendChild(wrapper);*/

                            div.id = 'guardcatRoot';
                            body.appendChild(div, body);
                            div.innerHTML = html;
                            guardcat.pro('!adblocker=true');
                        } else {
                            guardcat.pro('!adblocker=false');
                        }
                    }, 1500);
                }
            });
        });

        if(guardcat.events.load) {
            guardcat.events.load();
        }
    },
    "addService": function (serviceId) {
        "use strict";
        var html = '',
            s = guardcat.services,
            service = s[serviceId],
            cookie = guardcat.cookie.read(),
            hostname = document.location.hostname,
            hostRef = document.referrer.split('/')[2],
            isNavigating = (hostRef === hostname && window.location.href !== guardcat.parameters.privacyUrl) ? true : false,
            isAutostart = (!service.needConsent) ? true : false,
            isWaiting = (cookie.indexOf(service.key + '=wait') >= 0) ? true : false,
            isDenied = (cookie.indexOf(service.key + '=false') >= 0) ? true : false,
            isAllowed = (cookie.indexOf(service.key + '=true') >= 0) ? true : false,
            isResponded = (cookie.indexOf(service.key + '=false') >= 0 || cookie.indexOf(service.key + '=true') >= 0) ? true : false,
            isDNTRequested = (navigator.doNotTrack === "1" || navigator.doNotTrack === "yes" || navigator.msDoNotTrack === "1" || window.doNotTrack === "1") ? true : false;

        if (guardcat.added[service.key] !== true) {
            guardcat.added[service.key] = true;

            html += '<li id="' + service.key + 'Line" class="guardcatLine">';
            html += '   <div class="guardcatName">';
            html += '       <span class="guardcatH3" role="heading" aria-level="h3">' + service.name + '</span>';
            html += '       <span id="tacCL' + service.key + '" class="guardcatListCookies"></span><br/>';
            if (guardcat.parameters.moreInfoLink == true) {
                html += '       <a href="#' + service.key + '/" target="_blank" rel="noopener" title="'+ guardcat.lang.cookieDetail + ' ' + service.name + ' ' + guardcat.lang.ourSite + ' ' + guardcat.lang.newWindow +'">';
                html += '           ' + guardcat.lang.more;
                html += '       </a>';
                html += '        - ';
                html += '       <a href="' + service.uri + '" target="_blank" rel="noopener" title="' + service.name + ' ' + guardcat.lang.newWindow + '">';
                html += '           ' + guardcat.lang.source;
                html += '       </a>';
            }
            html += '   </div>';
            html += '   <div class="guardcatAsk">';
            html += '       <button id="' + service.key + 'Allowed" class="guardcatAllow" onclick="guardcat.userInterface.respond(this, true);">';
            html += '          ' + guardcat.lang.allow;
            html += '       </button> ';
            html += '       <button id="' + service.key  + 'Denied" class="guardcatDeny" onclick="guardcat.userInterface.respond(this, false);">';
            html += '         ' + guardcat.lang.deny;
            html += '       </button>';
            html += '   </div>';
            html += '</li>';

            guardcat.userInterface.css('guardcatServicesTitle_' + service.type, 'display', 'block');

            if (document.getElementById('guardcatServices_' + service.type) !== null) {
                document.getElementById('guardcatServices_' + service.type).innerHTML += html;
            }

            guardcat.userInterface.order(service.type);
        }

        // allow by default for non EU
        if (isResponded === false && guardcat.user.bypass === true) {
            isAllowed = true;
            guardcat.cookie.create(service.key, true);
        }

        if ((!isResponded && (isAutostart || (isNavigating && isWaiting)) && !guardcat.highPrivacy) || isAllowed) {
            if (!isAllowed) {
                guardcat.cookie.create(service.key, true);
            }
            if (guardcat.launch[service.key] !== true) {
                guardcat.launch[service.key] = true;
                service.js();
            }
            guardcat.state[service.key] = true;
            guardcat.userInterface.color(service.key, true);
        } else if (isDenied) {
            if (typeof service.fallback === 'function') {
                service.fallback();
            }
            guardcat.state[service.key] = false;
            guardcat.userInterface.color(service.key, false);
        } else if (!isResponded && isDNTRequested && guardcat.handleBrowserDNTRequest) {
            guardcat.cookie.create(service.key, 'false');
            if (typeof service.fallback === 'function') {
                service.fallback();
            }
            guardcat.state[service.key] = false;
            guardcat.userInterface.color(service.key, false);
        } else if (!isResponded) {
            guardcat.cookie.create(service.key, 'wait');
            if (typeof service.fallback === 'function') {
                service.fallback();
            }
            guardcat.userInterface.color(service.key, 'wait');
            guardcat.userInterface.openAlert();
        }

        guardcat.cookie.checkCount(service.key);
    },
    "cleanArray": function cleanArray(arr) {
        "use strict";
        var i,
            len = arr.length,
            out = [],
            obj = {},
            s = guardcat.services;

        for (i = 0; i < len; i += 1) {
            if (!obj[arr[i]]) {
                obj[arr[i]] = {};
                if (guardcat.services[arr[i]] !== undefined) {
                    out.push(arr[i]);
                }
            }
        }

        out = out.sort(function (a, b) {
            if (s[a].type + s[a].key > s[b].type + s[b].key) { return 1; }
            if (s[a].type + s[a].key < s[b].type + s[b].key) { return -1; }
            return 0;
        });

        return out;
    },
    "userInterface": {
        "css": function (id, property, value) {
            "use strict";
            if (document.getElementById(id) !== null) {
                document.getElementById(id).style[property] = value;
            }
        },
        "respondAll": function (status) {
            "use strict";
            var s = guardcat.services,
                service,
                key,
                index = 0;

            for (index = 0; index < guardcat.job.length; index += 1) {
                service = s[guardcat.job[index]];
                key = service.key;
                if (guardcat.state[key] !== status) {
                    if (status === false && guardcat.launch[key] === true) {
                        guardcat.reloadThePage = true;
                    }
                    if (guardcat.launch[key] !== true && status === true) {
                        guardcat.launch[key] = true;
                        guardcat.services[key].js();
                    }
                    guardcat.state[key] = status;
                    guardcat.cookie.create(key, status);
                    guardcat.userInterface.color(key, status);
                }
            }
        },
        "respond": function (el, status) {
            "use strict";
            var key = el.id.replace(new RegExp("(Eng[0-9]+|Allow|Deni)ed", "g"), '');

            // return if same state
            if (guardcat.state[key] === status) {
                return;
            }

            if (status === false && guardcat.launch[key] === true) {
                guardcat.reloadThePage = true;
            }

            // if not already launched... launch the service
            if (status === true) {
                if (guardcat.launch[key] !== true) {
                    guardcat.launch[key] = true;
                    guardcat.services[key].js();
                }
            }
            guardcat.state[key] = status;
            guardcat.cookie.create(key, status);
            guardcat.userInterface.color(key, status);
        },
        "color": function (key, status) {
            "use strict";
            var gray = '#808080',
                greenDark = '#31d7ad',
                greenLight = '#31d7ad',
                redDark = '#ff3c00',
                redLight = '#ff3c00',
                yellowDark = '#FBDA26',
                c = 'guardcat',
                nbDenied = 0,
                nbPending = 0,
                nbAllowed = 0,
                sum = guardcat.job.length,
                index;

            if (status === true) {
                guardcat.userInterface.css(key + 'Line', 'borderLeft', '7px solid ' + greenDark);
                guardcat.userInterface.css(key + 'Allowed', 'backgroundColor', greenDark);
                guardcat.userInterface.css(key + 'Denied', 'backgroundColor', gray);

                document.getElementById(key + 'Line').classList.add('guardcatIsAllowed');
                document.getElementById(key + 'Line').classList.remove('guardcatIsDenied');
            } else if (status === false) {
                guardcat.userInterface.css(key + 'Line', 'borderLeft', '7px solid ' + redDark);
                guardcat.userInterface.css(key + 'Allowed', 'backgroundColor', gray);
                guardcat.userInterface.css(key + 'Denied', 'backgroundColor', redDark);

                document.getElementById(key + 'Line').classList.remove('guardcatIsAllowed');
                document.getElementById(key + 'Line').classList.add('guardcatIsDenied');
            }

            // check if all services are allowed
            for (index = 0; index < sum; index += 1) {
                if (guardcat.state[guardcat.job[index]] === false) {
                    nbDenied += 1;
                } else if (guardcat.state[guardcat.job[index]] === undefined) {
                    nbPending += 1;
                } else if (guardcat.state[guardcat.job[index]] === true) {
                    nbAllowed += 1;
                }
            }

            guardcat.userInterface.css(c + 'DotGreen', 'width', ((100 / sum) * nbAllowed) + '%');
            guardcat.userInterface.css(c + 'DotYellow', 'width', ((100 / sum) * nbPending) + '%');
            guardcat.userInterface.css(c + 'DotRed', 'width', ((100 / sum) * nbDenied) + '%');

            if (nbDenied === 0 && nbPending === 0) {
                guardcat.userInterface.css(c + 'AllAllowed', 'backgroundColor', greenDark);
                guardcat.userInterface.css(c + 'AllDenied', 'opacity', '0.4');
                guardcat.userInterface.css(c + 'AllAllowed', 'opacity', '1');
            } else if (nbAllowed === 0 && nbPending === 0) {
                guardcat.userInterface.css(c + 'AllAllowed', 'opacity', '0.4');
                guardcat.userInterface.css(c + 'AllDenied', 'opacity', '1');
                guardcat.userInterface.css(c + 'AllDenied', 'backgroundColor', redDark);
            } else {
                guardcat.userInterface.css(c + 'AllAllowed', 'opacity', '0.4');
                guardcat.userInterface.css(c + 'AllDenied', 'opacity', '0.4');
            }

            // close the alert if all service have been reviewed
            if (nbPending === 0) {
                guardcat.userInterface.closeAlert();
            }

            if (guardcat.services[key].cookies.length > 0 && status === false) {
                guardcat.cookie.purge(guardcat.services[key].cookies);
            }

            if (status === true) {
                if (document.getElementById('tacCL' + key) !== null) {
                    document.getElementById('tacCL' + key).innerHTML = '...';
                }
                setTimeout(function () {
                    guardcat.cookie.checkCount(key);
                }, 2500);
            } else {
                guardcat.cookie.checkCount(key);
            }
        },
        "openPanel": function () {
            "use strict";

            guardcat.userInterface.css('guardcat', 'display', 'block');
            guardcat.userInterface.css('guardcatBack', 'display', 'block');
            guardcat.userInterface.css('guardcatCookiesListContainer', 'display', 'none');

            document.getElementById('guardcatClosePanel').focus();
            //document.getElementById('contentWrapper').setAttribute("aria-hidden", "true");
            document.getElementsByTagName('body')[0].classList.add('modal-open');
            guardcat.userInterface.focusTrap();
            guardcat.userInterface.jsSizing('main');
        },
        "closePanel": function () {
            "use strict";

            if (document.location.hash === guardcat.hashtag) {
                document.location.hash = '';
            }
            guardcat.userInterface.css('guardcat', 'display', 'none');
            guardcat.userInterface.css('guardcatCookiesListContainer', 'display', 'none');

            guardcat.fallback(['guardcatInfoBox'], function (elem) {
                elem.style.display = 'none';
            }, true);

            if (guardcat.reloadThePage === true) {
                window.location.reload();
            } else {
                guardcat.userInterface.css('guardcatBack', 'display', 'none');
            }
            if (document.getElementById('guardcatCloseAlert') !== null) {
                document.getElementById('guardcatCloseAlert').focus();
            }
            //document.getElementById('contentWrapper').setAttribute("aria-hidden", "false");
            document.getElementsByTagName('body')[0].classList.remove('modal-open');

        },
        "focusTrap": function() {
            "use strict";

            var focusableEls,
                firstFocusableEl,
                lastFocusableEl,
                filtered;

            focusableEls = document.getElementById('guardcat').querySelectorAll('a[href], button');
            filtered = [];

            // get only visible items
            for (var i = 0, max = focusableEls.length; i < max; i++) {
                if (focusableEls[i].offsetHeight > 0) {
                   filtered.push(focusableEls[i]);
                }
            }

            firstFocusableEl = filtered[0];
            lastFocusableEl = filtered[filtered.length - 1];

            //loop focus inside guardcat
            document.getElementById('guardcat').addEventListener("keydown", function (evt) {

                if ( evt.key === 'Tab' || evt.keyCode === 9 ) {

                    if ( evt.shiftKey ) /* shift + tab */ {
                        if (document.activeElement === firstFocusableEl) {
                            lastFocusableEl.focus();
                            evt.preventDefault();
                        }
                    } else /* tab */ {
                        if (document.activeElement === lastFocusableEl) {
                            firstFocusableEl.focus();
                            evt.preventDefault();
                        }
                    }
                }
            })
        },
        "openAlert": function () {
            "use strict";
            var c = 'guardcat';
            guardcat.userInterface.css(c + 'Percentage', 'display', 'block');
            guardcat.userInterface.css(c + 'AlertSmall', 'display', 'none');
            guardcat.userInterface.css(c + 'AlertBig',   'display', 'block');
        },
        "closeAlert": function () {
            "use strict";
            var c = 'guardcat';
            guardcat.userInterface.css(c + 'Percentage', 'display', 'none');
            guardcat.userInterface.css(c + 'AlertSmall', 'display', 'block');
            guardcat.userInterface.css(c + 'AlertBig',   'display', 'none');
            guardcat.userInterface.jsSizing('box');
        },
        "toggleCookiesList": function () {
            "use strict";
            var div = document.getElementById('guardcatCookiesListContainer');

            if (div === null) {
                return;
            }

            if (div.style.display !== 'block') {
                guardcat.cookie.number();
                div.style.display = 'block';
                guardcat.userInterface.jsSizing('cookie');
                guardcat.userInterface.css('guardcat', 'display', 'none');
                guardcat.userInterface.css('guardcatBack', 'display', 'block');
                guardcat.fallback(['guardcatInfoBox'], function (elem) {
                    elem.style.display = 'none';
                }, true);
            } else {
                div.style.display = 'none';
                guardcat.userInterface.css('guardcat', 'display', 'none');
                guardcat.userInterface.css('guardcatBack', 'display', 'none');
            }
        },
        "toggle": function (id, closeClass) {
            "use strict";
            var div = document.getElementById(id);

            if (div === null) {
                return;
            }

            if (closeClass !== undefined) {
                guardcat.fallback([closeClass], function (elem) {
                    if (elem.id !== id) {
                        elem.style.display = 'none';
                    }
                }, true);
            }

            if (div.style.display !== 'block') {
                div.style.display = 'block';
            } else {
                div.style.display = 'none';
            }
        },
        "order": function (id) {
            "use strict";
            var main = document.getElementById('guardcatServices_' + id),
                allDivs,
                store = [],
                i;

            if (main === null) {
                return;
            }

            allDivs = main.childNodes;

            if (typeof Array.prototype.map === 'function') {
                Array.prototype.map.call(main.children, Object).sort(function (a, b) {
                //var mainChildren = Array.from(main.children);
                //mainChildren.sort(function (a, b) {
                    if (guardcat.services[a.id.replace(/Line/g, '')].name > guardcat.services[b.id.replace(/Line/g, '')].name) { return 1; }
                    if (guardcat.services[a.id.replace(/Line/g, '')].name < guardcat.services[b.id.replace(/Line/g, '')].name) { return -1; }
                    return 0;
                }).forEach(function (element) {
                    main.appendChild(element);
                });
            }
        },
        "jsSizing": function (type) {
            "use strict";
            var scrollbarMarginRight = 10,
                scrollbarWidthParent,
                scrollbarWidthChild,
                servicesHeight,
                e = window,
                a = 'inner',
                windowInnerHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
                mainTop,
                mainHeight,
                closeButtonHeight,
                headerHeight,
                cookiesListHeight,
                cookiesCloseHeight,
                cookiesTitleHeight,
                paddingBox,
                alertSmallHeight,
                cookiesNumberHeight;

            if (type === 'box') {
                if (document.getElementById('guardcatAlertSmall') !== null && document.getElementById('guardcatCookiesNumber') !== null) {

                    // reset
                    guardcat.userInterface.css('guardcatCookiesNumber', 'padding', '0px 10px');

                    // calculate
                    alertSmallHeight = document.getElementById('guardcatAlertSmall').offsetHeight;
                    cookiesNumberHeight = document.getElementById('guardcatCookiesNumber').offsetHeight;
                    paddingBox = (alertSmallHeight - cookiesNumberHeight) / 2;

                    // apply
                    guardcat.userInterface.css('guardcatCookiesNumber', 'padding', paddingBox + 'px 10px');
                }
            } else if (type === 'main') {

                // get the real window width for media query
                if (window.innerWidth === undefined) {
                    a = 'client';
                    e = document.documentElement || document.body;
                }

                // height of the services list container
                if (document.getElementById('guardcat') !== null && document.getElementById('guardcatClosePanel') !== null && document.getElementById('guardcatMainLineOffset') !== null) {

                    // reset
                    guardcat.userInterface.css('guardcatServices', 'height', 'auto');

                    // calculate
                    mainHeight = document.getElementById('guardcat').offsetHeight;
                    closeButtonHeight = document.getElementById('guardcatClosePanel').offsetHeight;

                    // apply
                    servicesHeight = (mainHeight - closeButtonHeight + 2);
                    guardcat.userInterface.css('guardcatServices', 'height', servicesHeight + 'px');
                guardcat.userInterface.css('guardcatServices', 'overflow-x', 'auto');
                }

                // align the main allow/deny button depending on scrollbar width
                if (document.getElementById('guardcatServices') !== null && document.getElementById('guardcatScrollbarChild') !== null) {

                    // media query
                    if (e[a + 'Width'] <= 479) {
                        guardcat.userInterface.css('guardcatScrollbarAdjust', 'marginLeft', '11px');
                    } else if (e[a + 'Width'] <= 767) {
                        scrollbarMarginRight = 12;
                    }

                    scrollbarWidthParent = document.getElementById('guardcatServices').offsetWidth;
                    scrollbarWidthChild = document.getElementById('guardcatScrollbarChild').offsetWidth;
                    guardcat.userInterface.css('guardcatScrollbarAdjust', 'marginRight', ((scrollbarWidthParent - scrollbarWidthChild) + scrollbarMarginRight) + 'px');
                }

                // center the main panel
                if (document.getElementById('guardcat') !== null) {

                    // media query
                    if (e[a + 'Width'] <= 767) {
                        mainTop = 0;
                    } else {
                        mainTop = ((windowInnerHeight - document.getElementById('guardcat').offsetHeight) / 2) - 21;
                    }

                    // correct
                    if (mainTop < 0) {
                        mainTop = 0;
                    }

                    if (document.getElementById('guardcatMainLineOffset') !== null) {
                        if (document.getElementById('guardcat').offsetHeight < (windowInnerHeight / 2)) {
                            mainTop -= document.getElementById('guardcatMainLineOffset').offsetHeight;
                        }
                    }

                    // apply
                    guardcat.userInterface.css('guardcat', 'top', mainTop + 'px');
                }


            } else if (type === 'cookie') {

                // put cookies list at bottom
                if (document.getElementById('guardcatAlertSmall') !== null) {
                    guardcat.userInterface.css('guardcatCookiesListContainer', 'bottom', (document.getElementById('guardcatAlertSmall').offsetHeight) + 'px');
                }

                // height of cookies list
                if (document.getElementById('guardcatCookiesListContainer') !== null) {

                    // reset
                    guardcat.userInterface.css('guardcatCookiesList', 'height', 'auto');

                    // calculate
                    cookiesListHeight = document.getElementById('guardcatCookiesListContainer').offsetHeight;
                    cookiesCloseHeight = document.getElementById('guardcatClosePanelCookie').offsetHeight;
                    cookiesTitleHeight = document.getElementById('guardcatCookiesTitle').offsetHeight;

                    // apply
                    guardcat.userInterface.css('guardcatCookiesList', 'height', (cookiesListHeight - cookiesCloseHeight - cookiesTitleHeight - 2) + 'px');
                }
            }
        }
    },
    "cookie": {
        "owner": {},
        "create": function (key, status) {
            "use strict";

            if (guardcatForceExpire !== '') {
                // The number of day cann't be higher than 1 year
                timeExipre = (guardcatForceExpire > 365) ? 31536000000 : guardcatForceExpire * 86400000; // Multiplication to tranform the number of days to milliseconds
            }

            var d = new Date(),
                time = d.getTime(),
                expireTime = time + timeExipre, // 365 days
                regex = new RegExp("!" + key + "=(wait|true|false)", "g"),
                cookie = guardcat.cookie.read().replace(regex, ""),
                value = guardcat.parameters.cookieName + '=' + cookie + '!' + key + '=' + status,
                domain = (guardcat.parameters.cookieDomain !== undefined && guardcat.parameters.cookieDomain !== '') ? 'domain=' + guardcat.parameters.cookieDomain + ';' : '';

          if (guardcat.cookie.read().indexOf(key + '=' + status) === -1) {
                guardcat.pro('!' + key + '=' + status);
            }

            d.setTime(expireTime);
            document.cookie = value + '; expires=' + d.toGMTString() + '; path=/;' + domain;
        },
        "read": function () {
            "use strict";
            var nameEQ = guardcat.parameters.cookieName + "=",
                ca = document.cookie.split(';'),
                i,
                c;

            for (i = 0; i < ca.length; i += 1) {
                c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(nameEQ) === 0) {
                    return c.substring(nameEQ.length, c.length);
                }
            }
            return '';
        },
        "purge": function (arr) {
            "use strict";
            var i;

            for (i = 0; i < arr.length; i += 1) {
                document.cookie = arr[i] + '=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/;';
                document.cookie = arr[i] + '=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/; domain=.' + location.hostname + ';';
                document.cookie = arr[i] + '=; expires=Thu, 01 Jan 2000 00:00:00 GMT; path=/; domain=.' + location.hostname.split('.').slice(-2).join('.') + ';';
            }
        },
        "checkCount": function (key) {
            "use strict";
            var arr = guardcat.services[key].cookies,
                nb = arr.length,
                nbCurrent = 0,
                html = '',
                i,
                status = document.cookie.indexOf(key + '=true');

            if (status >= 0 && nb === 0) {
                html += guardcat.lang.useNoCookie;
            } else if (status >= 0) {
                for (i = 0; i < nb; i += 1) {
                    if (document.cookie.indexOf(arr[i] + '=') !== -1) {
                        nbCurrent += 1;
                        if (guardcat.cookie.owner[arr[i]] === undefined) {
                            guardcat.cookie.owner[arr[i]] = [];
                        }
                        if (guardcat.cookie.crossIndexOf(guardcat.cookie.owner[arr[i]], guardcat.services[key].name) === false) {
                            guardcat.cookie.owner[arr[i]].push(guardcat.services[key].name);
                        }
                    }
                }

                if (nbCurrent > 0) {
                    html += guardcat.lang.useCookieCurrent + ' ' + nbCurrent + ' cookie';
                    if (nbCurrent > 1) {
                        html += 's';
                    }
                    html += '.';
                } else {
                    html += guardcat.lang.useNoCookie;
                }
            } else if (nb === 0) {
                html = guardcat.lang.noCookie;
            } else {
                html += guardcat.lang.useCookie + ' ' + nb + ' cookie';
                if (nb > 1) {
                    html += 's';
                }
                html += '.';
            }

            if (document.getElementById('tacCL' + key) !== null) {
                document.getElementById('tacCL' + key).innerHTML = html;
            }
        },
        "crossIndexOf": function (arr, match) {
            "use strict";
            var i;
            for (i = 0; i < arr.length; i += 1) {
                if (arr[i] === match) {
                    return true;
                }
            }
            return false;
        },
        "number": function () {
            "use strict";
            var cookies = document.cookie.split(';'),
                nb = (document.cookie !== '') ? cookies.length : 0,
                html = '',
                i,
                name,
                namea,
                nameb,
                c,
                d,
                s = (nb > 1) ? 's' : '',
                savedname,
                regex = /^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i,
                regexedDomain = (guardcat.cdn.match(regex) !== null) ? guardcat.cdn.match(regex)[1] : guardcat.cdn,
                host = (guardcat.domain !== undefined) ? guardcat.domain : regexedDomain;

            cookies = cookies.sort(function (a, b) {
                namea = a.split('=', 1).toString().replace(/ /g, '');
                nameb = b.split('=', 1).toString().replace(/ /g, '');
                c = (guardcat.cookie.owner[namea] !== undefined) ? guardcat.cookie.owner[namea] : '0';
                d = (guardcat.cookie.owner[nameb] !== undefined) ? guardcat.cookie.owner[nameb] : '0';
                if (c + a > d + b) { return 1; }
                if (c + a < d + b) { return -1; }
                return 0;
            });

            if (document.cookie !== '') {
                for (i = 0; i < nb; i += 1) {
                    name = cookies[i].split('=', 1).toString().replace(/ /g, '');
                    if (guardcat.cookie.owner[name] !== undefined && guardcat.cookie.owner[name].join(' // ') !== savedname) {
                        savedname = guardcat.cookie.owner[name].join(' // ');
                        html += '<div class="guardcatHidden">';
                        html += '     <span class="guardcatTitle guardcatH3" role="heading" aria-level="h3">';
                        html += '        ' + guardcat.cookie.owner[name].join(' // ');
                        html += '    </span>';
                        html += '</div><ul class="cookie-list">';
                    } else if (guardcat.cookie.owner[name] === undefined && host !== savedname) {
                        savedname = host;
                        html += '<div class="guardcatHidden">';
                        html += '     <span class="guardcatTitle guardcatH3" role="heading" aria-level="h3">';
                        html += '        ' + host;
                        html += '    </span>';
                        html += '</div><ul class="cookie-list">';
                    }
                    html += '<li class="guardcatCookiesListMain">';
                    html += '    <div class="guardcatCookiesListLeft"><button onclick="guardcat.cookie.purge([\'' + cookies[i].split('=', 1) + '\']);guardcat.cookie.number();guardcat.userInterface.jsSizing(\'cookie\');return false"><strong>&times;</strong></button> <strong>' + name + '</strong>';
                    html += '    </div>';
                    html += '    <div class="guardcatCookiesListRight">' + cookies[i].split('=').slice(1).join('=') + '</div>';
                    html += '</li>';
                }
                html += '</ul>';
            } else {
                html += '<div class="guardcatCookiesListMain">';
                html += '    <div class="guardcatCookiesListLeft"><strong>-</strong></div>';
                html += '    <div class="guardcatCookiesListRight"></div>';
                html += '</div>';
            }

            html += '<div class="guardcatHidden" style="height:20px;display:block"></div>';

            if (document.getElementById('guardcatCookiesList') !== null) {
                document.getElementById('guardcatCookiesList').innerHTML = html;
            }

            if (document.getElementById('guardcatCookiesNumber') !== null) {
                document.getElementById('guardcatCookiesNumber').innerHTML = nb;
            }

            if (document.getElementById('guardcatCookiesNumberBis') !== null) {
                document.getElementById('guardcatCookiesNumberBis').innerHTML = nb + ' cookie' + s;
            }

            for (i = 0; i < guardcat.job.length; i += 1) {
                guardcat.cookie.checkCount(guardcat.job[i]);
            }
        }
    },
    "getLanguage": function () {
        "use strict";
        if (!navigator) { return 'en'; }

        var availableLanguages = 'cs,en,fr,es,it,de,nl,pt,pl,ru,el',
            defaultLanguage = 'en',
            lang = navigator.language || navigator.browserLanguage ||
                navigator.systemLanguage || navigator.userLang || null,
            userLanguage = lang.substr(0, 2);

        if (guardcatForceLanguage !== '') {
            if (availableLanguages.indexOf(guardcatForceLanguage) !== -1) {
                return guardcatForceLanguage;
            }
        }

        if (availableLanguages.indexOf(userLanguage) === -1) {
            return defaultLanguage;
        }
        return userLanguage;
    },
    "getLocale": function () {
        "use strict";
        if (!navigator) { return 'en_US'; }

        var lang = navigator.language || navigator.browserLanguage ||
                navigator.systemLanguage || navigator.userLang || null,
            userLanguage = lang.substr(0, 2);

        if (userLanguage === 'fr') {
            return 'fr_FR';
        } else if (userLanguage === 'en') {
            return 'en_US';
        } else if (userLanguage === 'de') {
            return 'de_DE';
        } else if (userLanguage === 'es') {
            return 'es_ES';
        } else if (userLanguage === 'it') {
            return 'it_IT';
        } else if (userLanguage === 'pt') {
            return 'pt_PT';
        } else if (userLanguage === 'nl') {
            return 'nl_NL';
        } else if (userLanguage === 'el') {
            return 'el_EL';
        } else {
            return 'en_US';
        }
    },
    "addScript": function (url, id, callback, execute, attrName, attrVal) {
        "use strict";
        var script,
            done = false;

        if (execute === false) {
            if (typeof callback === 'function') {
                callback();
            }
        } else {
            script = document.createElement('script');
            script.type = 'text/javascript';
            script.id = (id !== undefined) ? id : '';
            script.async = true;
            script.src = url;

            if (attrName !== undefined && attrVal !== undefined) {
                script.setAttribute(attrName, attrVal);
            }

            if (typeof callback === 'function') {
                script.onreadystatechange = script.onload = function () {
                    var state = script.readyState;
                    if (!done && (!state || /loaded|complete/.test(state))) {
                        done = true;
                        callback();
                    }
                };
            }

            document.getElementsByTagName('head')[0].appendChild(script);
        }
    },
    "makeAsync": {
        "antiGhost": 0,
        "buffer": '',
        "init": function (url, id) {
            "use strict";
            var savedWrite = document.write,
                savedWriteln = document.writeln;

            document.write = function (content) {
                guardcat.makeAsync.buffer += content;
            };
            document.writeln = function (content) {
                guardcat.makeAsync.buffer += content.concat("\n");
            };

            setTimeout(function () {
                document.write = savedWrite;
                document.writeln = savedWriteln;
            }, 20000);

            guardcat.makeAsync.getAndParse(url, id);
        },
        "getAndParse": function (url, id) {
            "use strict";
            if (guardcat.makeAsync.antiGhost > 9) {
                guardcat.makeAsync.antiGhost = 0;
                return;
            }
            guardcat.makeAsync.antiGhost += 1;
            guardcat.addScript(url, '', function () {
                if (document.getElementById(id) !== null) {
                    document.getElementById(id).innerHTML += "<span style='display:none'>&nbsp;</span>" + guardcat.makeAsync.buffer;
                    guardcat.makeAsync.buffer = '';
                    guardcat.makeAsync.execJS(id);
                }
            });
        },
        "execJS": function (id) {
            /* not strict because third party scripts may have errors */
            var i,
                scripts,
                childId,
                type;

            if (document.getElementById(id) === null) {
                return;
            }

            scripts = document.getElementById(id).getElementsByTagName('script');
            for (i = 0; i < scripts.length; i += 1) {
                type = (scripts[i].getAttribute('type') !== null) ? scripts[i].getAttribute('type') : '';
                if (type === '') {
                    type = (scripts[i].getAttribute('language') !== null) ? scripts[i].getAttribute('language') : '';
                }
                if (scripts[i].getAttribute('src') !== null && scripts[i].getAttribute('src') !== '') {
                    childId = id + Math.floor(Math.random() * 99999999999);
                    document.getElementById(id).innerHTML += '<div id="' + childId + '"></div>';
                    guardcat.makeAsync.getAndParse(scripts[i].getAttribute('src'), childId);
                } else if (type.indexOf('javascript') !== -1 || type === '') {
                    eval(scripts[i].innerHTML);
                }
            }
        }
    },
    "fallback": function (matchClass, content, noInner) {
        "use strict";
        var elems = document.getElementsByTagName('*'),
            i,
            index = 0;

        for (i in elems) {
            if (elems[i] !== undefined) {
                for (index = 0; index < matchClass.length; index += 1) {
                    if ((' ' + elems[i].className + ' ')
                            .indexOf(' ' + matchClass[index] + ' ') > -1) {
                        if (typeof content === 'function') {
                            if (noInner === true) {
                                content(elems[i]);
                            } else {
                                elems[i].innerHTML = content(elems[i]);
                            }
                        } else {
                            elems[i].innerHTML = content;
                        }
                    }
                }
            }
        }
    },
    "engage": function (id) {
        "use strict";
        var html = '',
            r = Math.floor(Math.random() * 100000),
            engage = guardcat.services[id].name + ' ' + guardcat.lang.fallback;

        if (guardcat.lang['engage-' + id] !== undefined) {
            engage = guardcat.lang['engage-' + id];
        }

        html += '<div class="tac_activate">';
        html += '   <div class="tac_float">';
        html += '      ' + engage;
        html += '      <button class="guardcatAllow" id="Eng' + r + 'ed' + id + '" onclick="guardcat.userInterface.respond(this, true);">';
        html += '          &#10003; ' + guardcat.lang.allow;
        html += '       </button>';
        html += '   </div>';
        html += '</div>';

        return html;
    },
    "extend": function (a, b) {
        "use strict";
        var prop;
        for (prop in b) {
            if (b.hasOwnProperty(prop)) {
                a[prop] = b[prop];
            }
        }
    },
    "proTemp": '',
    "proTimer": function () {
        "use strict";
        setTimeout(guardcat.proPing, 1000);
    },
    "pro": function (list) {
        "use strict";
        guardcat.proTemp += list;
        clearTimeout(guardcat.proTimer);
        guardcat.proTimer = setTimeout(guardcat.proPing, 2500);
    },
    "proPing": function () {
        "use strict";
        if (guardcat.uuid !== '' && guardcat.uuid !== undefined && guardcat.proTemp !== '') {
            var div = document.getElementById('guardcatPremium'),
                timestamp = new Date().getTime(),
                url = '//opt-out.ferank.eu/premium.php?';

            if (div === null) {
                return;
            }

            url += 'domain=' + guardcat.domain + '&';
            url += 'uuid=' + guardcat.uuid + '&';
            url += 'c=' + encodeURIComponent(guardcat.proTemp) + '&';
            url += '_' + timestamp;

            div.innerHTML = '<img src="' + url + '" style="display:none" />';

            guardcat.proTemp = '';
        }

        guardcat.cookie.number();
    },
    "AddOrUpdate" : function(source, custom){
        /**
         Utility function to Add or update the fields of obj1 with the ones in obj2
         */
        for(key in custom){
            if(custom[key] instanceof Object){
                source[key] = guardcat.AddOrUpdate(source[key], custom[key]);
            }else{
                source[key] = custom[key];
            }
        }
        return source;
    },
    "getElemWidth": function(elem) {
        return elem.getAttribute('width') || elem.clientWidth;
    },
    "getElemHeight": function(elem) {
        return elem.getAttribute('height') || elem.clientHeight;
    }
};
