const containersToDrop = document.querySelectorAll('.container')

document.querySelectorAll('.draggable').forEach(draggableItem => {
    draggableItem.addEventListener('dragstart', () => {
        draggableItem.classList.add('dragging')
    })
    draggableItem.addEventListener('dragend', () => {
        draggableItem.classList.remove('dragging')
    })
})

// with dragover we check if we are dragging any item over our container
// STEP 1 - find the element that is being dragged
// STEP 2 - find the element which is just after the element being dragged
containersToDrop.forEach(container => {
    
    container.addEventListener('dragover', (e) => {
        // default behavior is to not allow dropping, this changes the not allowed cursor to drop cursor
        e.preventDefault() 
        
        const itemBeingDragged = document.querySelector('.dragging')
        const afterElement = elementAfterItem(container, e.clientY)
        if(afterElement == undefined){
            container.appendChild(itemBeingDragged)
        } else {
            container.insertBefore(itemBeingDragged, afterElement)
        }
    })
})

function elementAfterItem(container, yOfMouse){
    const draggableItems = [...container.querySelectorAll('.draggable:not(.dragging)')]
    return draggableItems.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = yOfMouse - (box.top + box.height/2)
        if(offset < 0 && offset > closest.offset){
            return {offset: offset, element: child}
        } else {
            return closest
        }
    }, {offset: Number.NEGATIVE_INFINITY}).element

}

// containersToDrop[0].addEventListener('dragover', () => {
//     console.log('dragging over first')
// })
// containersToDrop[1].addEventListener('dragover', () => {
//     console.log('dragging over second')
// })