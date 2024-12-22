const endPoint = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzViZjcxMWQyMjA3MTAwMTVkZTJmM2MiLCJpYXQiOjE3MzQwODAyNzQsImV4cCI6MTczNTI4OTg3NH0.v17yR1ttMjJ502S2x6eTRuGLyGMxouajUcqejbw_Pes";

const url = new URLSearchParams(window.location.search);

const query = url.get("_searched-query");
const artistId = url.get("_artist-id");
const paramArtistName = url.get("_artist-name");
//console.log(paramArtistName);

const artistNameLastPage = document.getElementById("artistNameLastPage");
const artistAlbumsListLastPage = document.getElementById(
  "artistAlbumsListLastPage"
);
const artistCover = document.getElementById("artistCover");
const artistNameLastPageDown = document.getElementById(
  "artistNameLastPageDown"
);
const artistCoverDown = document.getElementById("artistCoverDown");

let albums;
let artistName;
let tracks0;

/*----- VARIABILI FUNZIONI PLAYER */
const playButton = document.getElementById("btnPlay");

const songName = document.getElementById("songName");
const albumTitlePlayer = document.getElementById("albumTitlePlayer");
const imgAlbumPlayer = document.getElementById("imgAlbumPlayer");

const progressBar = document.getElementById("seekBar");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

let tracks;
let playerIndex = 0;
let album;
let albumId;
let song;
let track;
let pressed = false;
let mouseDownOnSlider = false;

document.addEventListener("load", init());

function init() {
  getData();
}

async function getData() {
  try {
    let response = await fetch(createUrl(), {
      headers: {
        Authorization: apiKey,
      },
    });
    albumId = sessionStorage.getItem("id");
    if (!checkQuery()) {
      let tempData = await response.json();
      albums = tempData.data;
      console.log(albums);
      printArtist();
    } else {
      let tempData = await response.json();
      tracks0 = tempData.data;
      console.log(tracks0);
      printQuery();
    }
    getTrack()
  } catch (error) {
    console.log(error);
  }
}

function checkQuery() {
  if (query) {
    return true;
  } else {
    return false;
  }
}

function createUrl() {
  if (checkQuery()) {
    let fetchUrl = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`;
    return fetchUrl;
  } else {
    let fetchUrl = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/albums`;
    return fetchUrl;
  }
}

function printArtist() {
  artistNameLastPage.innerText = getArtistName();
  artistNameLastPageDown.innerText = getArtistName();
  artistCover.setAttribute("src", getArtistPhoto());
  artistCoverDown.setAttribute("src", getArtistPhoto());
  for (let i = 0; i < albums.length; i++) {
    let newLi = document.createElement("li");
    newLi.classList.add(
      "d-flex",
      "align-items-center",
      "justify-content-between",
      "w-100",
      "col-lg-1"
    );
    newLi.innerHTML = `
                          <img
                            class="col-2"
                            src="assets/imgs/search/image-1.jpeg"
                            alt="songOne"
                          />
                          <a class="col-6 text-decoration-none text-success" href="album.html?_album-id=${albums[i].id}">${albums[i].title}</a>
                          <p class="col-2">183.811.268</p>
                          <p class="col-1">${albums[i].fans} fan</p>
                        
                        `;
    artistAlbumsListLastPage.appendChild(newLi);
  }
}

function printQuery() {
  artistNameLastPage.innerText = `Hai cercato: "${query}"`;
  artistNameLastPageDown.innerText = `Hai cercato: "${query}"`;
  artistNameLastPage.style.color = "yellow";
  artistNameLastPageDown.style.color = "yellow";
  artistCover.setAttribute("src", "assets/imgs/search/image-21.jpg");
  artistCoverDown.setAttribute("src", "assets/imgs/search/image-21.jpg");
  for (let i = 0; i < tracks0.length; i++) {
    let newLi = document.createElement("li");
    newLi.classList.add(
      "d-flex",
      "align-items-center",
      "justify-content-between",
      "w-100",
      "col-lg-1"
    );

    let duration = (tracks0[i].duration / 60).toFixed(2);
    newLi.innerHTML = `
                          <img
                            class="col-2"
                            src=${tracks0[i].album.cover_small}
                            alt="songOne"
                          />
                          <div class="col-6 d-flex flex-column">
                          <a class="text-decoration-none text-white">${tracks0[i].title}</a>
                          <a class="text-decoration-none text-success" href="artist.html?_artist-id=${tracks0[i].artist.id}&_artist-name=${tracks0[i].artist.name}">${tracks0[i].artist.name}</a>
                          </div>
                          <p class="col-2">183.811.268</p>
                          <p class="col-1">${duration}</p>
                        
                        `;
    artistAlbumsListLastPage.appendChild(newLi);
  }
}

function getArtistName() {
  switch (artistId) {
    case "412":
      artistName = "Queen";
      break;
    case "1155242":
      artistName = "Salmo";
      break;
    case "75491":
      artistName = "Lady Gaga";
      break;
    case "4050205":
      artistName = "The Weeknd";
      break;
    case "1424821":
      artistName = "Lana Del Rey";
      break;
    case "564":
      artistName = "Rihanna";
      break;
    case "5648":
      artistName = "Tiziano Ferro";
      break;
    case "1288678":
      artistName = "Lazza";
      break;
    case "13":
      artistName = "Eminem";
      break;
    case "598070":
      artistName = "Achille Lauro";
      break;
    default:
      artistName = paramArtistName;
  }
  return artistName;
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
      artistPhoto = albums[0].cover_big;
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
albumId = sessionStorage.getItem("id");

async function getTrack() {
  try {
    let response = await fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`,
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );
    album = await response.json();
    tracks = album.tracks.data;
    console.log(album);
    song = album.tracks.data[0].preview;
    track = new Audio(song);
    progressTrack();
    //console.log(song);
    //console.log(track);
    printTrack();
  } catch (error) {
    console.log(error);
  }
}

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