import styles from './player.module.css'
import Position from '@customTypes/Position';

//Creates player element and returns element depending on the team. 
export default function createPlayerEl(number: number, team: 'red' | 'blue', position: Position, dragHandler: any): HTMLElement { 
    const playerEl: HTMLElement = document.createElement('div');
    playerEl.classList.add(styles.player);
    playerEl.innerHTML = `
        <p class=${styles.number}> 
            ${number}
        </p>`

    playerEl.setAttribute('style', `left: ${position.x}px; top: ${position.y}px`)
    playerEl.setAttribute('draggable', 'true')
    playerEl.dataset.index = `${number - 1}`

    if (team === 'red') {
        playerEl.classList.add(styles.red);
        playerEl.id = `red${number}`
        playerEl.dataset.team = 'red'

    }
    else { // team === 'blue' 
        playerEl.classList.add(styles.blue);
        playerEl.dataset.team = 'blue'
        playerEl.id = `blue${number}`
    }

    /*Drag start needs two use cases, when there's a selection and when there's no selected el. (Selected el existing moves all other selected)
    No selected el just moves the single element and removes all selected els
    */
    playerEl.addEventListener('dragstart', dragHandler);
    playerEl.addEventListener('mouseover', (e: MouseEvent) => {e.stopPropagation()})
    playerEl.addEventListener('mouseout', (e: MouseEvent) => {e.stopPropagation()})

    return playerEl
}
