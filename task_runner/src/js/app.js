// IIFE - Immediately Invoked Function Expression
(function(yourcode) {

    // The global jQuery object is passed as a parameter
    yourcode(window.jQuery, window, document);

}(function($, window, document) {

    // The $ is now locally scoped
    // Listen for the jQuery ready event on the document
    $(function() {


        console.log('de');

        window.pAsyncInit = function() {
            PDK.init({
                appId: "<4912419253518348031>", // Change this
                cookie: true
            });
        };

        (function(d, s, id){
            var js, pjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//assets.pinterest.com/sdk/sdk.js";
            pjs.parentNode.insertBefore(js, pjs);
        }(document, 'script', 'pinterest-jssdk'));



    });

    // The rest of code goes here!

}));


