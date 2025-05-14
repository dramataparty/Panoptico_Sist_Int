const feed_dictionary = {
    0: {
      "Exterior de Escola": "http://134.124.120.76/mjpg/video.mjpg",
      "Campo de Futebol": "http://91.231.166.180:86/mjpg/video.mjpg",
      "Campo de Ténis": "http://213.124.95.98:8082/mjpg/video.mjpg",
      "Lago": "http://216.14.224.50/mjpg/video.mjpg",
    },
    1: {
      "Hospital": "http://203.181.0.118:6003/live/index.html?Language=0",
      "Auditório": "http://70.90.194.90:8888/cgi-bin/faststream.jpg?stream=full&fps=25&rand=469098",
      "Loja": "http://78.186.67.194:50001/transparent.gif",
      "Estacionamento Subterrâneo": "http://89.97.231.70:8082/control/faststream.jpg?stream=full&fps=16&rand=764313",
      "Lobby de Hotel": "http://71.249.87.61/control/faststream.jpg?stream=full&fps=16&rand=952274",
      "Entrada de Hotel": "http://75.51.6.196:8080/control/faststream.jpg?stream=full&fps=16&rand=648524",
      "Sweatshop": "http://96.84.21.221:8082/mjpg/video.mjpg",
      "Lavandaria": "http://82.64.237.163:8083/mjpg/video.mjpg",
      "Ginásio": "http://104.8.103.170/control/faststream.jpg?stream=full&fps=16&rand=387871",
    },
    2: {
      "Interior de Elevador": "http://72.43.190.171:83/mjpg/video.mjpg",
      "Senhor a Vender": "http://93.87.72.254:8082/mjpg/video.mjpg",
      "Corredor": "/cgi-bin/mjpeg?resolution=640x360&quality=1&page=1746627489757&Language=0",
      "Porta do Quarto": "http://209.202.205.86:8080/",
      "Interior da Casa?": "http://107.131.197.123:8889/",
    },
    3: {
      "Quarto": "http://71.41.121.66:8200/#view",
      "Sala de Máquinas": "http://113.161.46.196:8001/webcapture.jpg",
      "Casa": "https://stream-ue1-bravo.dropcam.com:443/nexus_aac/0327c32c53d44f0c8dc184f79eb4afd1/playlist.m3u8?public=hMsgoEpYmc",
      "Sala de Estar": "http://46.231.208.18:9095/mjpg/video.mjpg",
      "Laboratório": "http://129.2.146.15/jpg/image.jpg",
    }
  };
  
  let currentFeedIndex = 0;
  let currentIntimacyLevel = 0;
  const feedFrame = document.getElementById("feed_frame");

let viewedFeeds = {
  0: new Set(),
  1: new Set(),
  2: new Set(),
  3: new Set()
};

const question_text_dictionary = {
  1: {
    "Hospital": "Já estiveste num hospital assim tão vazio?",
    "Auditório": "Este auditório faz-te lembrar algo?",
    "Lavandaria": "Alguém te vem à mente ao ver esta lavandaria?",
  },
  2: {
    "Interior de Elevador": "Tens medo de elevadores?",
    "Senhor a Vender": "Já compraste algo de um estranho assim?",
    "Interior da Casa?": "Reconheces algo nesta casa?",
  },
  3: {
    "Quarto": "Este quarto parece familiar?",
    "Casa": "Consegues imaginar quem vive aqui?",
    "Sala de Estar": "Já estiveste num lugar como este?",
  }
};

function getFeedNames(level) {
  return Object.keys(feed_dictionary[level]);
}

function updateFeed(level, index) {
  const feedNames = getFeedNames(level);
  const feedName = feedNames[index];
  const baseURL = feed_dictionary[level][feedName];
  const feedURL = baseURL + (baseURL.includes("?") ? "&" : "?") + "t=" + new Date().getTime();

  feedFrame.src = feedURL;
  currentFeedIndex = index;

  viewedFeeds[level].add(feedName);
  document.getElementById("question_text").innerText = "";

  maybeTriggerQuestion(level);
}

