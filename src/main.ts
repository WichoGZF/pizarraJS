import './style.css'
import { header } from './components/header/header'
import { field } from './components/field/field'
import Position from '@customTypes/Position'
import Player from '../src/types/Player'
import createPlayerEl from './components/field/player/createPlayerEl'
import isSelected from './isSelected'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  ${header}  
  ${field}
`

//CLEAN: Make Team class, extend other classes to avoid redefining methods
//Initial class and interfaces created 
interface Team {
  players: Player[];
  show: boolean;
  initialPos: Position[];
  setInitialPos(widthUnit: number, heightUnit: number, offsetLeft: number, offsetTop: number): void;
  setShow(): void;
  hide(): void;
  unselectAll(): void;
  select(index: number): void;
  unselect(index: number): void;
}

class RedTeam implements Team {
  players: Player[] = [];
  show: boolean;
  initialPos!: Position[];

  constructor(element: HTMLElement) {
    this.show = true;

    const widthUnit = Math.trunc(element.clientWidth / 15);
    const heightUnit = Math.trunc(element.clientHeight / 6);
    const offsetTop = -20;  //20 due to it being half of a player height
    const offsetLeft = -20;  //20 due to it being half of a playtter width

    this.setInitialPos(widthUnit, heightUnit, offsetLeft, offsetTop);

    for (let i = 0; i < 11; i++) {
      this.players[i] = new Player(this.initialPos[i], i + 1, false)
    }

  }

  setInitialPos(widthUnit: number, heightUnit: number, offsetLeft: number, offsetTop: number) {
    this.initialPos = [
      { x: 1 * widthUnit + offsetLeft, y: 3 * heightUnit + offsetTop },
      { x: 2 * widthUnit + offsetLeft, y: 2 * heightUnit + offsetTop },
      { x: 2 * widthUnit + offsetLeft, y: 4 * heightUnit + offsetTop },
      { x: 3 * widthUnit + offsetLeft, y: 1 * heightUnit + offsetTop },
      { x: 3 * widthUnit + offsetLeft, y: 5 * heightUnit + offsetTop },
      { x: 4 * widthUnit + offsetLeft, y: 3 * heightUnit + offsetTop },
      { x: 5 * widthUnit + offsetLeft, y: 2 * heightUnit + offsetTop },
      { x: 5 * widthUnit + offsetLeft, y: 4 * heightUnit + offsetTop },
      { x: 6 * widthUnit + offsetLeft, y: 1 * heightUnit + offsetTop },
      { x: 6 * widthUnit + offsetLeft, y: 5 * heightUnit + offsetTop },
      { x: 7 * widthUnit + offsetLeft, y: 3 * heightUnit + offsetTop },
    ]
  }
  setShow() {
    this.show = true;
  }

  hide() {
    this.show = false;
  }
  unselectAll() {
    this.players.forEach((player, index) => {
      this.players[index].unselect();
    })
  }
  select(index: number) {
    this.players[index].setSelected();
  }
  unselect(index: number) {
    this.players[index].unselect();
  }
}

class BlueTeam implements Team {
  players: Player[] = [];
  show: boolean;
  initialPos!: Position[];

  constructor(element: HTMLElement) {
    this.show = true;

    const widthUnit = Math.round(element.clientWidth / 15);
    const heightUnit = Math.round(element.clientHeight / 6);
    const offsetTop = -20;  //20 due to it being half of a player height
    const offsetLeft = -20;  //20 due to it being half of a playtter width

    this.setInitialPos(widthUnit, heightUnit, offsetLeft, offsetTop);

    for (let i = 0; i < 11; i++) {
      this.players[i] = new Player(this.initialPos[i], i + 1, false)
    }

  }

  setInitialPos(widthUnit: number, heightUnit: number, offsetLeft: number, offsetTop: number) {
    this.initialPos = [
      { x: 14 * widthUnit + offsetLeft, y: 3 * heightUnit + offsetTop },
      { x: 13 * widthUnit + offsetLeft, y: 2 * heightUnit + offsetTop },
      { x: 13 * widthUnit + offsetLeft, y: 4 * heightUnit + offsetTop },
      { x: 12 * widthUnit + offsetLeft, y: 1 * heightUnit + offsetTop },
      { x: 12 * widthUnit + offsetLeft, y: 5 * heightUnit + offsetTop },
      { x: 11 * widthUnit + offsetLeft, y: 3 * heightUnit + offsetTop },
      { x: 10 * widthUnit + offsetLeft, y: 2 * heightUnit + offsetTop },
      { x: 10 * widthUnit + offsetLeft, y: 4 * heightUnit + offsetTop },
      { x: 9 * widthUnit + offsetLeft, y: 1 * heightUnit + offsetTop },
      { x: 9 * widthUnit + offsetLeft, y: 5 * heightUnit + offsetTop },
      { x: 8 * widthUnit + offsetLeft, y: 3 * heightUnit + offsetTop },
    ]
  }

  setShow() {
    this.show = true;
  }

  hide() {
    this.show = false;
  }
  unselectAll(): void {
    this.players.forEach((player, index) => {
      this.players[index].unselect();
    })
  }
  select(index: number) {
    this.players[index].setSelected();
  }
  unselect(index: number) {
    this.players[index].unselect();
  }
}

const fieldElement: HTMLElement = document.querySelector<HTMLElement>('#field')!;

const redTeam = new RedTeam(fieldElement)
const blueTeam = new BlueTeam(fieldElement)

///inserting initial players 
const fragment = document.createDocumentFragment();

redTeam.players.forEach((player: Player, index: number) => {
  fragment.appendChild(createPlayerEl(player.number, 'red', player.position))
})

blueTeam.players.forEach((player: Player, index: number) => {
  fragment.appendChild(createPlayerEl(player.number, 'blue', player.position))
})

fieldElement.append(fragment)


class Selection {
  initialPos: Position | null;
  endingPos: Position | null;
  quadrant: 1 | 2 | 3 | 4 | null;

  constructor() {
    this.initialPos = null;
    this.endingPos = null;
    this.quadrant = null;
  }

  initializePos(position: Position) {
    this.initialPos = position;
    this.endingPos = position;
  }

  updateEndingPos(position: Position) {
    this.endingPos = position
  }

  nullPos() {
    this.endingPos = null;
    this.initialPos = null;
  }
  setQuadrant(quadrant: 1 | 2 | 3 | 4) {
    this.quadrant = quadrant
  }

}

const selection: Selection = new Selection();
const selectElement: HTMLElement = document.querySelector<HTMLElement>('#select')!;
//

//Event handlers for selection and event listeners.
const handleMouseMove = (e: MouseEvent) => {
  const rect = fieldElement.getBoundingClientRect();
  const newPos: Position = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  selection.updateEndingPos(newPos);
  const endingPos = selection.endingPos!;
  const startingPos = selection.initialPos!;
  console.log(selection, endingPos, startingPos)
  //quadrant 1)
  if ((endingPos.x >= startingPos.x) && (endingPos.y <= startingPos.y)) {
    selectElement.setAttribute('style',
      `left: ${startingPos.x}px; top: ${endingPos.y}px; width:${endingPos.x - startingPos.x}px; height: ${startingPos.y - endingPos.y}px`)
    selection.setQuadrant(1)
  }
  //quadrant 2 
  else if ((endingPos.x < startingPos.x) && (endingPos.y < startingPos.y)) {
    selectElement.setAttribute('style',
      `left: ${endingPos.x}px; top: ${endingPos.y}px; width:${startingPos.x - endingPos.x}px; height: ${startingPos.y - endingPos.y}px`)
    selection.setQuadrant(2)
  }
  //quadrant 3 
  else if ((endingPos.x <= startingPos.x) && (endingPos.y >= startingPos.y)) {
    selectElement.setAttribute('style',
      `left: ${endingPos.x}px; top: ${startingPos.y}px; width:${startingPos.x - endingPos.x}px; height: ${endingPos.y - startingPos.y}px`)
    selection.setQuadrant(3)
  }
  //quadrant 4
  else if ((endingPos.x > startingPos.x) && (endingPos.y > startingPos.y)) {
    selectElement.setAttribute('style',
      `left: ${startingPos.x}px; top: ${startingPos.y}px; width:${endingPos.x - startingPos.x}px; height: ${endingPos.y - startingPos.y}px`)
    selection.setQuadrant(4)
  }
  //Once quadrant is set we have to update the selected players. 
  for (let i = 0; i < 11; i++) {
    //red team
    const selectedRed = isSelected(redTeam.players[i].position, selection.initialPos!, selection.endingPos!, selection.quadrant!)
    const redPlayerEl: HTMLElement = document.querySelector<HTMLElement>(`#red${i + 1}`)!;

    if (selectedRed === redTeam.players[i].selected) {
      null;
    }
    else {
      if (selectedRed) {
        redTeam.players[i].setSelected();
        redPlayerEl.classList.add("selected");
      }
      else {
        redTeam.players[i].unselect();
        redPlayerEl.classList.remove("selected");
      }
    }
    //blue team
    const selectedBlue = isSelected(blueTeam.players[i].position, selection.initialPos!, selection.endingPos!, selection.quadrant!)
    const bluePlayerEl: HTMLElement = document.querySelector<HTMLElement>(`#blue${i + 1}`)!;
    if (selectedBlue === blueTeam.players[i].selected) {
      null;
    }
    else {
      if (selectedBlue) {
        blueTeam.players[i].setSelected()
        bluePlayerEl.classList.add("selected");
      }
      else {
        blueTeam.players[i].unselect();
        bluePlayerEl.classList.remove("selected");
      }
    }
  }

}

fieldElement.addEventListener('mousedown', (e: MouseEvent) => {
  //Unselect players
  redTeam.unselectAll();
  blueTeam.unselectAll();
  for (let i = 0; i < 11; i++) {
    const redPlayerEl: HTMLElement = document.querySelector<HTMLElement>(`#red${i + 1}`)!;
    const bluePlayerEl: HTMLElement = document.querySelector<HTMLElement>(`#blue${i + 1}`)!;
    redPlayerEl.classList.remove("selected");
    bluePlayerEl.classList.remove("selected");
  }

  //Set positions
  e.stopPropagation();
  const left = e.offsetX;
  const top = e.offsetY;
  selection.initializePos({ x: left, y: top })
  selectElement.setAttribute('style', `left: ${left}px; top: ${top}px`)

  fieldElement.addEventListener('mousemove', handleMouseMove)
})

fieldElement.addEventListener('mouseup', (e: MouseEvent) => {
  selection.nullPos()
  fieldElement.removeEventListener('mousemove', handleMouseMove)
  selectElement.setAttribute('style', 'display: hidden ');
})




