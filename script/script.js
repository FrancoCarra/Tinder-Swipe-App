let isAnimating = false
let pullDeltaX = 0 //Card distance animating


function startDrag(event) {
    if (isAnimating) return

    //get the first article element
    const actualCard = event.target.closest('article')

    //get initial position of mouse or finger
    const startX = event.pageX ?? event.touches[0].pageX

    //w mouse
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onEnd)

    //w touch
    document.addEventListener('touchmove', onMove, { passive: true })
    document.addEventListener('touchend', onEnd,{ passive: true })

    function onMove(event){ 
    //current position of mouse or finger
        const currentX = event.pageX ?? event.touches[0].pageX
    //the distance between the initial and current position
        pullDeltaX = currentX - startX

        //if we dont have distance
        if (pullDeltaX == 0)
        return

        //change the flag to indicate we are animating
        isAnimating = true
        //calculate the rotation of the card using the distance
        const deg =pullDeltaX / 10

        //apply the transformation to the card
        actualCard.style.transform = `translateX(${pullDeltaX}px) rotate (${deg}deg)`
        actualCard.style.cursor = 'grabbing' //cursor grabbing

        console.log(pullDeltaX)
    }


}



document.addEventListener('mousedown', startDrag)
document.addEventListener('touchstart', startDrag, { passive: true })

