// IIFE - Immediately Invoked Function Expression
(function(yourcode) {

    // The global jQuery object is passed as a parameter
    yourcode(window.jQuery, window, document);

}(function($, window, document) {

    // The $ is now locally scoped
    // Listen for the jQuery ready event on the document
    $(function() {

        console.log('refeki');

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
         *  Use SDK to determine auth state of user
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

//MANUAL AJAX REQUESTS
var data;
var apiToken = "access_token=ARhxTBPSqSPWo-3GVgBqioHMiD5iFNMaM771mVJELRpiRYArXQAAAAA&scope=read_public%2Cwrite_public";
var api_request_url = "https://api.pinterest.com/v1/me/?" + apiToken + "fields=first_name%2Cid%2Clast_name%2Curl%2Cusernme";
function getUsername() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        data = JSON.parse(this.response);
    }
  };
  xhttp.open("GET", api_request_url, true);
  xhttp.send();
}

/*
 * PDK requests
 */
var pins = [];
PDK.request('/boards/polarsix/mandala-tapestry/pins/', function (response) { // Make sure to change the board_id
  if (!response || response.error) {
    alert('Error occurred');
  } else {
    pins = pins.concat(response.data);
    if (response.hasNext) {
      response.next(); // this will recursively go to this same callback
    }
  }
});

/*
 * Quickly get logged in user's information
 */
PDK.request('/v1/me/');


/*
 * Create a board
 */
var api_token = PDK.getSession().accessToken;
var api_post_boards_url_start = "https://api.pinterest.com/v1/boards/?access_token=" + api_token;
function create_board($board_name) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        data = JSON.parse(this.response);
    }
  };
  xhttp.open("POST", api_post_boards_url_start + '&name=' + $board_name, true);
  xhttp.send();
}
