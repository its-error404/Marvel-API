$(document).ready(() => {
  const MD5Hash = "7b41717548d1933bfd2307e79888325e";
  const timeStamp = 1;
  const publicKey = "6cda15d0c3c12522a4d8a70197c4103f";

  const apiAllCharacters = `https://gateway.marvel.com/v1/public/characters?ts=${timeStamp}&apikey=${publicKey}&hash=${MD5Hash}`;

  const characterGrid = $("#character-grid");
  const searchInput = $("#search-input");

  const clearCharacterGrid = () => {
    characterGrid.empty();
  };

  const fetchAllCharacters = () => {
    clearCharacterGrid();
    $.ajax({
      url: apiAllCharacters,
      method: "GET",
      success: (data) => {
        const characters = data.data.results;

        characters.forEach((character) => {
          createCharacterCard(character);
        });
      },
      error: (error) => {
        console.log("Error while fetching the data,", error);
      },
    });
  };

  const fetchSingleCharacter = (e) => {
    clearCharacterGrid();
    e.preventDefault();

    const characterName = $("#characterName").val();
    const apiSingleCharacter = `https://gateway.marvel.com/v1/public/characters?ts=${timeStamp}&apikey=${publicKey}&hash=${MD5Hash}&name=${encodeURIComponent(
      characterName
    )}`;

    $.ajax({
      url: apiSingleCharacter,
      method: "GET",
      success: (data) => {
        const singleCharacter = data.data.results[0];
        createCharacterCard(singleCharacter);
      },
      error: (error) => {
        console.log("Error while fetching the data", error);
      },
    });
  };

  const fetchCharacterByNameStartsWith = (searchQuery) => {
    clearCharacterGrid();
    $.ajax({
      url: `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${encodeURIComponent(
        searchQuery
      )}&apikey=${publicKey}&hash=${MD5Hash}&ts=${timeStamp}`,
      method: "GET",
      success: (data) => {
        const characters = data.data.results;
        characters.forEach((character) => {
          createCharacterCard(character);
        });
      },
      error: (error) => {
        console.log("Error while fetching the data", error);
      },
    });
  };

  $("#search-button").on("click", () => {
    const searchValue = searchInput.val();
    fetchCharacterByNameStartsWith(searchValue);
  });

  $("#multiple-button").on("click", fetchAllCharacters);

  $("#character-form").on("submit", (e) => {
    fetchSingleCharacter(e);
  });

  const createCharacterCard = (character) => {
    const characterCard = $("<div>")
      .addClass("card")
      .html(
        `
            <div class="image">
                <img src="${character.thumbnail.path}.${character.thumbnail.extension}">
            </div>
            <div class="content">
                <h3>${character.name}</h3><br>
                <p><b>Character ID:</b> &nbsp; ${character.id}</p><br>
                <p>${character.description} </p><br>
                <b>Resource URL:</b>&nbsp;<a  href="${character.urls[0].url}">Learn More</a>
            </div>
            `
      );
    characterGrid.append(characterCard);
  };
});
