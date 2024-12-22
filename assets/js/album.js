const endPoint = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzViZjcxMWQyMjA3MTAwMTVkZTJmM2MiLCJpYXQiOjE3MzQwODAyNzQsImV4cCI6MTczNTI4OTg3NH0.v17yR1ttMjJ502S2x6eTRuGLyGMxouajUcqejbw_Pes";

const url = new URLSearchParams(window.location.search);
const albumId = url.get("_album-id");

const albumUrl = `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`;

const imgAlbumTop = document.getElementById("imgAlbumTop");
const albumTitleTop = document.getElementById("albumTitleTop");
const artistNameTop = document.getElementById("artistNameTop");
const imgAlbumDown = document.getElementById("imgAlbumDown");
const albumTitleDown = document.getElementById("albumTitleDown");
const artistNameDown = document.getElementById("artistNameDown");
const trackList = document.getElementById("trackList");

let btnSongToPlay;

let album;
let tracks;
let artistName;

/*----- VARIABILI FUNZIONI PLAYER*/
const playButton = document.getElementById("btnPlay");

const songName = document.getElementById("songName");
const albumTitlePlayer = document.getElementById("albumTitlePlayer");
const imgAlbumPlayer = document.getElementById("imgAlbumPlayer");

const progressBar = document.getElementById("seekBar");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const playIconPlayerDesktop = document.getElementById("playIconPlayerDesktop");
const pauseIconPlayerDesktop = document.getElementById("pauseIconPlayerDesktop");

const btnBackwardDesktop = document.getElementById("btnBackwardDesktop");
const btnForwardDesktop = document.getElementById("btnForwardDesktop");

/*----- VARIABILI FUNZIONI PLAYER MOBILE */
const songTitlePlayerMobile = document.getElementById("songTitlePlayerMobile");
const btnPlayerMobile = document.getElementById("btnPlayerMobile");
const playIconPlayerMobile = document.getElementById("playIconPlayerMobile");
const pauseIconPlayerMobile = document.getElementById("pauseIconPlayerMobile");

let song;
let track;
let trackTitles = [];
let playerIndex = 0;
let pressed = false;
let mouseDownOnSlider = false;

document.addEventListener("load", init());

function init() {
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
    tracks = album.tracks.data;
    artistName = album.artist.name;
    song = album.tracks.data[0].preview;
    track = new Audio(song);
    //console.log(album);
    console.log(tracks);
    //console.log(artistName);
    console.log(song);
    console.log(track);
    printData();
    printTrack();
    progressTrack();
  } catch (error) {
    console.log(error);
  }
}

function printData() {
  imgAlbumTop.setAttribute("src", album.cover_big);
  albumTitleTop.innerText = album.title;
  imgAlbumDown.setAttribute("src", album.cover_big);
  albumTitleDown.innerText = album.title;
  artistNameDown.innerHTML = `
  <img src="${getArtistPhoto()}" alt="Logo singer" class="mx-2"/>
                <p>${artistName}</p>
  `;
  artistNameTop.innerHTML = `
  <img
                      src="${getArtistPhoto()}"
                      class="immagineProfiloMusica"
                      alt=""
                    />${artistName}
  `;
  //artistNameTop.innerText = getArtistName();
  for (let i = 0; i < tracks.length; i++) {
    trackTitles.push(tracks[i].title);
    //tracks[i].trackIndex = i;
    //console.log(tracks[i].playerIndex);
    let newLi = document.createElement("li");
    newLi.classList.add(
      "d-flex",
      "align-items-center",
      "justify-content-around",
      "w-100",
      "m-0"
    );
    let duration = (tracks[i].duration / 60).toFixed(2);
    newLi.innerHTML = `
                  <div class="col-5 titleSong">
                    <p id="${tracks[i].preview}" class="fw-bold mb-1 btn btn-success bg-transparent border-0 p-0 m-0 text-success text-start btnSongToPlay">${tracks[i].title}</p>
                    <p class="fw-lighter mb-1">${artistName}</p>
                  </div>
                  <p class="col-lg-3 d-lg-block d-none">122.631.768</p>
                  <p class="col-lg-1 col-sm-3 text-end">${duration} s</p>
                  <i class="d-lg-none col-sm-1 bi bi-three-dots-vertical text-end"></i>
                
    `;
    trackList.appendChild(newLi);
  }
  console.log(trackTitles);
  addClickToSong();
}

function getArtistPhoto() {
  let artistPhoto;
  switch (artistName) {
    case "Queen":
      artistPhoto = "assets/imgs/artists/queen.jpg";
      break;
    case "Salmo":
      artistPhoto = "assets/imgs/artists/salmo.jpg";
      break;
    case "Lady Gaga":
      artistPhoto = "assets/imgs/artists/ladyGaga.jpg";
      break;
    case "The Weeknd":
      artistPhoto = "assets/imgs/artists/theWeeknd.jpg";
      break;
    case "Lana Del Rey":
      artistPhoto = "assets/imgs/artists/lanaDelRey.jpg";
      break;
    case "Rihanna":
      artistPhoto = "assets/imgs/artists/rihanna.jpg";
      break;
    case "Tiziano Ferro":
      artistPhoto = "assets/imgs/artists/tizianoFerro.jpg";
      break;
    case "Lazza":
      artistPhoto = "assets/imgs/artists/lazza.jpg";
      break;
    case "Eminem":
      artistPhoto = "assets/imgs/artists/eminem.jpg";
      break;
    case "Achille Lauro":
      artistPhoto = "assets/imgs/artists/achilleLauro.jpg";
      break;
    default:
      artistPhoto = album.artist.picture_small;
  }
  return artistPhoto;
}

btnSearch.addEventListener("click", (e) => {
  e.preventDefault();
  let inputValue = inputSearch.value;
  //getData(inputValue);
  let secondPage = "artist.html";
  let newUrl = `${secondPage}?_searched-query=${inputValue}`;
  window.location.href = newUrl;
});

/*------ FUNZIONI PLAYER -------*/
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
  console.log(track);
}

function pauseSong(track) {
  //console.log(song);
  track.pause();
  console.log(track);
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

function addClickToSong() {
  btnSongToPlay = document.querySelectorAll(".btnSongToPlay");
  let i = 0;
  btnSongToPlay.forEach((btn) => {
    btn.trackIndex = i;
    i++;
    console.log(btn.trackIndex);
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      playerIndex = btn.trackIndex;
      console.log(playerIndex);
      resetSong();
      loadSong(btn.innerText, btn.id);
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

function loadSong(title, preview) {
  songName.innerText = title;

  songTitlePlayerMobile.innerHTML = `
  <i class="bi bi-disc text-white"></i>${title}
  `;

  let newPreview = preview;
  console.log(newPreview);
  song = newPreview;
  track = new Audio(song);
  progressTrack();
}

btnBackwardDesktop.addEventListener("click", (e) => {
  e.preventDefault();
  if (playerIndex !== 0) {
    resetSong();
    playerIndex -= 1;
    loadSong(tracks[playerIndex].title, tracks[playerIndex].preview);
  }
});

btnForwardDesktop.addEventListener("click", (e) => {
  e.preventDefault();
  if (playerIndex < tracks.length - 1) {
    resetSong();
    playerIndex += 1;
    loadSong(tracks[playerIndex].title, tracks[playerIndex].preview);
  }
});
