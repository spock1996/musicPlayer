// === Music player setting JS === //

// === Arrey of songs ===

const songs = ["Automatic", "OutofTouch"];

// === song starts from 0 in arrey ===
let songIndex = 0;


const title = document.getElementById("title");
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const progress = document.getElementById("progress");

class SongsLoad {
    constructor(songName) {
        this.songName = songs[songIndex];
    }
    loadSong(songName) {
        title.innerHTML = songName;
        audio.src = `music/${songName}.mp3`;
        cover.src = `imgs/${songName}.jpg`;
    }
}


// === inisalize song class and load song metod ===
const song1 = new SongsLoad(songs[songIndex]);

song1.loadSong(songs[songIndex]);


class UI {
    playSong() {
        musicContainer.classList.add("play");
        playBtn.querySelector("i.fas").classList.remove("fa-play");
        playBtn.querySelector("i.fas").classList.add("fa-pause");

        audio.play()

    }

    pauseSong() {
        musicContainer.classList.remove("play");
        playBtn.querySelector("i.fas").classList.add("fa-play");
        playBtn.querySelector("i.fas").classList.remove("fa-pause");

        audio.pause();

    }

    prevSong() {
        songIndex--;

        console.log(songIndex)

        console.log('Cliked')

        if(songIndex < 0) {
            songIndex = songs.length - 1;
        }

        song1.loadSong(songs[songIndex])
        this.playSong()
    }

    nextSong() {
        songIndex++;

        console.log(songIndex)
        console.log(songs.length)

        if(songIndex > songs.length - 1) {
            songIndex = 0;
        }

        song1.loadSong(songs[songIndex])
        this.playSong()
        

    }
    // === update progress ===

    updateProgress(e) {

        const {duration, currentTime} = e.srcElement;
        
        const progressPercent = (currentTime / duration) * 100;

        progress.style.width = `${progressPercent}%`

    }

    setProgress(e) {
        const width = e.target.clientWidth;

        const clickX = e.offsetX;

        const duration = audio.duration;

        audio.currentTime = (clickX / width) * duration;
    }

}




// === add event listener on play btn ===

const playBtn = document.getElementById("play");
const musicContainer = document.getElementById("music-container");

playBtn.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains("play");

    const ui = new UI();

    if(isPlaying) {
        ui.pauseSong()
    } else {
        ui.playSong();
    }
});


// === change songs ===

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

prevBtn.addEventListener("click", () => {
    const ui = new UI();

    ui.prevSong();
});

nextBtn.addEventListener("click", () => {
    const ui = new UI();

    ui.nextSong();
})




// === update progress bar ===

audio.addEventListener("timeupdate", (e) => {
    const ui = new UI();

    ui.updateProgress(e)
})


// === click on progress bar ===

const progressContainer = document.getElementById("progress-container");

progressContainer.addEventListener("click", (e) => {
    const ui = new UI();

    ui.setProgress(e);
})


// song ends

audio.addEventListener("ended", () => {
    const ui = new UI;

    ui.nextSong();
})