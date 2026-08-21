const defaults = {
  name: "TITÁN",
  color: "#00d4ff",
  energy: 72,
  eyes: "orbit",
  mood: "focus",
};

const saved = JSON.parse(localStorage.getItem("titan-rgb-config") || "null");
const state = { ...defaults, ...saved };

const mascot = document.querySelector("#mascot");
const nameInput = document.querySelector("#mascotName");
const colorInput = document.querySelector("#primaryColor");
const energyInput = document.querySelector("#energy");
const eyeInput = document.querySelector("#eyeStyle");
const moodInput = document.querySelector("#mood");
const energyValue = document.querySelector("#energyValue");
const mascotLabel = document.querySelector("#mascotLabel");
const moodLabel = document.querySelector("#moodLabel");
const saveNote = document.querySelector("#saveNote");

const moodNames = {
  focus: "CONCENTRADO",
  happy: "FELIZ",
  explore: "EXPLORADOR",
};

function render() {
  document.documentElement.style.setProperty("--primary", state.color);
  document.documentElement.style.setProperty("--energy", String(state.energy / 100));
  mascot.dataset.eyes = state.eyes;
  mascot.dataset.mood = state.mood;
  mascotLabel.textContent = state.name || defaults.name;
  moodLabel.textContent = `MODO: ${moodNames[state.mood]}`;
  nameInput.value = state.name;
  colorInput.value = state.color;
  energyInput.value = state.energy;
  energyValue.textContent = `${state.energy}%`;
  eyeInput.value = state.eyes;
  moodInput.value = state.mood;
  document.querySelectorAll(".swatch").forEach((swatch) => {
    swatch.classList.toggle("active", swatch.dataset.color.toLowerCase() === state.color.toLowerCase());
  });
}

function persist(message = "✓ Tus ajustes se guardan en este dispositivo.") {
  localStorage.setItem("titan-rgb-config", JSON.stringify(state));
  saveNote.textContent = message;
}

nameInput.addEventListener("input", (event) => {
  state.name = event.target.value.toUpperCase();
  render();
  persist();
});

colorInput.addEventListener("input", (event) => {
  state.color = event.target.value;
  render();
  persist();
});

energyInput.addEventListener("input", (event) => {
  state.energy = Number(event.target.value);
  render();
  persist();
});

eyeInput.addEventListener("change", (event) => {
  state.eyes = event.target.value;
  render();
  persist();
});

moodInput.addEventListener("change", (event) => {
  state.mood = event.target.value;
  render();
  persist();
});

document.querySelectorAll(".swatch").forEach((swatch) => {
  swatch.addEventListener("click", () => {
    state.color = swatch.dataset.color;
    render();
    persist();
  });
});

document.querySelector("#resetMascot").addEventListener("click", () => {
  Object.assign(state, defaults);
  render();
  persist("↻ TITÁN volvió a su configuración inicial.");
});

document.querySelector("#copyConfig").addEventListener("click", async () => {
  const config = `TITÁN RGB · ${state.name} · ${state.color} · energía ${state.energy}% · visor ${state.eyes} · modo ${moodNames[state.mood]}`;
  try {
    await navigator.clipboard.writeText(config);
    saveNote.textContent = "✓ Configuración copiada al portapapeles.";
  } catch {
    saveNote.textContent = "Configura TITÁN y guarda tus cambios aquí.";
  }
});

render();
