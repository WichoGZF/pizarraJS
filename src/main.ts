import './style.css'
import { header } from './components/header/header'
import { field } from './components/field/field'
import Position from '@customTypes/Position'
import Player from '../src/types/Player'
import createPlayerEl from './components/field/player/createPlayerEl'
import isSelected from './isSelected'
import html2canvas from 'html2canvas'

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

  resetPos() {
    this.players.forEach((player, index) => {
      player.setPos(this.initialPos[index])
    })
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
  //Returns number array of player indexes that are selected
  getSelected(): number[] {
    let selected: number[] = [];
    this.players.forEach((player, index) => {
      if (player.getSelected()) {
        selected.push(index);
      }
    })
    return selected;
  }
  getPlayerIsSelected(index: number): boolean {
    if (this.players[index].getSelected()) {
      return true;
    }
    else {
      return false;
    }
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

  resetPos() {
    this.players.forEach((player, index) => {
      player.setPos(this.initialPos[index])
    })
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
  getSelected(): number[] {
    let selected: number[] = [];
    this.players.forEach((player, index) => {
      if (player.getSelected()) {
        selected.push(index);
      }
    })
    return selected;
  }
  getPlayerIsSelected(index: number): boolean {
    if (this.players[index].getSelected()) {
      return true;
    }
    else {
      return false;
    }
  }
}



const fieldElement: HTMLElement = document.querySelector<HTMLElement>('#field')!;
const fieldElRect = fieldElement.getBoundingClientRect();


document.querySelector<HTMLElement>('#capture')!.onclick= handleCaptureField;
document.querySelector<HTMLElement>('#reset-red')!.onclick = handleResetRedTeam;
document.querySelector<HTMLElement>('#hide-red')!.onclick = handleHideRedTeam;
document.querySelector<HTMLElement>('#reset-blue')!.onclick = handleResetBlueTeam;
document.querySelector<HTMLElement>('#hide-blue')!.onclick = handleHideBlueTeam;

//For keeping the ref of the dragged el
let dragged: HTMLElement = null;



fieldElement.addEventListener("drop", (event: DragEvent) => {
  event.preventDefault();
  if (event.target instanceof HTMLElement) {
    // move dragged element to the selected drop target
    if (event.target.id === "field") {
      const rect = fieldElement.getBoundingClientRect();
      const multipleSelected = event.dataTransfer?.getData('multiple_selected') === 'true'

      if (multipleSelected) {
        const redTeamSelected = JSON.parse(event.dataTransfer.getData('red_team_selected'));
        const blueTeamSelected = JSON.parse(event.dataTransfer?.getData('blue_team_selected'));
        const startPos: Position = JSON.parse(event.dataTransfer?.getData('start_pos'))
        const increasedPos: Position = { x: event.pageX - startPos.x, y: event.pageY - startPos.y }; //Pos to add to moved elements
        const updatedElArray: Element[] = [];
        //Both these are arrays that hold the moved fields
        redTeamSelected.forEach((playerIndex) => {
          const droppedEl = document.getElementById(`red${playerIndex + 1}`)
          const currentModelPos = redTeam.players[playerIndex].position

          redTeam.players[playerIndex].position = { x: currentModelPos.x + increasedPos.x, y: currentModelPos.y + increasedPos.y }

          const removedEl = fieldElement.removeChild(droppedEl)
          removedEl.setAttribute('style',
            `left: ${redTeam.players[playerIndex].position.x}px; top: ${redTeam.players[playerIndex].position.y}px`);
          updatedElArray.push(removedEl)

        })
        blueTeamSelected.forEach((playerIndex) => {

          const droppedEl = document.getElementById(`blue${playerIndex + 1}`)
          const currentModelPos = blueTeam.players[playerIndex].position

          blueTeam.players[playerIndex].position = { x: currentModelPos.x + increasedPos.x, y: currentModelPos.y + increasedPos.y }

          const removedEl = fieldElement.removeChild(droppedEl)
          removedEl.setAttribute('style',
            `left: ${blueTeam.players[playerIndex].position.x}px; top: ${blueTeam.players[playerIndex].position.y}px`);
          updatedElArray.push(removedEl)

        })
        console.log(updatedElArray)
        fieldElement.append(...updatedElArray);

      }
      else { // single drag 
        const clickOffset: Position = JSON.parse(event.dataTransfer?.getData('click_offset'))
        const newX = (event.pageX - clickOffset.x) - fieldElRect.x
        const newY = (event.pageY - clickOffset.y) - fieldElRect.y

        if (dragged.dataset.team === 'red') {
          redTeam.players[parseInt(dragged.dataset.index!)].setPos({ x: newX, y: newY })
        }
        else { //dragged is blue team
          blueTeam.players[parseInt(dragged.dataset.index!)].setPos({ x: newX, y: newY })
        }

        dragged.setAttribute('style',
          `left: ${newX}px; top: ${newY}px`)
      }
      updateDragPreview();
    }

  }
  // prevent default action (open as link for some elements)
});


fieldElement.addEventListener("dragenter", (event: DragEvent) => {
  event.preventDefault();
});

fieldElement.addEventListener("dragover", (event: DragEvent) => {
  event.preventDefault();
});



const redTeam = new RedTeam(fieldElement)
const blueTeam = new BlueTeam(fieldElement)

///inserting initial players 
const fragment = document.createDocumentFragment();

let previewEl: HTMLCanvasElement;


//Dragging handler that changes the value of dragged on dragstart
const dragStartHandler = (event: DragEvent) => {
  if (event.target instanceof HTMLElement) {
    dragged = event.target;
  }
  const rect = dragged.getBoundingClientRect();

  if (dragged.classList.contains("selected")) {

    event.dataTransfer?.setDragImage(previewEl, event.clientX - fieldElRect.left, event.clientY - fieldElRect.top)

    //If selected need to get array of selected els and pass that as dataTransfer
    const redTeamSelected = JSON.stringify(redTeam.getSelected())
    const blueTeamSelected = JSON.stringify(blueTeam.getSelected());

    event.dataTransfer?.setData('multiple_selected', "true");

    event.dataTransfer?.setData('red_team_selected', redTeamSelected)

    event.dataTransfer?.setData('blue_team_selected', blueTeamSelected)

    //start pos is already passed with offset (position of click relative to player el) so there's no need to do further calculations in drop Handler
    const xOffset = event.pageX - rect.x;
    const yOffset = event.pageY - rect.y;
    console.log(xOffset, yOffset)
    event.dataTransfer?.setData('start_pos', `{"x": ${rect.x + xOffset}, "y": ${rect.y + yOffset}}`)

    console.log(event.dataTransfer?.getData('start_pos'))
  }
  else {
    event.dataTransfer?.setData('multiple_selected', "false");
    const xOffset = event.pageX - rect.x;
    const yOffset = event.pageY - rect.y;
    console.log(xOffset, yOffset)
    event.dataTransfer?.setData('click_offset', `{"x": ${xOffset}, "y": ${yOffset}}`)
  }
}


redTeam.players.forEach((player: Player, index: number) => {
  fragment.appendChild(createPlayerEl(player.number, 'red', player.position, dragStartHandler))


})

blueTeam.players.forEach((player: Player, index: number) => {
  fragment.appendChild(createPlayerEl(player.number, 'blue', player.position, dragStartHandler))
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
let mouseInField: boolean = false;

//Event handlers for selection and event listeners.
const handleMouseMove = (e: MouseEvent) => {
  const rect = fieldElement.getBoundingClientRect();
  const newPos: Position = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  selection.updateEndingPos(newPos);
  const endingPos = selection.endingPos!;
  const startingPos = selection.initialPos!;
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
  //Only do anything if inside the actual fieldEl 
  if (mouseInField) {
    //Unselect players
    redTeam.unselectAll();
    blueTeam.unselectAll();
    for (let i = 0; i < 11; i++) {
      const redPlayerEl: HTMLElement = document.querySelector<HTMLElement>(`#red${i + 1}`)!;
      redPlayerEl === null ? null : redPlayerEl.classList.remove("selected");
      const bluePlayerEl: HTMLElement = document.querySelector<HTMLElement>(`#blue${i + 1}`)!;
      bluePlayerEl === null ? null : bluePlayerEl.classList.remove("selected");
    }

    //Set positions
    e.stopPropagation();
    const left = e.offsetX;
    const top = e.offsetY;
    selection.initializePos({ x: left, y: top })
    selectElement.setAttribute('style', `left: ${left}px; top: ${top}px`)

    fieldElement.addEventListener('mousemove', handleMouseMove)
  }

})

fieldElement.addEventListener('mouseup', (e: MouseEvent) => {
  selection.nullPos()
  fieldElement.removeEventListener('mousemove', handleMouseMove)
  selectElement.setAttribute('style', 'display: hidden ');

  //Set canvas preview; 
  updateDragPreview();
})


fieldElement.addEventListener('mouseover', (e: MouseEvent) => {
  mouseInField = true;
})

fieldElement.addEventListener('mouseout', (e: MouseEvent) => {
  mouseInField = false;
})

async function handleCaptureField(){ 
  const link = document.createElement('a');
  link.download = 'download.png';
  const canvasField = await html2canvas(fieldElement)
  link.href = await canvasField.toDataURL('image/png');
  link.click();
  link.delete;
}

function updateDragPreview() {
  html2canvas(fieldElement, {
    onclone: (clonedDoc) => {
      const clonedField = clonedDoc.getElementById('field')
      clonedField!.style.backgroundImage = 'none'

      for (const child of Array.from(clonedField!.children)) {
        if (child.classList.contains('selected')) {
          continue;
        }
        else {
          child.style.visibility = 'hidden'
        }

      }

    },

  }).then((canvas) => {
    console.log(canvas)
    previewEl = canvas
    previewEl.id = 'previewCanvas'
    document.body.append(previewEl)
  })
}

function handleResetRedTeam() {
  redTeam.resetPos();
  Array.from(fieldElement.children).forEach((el, index) => {
    if (el.dataset.team === 'red') {
      const playerIndex = parseInt(el.dataset.index)
      const initialPos = redTeam.initialPos[playerIndex];
      el.setAttribute('style', `left: ${initialPos.x}px; top: ${initialPos.y}px`)
    }
  })
}

function handleResetBlueTeam() {
  blueTeam.resetPos();
  Array.from(fieldElement.children).forEach((el, index) => {
    if (el.dataset.team === 'blue') {
      const playerIndex = parseInt(el.dataset.index)
      const initialPos = blueTeam.initialPos[playerIndex];
      el.setAttribute('style', `left: ${initialPos.x}px; top: ${initialPos.y}px`)
    }
  })
}

function handleHideRedTeam() {
  console.log('Handle hide red team', redTeam.show)
  if (redTeam.show) {
    redTeam.hide();

    Array.from(fieldElement.children).forEach((el, index) => {
      console.log(el.dataset.team)
      if (el.dataset.team === 'red') {
        el.style.visibility = 'hidden'
      }
    })

  }
  else {
    redTeam.setShow();
    Array.from(fieldElement.children).forEach((el, index) => {
      if (el.dataset.team === 'red') {
        el.style.visibility = 'visible'
      }
    })
  }
}

function handleHideBlueTeam() {
  if (blueTeam.show) {
    blueTeam.hide();
    Array.from(fieldElement.children).forEach((el, index) => {
      if (el.dataset.team === 'blue') {
        el.style.visibility = 'hidden'
      }
    })
  }
  else {
    blueTeam.setShow()
    Array.from(fieldElement.children).forEach((el, index) => {
      if (el.dataset.team === 'blue') {
        el.style.visibility = 'visible'
      }
    })
  }
}