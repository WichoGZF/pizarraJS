import Position from "@customTypes/Position";
import { QuadrantNumber } from "@customTypes/QuadrantIndex";

/*Determines if a player (single pos) is inside a two point selection rectangle */ 
export default function isSelected(playerPos: Position, selectStart: Position, selectEnd: Position, quadrant: QuadrantNumber): boolean{
    const playerRadius = 20;
    const playerX = playerPos.x + playerRadius; 
    const playerY = playerPos.y + playerRadius;
    switch (quadrant) {
        case 1:
            if (playerX < selectEnd.x && playerX > selectStart.x) {
                if (playerY < selectEnd?.y && playerY > selectStart?.y) {
                    return true;
                }
            }
            break;
        case 2:
            if (playerX > selectEnd.x && playerX < selectStart.x) {
                if (playerY > selectEnd?.y && playerY < selectStart?.y) {
                    return true;
                }
            }
            break;
        case 3:
            if (playerX > selectEnd.x && playerX < selectStart.x) {
                if (playerY < selectEnd?.y && playerY > selectStart?.y) {
                    return true;
                }
            }
            break;
        case 4:
            if (playerX < selectEnd.x && playerX > selectStart.x) {
                if (playerY < selectEnd?.y && playerY > selectStart?.y) {
                    return true;
                }
            }
            break;
    }
    return false;
}