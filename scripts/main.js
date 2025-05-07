var current_intimacy_level = 0; /**current intimacy level of the user */


function feed_randomizer(){ /**displays a random feed of the current intimacy level */
    var feed_div = document.getElementById("camerafeed"); /**gets the div where the feed will be displayed */
    var feed_index = Math.floor(Math.random() * Object.keys(feed_dictionary).length); /**gets a random index from the feed dictionary */
    var feed_key = Object.keys(feed_dictionary[feed_index])[Math.floor(Math.random() * Object.keys(feed_dictionary[feed_index]).length)]; /**gets a random key from the feed dictionary */
    var feed_value = feed_dictionary[feed_index][feed_key]; /**gets the value of the random key from the feed dictionary */
    feed_div.innerHTML = "<iframe src='" + feed_value + "' width='100%' height='100%'></iframe>"; /**sets the inner HTML of the div to the iframe with the source of the random feed */
    display_question(feed_dictionary, feed_div, feed_index); /**displays a question related to the currently displayed feed to the user */

}


function display_question( /*displays a question related to the currently displayed feed to the user, for example if football field it would ask "have you ever been to a football field? then displays it if yes, if no shows a random different one in the same intimacy level"
     */
    feed_dictionary, /**the dictionary containing the feeds */
    feed_div, /**the div where the feed will be displayed */
    feed_index /**the index of the feed to be displayed */
) {
/** write related questions for each feed */
    
}

function acess_user_camera( /**accesses the user's camera */){
    navigator.mediaDevices.getUserMedia({ video: true, audio: false }) /**gets the user's camera feed */
        .then(function(stream) { /**if the camera feed is found */
            document.getElementById('video').srcObject = stream; /**sets the source of the video to the camera feed */
            document.getElementById('video').play(); /**plays the video */
        })
        .catch(function(err) { /**if the camera feed is not found */
            console.log("An error occurred: " + err); /**logs the error */
        });
}
function display_feed( /**displays the feed on the page within camerafeed div*/
   
) {
    
}


feed_dictionary = new Object()
var feed_dictionary = {
    0 : {
        "Exterior de Escola" : "http://134.124.120.76/view/viewer_index.shtml?id=13736",
        "Campo de Futebol" : "http://91.231.166.180:86/mjpg/video.mjpg",
        "Campo de Ténis" : "http://213.124.95.98:8082/mjpg/video.mjpg",
        "Lago" : "http://216.14.224.50/mjpg/video.mjpg",
    },
    1 : {
        "Hospital" : "http://203.181.0.118:6003/live/index.html?Language=0",
        "Auditório" : "http://70.90.194.90:8888/cgi-bin/faststream.jpg?stream=full&fps=25&rand=469098",
        "Loja" : "http://78.186.67.194:50001/transparent.gif",
        "Estacionamento Subterrâneo" : "http://89.97.231.70:8082/control/faststream.jpg?stream=full&fps=16&rand=764313",
        "Lobby de Hotel" : "http://71.249.87.61/control/faststream.jpg?stream=full&fps=16&rand=952274",
        "Entrada de Hotel" : "http://75.51.6.196:8080/control/faststream.jpg?stream=full&fps=16&rand=648524",
        "Sweatshop" : "http://96.84.21.221:8082/mjpg/video.mjpg",
        "Lavandaria" : "http://82.64.237.163:8083/mjpg/video.mjpg",
        "Ginásio" : "http://104.8.103.170/control/faststream.jpg?stream=full&fps=16&rand=387871",
    },
    2 : {
        "Interior de Elevador" : "http://72.43.190.171:83/mjpg/video.mjpg",
        "Senhor a Vender" : "http://93.87.72.254:8082/mjpg/video.mjpg",
        "Corredor" : "/cgi-bin/mjpeg?resolution=640x360&amp;quality=1&amp;page=1746627489757&amp;Language=0" /*guardado localmente no site, descobrir como estrair ou usar outra cam */,
        "Porta do Quarto" : "http://209.202.205.86:8080/",
        "Interior da Casa?" : "http://107.131.197.123:8889/",
    },
    3 : {
        "Quarto" : "http://71.41.121.66:8200/#view",
        "Sala de Máquinas" : "http://113.161.46.196:8001/webcapture.jpg",
        "Casa" : "https://stream-ue1-bravo.dropcam.com:443/nexus_aac/0327c32c53d44f0c8dc184f79eb4afd1/playlist.m3u8?public=hMsgoEpYmc",
        "Sala de Estar" : "http://46.231.208.18:9095/mjpg/video.mjpg",
        "Laboratório" : "http://129.2.146.15/jpg/image.jpg"
    }
}


