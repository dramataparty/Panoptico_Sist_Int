function initial_feed_randomizer( /**randomizes the feed shown to the user on page load, should be the one with 0 int level */
    feed_dictionary, /**the dictionary containing the feeds */
    feed_div, /**the div where the feed will be displayed */
    feed_index /**the index of the feed to be displayed */
) {
    feed_div.src = feed_dictionary[feed_index][Object.keys(feed_dictionary[feed_index])[Math.floor(Math.random() * Object.keys(feed_dictionary[feed_index]).length)]] /**randomly selects a feed from the dictionary */
    feed_div.setAttribute("width", "100%") /**sets the width of the feed to 100% */
    feed_div.setAttribute("height", "100%") /**sets the height of the feed to 100% */
    feed_div.setAttribute("controls", "true") /**sets the controls of the feed to true */
    feed_div.setAttribute("autoplay", "true") /**sets the autoplay of the feed to true */
    feed_div.setAttribute("loop", "true") /**sets the loop of the feed to true */
}

function initial_question( /*displays an initial question related to the currently displayed feed to the user, for example if football field it would ask "have you ever been to a football field? then displays it if yes, if no shows a random different one in the same intimacy level"
     */
    feed_dictionary, /**the dictionary containing the feeds */
    feed_div, /**the div where the feed will be displayed */
    feed_index /**the index of the feed to be displayed */
) {
    
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
function display_feed( /**displays the feed on the page */
   
) {
    var feed_div = document.getElementById("feed") /**gets the div where the feed will be displayed */
    var feed_index = Math.floor(Math.random() * Object.keys(feed_dictionary).length) /**randomly selects the index of the feed to be displayed */
    initial_feed_randomizer(feed_dictionary, feed_div, feed_index) /**calls the function to randomize the feed */
    initial_question(feed_dictionary, feed_div, feed_index) /**calls the function to display the initial question */

}


feed_dictionary = new Object()
var feed_dictionary = {
    0 : {
        "Exterior de Escola" : "http://134.124.120.76/view/viewer_index.shtml?id=13736",
        "Campo de Futebol" : "http://91.231.166.180:86/view/view.shtml?id=488&imagepath=%2Fmjpg%2Fvideo.mjpg",
        "Campo de Ténis" : "http://213.124.95.98:8082/view/index.shtml",
        "Lago" : "http://216.14.224.50/view/viewer_index.shtml?id=5223",
    },
    1 : {
        "Hospital" : "http://203.181.0.118:6003/live/index.html?Language=0",
        "Auditório" : "http://70.90.194.90:8888/cgi-bin/guestimage.html",
        "Loja" : "http://78.186.67.194:50001/CgiStart?page=Single&Language=0",
        "Estacionamento Subterrâneo" : "http://89.97.231.70:8082/control/userimage.html",
        "Lobby de Hotel" : "http://71.249.87.61/control/userimage.html",
        "Entrada de Hotel" : "http://75.51.6.196:8080/control/userimage.html",
        "Sweatshop" : "http://96.84.21.221:8082/view/viewer_index.shtml?id=18096",
        "Lavandaria" : "http://82.64.237.163:8083/view/viewer_index.shtml?id=10214 + http://82.64.237.163:8082/view/viewer_index.shtml?id=10165",
        "Ginásio" : "http://104.8.103.170/control/userimage.html",
    },
    2 : {
        "Interior de Elevador" : "http://72.43.190.171:83/view/view.shtml?id=352717&imagepath=%2Fmjpg%2Fvideo.mjpg&size=1",
        "Senhor a Vender" : "http://93.87.72.254:8082/view/index.shtml",
        "Corredor" : "http://84.228.110.101:90/live/index.html?Language=0",
        "Porta do Quarto" : "http://209.202.205.86:8080/",
        "Interior da Casa?" : "http://107.131.197.123:8889/",
    },
    3 : {
        "Quarto" : "http://71.41.121.66:8200/#view",
        "Senhor a Trabalhar" : "http://93.87.72.254:8082/view/index.shtml",
        "Sala de Máquinas" : "http://www.worldeye.cam/?id=3e2d34b952a75cc0e8d8701a2b78569f",
        "Casa" : "https://video.nest.com/live/hMsgoEpYmc",
        "Sala de Estar" : "http://46.231.208.18:9095/jpg/image.jpg",
        "Laboratório" : "http://129.2.146.15/jpg/image.jpg"
    }
}

