initial_feed_randomizer(

)
initial_question_randomizer(

)
acess_user_camera( /**opens the user's camera feed on the page */
    document.getElementById('video'),
    document.getElementById('canvas')

)

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

