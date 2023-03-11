import Position from "./Position";

export default class Player{ 
    position: Position; 
    number: number; 
    selected: boolean; 

    constructor(position: Position, number: number, selected: boolean){
        this.position = position; 
        this.number = number; 
        this.selected = selected;
    }

    setPos(position: Position){
        this.position = position; 
    }

    setSelected(){
        this.selected = true;
    }

    unselect(){
        this.selected = false;
    }
    
    getPos(){
        return this.position;
    }
    getNumber(){
        return this.number;
    }
    getSelected(){
        return this.selected;
    }
    
}