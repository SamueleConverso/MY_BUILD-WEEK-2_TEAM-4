const endPoint = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzViZjcxMWQyMjA3MTAwMTVkZTJmM2MiLCJpYXQiOjE3MzQwODAyNzQsImV4cCI6MTczNTI4OTg3NH0.v17yR1ttMjJ502S2x6eTRuGLyGMxouajUcqejbw_Pes";

const albumId = sessionStorage.getItem("id");

const albumUrl = `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`;

let getSongsStr = localStorage.getItem("myFavouriteSongs");
let myFavSongsObj = JSON.parse(getSongsStr);
console.log(myFavSongsObj);
//console.log(myFavSongsObj[0].image);

let getAlbumsStr = localStorage.getItem("myFavouriteAlbums");
let myFavAlbumsObj = JSON.parse(getAlbumsStr);
//console.log(myFavAlbumsObj);

/*----- VARIABILI FUNZIONI PLAYER */
const playButton = document.getElementById("btnPlay");

const songName = document.getElementById("songName");
const albumTitlePlayer = document.getElementById("albumTitlePlayer");
const imgAlbumPlayer = document.getElementById("imgAlbumPlayer");

const progressBar = document.getElementById("seekBar");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const playIconPlayerDesktop = document.getElementById("playIconPlayerDesktop");
const pauseIconPlayerDesktop = document.getElementById(
  "pauseIconPlayerDesktop"
);

const btnBackwardDesktop = document.getElementById("btnBackwardDesktop");
const btnForwardDesktop = document.getElementById("btnForwardDesktop");

/*----- VARIABILI FUNZIONI PLAYER MOBILE */
const songTitlePlayerMobile = document.getElementById("songTitlePlayerMobile");
const btnPlayerMobile = document.getElementById("btnPlayerMobile");
const playIconPlayerMobile = document.getElementById("playIconPlayerMobile");
const pauseIconPlayerMobile = document.getElementById("pauseIconPlayerMobile");

const trackListSong = document.getElementById("trackListSong");
const trackListAlbum = document.getElementById("trackListAlbum");

let btnSongToPlay;

let artistName;

let tracks;
let playerIndex = 0;
let album;
let song;
let track;
let pressed = false;
let mouseDownOnSlider = false;

document.addEventListener("load", init());

function init() {
  printSongList();
  //printAlbumList();
  getData();
}

async function getData() {
  try {
    let response = await fetch(albumUrl, {
      headers: {
        Authorization: apiKey,
      },
    });
    album = await response.json();
    //console.log(album);
    tracks = album.tracks.data;
    artistName = album.artist.name;
    song = album.tracks.data[0].preview;
    track = new Audio(song);
    console.log(album);
    //console.log(tracks);
    //console.log(artistName);
    //console.log(song);
    //console.log(track);
    printTrack();
    progressTrack();
  } catch (error) {
    console.log(error);
  }
}

btnSearch.addEventListener("click", (e) => {
  e.preventDefault();
  let inputValue = inputSearch.value;
  //getData(inputValue);
  let secondPage = "artist.html";
  let newUrl = `${secondPage}?_searched-query=${inputValue}`;
  window.location.href = newUrl;
});

/*------ FUNZIONI PLAYER ------*/

playButton.addEventListener("click", (e) => {
  e.preventDefault();
  //console.log(pressed);
  switch (pressed) {
    case true:
      pauseSong(track);
      pressed = false;
      //console.log(pressed);
      playIconPlayerDesktop.style.display = "block";
      pauseIconPlayerDesktop.style.display = "none";

      playIconPlayerMobile.style.display = "block";
      pauseIconPlayerMobile.style.display = "none";
      break;
    case false:
      playSong(track);
      pressed = true;
      //console.log(pressed);
      playIconPlayerDesktop.style.display = "none";
      pauseIconPlayerDesktop.style.display = "block";

      playIconPlayerMobile.style.display = "none";
      pauseIconPlayerMobile.style.display = "block";
      break;
  }
});

btnPlayerMobile.addEventListener("click", (e) => {
  e.preventDefault();
  //console.log(pressed);
  switch (pressed) {
    case true:
      pauseSong(track);
      pressed = false;
      //console.log(pressed);
      playIconPlayerMobile.style.display = "block";
      pauseIconPlayerMobile.style.display = "none";

      playIconPlayerDesktop.style.display = "block";
      pauseIconPlayerDesktop.style.display = "none";
      break;
    case false:
      playSong(track);
      pressed = true;
      //console.log(pressed);
      playIconPlayerMobile.style.display = "none";
      pauseIconPlayerMobile.style.display = "block";

      playIconPlayerDesktop.style.display = "none";
      pauseIconPlayerDesktop.style.display = "block";
      break;
  }
});

function playSong(track) {
  //console.log(song);
  track.play();
  //console.log(track);
}

function pauseSong(track) {
  //console.log(song);
  track.pause();
  //console.log(track);
}

