// PHONE BLOCK

// const phoneInput = document.querySelector("#phone_input")
// const phoneButton = document.querySelector("#phone_button")
// const phoneResult = document.querySelector("#phone_result")
//
// const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/
//
// phoneButton.onclick = () => {
//     if (regExp.test(phoneInput.value)) {
//         phoneResult.innerHTML = "Valid"
//         phoneResult.style.color = "green"
//     } else {
//         phoneResult.innerHTML = "Invalid"
//         phoneResult.style.color = "red"
//     }
// }

// TAB SLIDER

const tabContentBlocks = document.querySelectorAll('.tab_content_block')
const tabs = document.querySelectorAll('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items')
let currentTab = 0

const hideTabContent = () => {
    tabContentBlocks.forEach((item) => {
        item.style.display = 'none'
    })

    tabs.forEach((item) => {
        item.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (index = 0) => {
    tabContentBlocks[index].style.display = 'block'
    tabs[index].classList.add('tab_content_item_active')
}

const autoSlider = () => {
    currentTab++
    if (currentTab > tabContentBlocks.length - 1) {
        currentTab = 0
    }
    console.log(currentTab)
    hideTabContent()
    showTabContent(currentTab)

}

hideTabContent()
showTabContent()
setInterval(() => {
    autoSlider()
}, 3000)

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((item, index) => {
            if (event.target === item) {
                hideTabContent()
                currentTab = index
                showTabContent(index)
            }
        })
    }
}

// CONVERTER

const somInput = document.querySelector('#som')
const usdInput = document.querySelector('#usd')
const eurInput = document.querySelector('#eur')
const goldInput = document.querySelector('#gold_coin')

const converter = (element, targetElements) => {
    element.oninput = async () => {
        try {
            const response = await fetch('../data/converter.json')
            const data = await response.json()
            for (const targetElement of targetElements) {
                if (element.id === "som") {
                    if (targetElement.id === "usd") {
                        targetElement.value = (element.value / data.usd).toFixed(2)
                    } else if (targetElement.id === "eur") {
                        targetElement.value = (element.value / data.eur).toFixed(2)
                    } else if (targetElement.id === "gold") {
                        targetElement.value = (element.value / (data.usd * data.gold_coin)).toFixed(2)
                    }
                }

                if (element.id === "usd") {
                    if (targetElement.id === "som") {
                        targetElement.value = (element.value * data.usd).toFixed(2)
                    } else if (targetElement.id === "eur") {
                        targetElement.value = ((element.value * data.usd) / data.eur).toFixed(2)
                    } else if (targetElement.id === "gold") {
                        targetElement.value = (element.value / data.gold_coin).toFixed(2)
                    }
                }

                if (element.id === "eur") {
                    if (targetElement.id === "som") {
                        targetElement.value = (element.value * data.eur).toFixed(2)
                    } else if (targetElement.id === "usd") {
                        targetElement.value = ((element.value * data.eur) / data.usd).toFixed(2)
                    } else if (targetElement.id === "gold") {
                        targetElement.value = ((element.value * data.eur) / (data.usd * data.gold_coin)).toFixed(2)
                    }
                }

                if (element.id === "gold_coin") {
                    if (targetElement.id === "som") {
                        targetElement.value = (element.value * (data.usd * data.gold_coin)).toFixed(2)
                    } else if (targetElement.id === "usd") {
                        targetElement.value = (element.value * data.gold_coin).toFixed(2)
                    } else if (targetElement.id === "eur") {
                        targetElement.value = ((element.value * data.gold_coin) * data.usd / data.eur).toFixed(2)
                    }
                }

                if (element.value === '') targetElement.value = ''
            }
        } catch (error) {
            console.log(error.message)
        }
    }
}

converter(somInput, [usdInput, eurInput, goldInput])
converter(usdInput, [somInput, eurInput, goldInput])
converter(eurInput, [somInput, usdInput, goldInput])
converter(goldInput, [somInput, usdInput, eurInput])


// CARD SWITCHER

const cardBlock = document.querySelector('.card')
const btnNext = document.querySelector('#btn-next')
const btnPrev = document.querySelector('#btn-prev')
let id = 1


const fetchDataTodo = async (id) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        const data = await response.json()
        const {title, completed, id: todoId} = data
        cardBlock.innerHTML = `
            <p>${title}</p>
            <p>${completed}</p>
            <p>${todoId}</p>
        `
    } catch (error) {
        console.log(error.message)
    }
}

const updateIdForTodo = (btnType) => {
    if (btnType === 'next') {
        id = id === 200 ? 1 : id + 1;
    } else if (btnType === 'prev') {
        id = id === 1 ? 200 : id - 1;
    }
    fetchDataTodo(id)
}

const nextAndPrev = () => {
    btnNext.onclick = () => updateIdForTodo('next')
    btnPrev.onclick = () => updateIdForTodo('prev')
}

fetchDataTodo(id)
nextAndPrev()

// Fetch API

const fetchDataPosts = async () => {
    try {
        console.log("Fetch запрос на https://jsonplaceholder.typicode.com/posts")
        const response = await fetch("https://jsonplaceholder.typicode.com/posts")
        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.log(error.message)
    }
}


fetchDataPosts()

// Weather API

const searchInput = document.querySelector('.cityName')
const searchButton = document.querySelector("#search")
const city = document.querySelector('.city')
const temp = document.querySelector(".temp")
const weatherIcon = document.querySelector("#weather-icon")

// http://api.openweathermap.org/data/2.5/weather

const API_URL = "http://api.openweathermap.org/data/2.5/weather"
const API_KEY = "e417df62e04d3b1b111abeab19cea714"

const searchWeather = async () =>  {
    try {
        const response = await fetch(`${API_URL}?appid=${API_KEY}&q=${searchInput.value}&units=metric`)
        const data = await response.json()
        city.innerHTML = `Город - ${data.name}` || `Город ${searchInput.value} не найден`
        temp.innerHTML = `${data.main?.temp}` ? `Температура: ${Math.round(data.main?.temp)} &deg;` : 'Ошибка'
        weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`


        searchInput.value = ''
    } catch (error) {
        console.log(error.message)
    }

}

searchButton.onclick = () => searchWeather()
