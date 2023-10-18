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
                        if(passedPosition.x === desiredPosition.x && passedPosition.y === desiredPosition.y && 
                        (this.tileIsOccupied(passedPosition.x, passedPosition.y + multiplayer, boardState) || (desiredPosition.y === 0 || desiredPosition.y === 4))){
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
                        if((passedPosition.x === desiredPosition.x && passedPosition.y === desiredPosition.y) && 
                        (this.tileIsOccupied(passedPosition.x + multiplayer, passedPosition.y, boardState) || (desiredPosition.x === 0 || desiredPosition.x === 4))){
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


    getPossiblePawnMoves = (pawn: Piece, boardState: Piece[]) : Position[] => {


        const possibleMoves: Position[] = [];

        // movement vertical down
    for(let i = 1; i < 5; i++){ 
        const destinationVerticalDown: Position = {x: pawn.position.x, y: pawn.position.y - i};

        if(this.tileIsOccupied(destinationVerticalDown.x, destinationVerticalDown.y, boardState)){
            break;
        }

        if(this.tileIsOccupied(destinationVerticalDown.x, destinationVerticalDown.y - 1, boardState) || (destinationVerticalDown.y < 1 && !this.tileIsOccupied(destinationVerticalDown.x, destinationVerticalDown.y, boardState))){
            possibleMoves.push(destinationVerticalDown);
        }
       
    }  


        // movement vertical up
    for(let i = 1; i < 5; i++){ 
        const destinationVerticalUp: Position = {x: pawn.position.x, y: pawn.position.y + i};

        if(this.tileIsOccupied(destinationVerticalUp.x, destinationVerticalUp.y, boardState)){
            break;
        }

        if(this.tileIsOccupied(destinationVerticalUp.x, destinationVerticalUp.y + 1, boardState) || (destinationVerticalUp.y > 3 && !this.tileIsOccupied(destinationVerticalUp.x, destinationVerticalUp.y, boardState))){
            possibleMoves.push(destinationVerticalUp);
        }
    }


        // movement horizontal left
    for(let i = 1; i < 5; i++){ 
        const destinationHorizontalLeft: Position = {x: pawn.position.x - i, y: pawn.position.y};

        if(this.tileIsOccupied(destinationHorizontalLeft.x, destinationHorizontalLeft.y, boardState)){
            break;
        }

        if(this.tileIsOccupied(destinationHorizontalLeft.x - 1, destinationHorizontalLeft.y, boardState) || (destinationHorizontalLeft.x < 1 && !this.tileIsOccupied(destinationHorizontalLeft.x, destinationHorizontalLeft.y, boardState))){
            possibleMoves.push(destinationHorizontalLeft);
        }
    }


        // movement horizontal right    
    for(let i = 1; i < 5; i++){ 
        const destinationHorizontalRight: Position = {x: pawn.position.x + i, y: pawn.position.y};

        if(this.tileIsOccupied(destinationHorizontalRight.x, destinationHorizontalRight.y, boardState)){
            break;
        }

        if(this.tileIsOccupied(destinationHorizontalRight.x + 1, destinationHorizontalRight.y, boardState) || (destinationHorizontalRight.x > 3 && !this.tileIsOccupied(destinationHorizontalRight.x, destinationHorizontalRight.y, boardState))){
            possibleMoves.push(destinationHorizontalRight);
        }
    }
             

        // movement up right
        for(let i = 1; i < 5; i++){

        const destination: Position = {x: pawn.position.x + i, y: pawn.position.y + i};

        if(this.tileIsOccupied(destination.x, destination.y, boardState)){
            break;
        }
        
        if((destination.x - pawn.position.x === i && destination.y - pawn.position.y === i) 
        && (this.tileIsOccupied(destination.x + 1, destination.y + 1, boardState) || (destination.x > 3 || destination.y > 3))){
            possibleMoves.push(destination);
        } 
    }



        // movement bottom right
        for(let i = 1; i < 5; i++){

        const destination: Position = {x: pawn.position.x + i, y: pawn.position.y - i};

        if(this.tileIsOccupied(destination.x, destination.y, boardState)){
            break;
        }

        if((destination.x - pawn.position.x === i && destination.y - pawn.position.y === -i) 
        && (this.tileIsOccupied(destination.x + 1, destination.y - 1, boardState) || (destination.x > 3 || destination.y < 1))){
            possibleMoves.push(destination);
        }

    }


        // movement bottom left
        for(let i = 1; i < 5; i++){

        const destination: Position = {x: pawn.position.x - i, y: pawn.position.y - i};

        if(this.tileIsOccupied(destination.x, destination.y, boardState)){
            break;
        }

        if((destination.x - pawn.position.x === -i && destination.y - pawn.position.y === -i) 
        && (this.tileIsOccupied(destination.x - 1, destination.y - 1, boardState) || (destination.x < 1 || destination.y < 1))){
            possibleMoves.push(destination);
        }         

    }


        // movement top left
        for(let i = 1; i < 5; i++){

        const destination: Position = {x: pawn.position.x - i, y: pawn.position.y + i};

        if(this.tileIsOccupied(destination.x, destination.y, boardState)){
            break;
            
        }

        if((destination.x - pawn.position.x === -i && destination.y - pawn.position.y === i) 
        && (this.tileIsOccupied(destination.x - 1, destination.y + 1, boardState) || (destination.x < 1 || destination.y > 3))){
            possibleMoves.push(destination);
        }

    }
     

        return possibleMoves;
    }


    getValidMoves(piece: Piece, boardState: Piece[]) : Position[] {
        switch(piece.type)
        {
            case PieceType.PAWN:
                return this.getPossiblePawnMoves(piece, boardState);
            case PieceType.KING:
                return this.getPossiblePawnMoves(piece, boardState);
            default: 
                return [];    
        }
    }

}