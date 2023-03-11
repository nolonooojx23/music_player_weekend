const title = document.querySelector(".name_title");
const cover = document.querySelector(".image1");
const prevBtn = document.querySelector(".backward");
const nextBtn = document.querySelector(".forward");
const playBtn = document.querySelector(".play");
const audio = document.querySelector("#audio");
const menu = document.querySelector("#menuBtn");
const menuCard = document.querySelector(".card_menu");
const del = document.getElementById("del");
const text = document.querySelector(".song_text");
const music = document.getElementsByClassName("music1");
const progres = document.querySelector(".range");
const end = document.querySelector(".end");
const start = document.querySelector(".start");
const range_main = document.querySelector(".range_main");
const range = document.querySelector("#volume");


var songIndex = 0

const songs = [
	'The Weeknd Starboy',
	'The Weeknd Die For You',
	'The Weeknd After Hours',
	'spit in my face'
]

songs.forEach((item) => {
	text.innerHTML += `<h1 class = "music1"><i class="fa-solid fa-music" id = "music_icon"></i> ${item} <h1>`
});

Array.from(music).forEach((item, index) => {
	item.addEventListener("click", ()=>{
		loadSong(songs[index])
		audio.play();
		isLoading = true;
		playBtn.innerHTML = "<i class='fa-solid fa-pause' id='icon_play'></i>"
	})
});

menu.addEventListener("click", ()=>{
	menuCard.classList.add("active");
});

del.addEventListener("click", ()=>{
	menuCard.classList.remove("active");
});


var songIndex = 0
var isLoading = false

function loadSong(index) {
	title.textContent = index;
	cover.src = `img/${index}.jpg`;
	audio.src = `musics/${index}.mp3`
}

loadSong(songs[songIndex])

playBtn.addEventListener("click", ()=>{
	if (!isLoading) {
		audio.play();
		isLoading = true;
		playBtn.innerHTML = "<i class='fa-solid fa-pause ' id='icon_play'></i>"
	} else{
		audio.pause();
		isLoading = false;
		playBtn.innerHTML = "<i class='fa-solid fa-play' id='icon_play'></i>"
	}
})

function nextMusic() {
	if (songIndex == songs.length-1) {
		songIndex = 0
	}else{
		songIndex++
	}
	loadSong(songs[songIndex]);
	audio.play()
	playBtn.innerHTML = "<i class='fa-solid fa-pause ' id='icon_play'></i>"
}

nextBtn.addEventListener("click", nextMusic);

function prevMusic() {
	if (songIndex == 0) {
		songIndex = songs.length-1
	}else{
		songIndex--
	}
	loadSong(songs[songIndex]);
	audio.play()
	playBtn.innerHTML = "<i class='fa-solid fa-pause ' id='icon_play'></i>"
}

prevBtn.addEventListener("click", prevMusic);

function progress(e) {
	const duration = e.srcElement.duration;
	const curTime = e.srcElement.currentTime;

	progres.style.width = (curTime/duration*100)+"%"

	var endMinute =parseInt(duration/60);
	var endSecond =parseInt(duration % 60);


	end.textContent = `${endMinute=
	endMinute < 10 ? "0" + endMinute : endMinute}:${endSecond=
	endSecond < 10 ? "0" + endSecond : endSecond}`


	var startMinute =parseInt(curTime/60);
	var startSecond =parseInt(curTime % 60);

	start.textContent = `${startMinute=
	startMinute < 10 ? "0" + startMinute : startMinute}:${startSecond=
	startSecond < 10 ? "0" + startSecond : startSecond}`
		
}
function setProgress(e) {
	const width = this.clientWidth;
	const clickPoint = e.offsetX;
	var durationEl = audio.duration;

	audio.currentTime = (clickPoint* durationEl)/ width;
}

function setVolume() {
	audio.volume = volume.value/volume.max ;
}
function keyboard(e) {
	if (e.keyCode === 32) {
		if (!isLoading) {
			audio.play();
			isLoading = true;
			playBtn.innerHTML = "<i class='fa-solid fa-pause ' id='icon_play'></i>"
		} else{
			audio.pause();
			isLoading = false;
			playBtn.innerHTML = "<i class='fa-solid fa-play' id='icon_play'></i>"
		}
	}
	// console.log(e);
}

document.addEventListener("keydown", keyboard)

audio.addEventListener("timeupdate", progress);
range.addEventListener("input", setVolume)
audio.addEventListener("ended", nextMusic);
range_main.addEventListener("click", setProgress)