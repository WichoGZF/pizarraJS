import './style.css'
import { setupCounter } from './counter'
import { header } from './components/header/header'
import { field } from './components/field/field'
import Position from '@customTypes/Position'
import Player from '../src/types/Player'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  ${header}  
  ${field}
`

//CLEAN: Make Team class, extend other classes to avoid redefining methods
interface Team {
  players: Player[];
  show: boolean;
  initialPos: Position[];
  setInitialPos(arg1:number , arg2: number): void; 
  setShow(): void; 
  hide(): void;
}

class RedTeam implements Team {
  players: Player[] = [];
  show: boolean;
  initialPos!: Position[];

  constructor(element: HTMLElement) {
    this.show = true;

    const widthUnit = element.clientWidth;
    const heightUnit = element.clientHeight;

    this.setInitialPos(widthUnit, heightUnit);

    for (let i = 0; i < 11; i++) {
      this.players[i] = new Player(this.initialPos[i], i + 1, false)
    }

  }
  
  setInitialPos(widthUnit: number, heightUnit: number) {
    this.initialPos = [
      { x: 1 * widthUnit, y: 3 * heightUnit},
      { x: 2 * widthUnit, y: 2 * heightUnit},
      { x: 2 * widthUnit, y: 4 * heightUnit},
      { x: 3 * widthUnit, y: 1 * heightUnit},
      { x: 3 * widthUnit, y: 5 * heightUnit},
      { x: 4 * widthUnit, y: 3 * heightUnit},
      { x: 5 * widthUnit, y: 2 * heightUnit},
      { x: 5 * widthUnit, y: 4 * heightUnit},
      { x: 6 * widthUnit, y: 1 * heightUnit},
      { x: 6 * widthUnit, y: 5 * heightUnit},
      { x: 7 * widthUnit, y: 3 * heightUnit},
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

    const widthUnit = element.clientWidth;
    const heightUnit = element.clientHeight;

    this.setInitialPos(widthUnit, heightUnit);

    for (let i = 0; i < 11; i++) {
      this.players[i] = new Player(this.initialPos[i], i + 1, false)
    }

  }

  setInitialPos(widthUnit: number, heightUnit: number) {
    this.initialPos = [
      { x: 14 * widthUnit, y: 3 * heightUnit },
      { x: 13 * widthUnit, y: 2 * heightUnit },
      { x: 13 * widthUnit, y: 4 * heightUnit },
      { x: 12 * widthUnit, y: 1 * heightUnit },
      { x: 12 * widthUnit, y: 5 * heightUnit },
      { x: 11 * widthUnit, y: 3 * heightUnit },
      { x: 10 * widthUnit, y: 2 * heightUnit },
      { x: 10 * widthUnit, y: 4 * heightUnit },
      { x: 9 * widthUnit, y: 1 * heightUnit },
      { x: 9 * widthUnit, y: 5 * heightUnit },
      { x: 8 * widthUnit, y: 3 * heightUnit },
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

