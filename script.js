const MD5Hash = 'b067cdbf72eaaf8fff4fec86939efcde'
const timeStamp = 1
const publicKey = '6cda15d0c3c12522a4d8a70197c4103f'
const apiAllCharacters = `https://gateway.marvel.com/v1/public/characters?ts=${timeStamp}&apikey=${publicKey}&hash=${MD5Hash}`
// const apiSingleCharacter = `https://gateway.marvel.com/v1/public/characters/${characterId}`
const apiSingleCharacter = `https://gateway.marvel.com/v1/public/characters/149`

const fetchAllCharacters = () =>
{
    fetch(apiAllCharacters)
        .then((response)=>
        {
            Alldata = response.json()
            console.log(Alldata)

        })
        .catch((error)=>
        {
            console.log('Error while fetching the data', error)
        })
}

const fetchSingleCharacter = () =>
{
    fetch(apiSingleCharacter)
        .then((response)=>
        {
            JSONSC = response.json()
            var singleData = JSON.stringify(JSONSC)
            console.log(singleData)
            console.log(response)
        })
        .catch((error)=>
        {
            console.log('Error while fetching the data', error)
        })
}

const displayCharacters = (characters) =>
{
    const characterGrid = document.getElementById('characters-grid')
    characterGrid.innerHTML = ""

    characters.forEach((character) =>
    {
        const name = character.name
        const gridElement = document.createElement('div')
        gridElement.className = 'character-container'

        const link = document.createElement('a')
        link.className = 'character-link'
        link.innerText = name

        gridElement.appendChild(link)

        gridElement.addEventListener('click', ()=>
        {
            showDetails(character)
        })

        characterGrid.appendChild(gridElement)
    }
    )
};

fetchSingleCharacter()


