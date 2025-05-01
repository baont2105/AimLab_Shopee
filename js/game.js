//stats
var score = 0
var missed = 0
var max_amount = 30
var amount
var speed = 1000

//elements
var startBtn = document.querySelector('.start-button')
var box = document.querySelector('.box')
var mes = document.querySelector('.messenge')
var score_label = document.querySelector('#score-label')
var miss_label = document.querySelector('#miss-label')
var left_label = document.querySelector('#left-label')
var diff_label = document.querySelector('#diff-label')
var diff = document.querySelectorAll('.setting-button')
var input = document.querySelector('.amount')
input.addEventListener('input', function() {
    max_amount = input.value
    resetStats()
})

//audio
var kill_sound = new Audio('audio/kill.mp4')
var spawn_sound = new Audio('audio/spawn.mp4')

var started
function start() {
    resetStats()
    started = setInterval(showBox, speed)
    startBtn.setAttribute('disabled', 'true')
    startBtn.style.display = "none"
    mes.textContent = "- Playing -"
}

function randomPos(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function showBox() {
    if (window.getComputedStyle(box).getPropertyValue('display') == 'none') {
        box.style.display = "block"
    } else {
        missed++
        miss_label.textContent = missed
    }
    box.style.left = randomPos(0, 850) + 'px'
    box.style.top = randomPos(0, 450) + 'px'
    spawn_sound.currentTime = 0
    spawn_sound.play()

    console.log(amount)
    //call stop function
    amount--
    left_label.textContent = amount
    if (amount <= 0) {
        mes.textContent = "- Ended -"
        stop()
    }
}

function stop() {
    if (started) {
        clearInterval(started)
        setTimeout(() => {
            box.style.display = "none"
            startBtn.removeAttribute('disabled')
            startBtn.style.display = "block"
            mes.textContent = "- Click the Button To Start -"
        }, speed)
    }
}

box.addEventListener('click', () => {
    kill_sound.currentTime = 0
    kill_sound.play()
    box.style.display = "none"
    score++
    score_label.textContent = score
})

function resetStats() {
    score = 0
    score_label.textContent = score
    missed = 0
    miss_label.textContent = missed
    amount = max_amount
}

function change_diff(btn){
    speed = btn.getAttribute('data-speed')
    diff_label.textContent = btn.textContent
}