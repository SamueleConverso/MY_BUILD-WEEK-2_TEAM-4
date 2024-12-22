const endPoint = "https://striveschool-api.herokuapp.com/api/deezer/album/";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzViZjcxMWQyMjA3MTAwMTVkZTJmM2MiLCJpYXQiOjE3MzQwODAyNzQsImV4cCI6MTczNTI4OTg3NH0.v17yR1ttMjJ502S2x6eTRuGLyGMxouajUcqejbw_Pes";
const myArtists = [
  412, 1155242, 75491, 4050205, 1424821, 564, 5648, 1288678, 13, 598070,
]; //Queen = 412; Salmo = 1155242; Lady Gaga = 75491; The Weeknd = 4050205; Lana Del Rey = 1424821; Rihanna = 564; Tiziano Ferro = 5648; Lazza = 1288678; Eminem = 13; Achille Lauro = 598070

const imgAlbum = document.getElementById("imgAlbum");
const albumTitle = document.getElementById("albumTitle");
const artistName = document.getElementById("artistName");

const btnToAlbum = document.getElementById("btnToAlbum");
const btnSearch = document.getElementById("btnSearch");
const inputSearch = document.getElementById("inputSearch");

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

/*----- VARIABILI ALBUM SCORREVOLI */
const goPreviousAlbum = document.getElementById("goPreviousAlbum");
const goNextAlbum = document.getElementById("goNextAlbum");

/*----- VARIABILI BOTTONE PREFERITI */
const btnToFavouriteSongsDesktop = document.getElementById(
  "btnToFavouriteSongsDesktop"
);
const btnToFavouriteSongsMobile = document.getElementById(
  "btnToFavouriteSongsMobile"
);
const btnRemoveFavouriteSongsDesktop = document.getElementById(
  "btnRemoveFavouriteSongsDesktop"
);
const btnRemoveFavouriteSongsMobile = document.getElementById(
  "btnRemoveFavouriteSongsMobile"
);

const btnAddFavouriteAlbum = document.getElementById("addFavouriteAlbum");
const btnRemoveFavouriteAlbum = document.getElementById("removeFavouriteAlbum");

const linkToPlaylistPage = document.getElementById("linkToPlaylistPage");
const linkToPlaylistPage2 = document.getElementById("linkToPlaylistPage2");

let randomArtist;
let randomArtistName;
let randomAlbum;
let query;
let fetchedAlbums;
let dataSearched;
let albumId;
let album;
let pressed = false;
let track;
let song;
//let track = new Audio(song);
let mouseDownOnSlider = false;

let tracks = [];
let playerIndex = 0;

let albumIndex = 0;
let isRandomAlreadyCalled = false;
let albumArr;
let isAlbumChanged = false;
let isFetchFinished = true;

class FavSong {
  constructor(_id, _title, _artist, _preview, _image) {
    this.id = _id;
    this.title = _title;
    this.artist = _artist;
    this.preview = _preview;
    this.image = _image;
  }
}
let favSongArr =
  JSON.parse(localStorage.getItem("myFavouriteSongs")) !== null
    ? JSON.parse(localStorage.getItem("myFavouriteSongs"))
    : [];

class FavAlbum {
  constructor(_id, _title, _artist, _image) {
    this.id = _id;
    this.title = _title;
    this.artist = _artist;
    this.image = _image;
  }
}

let favAlbumArr = [];
let newFavAlbum;

//let favAlbumArr = [];

//https://striveschool-api.herokuapp.com/api/deezer/artist/412/albums

document.addEventListener("load", init());

function init() {
  randomArtist = getRandom(myArtists);
  artistName.setAttribute("href", `artist.html?_artist-id=${randomArtist}`);
  getData(query);
}

async function getData(newQuery) {
  query = newQuery;
  try {
    let response = await fetch(createUrl(), {
      headers: {
        Authorization: apiKey,
      },
    });
    if (!query) {
      fetchedAlbums = await response.json();
      randomAlbum = getRandom(fetchedAlbums.data);
      albumId = randomAlbum.id;
      //sessionStorage.setItem("id", albumId);
      //console.log(albumId);
      //let dataAlbums = fetchedAlbums.data;
      //randomAlbum = getRandomAlbum();
      //console.log(fetchedAlbums.data);
      //console.log(randomAlbum);
      printData();
    } else {
      let tempData = await response.json();
      dataSearched = tempData.data;
      //console.log(dataSearched);
    }
    getTrack();
  } catch (error) {
    console.log(error);
    // setTimeout(() => {
    //   location.reload();
    // }, 3000);
  }
}

