exports.handler = function( event, context ) {

    var http = require( 'http' );

    var url = 'https://steamgaug.es/api/v2';

    http.get( url, function( response ) {

        var data = '';

        response.on( 'data', function( x ) { data += x; } );

        response.on( 'end', function() {

            var json = JSON.parse( data );
            
            var text = 'Steam is Currently ';
            var offline = (json.IsSteamClient.online);
            
            if (offline < 1)
            {
                text=+offline+" Offline"; 
            }
                
                else {
                   text=+" Online"; 
                }
              output( text, context );        
            
//            if (json.ISteamClient.online > 1) 
//            {
//                var text = 'Steam is Currently Online ';
//               output( text, context );
//            }

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
