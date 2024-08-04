const image = document.getElementById('cover'),
    titulo = document.getElementById('titulo-musica'),
    artista = document.getElementById('artista-musica'),
    tempoAtualEl = document.getElementById('tempo-atual'),
    duracaoEl = document.getElementById('duracao'),
    progresso = document.getElementById('progresso'),
    playerProgresso = document.getElementById('player-progresso'),
    antBtn = document.getElementById('ant'),
    proxBtn = document.getElementById('prox'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img'),
    volumeControle = document.getElementById('volume'), 
    volumeIcon = document.getElementById('volume-icon'),
    sons = document.querySelectorAll('.sons'); 

const musica = new Audio();

const lista = [
    {
        path: 'assets/ghost.mp3',
        displayName: 'Ghost Town',
        cover: 'assets/ye.png',
        artist: 'Kanye West',
    },
    {
        path: 'assets/tnwp.mp3',
        displayName: 'The New Workout Plan',
        cover: 'assets/tcd.jpg',
        artist: 'Kanye West',
    },
    {
        path: 'assets/kingkunta.mp3',
        displayName: 'King Kunta',
        cover: 'assets/topimp.jpg',
        artist: 'Kendrick Lamar',
    },
    {
        path: 'assets/notlikeus.mp3',
        displayName: 'Not Like Us',
        cover: 'assets/notlikeus.png',
        artist: 'Kendrick Lamar',
    },
    {
        path: 'assets/potholderz.mp3',
        displayName: 'Potholderz',
        cover: 'assets/mmfood.jpg',
        artist: 'MF DOOM',
    },
    {
        path: 'assets/allcaps.mp3',
        displayName: 'All Caps',
        cover: 'assets/mad.jpg',
        artist: 'MF DOOM',
    },
    {
        path: 'assets/tfn.mp3',
        displayName: 'TIL FUTHER NOTICE',
        cover: 'assets/utopia.jpg',
        artist: 'Travis Scott',
    },
    {
        path: 'assets/cantsay.mp3',
        displayName: 'CAN\'T SAY',
        cover: 'assets/astro.jpg',
        artist: 'Travis Scott',
    },
    {
        path: 'assets/nmw.mp3',
        displayName: 'NEW MAGIC WAND',
        cover: 'assets/igor.jpg',
        artist: 'Tyler, The Creator',
    },
    {
        path: 'assets/best.mp3',
        displayName: 'BEST INTEREST',
        cover: 'assets/best.jpg',
        artist: 'Tyler, The Creator',
    }
];

let musicaIndex = 0;
let isPlaying = false;
let isMuted = false;

function togglePlay(){
    if(isPlaying){
        pauseMusica();
    }else{
        playMusica();
    }
}

function playMusica(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    musica.play();
}

function pauseMusica(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    musica.pause();
}

function loadMusica(song){
    musica.src = song.path;
    titulo.textContent = song.displayName;
    artista.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusica(direction){
    musicaIndex = (musicaIndex + direction + lista.length) % lista.length;
    loadMusica(lista[musicaIndex]);
    playMusica();
}

function updateProgressoBarra(){
    const { duration, currentTime } = musica;
    const progressoPorcento = (currentTime / duration) * 100;
    progresso.style.width = `${progressoPorcento}%`;

    const formatoTempo = (tempo) => String(Math.floor(tempo / 60)).padStart(2, '0') + ':' + String(Math.floor(tempo % 60)).padStart(2, '0');
    duracaoEl.textContent = formatoTempo(duration);
    tempoAtualEl.textContent = formatoTempo(currentTime);
}

function setProgressoBarra(e) {
    const width = playerProgresso.clientWidth;
    const clickX = e.offsetX;
    musica.currentTime = (clickX / width) * musica.duration;
}

function setVolume(e) {
    const volume = e.target.value;
    musica.volume = volume;

    if (volume == 0) {
        volumeIcon.classList.replace('fa-volume-low', 'fa-volume-xmark');
    } else if (volume > 0.5) {
        volumeIcon.classList.replace('fa-volume-xmark', 'fa-volume-high');
    } else {
        volumeIcon.classList.replace('fa-volume-xmark', 'fa-volume-low');
    }
}

function toggleMute() {
    isMuted = !isMuted;
    if (isMuted) {
        musica.volume = 0;
        volumeControle.value = 0;
        volumeIcon.classList.replace('fa-volume-low', 'fa-volume-xmark');
    } else {
        musica.volume = volumeControle.value;
        volumeIcon.classList.replace('fa-volume-xmark', volumeControle.value > 0.5 ? 'fa-volume-high' : 'fa-volume-low');
    }
    const volumeValue = volumeControle.value * 100;
    volumeControle.style.setProperty('--range-progress', `${volumeValue}%`);
}

sons.forEach((son, index) => {
    son.addEventListener('click', () => {
        musicaIndex = index;
        loadMusica(lista[musicaIndex]);
        playMusica();
    });
});

playBtn.addEventListener('click', togglePlay);
antBtn.addEventListener('click', () => changeMusica(-1));
proxBtn.addEventListener('click', () => changeMusica(1));
musica.addEventListener('ended', () => changeMusica(1));
musica.addEventListener('timeupdate', updateProgressoBarra);
playerProgresso.addEventListener('click', setProgressoBarra);
volumeControle.addEventListener('input', setVolume); 
volumeIcon.addEventListener('click', toggleMute); 

loadMusica(lista[musicaIndex]);
