// Przechowywanie artystów i piosenek w localStorage
let artists = JSON.parse(localStorage.getItem("artists")) || [];
let songs = JSON.parse(localStorage.getItem("songs")) || [];

// Funkcja dodawania artysty
function addArtist() {
    const artistName = document.getElementById("artist-name").value;
    if (artistName) {
        const artist = {
            name: artistName,
        };
        artists.push(artist);
        localStorage.setItem("artists", JSON.stringify(artists));
        document.getElementById("artist-name").value = ''; // Wyczyść pole
        updateArtistList();
    }
}

// Funkcja dodawania piosenki
function addSong() {
    const songTitle = document.getElementById("song-title").value;
    const songArtist = document.getElementById("song-artist").value;
    if (songTitle && songArtist) {
        const song = {
            title: songTitle,
            artist: songArtist,
            totalStreams: Math.floor(Math.random() * 10000000), // Początkowa liczba odtworzeń
            highestPosition: 0,
        };
        songs.push(song);
        localStorage.setItem("songs", JSON.stringify(songs));
        document.getElementById("song-title").value = ''; // Wyczyść pole
        document.getElementById("song-artist").value = ''; // Wyczyść pole
        updateSongList();
    }
}

// Funkcja aktualizująca listę artystów
function updateArtistList() {
    const artistList = document.getElementById("artist-list");
    artistList.innerHTML = '';
    artists.forEach((artist, index) => {
        const artistItem = document.createElement("li");
        artistItem.classList.add("artist-item");
        artistItem.innerText = artist.name;
        artistItem.onclick = () => showArtistSongs(index);
        artistList.appendChild(artistItem);
    });
}

// Funkcja aktualizująca listę piosenek
function updateSongList() {
    const songList = document.getElementById("song-list");
    songList.innerHTML = '';
    songs.forEach((song, index) => {
        const songItem = document.createElement("li");
        songItem.classList.add("song-item");
        songItem.innerText = `${song.title} - ${song.artist}`;
        songItem.onclick = () => showSongDetail(index);
        songList.appendChild(songItem);
    });
}

// Funkcja wyświetlania szczegółów piosenki
function showSongDetail(index) {
    const song = songs[index];
    document.getElementById("song-detail-title").innerText = song.title;
    document.getElementById("song-detail-artist").innerText = song.artist;
    document.getElementById("song-detail-streams").innerText = song.totalStreams;
    document.getElementById("song-detail-highest-position").innerText = song.highestPosition;
    document.getElementById("song-detail-modal").style.display = "block";
}

// Funkcja zamknięcia szczegółów piosenki
function closeSongDetail() {
    document.getElementById("song-detail-modal").style.display = "none";
}

// Funkcja aktualizowania liczby odtworzeń co 2 minuty
function updateStreams() {
    songs.forEach((song, index) => {
        const newStreams = song.totalStreams + Math.floor(Math.random() * 10000000);
        songs[index].totalStreams = newStreams;
    });
    localStorage.setItem("songs", JSON.stringify(songs));
    updateSongList();
}

// Aktualizowanie odtworzeń co 2 minuty
setInterval(updateStreams, 120000); // 120000ms = 2 minuty

// Inicjalizacja strony
updateArtistList();
updateSongList();