function maybeTriggerQuestion(level) {
  const total = getFeedNames(level).length;
  const viewed = viewedFeeds[level].size;

  if (viewed / total >= 0.75 && level < 3) {
    const nextLevel = level + 1;
    const candidates = Object.keys(question_text_dictionary[nextLevel]);
    const randomName = candidates[Math.floor(Math.random() * candidates.length)];
    const question = question_text_dictionary[nextLevel][randomName];

    document.getElementById("question_text").innerText = question;

    document.getElementById("yes").onclick = () => {
      currentIntimacyLevel = nextLevel;
      const index = getFeedNames(nextLevel).indexOf(randomName);
      updateFeed(nextLevel, index);
    };

    document.getElementById("no").onclick = () => {
      currentIntimacyLevel = nextLevel;
      initializeFeed();
    };
  }
}

function initializeFeed() {
  const feedNames = getFeedNames(currentIntimacyLevel);
  const randomIndex = Math.floor(Math.random() * feedNames.length);
  updateFeed(currentIntimacyLevel, randomIndex);
}

function accessUserCamera() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(stream => {
      document.getElementById('video').srcObject = stream;
    })
    .catch(err => {
      console.log("An error occurred accessing the camera: " + err);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  initializeFeed();
  accessUserCamera();

  document.getElementById("nextFeed").addEventListener("click", () => {
    const feedNames = getFeedNames(currentIntimacyLevel);
    const nextIndex = (currentFeedIndex + 1) % feedNames.length;
    updateFeed(currentIntimacyLevel, nextIndex);
  });

  document.getElementById("prevFeed").addEventListener("click", () => {
    const feedNames = getFeedNames(currentIntimacyLevel);
    const prevIndex = (currentFeedIndex - 1 + feedNames.length) % feedNames.length;
    updateFeed(currentIntimacyLevel, prevIndex);
  });

  // 'yes' e 'no' serão sobrepostos dinamicamente quando perguntas aparecerem
});


  function getFeedNames(level) {
    return Object.keys(feed_dictionary[level]);
  }
  
  function updateFeed(level, index) {
    const feedNames = getFeedNames(level);
    const baseURL = feed_dictionary[level][feedNames[index]];
  
    // Adiciona timestamp para evitar cache
    const feedURL = baseURL + (baseURL.includes("?") ? "&" : "?") + "t=" + new Date().getTime();
  
    feedFrame.src = feedURL;
    currentFeedIndex = index;
  
    document.getElementById("question_text").innerText = ``;
  }
  
  question_text_dictionary = {}

  function initializeFeed() {
    currentIntimacyLevel = 0;
    const feedNames = getFeedNames(currentIntimacyLevel);
    const randomIndex = Math.floor(Math.random() * feedNames.length);
    updateFeed(currentIntimacyLevel, randomIndex);
  }
  
  function accessUserCamera() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(stream => {
        document.getElementById('video').srcObject = stream;
      })
      .catch(err => {
        console.log("An error occurred accessing the camera: " + err);
      });
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    initializeFeed();
    accessUserCamera();
  
    document.getElementById("nextFeed").addEventListener("click", () => {
      const feedNames = getFeedNames(currentIntimacyLevel);
      const nextIndex = (currentFeedIndex + 1) % feedNames.length;
      updateFeed(currentIntimacyLevel, nextIndex);
    });
  
    document.getElementById("prevFeed").addEventListener("click", () => {
      const feedNames = getFeedNames(currentIntimacyLevel);
      const prevIndex = (currentFeedIndex - 1 + feedNames.length) % feedNames.length;
      updateFeed(currentIntimacyLevel, prevIndex);
    });
  
    document.getElementById("yes").addEventListener("click", () => {
      currentIntimacyLevel = Math.min(currentIntimacyLevel + 1, 3);
      initializeFeed();
    });
  
    document.getElementById("no").addEventListener("click", () => {
      initializeFeed(); 
    });
  });
  