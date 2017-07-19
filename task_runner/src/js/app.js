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

    // Const
    var PIN_APP   = '4912419253518348031',
          PIN_SCOPE = 'read_public, write_public',
          PIN_BTN   = document.getElementById('js-pin_btn');

    // Initialize once with app id
    PDK.init({
        appId: PIN_APP,
        cookie: true
    });

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
        }

    };

    PIN_BTN.addEventListener('click', Login.pinLogin());

}));


