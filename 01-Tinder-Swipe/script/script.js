let isAnimating = false
let pullDeltaX = 0 //Card distance animating
const DECISION_THRESHOLD = 75


function startDrag(event) {
    if (isAnimating) return

    //get the first article element
    const actualCard = event.target.closest('article')
    if (!actualCard) return

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
        if (pullDeltaX === 0)return
        //change the flag to indicate we are animating
        isAnimating = true
        //calculate the rotation of the card using the distance
        const deg = pullDeltaX / 14

        //apply the transformation to the card
        actualCard.style.transform = `translateX(${pullDeltaX}px) rotate(${deg}deg)`
        actualCard.style.cursor = 'grabbing' //cursor grabbing

        //change opacity of the choice info
        const opacity = Math.abs(pullDeltaX) / 100
        const isRight = pullDeltaX > 0

        const choiceEl = isRight
        ? actualCard.querySelector('.choice.like')
        : actualCard.querySelector('.choice.nope')

        choiceEl.style.opacity = opacity

        
    }

    function onEnd(event) {
        //remove the events listeners
        document.removeEventListener('mousemove', onMove)
        document.removeEventListener('mouseup', onEnd)
        document.removeEventListener('touchmove', onMove)
        document.removeEventListener('touchend', onEnd)

        // //TODO: TO REMOVE AS WE`RE DOING THIS OTHER WAY
            // //reset the flag
            // isAnimating = false
            // //reset the distance
            // pullDeltaX = 0
            // //reset the transformation
            // actualCard.style.transform = 'none'
            // //reset the cursor
            // actualCard.style.cursor = 'grab'


        //KNOW IF THE USER TAKES A DECISION

        const decisionMade = Math.abs(pullDeltaX) >= DECISION_THRESHOLD
        if (decisionMade) {
            const goRight = pullDeltaX >= 0
            
        //add class according to decision
        actualCard.classList.add(goRight ? 'go-right' : 'go-left')
        //eliminate the element when the transition is finish
        actualCard.addEventListener('transitionend', () => {
            actualCard.remove()
        })
        } else {
            actualCard.classList.add('reset')
            actualCard.classList.remove('go-right', 'go-left')
            actualCard.querySelectorAll('.choice').forEach(choice => {choice.style.opacity = 0});
        }

        //reset the variables
        actualCard.addEventListener('transitionend', () => {
            actualCard.removeAttribute('style')
            actualCard.classList.remove('reset')

            pullDeltaX = 0;
            isAnimating = false; 
        })

        //reset the choice info opacity

    actualCard.querySelectorAll(".choice").forEach((el) => (el.style.opacity = 0));

    }
}

document.addEventListener('mousedown', startDrag)
document.addEventListener('touchstart', startDrag, { passive: true })

//JS BUTTONS

//Butttons