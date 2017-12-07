exports.handler = function( event, context ) {

    var http = require( 'https' );

    var url = 'https://steamgaug.es/api/v2';

    http.get( url, function( response ) {

        var data = '';

        response.on( 'data', function( x ) { data += x; } );

        response.on( 'end', function() {

            var json = JSON.parse( data );
            var status = (json.ISteamClient.online);
            var text = 'Steam is Currently ';
//            text+=status+" Online ";
        if (status > 0){
            text+=" Online ";
            output( text, context );
        } 
        else{
            text+=" Offline";
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
