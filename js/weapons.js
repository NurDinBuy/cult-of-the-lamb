const fetchWeapons = async () => {
    try {
        const response = await fetch('../data/weapons.json')
        const data = await response.json()

        renderWeapons(data)
    } catch (error) {
        console.error(error.message)
    }
}

const renderWeapons = (data) => {
    const weaponsContainer = document.getElementById('weapons-container')

    Object.entries(data).forEach(([type, weapons]) => {
        const typeContainer = document.createElement('div')
        typeContainer.classList.add('weapon_type')
        typeContainer.id = `weapon-type-${type}`

        const table = document.createElement('ul')
        table.classList.add('table')

        console.log(type)
        const headerRow = `
            <h3 class="weapons_type">${type}</h3>
            <li class="table-header">
                <div class="table-cell">Photo</div>
                <div class="table-cell">Name</div>
                <div class="table-cell">Quote</div>
                <div class="table-cell">Description</div>
                <div class="table-cell">Unlock</div>
            </li>
    `
        table.innerHTML = headerRow

        weapons.forEach(weapon => {
            const row = document.createElement('li')
            row.classList.add('table-row')

            row.innerHTML = `
                <div class="table-cell"><img src="${weapon.photo}" alt="${weapon.name}" /></div>
                <div class="table-cell">${weapon.name}</div>
                <div class="table-cell">${weapon.quote}</div>
                <div class="table-cell">${weapon.description}</div>
                <div class="table-cell">${weapon.unlock}</div>
            `
            table.appendChild(row)
        })

        typeContainer.appendChild(table)
        weaponsContainer.appendChild(typeContainer)
    })
}

fetchWeapons()
