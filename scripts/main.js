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

const question_text_dictionary = {
  0: {
    "Exterior de Escola": "Já tiveste medo de voltar à escola?",
    "Campo de Futebol": "Alguma vez jogaste futebol numa noite chuvosa?",
    "Campo de Ténis": "Sabes jogar ténis?",
    "Lago": "Já alguma vez fizeste um piquenique junto a um lago?",
  },
  1: {
    "Hospital": "Já estiveste num hospital vazio?",
    "Auditório": "Já alguma vez tiveste pânico de palco?",
    "Loja": "Gostas de fazer compras sozinho?",
    "Estacionamento Subterrâneo": "Ficas nervoso em estacionamentos subterrâneos?",
    "Lobby de Hotel": "Já esperaste horas no lobby de um hotel?",
    "Entrada de Hotel": "Já ficaste num hotel estranho?",
    "Sweatshop": "Sabes o que é um sweatshop?",
    "Lavandaria": "Frequentemente usas lavandarias?",
    "Ginásio": "Costumas ir ao ginásio para aliviar o stress?",
  },
  2: {
    "Interior de Elevador": "Tens medo de elevadores?",
    "Senhor a Vender": "Já compraste algo de um estranho?",
    "Corredor": "Já te perdeste num corredor escuro?",
    "Porta do Quarto": "Já bateste à porta de um quarto desconhecido?",
    "Interior da Casa?": "Tens câmaras em casa?",
  },
  3: {
    "Quarto": "Já estiveste num quarto vazio?",
    "Sala de Máquinas": "Já viste onde tudo acontece por trás das máquinas?",
    "Casa": "Consegues imaginar quem vive no outro lado do mundo?",
    "Sala de Estar": "Já alguma vez tiveste um encontro às escuras?",
    "Laboratório": "Gostas de fazer experiências no laboratório?",
  }
};

let currentFeedIndex = 0;
let currentIntimacyLevel = 0;
let viewedFeeds = { 0: new Set(), 1: new Set(), 2: new Set(), 3: new Set() };

function getFeedNames(level) {
  return Object.keys(feed_dictionary[level]);
}

function updateFeed(level, index) {
  const feedNames = getFeedNames(level);
  const feedName = feedNames[index];
  const baseURL = feed_dictionary[level][feedName];
  const url = baseURL + (baseURL.includes("?") ? "&" : "?") + "t=" + new Date().getTime();

  currentFeedIndex = index;
  viewedFeeds[level].add(feedName);

  loadFeed(url);
  document.getElementById("question_text").innerText = "";

  maybeTriggerQuestion(level);
}

function maybeTriggerQuestion(level) {
  const total = getFeedNames(level).length;
  const viewed = viewedFeeds[level].size;

  if (viewed / total >= 0.75 && level < 4) {
    const nextLevel = level + 1;
    const controls = document.getElementById("controls");
    const questionElem = document.getElementById("question");
    const questionText = document.getElementById("question_text");
    const questionButtons = document.getElementById("question_buttons");

    if (nextLevel === 4) {
      document.getElementById("feed_frame").srcObject = null;
      accessUserCamera();
      questionElem.style.display = "none";
      controls.style.display = "flex"; // Reexibe os botões se era o último nível
    } else {
      const questions = Object.entries(question_text_dictionary[nextLevel]);
      const [randomName, question] = questions[Math.floor(Math.random() * questions.length)];

      // Esconde controles e mostra pergunta
      controls.style.display = "none";
      questionText.innerText = question;
      questionElem.style.display = "block";

      document.getElementById("yes").onclick = () => {
        currentIntimacyLevel = nextLevel;
        const index = getFeedNames(nextLevel).indexOf(randomName);
        updateFeed(nextLevel, index);
        // Esconde pergunta e mostra controles
        questionElem.style.display = "none";
        controls.style.display = "flex";
      };

      document.getElementById("no").onclick = () => {
        currentIntimacyLevel = nextLevel;
        initializeFeed();
        // Esconde pergunta e mostra controles
        questionElem.style.display = "none";
        controls.style.display = "flex";
      };
    }
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
      document.getElementById('feed_frame').srcObject = stream;
    })
    .catch(err => {
      console.error("Erro ao acessar a câmera: " + err);
    });
}

function loadFeed(url) {
  const feedFrame = document.getElementById("feed_frame");

  if (url.match(/\.(mjpg|gif)$/i)) {
    const img = document.createElement("img");
    img.id = "feed_frame";
    img.src = url;
    img.alt = "Feed de vídeo";
    img.style.width = "100%";

    feedFrame.replaceWith(img);
  } else {
    feedFrame.src = url;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  initializeFeed();
  setupEventListeners();
});

function setupEventListeners() {
  const nextButton = document.getElementById("nextFeed");
  const prevButton = document.getElementById("prevFeed");
  const yesButton = document.getElementById("yes");
  const noButton = document.getElementById("no");

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      const feedNames = getFeedNames(currentIntimacyLevel);
      const nextIndex = (currentFeedIndex + 1) % feedNames.length;
      updateFeed(currentIntimacyLevel, nextIndex);
    });
  }

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      const feedNames = getFeedNames(currentIntimacyLevel);
      const prevIndex = (currentFeedIndex - 1 + feedNames.length) % feedNames.length;
      updateFeed(currentIntimacyLevel, prevIndex);
    });
  }

  if (yesButton) {
    yesButton.addEventListener("click", () => {
      currentIntimacyLevel = Math.min(currentIntimacyLevel + 1, 3);
      hideQuestionPanel();
      initializeFeed();
    });
  }

  if (noButton) {
    noButton.addEventListener("click", () => {
      hideQuestionPanel();
      initializeFeed();
    });
  }
}