const scrollFunction = () => {
    const imageList = document.querySelector(".image-list")
    const slideButtons = document.querySelectorAll(".slideBtn")
    const slideScrollBar = document.querySelector(".slider-scrollbar")
    const scrollBarThumb = slideScrollBar.querySelector(".scrollbar-thumb")
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth

    scrollBarThumb.addEventListener('mousedown', (e) => {
        const startX =  e.clientX;
        const thumbPositions = scrollBarThumb.offsetLeft
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX
            const newThumbPosition = thumbPositions + deltaX
            const maxThumbPosition = slideScrollBar.getBoundingClientRect().width - scrollBarThumb.offsetWidth

            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition))
            const scrollPosition =  (boundedPosition / maxThumbPosition) * maxScrollLeft
            imageList.scrollLeft = scrollPosition

            scrollBarThumb.style.left = `${boundedPosition}px`
        }

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)   
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    })
    
    slideButtons.forEach(button => {
        button.addEventListener('click', () => {
            const direction = button.id === "rightBtn" ? -1 : 1
            const scrollAmount = imageList.clientWidth * direction

            imageList.scrollBy({left: scrollAmount, behavior: "smooth"})

        })

        const handleSlideBtns = () => {
            slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block"
            slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block"
        }

        const updateScrollThumbPosition = () => {
            const scrollPosition = imageList.scrollLeft
            const thumbPosition = (scrollPosition / maxScrollLeft) * (slideScrollBar.clientWidth - scrollBarThumb.offsetWidth)
            scrollBarThumb.style.left =`${thumbPosition}px`
        }

        imageList.addEventListener("scroll", () => {
            handleSlideBtns()
            updateScrollThumbPosition()
        })
    })
}

window.addEventListener("load", scrollFunction)
