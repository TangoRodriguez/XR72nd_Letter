const messages = [
  "塩田さんへ",
  "同じ学科の後輩として",
  "同じ班の後輩として",
  "いつも活動できたことが嬉しかったです。",
  "塩田さんは",
  "僕にとって憧れの人です。",
  "明るさにも",
  "優しさにも",
  "全てに惹かれています。",
  "塩田さんがXR班をつくったことで",
  "僕はXRという世界に出会いました。",
  "XRに触れた日から",
  "視界が一気に広がりました。",
  "今回の理工展で企画を担当できたのも",
  "塩田さんがいたからです。",
  "来期は、もっと面白いものを作ります。",
  "胸を張って見せられるものを作ります。",
  "このAR手紙には",
  "これからの僕の進捗を",
  "3Dオブジェクトで追加していこうと思っています。",
  "よかったら、また覗きに来てください。",
  "その時、少しでも成長した僕を見せられますように。",
  "本当にありがとうございました。"
];

let currentIndex = 0;
let spawnAllowed = true;

function spawnMessagePlane(text) {
  const scene = document.querySelector("a-marker");

  // Canvasに書き込み
  const canvas = document.getElementById('msgCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 1024;
  canvas.height = 256;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = "bold 85px 'Yu Gothic', 'Noto Sans JP', sans-serif";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  // plane生成
  const plane = document.createElement("a-plane");
  plane.setAttribute("material", "src: #msgCanvas; transparent: true");
  plane.setAttribute("height", "0.65");
  plane.setAttribute("width", "2");
  plane.setAttribute("position", "0 0 0.15");
  plane.setAttribute("rotation", "-90 0 0");
  plane.setAttribute("endroll", "speed: 0.22; startY: -0.25; endY: 0.85; fadeStartY: 0.25");

  scene.appendChild(plane);
}

AFRAME.registerComponent('endrollmanager', {
  tick: function () {
    if (!spawnAllowed) return;

    spawnAllowed = false;
    spawnMessagePlane(messages[currentIndex]);
    currentIndex++;

    if (currentIndex < messages.length) {
      setTimeout(() => (spawnAllowed = true), 1600); // 次の行の出現タイミング調整
    }
  }
});
