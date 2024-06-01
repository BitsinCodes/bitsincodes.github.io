let audioFile = document.getElementById("audioFile")
let songNumber = 0
let sButton = document.getElementById('shufButton')
let shuffled = false
let prevButton = document.getElementById('prevButton')
let pButton = document.getElementById("playButton")
let musicOn = false
let nextButton = document.getElementById('nextButton')
let mButton = document.getElementById("mutebutton")
let volumeOn = true
let rCont = document.getElementById(`rcont`)
let root = document.querySelector(`:root`)
let plbg = document.body
let plicon = document.getElementById('playingIcon')
let pltitle = document.getElementById('ptTitle')
let plsgr = document.getElementById('ptSinger')
// SONG LIBRARY
let songID = ['1', '2', '3', '4', '5', '6', '7', '8']
let songFull = ['Thousand Miles', 'Talk To You', 'Hearts', 'Paper Planes', 'Atlantis', 'Sway To My Beat In Cosmos', 'Divine', 'Hope Is the Thing With Feathers']
let songName = []
for (let i = 0; i < songID.length; i++) {
    let first = songFull[i]
    let second
    if(songFull[i].length > 13){
    second = first.slice(0, 10) + `...`
    songName.push(second)
    } else{
        songName.push(first)
    }
}
let singerName = [`the Kid LAROI`, 'Zach B', 'Zach B', 'M.I.A.', 'Seafret', 'Chevy', 'Krishnahazar', 'Chevy']
let uploader = [`chipp`, 'chipp', 'chipp', 'Maxi', 'Monkey', 'Mahdi', 'Hell', 'Mahdi']
let accent = [`#978E75`, `#c264a6`, '#272571', '#715755', '#564E4B', '#846699', '#AD825D', '#72556B']

let jpglink = `https://lets.linkpc.net/icons/`
let avatar = []
for (let i = 0; i < songID.length; i++) {
    avatar.push(`${jpglink}${songID[i]}.jpg`)
}
let mp3link = "https://lets.linkpc.net/songs/"
let audio = []
for (let i = 0; i < songID.length; i++) {
    audio.push(`${mp3link}${songID[i]}.mp3`)
}
let songItem = []
function refresh() {
    location.reload()
}
let songList = []
for (let i = 0; i < songID.length; i++) {
    songList[i] = new Song(songID[i], songFull[i], songName[i], singerName[i], uploader[i], accent[i], avatar[i], audio[i])
}
let songCont = document.getElementById('songList')
let playerOn = true
let section = document.getElementById('sectionOne')
let rcont = document.getElementById('rcont')











// MUSIC FUNCTIONS
function playSong(){
    audioFile.play()
    pButton.innerHTML = "<i class='fa-solid fa-pause'></i>"
    musicOn = true
}
function pauseSong(){
    audioFile.pause()
    pButton.innerHTML = "<i class='fa-solid fa-play'></i>"
    musicOn = false
}
function mute(){
    audioFile.muted = true
    mButton.innerHTML = "<i class='fa-solid fa-volume-xmark'></i>"
    volumeOn = false
}
function unmute(){
    audioFile.muted = false
    mButton.innerHTML = "<i class='fa-solid fa-volume-high'>"
    volumeOn = true
}
function next(){
    textDecor()
    setTimeout(() => {
    if(!shuffled){
    songNumber++
    if (songNumber >= songID.length){
        songNumber = 0
    }
    changePlayerInfo(songList[songNumber])}
    else if(shuffled){
        shuffle()
        changePlayerInfo(songList[songNumber])
    }
    setTimeout(() => {
        textReDecor()
    }, 300);
}, 100);
}
function prev(){
    textDecor()
    setTimeout(() => {
        if(!shuffled){
            songNumber--
        if (songNumber < 0){
            songNumber = songID.length - 1
        }
        changePlayerInfo(songList[songNumber])
        }
        else if(shuffled){
            shuffle()
            changePlayerInfo(songList[songNumber])
        }
        setTimeout(() => {
            textReDecor()
        }, 300);
    }, 100);
}
function shuffle(){
    let x
    let y
    x = Math.floor(Math.random() * songID.length) + 0
    y = x
    if (x == songNumber){
        y = Math.floor(Math.random() * songID.length) + 0
    }
    songNumber = y
}









// MUSIC CONTROLLERS
prevButton.onclick = function(){
    prev()
}
pButton.onclick = function(){
    if(!musicOn){
        playSong()
    } else if(musicOn){
        pauseSong()
    }
}
nextButton.onclick = function(){
    next()
}
mButton.onclick = function(){
    if(volumeOn){
        mute()
        mButton.style.color = 'var(--iconAccent)'
    } else if(!volumeOn){
        unmute()
        mButton.style.color = 'white'
    }
}
sButton.onclick = function(){
    if(shuffled){
        shuffled = false
        sButton.style.color = 'white'
    } else if(!shuffled){
        shuffled = true
        sButton.style.color = 'var(--iconAccent)'
    }
}






