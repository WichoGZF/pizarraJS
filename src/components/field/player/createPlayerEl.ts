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
    playerEl.dataset.number = `${number}`

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

    playerEl.addEventListener('dragstart', dragHandler);
    playerEl.addEventListener('mouseover', (e: MouseEvent) => {e.stopPropagation()})
    playerEl.addEventListener('mouseout', (e: MouseEvent) => {e.stopPropagation()})

    return playerEl
}
