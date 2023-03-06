import './style.css'
import { header } from './components/header/header'
import { field } from './components/field/field'
import Position from '@customTypes/Position'
import Player from '../src/types/Player'
import createPlayerEl from './components/field/player/createPlayerEl'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  ${header}  
  ${field}
`

//CLEAN: Make Team class, extend other classes to avoid redefining methods
interface Team {
  players: Player[];
  show: boolean;
  initialPos: Position[];
  setInitialPos(arg1: number, arg2: number): void;
  setShow(): void;
  hide(): void;
}

class RedTeam implements Team {
  players: Player[] = [];
  show: boolean;
  initialPos!: Position[];

  constructor(element: HTMLElement) {
    this.show = true;

    const widthUnit = Math.trunc(element.clientWidth/15);
    const heightUnit = Math.trunc(element.clientHeight/6);
    const offsetTop = -20;  //20 due to it being half of a player height
    const offsetLeft = -20;  //20 due to it being half of a playtter width

    this.setInitialPos(widthUnit, heightUnit, offsetLeft, offsetTop);
    
    for (let i = 0; i < 11; i++) {
      this.players[i] = new Player(this.initialPos[i], i + 1, false)
    }

  }

  setInitialPos(widthUnit: number, heightUnit: number, offsetLeft: number, offsetTop: number) {
    this.initialPos = [
      { x: 1 * widthUnit + offsetLeft, y: 3 * heightUnit + offsetTop},
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
}

class BlueTeam implements Team {
  players: Player[] = [];
  show: boolean;
  initialPos!: Position[];

  constructor(element: HTMLElement) {
    this.show = true;

    const widthUnit = Math.round(element.clientWidth/15);
    const heightUnit = Math.round(element.clientHeight/6);
    const offsetTop = -20;  //20 due to it being half of a player height
    const offsetLeft = -20;  //20 due to it being half of a playtter width

    this.setInitialPos(widthUnit, heightUnit, offsetLeft, offsetTop);

    for (let i = 0; i < 11; i++) {
      this.players[i] = new Player(this.initialPos[i], i + 1, false)
    }

  }

  setInitialPos(widthUnit: number, heightUnit: number,  offsetLeft: number, offsetTop: number) {
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

}

const fieldElement: HTMLElement = document.querySelector<HTMLElement>('#field')!;

const redTeam = new RedTeam(fieldElement)
const blueTeam = new BlueTeam(fieldElement)

///inserting initial players 
const fragment = document.createDocumentFragment();

redTeam.players.forEach((player: Player, index: number) => {
  fragment.appendChild(createPlayerEl(player.number, 'red', player.position))
})

blueTeam.players.forEach((player:Player, index: number) => {
  fragment.appendChild(createPlayerEl(player.number, 'blue', player.position))
})

fieldElement.append(fragment)