function createUrl() {
  if (!query) {
    let url = `https://striveschool-api.herokuapp.com/api/deezer/artist/${randomArtist}/albums`;
    return url;
  } else {
    let url = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`;
    return url;
  }
}

function getRandom(arr) {
  const original = [...arr];
  //console.log(arr);
  const myMusic = [];

  for (let i = 0; i < arr.length; i++) {
    const song = Math.floor(Math.random() * original.length);
    myMusic.push(original[song]);
    original.splice(song, 1);
  }
  //console.log(myMusic);
  if (isRandomAlreadyCalled) {
    albumArr = myMusic;
    console.log(albumArr);
  }
  //console.log(albumArr);
  isRandomAlreadyCalled = true;
  return myMusic[0];
}

// function getRandomAlbum() {
//   let ranNum = Math.floor(Math.random() * fetchedAlbums.length);
//   randomAlbum = fetchedAlbums[ranNum];
//   return randomAlbum;
// }

function printData() {
  imgAlbum.setAttribute("src", randomAlbum.cover_medium);
  albumTitle.innerText = randomAlbum.title;
  artistName.innerText = getArtistName();
}

function getArtistName() {
  switch (randomArtist) {
    case 412:
      randomArtistName = "Queen";
      break;
    case 1155242:
      randomArtistName = "Salmo";
      break;
    case 75491:
      randomArtistName = "Lady Gaga";
      break;
    case 4050205:
      randomArtistName = "The Weeknd";
      break;
    case 1424821:
      randomArtistName = "Lana Del Rey";
      break;
    case 564:
      randomArtistName = "Rihanna";
      break;
    case 5648:
      randomArtistName = "Tiziano Ferro";
      break;
    case 1288678:
      randomArtistName = "Lazza";
      break;
    case 13:
      randomArtistName = "Eminem";
      break;
    case 598070:
      randomArtistName = "Achille Lauro";
      break;
  }
  return randomArtistName;
}

btnToAlbum.addEventListener("click", (e) => {
  e.preventDefault();
  let secondPage = "album.html";
  let newUrl = `${secondPage}?_album-id=${randomAlbum.id}`;
  window.location.href = newUrl;
});

btnSearch.addEventListener("click", (e) => {
  e.preventDefault();
  let inputValue = inputSearch.value;
  //getData(inputValue);
  let secondPage = "artist.html";
  let newUrl = `${secondPage}?_searched-query=${inputValue}`;
  window.location.href = newUrl;
});

/*------ FUNZIONI PLAYER -------*/
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
    //console.log(album);
    //console.log(tracks);
    song = album.tracks.data[0].preview;
    sessionStorage.setItem("id", album.id);
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
  if (isAlbumChanged) {
    imgAlbumPlayer.setAttribute("src", albumArr[albumIndex].cover_small);
  } else {
    imgAlbumPlayer.setAttribute("src", randomAlbum.cover_small);
  }

  songName.innerText = album.tracks.data[0].title;
  artistNamePlayer.innerText = getArtistName();
  songTitlePlayerMobile.innerHTML = `<i class="bi bi-disc text-white"></i>${album.tracks.data[0].title}`;

  for (let i = 0; i < favSongArr.length; i++) {
    if (tracks[0].id !== favSongArr[i].id) {
      btnRemoveFavouriteSongsDesktop.style.display = "none";
      btnToFavouriteSongsDesktop.style.display = "block";
      break;
    }
  }

  setTimeout(() => {
    isFetchFinished = true;
  }, 250);
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
    updateFavButtons();
    loadSong(tracks[playerIndex].title, tracks[playerIndex].preview);
  }
});

btnForwardDesktop.addEventListener("click", (e) => {
  e.preventDefault();
  if (playerIndex < tracks.length - 1) {
    resetSong();
    playerIndex += 1;
    console.log(playerIndex);
    updateFavButtons();
    loadSong(tracks[playerIndex].title, tracks[playerIndex].preview);
  }
});

/*goPreviousAlbum.addEventListener("dblclick", (e) => {
  e.preventDefault();
  return;
});

goNextAlbum.addEventListener("dblclick", (e) => {
  e.preventDefault();
  return;
});

goPreviousAlbum.addEventListener(
  "dblclick",
  (event) => {
    console.log("click disabled!");
    event.preventDefault();
    event.stopPropagation();
    return false;
  },
  true
);
*/

goPreviousAlbum.addEventListener("click", (e) => {
  e.preventDefault();
  if (isFetchFinished) {
    isFetchFinished = false;
    //console.log("ciao");
    //albumIndex = 1;
    console.log(albumArr);
    //console.log(albumArr[albumIndex]);
    if (albumIndex !== 0) {
      resetSong();
      albumIndex -= 1;
      playerIndex = 0;
      isAlbumChanged = true;
      albumId = albumArr[albumIndex].id;
      imgAlbum.setAttribute("src", albumArr[albumIndex].cover_medium);
      albumTitle.innerText = albumArr[albumIndex].title;
      //artistName.innerText = "nomeArtista";
      getTrack();
      //loadSong(albumArr[albumIndex].title, albumArr[albumIndex].preview);
      //updateFavButtonAlbum();
    }
  }
});

goNextAlbum.addEventListener("click", (e) => {
  e.preventDefault();
  if (isFetchFinished) {
    isFetchFinished = false;
    // console.log("ciaone");
    // console.log(albumIndex);
    // console.log(albumArr);
    if (albumIndex < albumArr.length - 1) {
      resetSong();
      albumIndex += 1;
      playerIndex = 0;
      isAlbumChanged = true;
      albumId = albumArr[albumIndex].id;
      imgAlbum.setAttribute("src", albumArr[albumIndex].cover_medium);
      albumTitle.innerText = albumArr[albumIndex].title;
      //artistName.innerText = "nomeArtista";
      getTrack();
      //updateFavButtonAlbum();
    }
    //loadSong(albumArr[albumIndex].title, albumArr[albumIndex].preview);
  }
});

/*------ FUNZIONI SALVA BRANI ------*/

btnToFavouriteSongsDesktop.addEventListener("click", (e) => {
  e.preventDefault();
  if (favSongArr.length !== 0) {
    for (let i = 0; i < favSongArr.length; i++) {
      if (album.tracks.data[playerIndex].id !== favSongArr[i].id) {
        let newFavSong = new FavSong(
          album.tracks.data[playerIndex].id,
          album.tracks.data[playerIndex].title,
          album.artist.name,
          album.tracks.data[playerIndex].preview,
          album.cover_small
        );
        favSongArr.push(newFavSong);
        btnToFavouriteSongsDesktop.style.display = "none";
        btnRemoveFavouriteSongsDesktop.style.display = "block";
        updateFavButtons();
        break;
      }
    }
  } else {
    let newFavSong = new FavSong(
      album.tracks.data[playerIndex].id,
      album.tracks.data[playerIndex].title,
      album.artist.name,
      album.tracks.data[playerIndex].preview,
      album.cover_small
    );
    favSongArr.push(newFavSong);
    btnToFavouriteSongsDesktop.style.display = "none";
    btnRemoveFavouriteSongsDesktop.style.display = "block";
  }
  // if (favSongArr.length === 0) {
  //   let newFavSong = new FavSong(
  //     album.tracks.data[playerIndex].id,
  //     album.tracks.data[playerIndex].title,
  //     album.artist.name,
  //     album.tracks.data[playerIndex].preview
  //   );
  //   favSongArr.push(newFavSong);
  //   btnToFavouriteSongsDesktop.style.display = "none";
  //   btnRemoveFavouriteSongsDesktop.style.display = "block";
  // }

  // favSongArr.push(newFavSong);
  // btnToFavouriteSongsDesktop.style.display = "none";
  // btnRemoveFavouriteSongsDesktop.style.display = "block";
  //updateFavButtons();

  console.log(favSongArr);
});

btnToFavouriteSongsMobile.addEventListener("click", (e) => {
  e.preventDefault();
});

btnRemoveFavouriteSongsDesktop.addEventListener("click", (e) => {
  e.preventDefault();

  for (let i = 0; i < favSongArr.length; i++) {
    if (album.tracks.data[playerIndex].id === favSongArr[i].id) {
      favSongArr.splice(i, 1);
      btnRemoveFavouriteSongsDesktop.style.display = "none";
      btnToFavouriteSongsDesktop.style.display = "block";
      break;
    }
  }

  // if (album.tracks.data[playerIndex].id === favSongArr[playerIndex].id) {
  //   favSongArr.splice(playerIndex, 1);
  // }
  btnToFavouriteSongsDesktop.style.display = "block";
  btnRemoveFavouriteSongsDesktop.style.display = "none";
  console.log(favSongArr);
});

btnRemoveFavouriteSongsMobile.addEventListener("click", (e) => {
  e.preventDefault();
});

// function updateFavButtons() {
//   for (let i = 0; i < favSongArr.length; i++) {
//     if (album.tracks.data[playerIndex].id === favSongArr[i].id) {
//       console.log("già nei preferiti");
//       btnToFavouriteSongsDesktop.style.display = "none";
//       btnRemoveFavouriteSongsDesktop.style.display = "block";
//       break;
//     } else {
//       btnToFavouriteSongsDesktop.style.display = "block";
//       btnRemoveFavouriteSongsDesktop.style.display = "none";
//       break;
//     }
//   }
// }

function updateFavButtons() {
  let found = false;
  for (let i = 0; i < favSongArr.length; i++) {
    if (album.tracks.data[playerIndex].id === favSongArr[i].id) {
      found = true;
      break;
    }
  }
  if (found) {
    btnToFavouriteSongsDesktop.style.display = "none";
    btnRemoveFavouriteSongsDesktop.style.display = "block";
  } else {
    btnToFavouriteSongsDesktop.style.display = "block";
    btnRemoveFavouriteSongsDesktop.style.display = "none";
  }
}

linkToPlaylistPage.addEventListener("click", (e) => {
  e.preventDefault();
  let favSongStr = JSON.stringify(favSongArr);
  localStorage.setItem("myFavouriteSongs", favSongStr);
  window.location.href = "playlist.html";
});

linkToPlaylistPage2.addEventListener("click", (e) => {
  let favSongStr = JSON.stringify(favSongArr);
  localStorage.setItem("myFavouriteSongs", favSongStr);
  window.location.href = "playlist.html";
});

/*------ FUNZIONI SALVA ALBUM ------*/
/*
btnAddFavouriteAlbum.addEventListener("click", (e) => {
  e.preventDefault();
  if (favAlbumArr.length !== 0) {
    for (let i = 0; i < favAlbumArr.length; i++) {
      if (album.id !== favAlbumArr[i].id) {
        newFavAlbum = new FavAlbum(
          album.id,
          album.title,
          album.artist.name,
          album.cover_small,
        );
        favAlbumArr.push(newFavAlbum);
        btnAddFavouriteAlbum.style.display = "none";
        btnRemoveFavouriteAlbum.style.display = "block";
        btnRemoveFavouriteAlbum.innerText = "Rimuovi";
        //updateFavButtons();
        break;
      }
    }
  } else {
    newFavAlbum = new FavAlbum(
      album.id,
      album.title,
      album.artist.name,
      album.cover_small,
    );
    favAlbumArr.push(newFavAlbum);
    btnAddFavouriteAlbum.style.display = "none";
    btnRemoveFavouriteAlbum.style.display = "block";
    btnRemoveFavouriteAlbum.innerText = "Rimuovi";
  }
  console.log(favAlbumArr);
  //console.log(newFavAlbum);
});

btnRemoveFavouriteAlbum.addEventListener("click", (e) => {
  e.preventDefault();
  if (newFavAlbum.id === favAlbumArr.id) {
    favAlbumArr.splice(newFavAlbum.id);
  }
  btnRemoveFavouriteAlbum.style.display = "none";
  btnAddFavouriteAlbum.style.display = "block";
  btnRemoveFavouriteAlbum.innerText = "Salva";
  console.log(favAlbumArr);
});

function updateFavButtonAlbum() {
  for (let i = 0; i < favAlbumArr.length; i++) {
    if (album.id === favAlbumArr[i].id) {
      console.log("già nei preferiti");
      btnAddFavouriteAlbum.style.display = "none";
      btnRemoveFavouriteAlbum.style.display = "block";
      break;
    } else {
      btnAddFavouriteAlbum.style.display = "block";
      btnRemoveFavouriteAlbum.style.display = "none";
    }
  }
}

linkToPlaylistPage.addEventListener("click", (e) => {
  e.preventDefault();
  let favAlbumStr = JSON.stringify(favAlbumArr);
  localStorage.setItem("myFavouriteAlbums", favAlbumStr);
  window.location.href = "playlist.html";
});*/
