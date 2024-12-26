const API_URL = "https://jsonplaceholder.typicode.com/posts";
const characterContainer = document.getElementById("characterContainer");

const fetchCharacterData = async () => {
    try {
        const response = await fetch(API_URL)
        const data = await response.json()
        renderCharacters(data)
    } catch (error) {
        console.error("Произошла ошибка при загрузке данных:", error.message)
        characterContainer.innerHTML = `<p>Не удалось загрузить данные. Пожалуйста, попробуйте позже</p>`
    }
}

const renderCharacters = async (data) => {
    data.forEach((item) => {
        const card = document.createElement("div")
        card.classList.add("character_block_item")

        card.innerHTML = `
            <img src="../video/Lamb-knucklebones-idle.gif" alt="Картинка">
            <h2>${item.title}</h2>
            <p>${item.body}</p>
        `

        characterContainer.appendChild(card)
    })
}


fetchCharacterData()