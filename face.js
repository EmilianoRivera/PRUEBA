/*
function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}
function statusChangeCallback(response) { 
    console.log('statusChangeCallback');
    console.log(response);                   
    if (response.status === 'connected') {   
        var accessToken = response.authResponse.accessToken;
        var userId = response.authResponse.userID;

        FB.api('/' + userId + '/accounts', 'GET', { access_token: accessToken }, function (response) {
            if (response && !response.error) {
                console.log(response);

                for (var i = 0; i < response.data.length; i++) {
                    var page = response.data[i];
                    console.log('ID de la página: ' + page.id);
                    console.log('Nombre de la página: ' + page.name);
                }
            }
        });
        console.log(accessToken)
        console.log(userId)

        testAPI();
    } else {                                
        document.getElementById('status').innerHTML = 'Please log ' +
            'into this webpage.';
    }
}
window.fbAsyncInit = function () {
    FB.init({
        appId: '1853633641760357',
        cookie: true,                     
        xfbml: true,                   
        version: 'v18.0'          
    });

    // USAR METODO POST Y API TOKEN, PARAMETROS: TITLE, CONTENT 
    FB.getLoginStatus(function (response) {   
        statusChangeCallback(response);       
    });
checkLoginState();
};

function testAPI() {                     
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function (response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
    });
}*/