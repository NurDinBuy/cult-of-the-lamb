document.querySelectorAll(".inner_music_item").forEach((item) => {
    const audio = item.querySelector(".audio")
    const playButton = item.querySelector(".play-button")
    const playIcon = item.querySelector(".playIcon")
    const pauseIcon = item.querySelector(".pauseIcon")
    const progressBar = item.querySelector(".progressBar")
    const progress = item.querySelector(".progress")

    let isPlaying = false;

    playButton.addEventListener("click", () => {
        document.querySelectorAll(".audio").forEach((otherAudio) => {
            if (otherAudio !== audio) {
                otherAudio.pause()
                const otherItem = otherAudio.closest(".inner_music_item")
                if (otherItem) {
                    const otherPlayIcon = otherItem.querySelector(".playIcon")
                    const otherPauseIcon = otherItem.querySelector(".pauseIcon")
                    otherPlayIcon.style.display = "block"
                    otherPauseIcon.style.display = "none"
                }
            }
        })

        if (isPlaying) {
            audio.pause();
            playIcon.style.display = "block"
            pauseIcon.style.display = "none"
        } else {
            audio.play();
            playIcon.style.display = "none"
            pauseIcon.style.display = "block"
        }
        isPlaying = !isPlaying
    })

    audio.addEventListener("timeupdate", () => {
        const progressWidth = (audio.currentTime / audio.duration) * 100
        progress.style.width = `${progressWidth}%`
    })

    progressBar.addEventListener("click", (e) => {
        const clickX = e.offsetX
        const barWidth = progressBar.offsetWidth
        const newTime = (clickX / barWidth) * audio.duration
        audio.currentTime = newTime
    })

    audio.addEventListener("ended", () => {
        playIcon.style.display = "block"
        pauseIcon.style.display = "none"
        isPlaying = false
    })
})
