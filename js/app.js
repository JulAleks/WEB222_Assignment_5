/**
 * WEB222 – Assignment 05
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       Julia Alekseev
 *      Student ID: 051292134
 *      Date:       2023-08-02
 */
// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;

// Function to create a song card
function createSongCard(song) {
  //div to hold the cards
  const card = document.createElement("div"); //creaitng div element
  card.classList.add("card");

  // song elemnt
  const songImg = document.createElement("img"); //creating an image element
  songImg.src = song.imageUrl; //assigning the url of the image
  songImg.classList.add("card-image"); //adding image to the card
  card.appendChild(songImg);

  // song title
  const titleElement = document.createElement("h3"); //creating a header element
  titleElement.textContent = song.title; //assigning the title
  card.appendChild(titleElement);

  //song year
  const yearElement = document.createElement("p"); //creating a year element
  yearElement.textContent = song.year; //assigning the year value
  card.appendChild(yearElement);

  //time of the song calculation sec to min
  const minutes = Math.floor(song.duration / 60); //divide to get min
  const seconds = song.duration % 60; //modulus to get remainder of sec
  const duration = `${minutes}:${seconds.toString().padStart(2, "0")}`; //assigning the result to the duration

  const durationElement = document.createElement("p"); //creating time element
  durationElement.textContent = duration; //assigning value
  card.appendChild(durationElement);

  //clicking on card will take to url of the song in a diffrent window
  card.addEventListener("click", () => {
    // Open the first link in a new tab
    window.open(song.links[0].url, "newWindow");
  });

  return card;
}

//update cards
function updateSongsCards(artistId) {
  // Find artist
  const selectedArtist = artists.find((artist) => artist.id === artistId);

  // Update artist title and links
  selectedArtistTitle.textContent = selectedArtist.name;
  const artistLinks = selectedArtist.links
    .map((link) => `<a href="${link.url}" target="_blank">${link.name}</a>`)
    .join(", ");
  selectedArtistTitle.innerHTML = `${selectedArtist.name} (${artistLinks})`;

  // Clear cards
  cardsContainer.innerHTML = "";

  // Find songs
  const songsBySelectedArtist = songs.filter((song) => song.artistId === artistId);

  // Create song cards
  for (const song of songsBySelectedArtist) {
    const songCard = createSongCard(song);
    cardsContainer.appendChild(songCard);

    // Add event listener to each song card
    songCard.addEventListener("click", () => {
      console.log("Row clicked for the song:", song.title);
    });
  }
}

// Make a menu
const menu = document.getElementById("menu");

// Loop through the artists array
for (const artist of artists) {
  // Create a button for each artist
  const button = document.createElement("button");
  button.textContent = artist.name;
  button.setAttribute("dataArtistID", artist.id); // Add dataArtistID attribute

  // Add a click event listener to each button
  button.addEventListener("click", () => {
    const artistId = artist.id;
    console.log("Button clicked for artist:", artist.name); //console log the name of the artist
    updateSongsCards(artistId);
  });

  // Append the button to the menu container
  menu.appendChild(button);
}

// Get references to the artist and song elements
const selectedArtistTitle = document.getElementById("selectedArtist");
const cardsContainer = document.getElementById("cardSongs");

// make Korn default artist
updateSongsCards(artists[0].id);
