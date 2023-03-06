import styles from './player.module.css'
import Position from '@customTypes/Position';

//Creates player element and returns element depending on the team. 
export default function createPlayerEl(number: number, team: 'red' | 'blue', position: Position): HTMLElement {
    const playerEl: HTMLElement = document.createElement('div');
    playerEl.classList.add(styles.player);
    playerEl.innerHTML = `
        <p class=${styles.number}> 
            ${number}
        </p>`

    playerEl.setAttribute('style', `left: ${position.x}px; top: ${position.y}px`)

    if (team === 'red') {
        playerEl.classList.add(styles.red);
        playerEl.setAttribute('id', `red${number}`)

    }
    else { // team === 'blue' 
        playerEl.classList.add(styles.blue);
        playerEl.setAttribute('id', `blue${number}`)
    }


    return playerEl
}
