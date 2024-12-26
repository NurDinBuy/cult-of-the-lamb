// MODAL

const modal = document.querySelector('.modal')
const modalTrigger = document.querySelector('#btn-get')
const modalCloseButton = document.querySelector('.modal_close')

const openModal = () => {
    modal.style.display = "block"
    document.body.style.overflow = "hidden"
}

const closeModal = () => {
    modal.style.display = "none"
    document.body.style.overflow = ''
}

modalTrigger.onclick = openModal
modalCloseButton.onclick = closeModal
// setInterval(openModal, 10000)

modal.onclick = (event) => {
    if (event.target === modal) {
        closeModal()
    }
}

const onScroll = () => {
    const scroll = window.innerHeight + window.scrollY
    if (scroll >= document.body.offsetHeight - 1){
        openModal()
        removeEventListener("scroll", onScroll)
    }
}

window.addEventListener('scroll', onScroll)