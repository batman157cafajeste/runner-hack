
(() => {
  window.runnerHackCleanup?.();
  document.getElementById("runnerHackPanel")?.remove();

  if (typeof upd !== "function" || typeof die !== "function") {
    alert("Abra o jogo antes de ativar.");
    return;
  }

  const originalUpd = upd;
  const originalDie = die;

  let timerOn = true;
  let immortalOn = true;

  const panel = document.createElement("div");
  panel.id = "runnerHackPanel";

  panel.style.cssText = `
    position:fixed;
    top:100px;
    right:24px;
    width:205px;
    z-index:999999;
    padding:15px;
    background:rgba(20,20,24,.94);
    color:#eee;
    border:1px solid #303036;
    border-radius:13px;
    font:13px Arial,sans-serif;
    box-shadow:0 8px 30px #0005;
    user-select:none;
  `;

  panel.innerHTML = `
    <div style="display:flex;justify-content:space-between;margin-bottom:16px">
      <b>By vinaz</b>
      <button id="closeRunner">×</button>
    </div>

    <div class="item">
      <span>Anti coin</span>
      <button id="timerBtn">ON</button>
    </div>

    <div class="item">
      <span>Imortal</span>
      <button id="immortalBtn">ON</button>
    </div>
  `;

  const style = document.createElement("style");
  style.textContent = `
    #runnerHackPanel .item {
      display:flex;
      justify-content:space-between;
      align-items:center;
      padding:10px 0;
      border-top:1px solid #333;
    }

    #runnerHackPanel button {
      cursor:pointer;
      border:0;
      border-radius:6px;
      padding:6px 12px;
      background:#e5e5e5;
      color:#171717;
      font-weight:bold;
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(panel);

  window.upd = function(dt) {
    const oldTc = tc;

    if (timerOn) tc = false;

    try {
      return originalUpd(dt);
    } finally {
      tc = oldTc;
    }
  };

  window.die = function(...args) {
    if (immortalOn) return;
    return originalDie.apply(this, args);
  };

  panel.querySelector("#timerBtn").onclick = () => {
    timerOn = !timerOn;
    panel.querySelector("#timerBtn").textContent =
      timerOn ? "ON" : "OFF";
  };

  panel.querySelector("#immortalBtn").onclick = () => {
    immortalOn = !immortalOn;
    panel.querySelector("#immortalBtn").textContent =
      immortalOn ? "ON" : "OFF";
  };

  window.runnerHackCleanup = () => {
    window.upd = originalUpd;
    window.die = originalDie;
    panel.remove();
    style.remove();
    delete window.runnerHackCleanup;
  };

  panel.querySelector("#closeRunner").onclick =
    window.runnerHackCleanup;

  console.log("Runner Hack ativado!");
})();
