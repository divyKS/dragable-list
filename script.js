const itemElements = document.querySelectorAll('.item');

itemElements.forEach(itemElement => {
    itemElement.addEventListener('dragstart', ()=>{
        setTimeout(() => {
            // why does this work?  
            itemElement.classList.add('dragging');
        }, 0);
            
    });
    itemElement.addEventListener('dragend', ()=>{
        itemElement.classList.remove('dragging');
    });
})