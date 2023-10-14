import { PieceColor, PieceType, Piece, Position} from '../Constants'

export default class Moveset {
    tileIsOccupied(x: number, y: number, boardState: Piece[]): boolean{

        const piece = boardState.find(p => p.position.x === x && p.position.y === y);

        if(piece) return true;
        else return false;
    }


    isValidMove(
        initialPosition: Position,
        desiredPosition: Position,
        type: PieceType, 
        color: PieceColor, 
        boardState: Piece[]
        ) {
                if(!this.tileIsOccupied(desiredPosition.x, desiredPosition.y, boardState)){
                    for(let i = 1; i < 5; i++){
                    
                        

                    // movement vertical
                    if(initialPosition.x === desiredPosition.x){
                        let multiplayer = (desiredPosition.y < initialPosition.y) ? -1 : 1;
                        let passedPosition: Position = {x: initialPosition.x, y: initialPosition.y + (i * multiplayer)};
                        if(passedPosition.x === desiredPosition.x && passedPosition.y === desiredPosition.y && this.tileIsOccupied(passedPosition.x, passedPosition.y + multiplayer, boardState)){
                            return true;
                        }
                        else {
                            if(this.tileIsOccupied(passedPosition.x, passedPosition.y, boardState)){
                                break;
                            }
                        }
                    }


                    // movement horizontal
                    if(initialPosition.y === desiredPosition.y){
                        let multiplayer = (desiredPosition.x < initialPosition.x) ? -1 : 1;
                        let passedPosition: Position = {x: initialPosition.x + (i * multiplayer), y: initialPosition.y};
                        if((passedPosition.x === desiredPosition.x && passedPosition.y === desiredPosition.y) && this.tileIsOccupied(passedPosition.x + multiplayer, passedPosition.y, boardState)){
                            return true;
                        }
                        else {
                            if(this.tileIsOccupied(passedPosition.x, passedPosition.y, boardState)){
                                break;
                            }
                        }                      
                    }


                        
                     // movement up right    
                    if(desiredPosition.x > initialPosition.x && desiredPosition.y > initialPosition.y){
                        let passedPosition: Position = {x: initialPosition.x + i, y: initialPosition.y + i};
                        if(this.tileIsOccupied(passedPosition.x, passedPosition.y, boardState)){
                            break;
                        }
                    }

                    if(((desiredPosition.x - initialPosition.x === i && desiredPosition.y - initialPosition.y === i)) 
                    && ((this.tileIsOccupied(desiredPosition.x + 1, desiredPosition.y + 1, boardState) )|| (desiredPosition.x > 3 || desiredPosition.y > 3))){
                        return true;

                    } 



                    // movement bottom right
                    if(desiredPosition.x > initialPosition.x && desiredPosition.y < initialPosition.y){
                        let passedPosition: Position = {x: initialPosition.x + i, y: initialPosition.y - i};
                        if(this.tileIsOccupied(passedPosition.x, passedPosition.y, boardState)){
                            break;
                        }
                    }

                    if((desiredPosition.x - initialPosition.x === i && desiredPosition.y - initialPosition.y === -i) 
                    && (this.tileIsOccupied(desiredPosition.x + 1, desiredPosition.y - 1, boardState) || (desiredPosition.x > 3 || desiredPosition.y < 1))){
                        return true;
                    }



                    // movement bottom left
                    if(desiredPosition.x < initialPosition.x && desiredPosition.y < initialPosition.y){
                        let passedPosition: Position = {x: initialPosition.x - i, y: initialPosition.y - i};
                        if(this.tileIsOccupied(passedPosition.x, passedPosition.y, boardState)){
                            break;
                        }
                    }

                    if((desiredPosition.x - initialPosition.x === -i && desiredPosition.y - initialPosition.y === -i) 
                    && (this.tileIsOccupied(desiredPosition.x - 1, desiredPosition.y - 1, boardState) || (desiredPosition.x < 1 || desiredPosition.y < 1))){
                        return true;
                    }




                    // movement top left
                    if(desiredPosition.x < initialPosition.x && desiredPosition.y > initialPosition.y){
                        let passedPosition: Position = {x: initialPosition.x - i, y: initialPosition.y + i};
                        if(this.tileIsOccupied(passedPosition.x, passedPosition.y, boardState)){
                            break;
                        }
                    }

                    if((desiredPosition.x - initialPosition.x === -i && desiredPosition.y - initialPosition.y === i) 
                    && (this.tileIsOccupied(desiredPosition.x - 1, desiredPosition.y + 1, boardState) || (desiredPosition.x < 1 || desiredPosition.y > 3))){
                        return true;
                    }
                    }
                }          
        
        return false;
    }
}