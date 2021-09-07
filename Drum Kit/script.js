/* VARIABLES */

const buttons = document.querySelectorAll('.key');
const audioFiles = document.querySelectorAll('.sound');
const validKeys = []; 

//Add valid keys
document.querySelectorAll('audio').forEach(function(key) {
    validKeys.push(key.dataset.key);
});


/* FUNCTIONS */

function playAudio(key) {
    const audio = document.querySelector(`audio[data-key=${key}]`);
    if (!audio) return;
    animation(key);
    audio.currentTime = 0;
    audio.play();
}

function animation(key) {
    var activeButton = document.getElementById(key);
    activeButton.classList.add("animation");
    setTimeout(function() {
      activeButton.classList.remove("animation");
    }, 100);
  }

/* EVENT LISTENERS */

buttons.forEach(function(button) {
    button.addEventListener('click', function(e) {
        playAudio(e.target.id);
    })
})

document.addEventListener('keypress', function(e) {
    if (validKeys.includes(e.key)) {
        document.querySelector(`button[id=${e.key}]`).click();
        playAudio(e.key);
    }
})