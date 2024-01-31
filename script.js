const itemElements = document.querySelectorAll('.item');
const container = document.querySelector('.items');

itemElements.forEach(itemElement => {
    itemElement.addEventListener('dragstart', () => {
        setTimeout(() => {
            // why does this work?  
            itemElement.classList.add('dragging');
        }, 0);
            
    });
    itemElement.addEventListener('dragend', () => {
        itemElement.classList.remove('dragging');
    });
})

container.addEventListener('dragover', (e) => {
    e.preventDefault(); // to change the default behavior of not dropping to allow it

    const itemBeingDragged = container.querySelector('.dragging');
    
    const restingItems = [...container.querySelectorAll('.item:not(.dragging)')]
    
    const afterItem = restingItems.reduce((closestItem, item) => {
        const itemDimensions = item.getBoundingClientRect();
        const mousePosition = e.clientY;
        // offset is the distance between the mouse cursor and the items(will be calculated for each item except the one being dragged since we didnt select that)
        const offset = mousePosition - (itemDimensions.top + itemDimensions.height/2);
        if(offset < 0 && offset > closestItem.offset){
            return {offset: offset, item: item}
        } else {
            return closestItem
        }
    }, {offset: Number.NEGATIVE_INFINITY}).item;

    if(afterItem == undefined){
        container.appendChild(itemBeingDragged);
    } else {
        container.insertBefore(itemBeingDragged, afterItem);
    }

});

container.addEventListener('dragenter', (e) => {
    e.preventDefault(); // for the space between any two items
})

document.addEventListener('mousemove', (e) => {
    // console.log("CLIENT: ", e.clientX);
    // console.log(e.clientY);
    // console.log("SCREEN: ", e.screenX)
})