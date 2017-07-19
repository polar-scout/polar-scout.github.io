// IIFE - Immediately Invoked Function Expression
(function(yourcode) {

    // The global jQuery object is passed as a parameter
    yourcode(window.jQuery, window, document);

}(function($, window, document) {

    // The $ is now locally scoped
    // Listen for the jQuery ready event on the document
    $(function() {

        console.log('muthafuka');

    });

    // The rest of code goes here!

    window.pAsyncInit = function() {
        PDK.init({
            appId: "4912419253518348031", // Change this
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

    var PIN_APP   = '4912419253518348031',
        PIN_SCOPE = 'read_public, write_public',
        PIN_BTN   = document.getElementById('js-pin_btn');

    // Initialize once with app id
    // PDK.init({
    //     appId: PIN_APP,
    //     cookie: true
    // });

    var Login = {

        /*
         *  Set auth state and redirect if necessary
         */
        resetState: function() {
            var state = {
                pinterest: Pinterest.loggedIn()
            };
        },

        /*
         *  Login using Instagram OAuth
         */
        pinLogin: function() {
            Pinterest.login(Login.resetState);
        },

        tittybats: function() {
            console.log('tittybats called!');
        },

        fake: function() {
            console.log('please log me in');
            Pinterest.bum_me(Login.tittybats);
        }

    }

    /*
     *  Wrapper for all Pinterest SDK actions
     */
    var Pinterest = {

        /*
         *  Use the SDK to login to Pinterest
         *  @param {Function} callback - function fired on completion
         */
        login: function(callback) {
            PDK.login({ scope : PIN_SCOPE }, callback);
        },

        /*
         *  Use DK to determine auth state of user
         *  @returns {Boolean}
         */
        loggedIn: function() {
            return !!PDK.getSession();
        },

        bum_me: function(callback) {
            console.log('turtles called!');
            callback();
        }

    };

    // PIN_BTN.addEventListener('click', function(){
    //     Login.fake();
    // })

     PIN_BTN.addEventListener('click', function(){
        Login.pinLogin();
    });

}));