// MUSIC
function Song(id, fullname, name, singer, uploader, accent, avatar, audio) {
    this.id = id;
    this.fullname = fullname
    this.name = name;
    this.singer = singer;
    this.uploader = uploader;
    this.accent = accent;
    this.avatar = avatar;
    this.audio = audio;
}
for (let i = 0; i < songID.length; i++) {
    songCont.innerHTML += `<div id="song${songID[i]}" class="row songItem" style="--iconAccent: ${accent[i]}50;" onclick="changePlayerInfo(songList[${i}])"></div>`
    songItem[i] = document.getElementById(`song${songID[i]}`)
    songItem[i].innerHTML = `
    <img src="${songList[i].avatar}" alt="" class="songAvatar">
    <div class="songText column">
        <div class="songUp row">
            <span class="songTitle">${songList[i].fullname}</span>
            <span class="songID">${songList[i].id}</span>
        </div>
        <div class="songUp row">
            <span class="songSinger">${songList[i].singer}</span>
            <span class="songUploader">${songList[i].uploader}</span>
        </div>
    </div>
    `
}
document.getElementById(`song1`).classList.add('songNow')
document.getElementById('ptTitle').innerText = songList[0].name
function changePlayerInfo(x){
    root.style.setProperty('--iconAccent', x.accent)
    plbg.style.backdropFilter = `blur(3rem) brightness(0%) saturate(20%)`
    plicon.style.filter = `brightness(0%)`
    textDecor()
    setTimeout(() => {
        plbg.style.backgroundImage = `url(${x.avatar}`
        plicon.src = x.avatar
        textReDecor()
        plbg.style.backdropFilter = `blur(3rem) brightness(50%) saturate(20%)`
        plicon.style.filter = `brightness(100%)`
    }, 500);
    audioFile.src = x.audio
    playSong()
    songNumber = x.id - 1
    for (let i = 0; i < songID.length; i++) {
        document.getElementById(`song${songID[i]}`).classList.remove('songNow')
    }
    document.getElementById(`song${x.id}`).classList.add('songNow')
}


let trasongs = document.querySelectorAll('.songItem')
// ANDROID SECTIONS
section.onclick = function(){
    if (playerOn){
        rcont.style.transform = 'translateX(-50%)'
        plicon.style.transform = 'translateX(-100%) rotateZ(30deg)'
        pltitle.style.transform = 'translateX(-300%)'
        pltitle.style.letterSpacing = '1rem'
        plsgr.style.transform = 'translateX(-200%)'
        plsgr.style.letterSpacing = '1rem'
        plsgr.style.opacity = '0%'
        playerOn = false
        const move = async () => {
            for (let i = 0; i < trasongs.length; i++) {
                await sleep(30)
                trasongs[i].style.transform = 'translateX(0%)'
            }
        }
        move()
    }else{
        rcont.style.transform = 'translateX(0%)'
        plicon.style.transform = ''
        pltitle.style.transform = ''
        pltitle.style.letterSpacing = ''
        plsgr.style.transform = ''
        plsgr.style.letterSpacing = ''
        plsgr.style.opacity = '100%'
        playerOn = true
        const move = async () => {
            for (let i = 0; i < trasongs.length; i++) {
                await sleep(30)
                trasongs[i].style.transform = 'translateX(50%)'
            }
        }
        move()
    }
}
if (window.innerWidth <= 720) {
    document.body.appendChild(document.getElementById('audioDiv'))
}




const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
}
function textDecor(){
    let decoOne = pltitle.innerText.split('')
    let decoTwo = plsgr.innerText.split('')
    let numdo = decoOne.length
    let numdt = decoTwo.length
    pltitle.innerHTML = ''
    plsgr.innerHTML = ''
    for (let i = 0; i < numdo; i++) {
        pltitle.innerHTML+= `<strong class='strong'>${decoOne[i]}</strong>`
    }
    for (let i = 0; i < numdt; i++) {
        plsgr.innerHTML+= `<span class='singername'>${decoTwo[i]}</span>`
    }
    let strong = document.querySelectorAll('.strong')
    let span = document.querySelectorAll('.singername')
    const doSomething = async () => {
        for (let i = 0; i < numdo; i++) {
            await sleep(10)
            strong[i].style.color = 'var(--iconAccent)'
            setTimeout(() => {
                strong[i].classList.add('tilted')
            }, 200);
        }
        for (let i = 0; i < numdt; i++) {
            await sleep(10)
            span[i].style.color = 'var(--iconAccent)'
            setTimeout(() => {
                span[i].classList.add('upped')
            }, 200);
        }
        pltitle.style.opacity = '0%'
        plsgr.style.opacity = '0%'
    }
    doSomething()
}
function textReDecor(){
    pltitle.innerText = songList[songNumber].name
    pltitle.classList.add('tilted')
    plsgr.innerText = songList[songNumber].singer
    plsgr.classList.add('upped')
    let decoOne = pltitle.innerText.split('')
    let decoTwo = plsgr.innerText.split('')
    let numdo = decoOne.length
    let numdt = decoTwo.length
    pltitle.innerHTML = ''
    plsgr.innerHTML = ''
    for (let i = 0; i < numdo; i++) {
        pltitle.innerHTML+= `<strong class='strong'>${decoOne[i]}</strong>`
    }
    for (let i = 0; i < numdt; i++) {
        plsgr.innerHTML+= `<span class='singername'>${decoTwo[i]}</span>`
    }
    let strong = document.querySelectorAll('.strong')
    let span = document.querySelectorAll('.singername')
    const doSomething = async () => {
        for (let i = 0; i < numdo; i++) {
            await sleep(0)
            strong[i].style.color = 'var(--iconAccent)'
            strong[i].classList.add('tilted')
        }
        for (let i = 0; i < numdt; i++) {
            await sleep(0)
            span[i].style.color = 'var(--iconAccent)'
            span[i].classList.add('upped')
        }
        setTimeout(() => {
            pltitle.style.opacity = '100%'
            plsgr.style.opacity = '100%'
        }, 100);
        for (let i = 0; i < numdo; i++) {
            await sleep(10)
            strong[i].classList.remove('tilted')
            strong[i].style.color = 'white'
        }
        for (let i = 0; i < numdt; i++) {
            await sleep(10)
            span[i].style.color = 'white'
            span[i].classList.remove('upped')
        }
    }
    doSomething()
}