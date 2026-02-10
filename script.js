// =======================
// MOBILE DETECTION
// =======================
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

// =======================
// TEXT STATES
// =======================
const defaultTitle = "Will you be my Valentine?";
const yesHoverTitle = "Say yes pls 🥺💖";
const noHoverTitle = "Hey—why NO? 😭";

// =======================
// ELEMENTS
// =======================
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const letterWindow = document.querySelector(".letter-window");

const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

const musicToggle = document.getElementById("music-toggle");

// =======================
// STATE
// =======================
let isFinal = false;
let musicPlaying = false;

// =======================
// CAT GIFS
// =======================
const defaultCat = "cat_heart.gif";
const happyCat = "cat_happy.gif";
const sadCat = "cat_sad.gif";
const danceCat = "cat_dance.gif";

// =======================
// AUDIO
// =======================
const bgMusic = new Audio("bg-music.mp3");
bgMusic.loop = true;
bgMusic.volume = 0;

const openSound = new Audio("open.mp3");
const happySound = new Audio("happy.mp3");
const sadSound = new Audio("sad.mp3");
const winSound = new Audio("win.mp3");
const heartbeatSound = new Audio("heartbeat.mp3");

heartbeatSound.loop = true;
heartbeatSound.volume = 0.6;

// =======================
// MUSIC HELPERS
// =======================
function fadeInMusic() {
    bgMusic.play();
    let vol = 0;
    const fade = setInterval(() => {
        vol += 0.02;
        bgMusic.volume = Math.min(vol, 0.4);
        if (vol >= 0.4) clearInterval(fade);
    }, 100);
}

function duckMusic(duration = 600) {
    if (!musicPlaying) return;
    const original = bgMusic.volume;
    bgMusic.volume = 0.15;
    setTimeout(() => (bgMusic.volume = original), duration);
}

// =======================
// MUSIC TOGGLE 🔊
// =======================
musicToggle.addEventListener("click", () => {
    if (!musicPlaying) {
        fadeInMusic();
        musicPlaying = true;
        musicToggle.textContent = "🔊";
    } else {
        bgMusic.pause();
        musicPlaying = false;
        musicToggle.textContent = "🔇";
    }
});

// =======================
// ENVELOPE CLICK
// =======================
envelope.addEventListener("click", () => {
    openSound.play();

    if (!musicPlaying) {
        fadeInMusic();
        musicPlaying = true;
        musicToggle.textContent = "🔊";
    }

    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout(() => {
        letterWindow.classList.add("open");
    }, 50);
});

// =======================
// YES INTERACTION 💓
// =======================
function yesHover() {
    if (isFinal) return;

    title.textContent = yesHoverTitle;
    catImg.src = happyCat;

    duckMusic();
    happySound.currentTime = 0;
    happySound.play();

    heartbeatSound.currentTime = 0;
    heartbeatSound.play();
}

function yesLeave() {
    if (isFinal) return;

    title.textContent = defaultTitle;
    catImg.src = defaultCat;
    heartbeatSound.pause();
}

if (!isMobile) {
    yesBtn.addEventListener("mouseenter", yesHover);
    yesBtn.addEventListener("mouseleave", yesLeave);
} else {
    yesBtn.addEventListener("touchstart", yesHover);
}

// =======================
// NO BUTTON DODGE 😈
// =======================
function moveNoButton() {
    if (isFinal) return;

    title.textContent = noHoverTitle;
    catImg.src = sadCat;

    duckMusic();
    sadSound.currentTime = 0;
    sadSound.play();

    const wrapper = document.querySelector(".no-wrapper");
    const maxX = 140;
    const maxY = 80;

    const x = Math.random() * maxX * 2 - maxX;
    const y = Math.random() * maxY * 2 - maxY;

    wrapper.style.transform = `translate(${x}px, ${y}px)`;
}

function noLeave() {
    if (isFinal) return;

    title.textContent = defaultTitle;
    catImg.src = defaultCat;
}

if (!isMobile) {
    noBtn.addEventListener("mouseenter", moveNoButton);
    noBtn.addEventListener("mouseleave", noLeave);
} else {
    noBtn.addEventListener("touchstart", moveNoButton);
}

// =======================
// YES CLICK 🎉 FINAL
// =======================
yesBtn.addEventListener("click", () => {
    if (isFinal) return;
    isFinal = true;

    heartbeatSound.pause();
    duckMusic(1000);
    winSound.play();

    title.textContent = "YAY!! 💖";
    catImg.src = danceCat;

    letterWindow.classList.add("final");
    buttons.style.display = "none";
    finalText.style.display = "block";
});
