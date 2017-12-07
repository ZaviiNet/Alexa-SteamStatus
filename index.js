exports.handler = function( event, context ) {

    var http = require( 'https' );

    var url = 'https://steamgaug.es/api/v2'; //This picks up Data from API Provided by SteamGaug

    http.get( url, function( response ) {

        var data = '';

        response.on( 'data', function( x ) { data += x; } );

        response.on( 'end', function() {

            var json = JSON.parse( data );
            var status = (json.ISteamClient.online); //Gets Status If 0 then Offline if 1 Then Online
            var text = 'Steam is Currently ';
        if (status > 0){
            text+=" Online "; //If Number is greater than 1 then output that Steam is Online
            output( text, context );
        } 
        else{
            text+=" Offline"; //If Number less than or not 1 then output that Steam is Offline
            output( text, context );
        }


        } );

    } );

};

function output( text, context ) {

    var response = {
        outputSpeech: {
            type: "PlainText",
            text: text
        },
        card: {
            type: "Simple",
            title: "Check Steams Status",
            content: text
        },
        shouldEndSession: true
    };

    context.succeed( { response: response } );

}