function printTrack() {
  imgAlbumPlayer.setAttribute("src", album.cover_small);
  songName.innerText = album.tracks.data[0].title;
  artistNamePlayer.innerText = album.artist.name;
  songTitlePlayerMobile.innerHTML = `<i class="bi bi-disc text-white"></i>${album.tracks.data[0].title}`;
}

function progressTrack() {
  track.addEventListener("loadeddata", () => {
    progressBar.value = 0;
    currentTime.innerText = "00";
    duration.innerText = Math.round(track.duration);
  });
  track.addEventListener("timeupdate", () => {
    if (!mouseDownOnSlider) {
      progressBar.value = (track.currentTime / track.duration) * 100;
      if (Math.floor(track.currentTime) < 9) {
        currentTime.innerText = "0" + Math.floor(track.currentTime + 1);
      } else {
        currentTime.innerText = Math.floor(track.currentTime + 1);
      }
    }
  });
  progressBar.addEventListener("change", () => {
    const pct = progressBar.value / 100;
    track.currentTime = (track.duration || 0) * pct;
  });
  progressBar.addEventListener("mousedown", () => {
    mouseDownOnSlider = true;
  });
  progressBar.addEventListener("mouseup", () => {
    mouseDownOnSlider = false;
  });
}

btnBackwardDesktop.addEventListener("click", (e) => {
  e.preventDefault();
  if (playerIndex !== 0) {
    resetSong();
    playerIndex -= 1;
    loadSong(tracks[playerIndex].title, tracks[playerIndex].preview, tracks[playerIndex].image);
  }
});

btnForwardDesktop.addEventListener("click", (e) => {
  e.preventDefault();
  if (playerIndex < tracks.length - 1) {
    resetSong();
    playerIndex += 1;
    loadSong(tracks[playerIndex].title, tracks[playerIndex].preview, tracks[playerIndex].image);
  }
});

function printSongList() {
  for (let i = 0; i < myFavSongsObj.length; i++) {
    const newLi = document.createElement("li");
    newLi.classList.add(
      "d-flex",
      "justify-content-between",
      "align-items-center",
      "border-bottom",
      "border-secondary",
      "border-opacity-50"
    );
    newLi.innerHTML = `
                      <div class="col-8 titleSong">
                        <p id="${myFavSongsObj[i].preview}"class="fw-bold mb-1 mx-3 btnSongToPlay">${myFavSongsObj[i].title}</p>
                        <p class="fw-lighter mb-1 mx-3">${myFavSongsObj[i].artist}</p>
                      </div>
                      <p class="col-lg-2 col-sm-3 text-end">&nbsp;</p>
                      <i class="bi bi-heart-fill iconHeartFav"></i>
                      <i class="bi bi-cloud-arrow-down"></i>         
    `;
    trackListSong.appendChild(newLi);
  }
  addClickToSong();
}

function printAlbumList() {
  for (let i = 0; i < myFavAlbumsObj.length; i++) {
    const newLi = document.createElement("li");
    newLi.classList.add(
      "d-flex",
      "justify-content-between",
      "align-items-center",
      "border-bottom",
      "border-secondary",
      "border-opacity-50"
    );
    newLi.innerHTML = `
                      <img src="${myFavAlbumsObj[i].image}" alt="fotoAlbum" height="35px" width="35px" class="mb-1 align-self-center"/>
                      <div class="col-8 titleSong">
                      <p class="fw-bold mb-1 mx-3">${myFavSongsObj[i].title}</p>
                      <p class="fw-lighter mb-1 mx-3">${myFavSongsObj[i].artist}</p>
                      </div>
                      <div class="col-2 text-end">
                      <i class="bi bi-heart-fill iconHeartFav mx-1"></i>
                      <i class="bi bi-cloud-arrow-down mx-1"></i>
                     </div>
    `;
    trackListAlbum.appendChild(newLi);
  }
}

function addClickToSong() {
  btnSongToPlay = document.querySelectorAll(".btnSongToPlay");
  let i = 0;;
  btnSongToPlay.forEach((btn) => {
    btn.trackIndex = i;
    btn.img = myFavSongsObj[i].image;
      console.log(myFavSongsObj[i].image);
    i++;
    //console.log(btn.trackIndex);
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      playerIndex = btn.trackIndex;
      console.log(playerIndex);
      resetSong();
      loadSong(btn.innerText, btn.id, btn.img);
    });
  });
}

function resetSong() {
  pauseSong(track);
  song = null;
  track = null;
  pressed = false;
  playIconPlayerDesktop.style.display = "block";
  pauseIconPlayerDesktop.style.display = "none";
  playIconPlayerMobile.style.display = "block";
  pauseIconPlayerMobile.style.display = "none";
}

function loadSong(title, preview, image) {
  songName.innerText = title;
  console.log(image);
  imgAlbumPlayer.setAttribute("src", image);

  songTitlePlayerMobile.innerHTML = `
  <i class="bi bi-disc text-white"></i>${title}
  `;
 
  let newPreview = preview;
  console.log(newPreview);
  song = newPreview;
  track = new Audio(song);
  progressTrack();
}
