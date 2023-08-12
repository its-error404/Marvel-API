const MD5Hash = "7b41717548d1933bfd2307e79888325e";
const timeStamp = 1;
const publicKey = "6cda15d0c3c12522a4d8a70197c4103f";

const apiAllCharacters = `https://gateway.marvel.com/v1/public/characters?ts=${timeStamp}&apikey=${publicKey}&hash=${MD5Hash}`;
const apiSingleCharacter = `https://gateway.marvel.com/v1/public/characters?ts=${timeStamp}&apikey=${publicKey}&hash=${MD5Hash}&name=${characterName}`;

const characterGrid = document.getElementById("character-grid");
const displayAllCharactersButton = document.getElementById("multiple-button");
const displaySingleCharacterButton = document.getElementById("submit-button");

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const submitButton = document.getElementById("submit-button");

//Fetching All Characters 

const fetchAllCharacters = () => {
  fetch(apiAllCharacters)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const characters = data.data.results;

      characters.forEach((character) => {
        createCharacterCard(character);
      });
    })
    .catch((error) => {
      console.log("Error while fetching the data", error);
    });
};

//Fetching Single Character 

const fetchSingleCharacter = (e) => {
  console.log(e);
  e.preventDefault();

  const characterNameInput = document.getElementById("characterName").value;
  const apiSingleCharacter = `https://gateway.marvel.com/v1/public/characters?ts=${timeStamp}&apikey=${publicKey}&hash=${MD5Hash}&name=${encodeURIComponent(characterNameInput)}`;

  fetch(apiSingleCharacter)
    .then((response) => response.json())
    .then((data) => {
      const singleCharacter = data.data.results[0];

      if (singleCharacter) {
        createCharacterCard(singleCharacter);
      } else {
        console.log("Character not found.");
      }
    })
    .catch((error) => {
      console.log("Error while fetching the data", error);
    });
};

//Searching Character Functionality

const fetchCharactersByNameStartsWith = (searchInput) => {
    const MD5Hash = "7b41717548d1933bfd2307e79888325e";
const timeStamp = 1;
const publicKey = "6cda15d0c3c12522a4d8a70197c4103f";
  
    const apiSearchCharacters = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${encodeURIComponent(searchInput)}&apikey=${publicKey}&hash=${MD5Hash}&ts=${timeStamp}`;
    console.log(apiSearchCharacters)
  fetch(apiSearchCharacters)
    .then((response) => response.json())
    .then((data) => {
        if (data && data.data && data.data.results) {
            characterGrid.innerHTML = "";
            const characters = data.data.results;
            characters.forEach((character) => {
                createCharacterCard(character);
            });
        } else {
            console.log("error");
        }
    })
    .catch((error) => {
        console.log("Error while fetching the data", error);
    })};


//Search Character Logic

searchButton.addEventListener("click", () => {
  console.log(searchInput.value)
  const searchQuery = searchInput.value.trim();
  console.log(searchQuery)

  
  if (searchQuery !== "") {
    fetchCharactersByNameStartsWith(searchQuery);
  }
});

//Character Card Creation

const createCharacterCard = (character) => {
  const characterCard = document.createElement("div");
  characterCard.classList.add("card");
  characterCard.innerHTML = `
        <div class="image">
            <img src="${character.thumbnail.path}.${character.thumbnail.extension}">
        </div>
        <div class="content">
            <h3>${character.name}</h3><br>
            <p><b>Character ID:</b> &nbsp; ${character.id}</p><br>
            <p>${character.description} </p><br>
            <b>Resource URL:</b>&nbsp;<a  href="${character.urls.url}">Learn More</a>
        </div>
    `;
  characterGrid.appendChild(characterCard);
};


submitButton.addEventListener("click", fetchSingleCharacter);

displayAllCharactersButton.addEventListener("click", () => {
  fetchAllCharacters();
});

displaySingleCharacterButton.addEventListener("submit", (e) => {
  fetchSingleCharacter(e);
});
