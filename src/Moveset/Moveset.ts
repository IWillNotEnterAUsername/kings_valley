import { PieceColor, PieceType, Piece, Position} from '../Constants'
export var totalTurns = 1, winner = '';
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
            if(color === PieceColor.WHITE && totalTurns % 2 !== 1) return false;
            if(color === PieceColor.BLACK && totalTurns % 2 !== 0) return false;
                if(!this.tileIsOccupied(desiredPosition.x, desiredPosition.y, boardState)){
                    for(let i = 1; i < 5; i++){

                    //king wins when at center
                    if(type === PieceType.KING && color === PieceColor.WHITE && (desiredPosition.x === 2 && desiredPosition.y === 2)){
                        winner = "White";
                    }
                    
                    if(type === PieceType.KING && color === PieceColor.BLACK && (desiredPosition.x === 2 && desiredPosition.y === 2)){
                        winner = "Black";
                    } 
                    
                    //pawn cannot go to center
                    if(type === PieceType.PAWN && (desiredPosition.x === 2 && desiredPosition.y === 2)){
                        break;
                    }

                    //white king cannot move on his first turn
                    if(type === PieceType.KING && color === PieceColor.WHITE && totalTurns === 1){
                        break;
                    }

                    //black king cannot move on his first turn
                    if(type === PieceType.KING && color === PieceColor.BLACK && totalTurns === 2){
                        break;
                    }
                        

                    // movement vertical
                    if(initialPosition.x === desiredPosition.x){
                        let multiplayer = (desiredPosition.y < initialPosition.y) ? -1 : 1;
                        let passedPosition: Position = {x: initialPosition.x, y: initialPosition.y + (i * multiplayer)};
                        if(passedPosition.x === desiredPosition.x && passedPosition.y === desiredPosition.y && 
                        (this.tileIsOccupied(passedPosition.x, passedPosition.y + multiplayer, boardState) || (desiredPosition.y === 0 || desiredPosition.y === 4))){
                            totalTurns ++;
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
                            totalTurns ++;
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
                        totalTurns ++;
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
                        totalTurns ++;
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
                        totalTurns ++;
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
                        totalTurns ++;
                        return true;
                    }
                    }
                }          
        return false;
    }


    getPossibleMoves = (piece: Piece, boardState: Piece[]) : Position[] => {


        const possibleMoves: Position[] = [];

        if(piece.color === PieceColor.WHITE && totalTurns % 2 !== 1) return possibleMoves;
        if(piece.color === PieceColor.BLACK && totalTurns % 2 !== 0) return possibleMoves;
        // movement vertical down
    for(let i = 1; i < 5; i++){ 
        
        const destinationVerticalDown: Position = {x: piece.position.x, y: piece.position.y - i};

        //pawn cannot go to center
        if(piece.type === PieceType.PAWN && (destinationVerticalDown.x === 2 && destinationVerticalDown.y === 2)){
            continue;
        }

        //black king cannot move on his first turn
        if(piece.type === PieceType.KING && piece.color === PieceColor.BLACK && totalTurns === 2){
            break;
        }

        if(this.tileIsOccupied(destinationVerticalDown.x, destinationVerticalDown.y, boardState)){
            break;
        }

        if(this.tileIsOccupied(destinationVerticalDown.x, destinationVerticalDown.y - 1, boardState) || (destinationVerticalDown.y < 1 && !this.tileIsOccupied(destinationVerticalDown.x, destinationVerticalDown.y, boardState))){
            possibleMoves.push(destinationVerticalDown);
        }
       
    }  


        // movement vertical up
    for(let i = 1; i < 5; i++){ 
        const destinationVerticalUp: Position = {x: piece.position.x, y: piece.position.y + i};

        //pawn cannot go to center
        if(piece.type === PieceType.PAWN && (destinationVerticalUp.x === 2 && destinationVerticalUp.y === 2)){
            continue;
        }

        //white king cannot move on his first turn
        if(piece.type === PieceType.KING && piece.color === PieceColor.WHITE && totalTurns === 1){
            break;
        }


        if(this.tileIsOccupied(destinationVerticalUp.x, destinationVerticalUp.y, boardState)){
            break;
        }

        if(this.tileIsOccupied(destinationVerticalUp.x, destinationVerticalUp.y + 1, boardState) || (destinationVerticalUp.y > 3 && !this.tileIsOccupied(destinationVerticalUp.x, destinationVerticalUp.y, boardState))){
            possibleMoves.push(destinationVerticalUp);
        }
    }


        // movement horizontal left
    for(let i = 1; i < 5; i++){ 
        const destinationHorizontalLeft: Position = {x: piece.position.x - i, y: piece.position.y};

        //pawn cannot go to center
        if(piece.type === PieceType.PAWN && (destinationHorizontalLeft.x === 2 && destinationHorizontalLeft.y === 2)){
            continue;
        }        

        if(this.tileIsOccupied(destinationHorizontalLeft.x, destinationHorizontalLeft.y, boardState)){
            break;
        }

        if(this.tileIsOccupied(destinationHorizontalLeft.x - 1, destinationHorizontalLeft.y, boardState) || (destinationHorizontalLeft.x < 1 && !this.tileIsOccupied(destinationHorizontalLeft.x, destinationHorizontalLeft.y, boardState))){
            possibleMoves.push(destinationHorizontalLeft);
        }
    }


        // movement horizontal right    
    for(let i = 1; i < 5; i++){ 
        const destinationHorizontalRight: Position = {x: piece.position.x + i, y: piece.position.y};

        //pawn cannot go to center
        if(piece.type === PieceType.PAWN && (destinationHorizontalRight.x === 2 && destinationHorizontalRight.y === 2)){
            continue;
        }           

        if(this.tileIsOccupied(destinationHorizontalRight.x, destinationHorizontalRight.y, boardState)){
            break;
        }

        if(this.tileIsOccupied(destinationHorizontalRight.x + 1, destinationHorizontalRight.y, boardState) || (destinationHorizontalRight.x > 3 && !this.tileIsOccupied(destinationHorizontalRight.x, destinationHorizontalRight.y, boardState))){
            possibleMoves.push(destinationHorizontalRight);
        }
    }
             

        // movement up right
        for(let i = 1; i < 5; i++){

        const destination: Position = {x: piece.position.x + i, y: piece.position.y + i};

        //pawn cannot go to center
        if(piece.type === PieceType.PAWN && (destination.x === 2 && destination.y === 2)){
            continue;
        }
        
                //white king cannot move on his first turn
        if(piece.type === PieceType.KING && piece.color === PieceColor.WHITE && totalTurns === 1){
            break;
        }


        if(this.tileIsOccupied(destination.x, destination.y, boardState)){
            break;
        }
        
        if((destination.x - piece.position.x === i && destination.y - piece.position.y === i) 
        && (this.tileIsOccupied(destination.x + 1, destination.y + 1, boardState) || (destination.x > 3 || destination.y > 3))){
            possibleMoves.push(destination);
        } 
    }



        // movement bottom right
        for(let i = 1; i < 5; i++){

        const destination: Position = {x: piece.position.x + i, y: piece.position.y - i};

        //pawn cannot go to center
        if(piece.type === PieceType.PAWN && (destination.x === 2 && destination.y === 2)){
            continue;
        }  
        
        //black king cannot move on his first turn
        if(piece.type === PieceType.KING && piece.color === PieceColor.BLACK && totalTurns === 2){
            break;
        }

        if(this.tileIsOccupied(destination.x, destination.y, boardState)){
            break;
        }

        if((destination.x - piece.position.x === i && destination.y - piece.position.y === -i) 
        && (this.tileIsOccupied(destination.x + 1, destination.y - 1, boardState) || (destination.x > 3 || destination.y < 1))){
            possibleMoves.push(destination);
        }

    }


        // movement bottom left
        for(let i = 1; i < 5; i++){

        const destination: Position = {x: piece.position.x - i, y: piece.position.y - i};

        //pawn cannot go to center
        if(piece.type === PieceType.PAWN && (destination.x === 2 && destination.y === 2)){
            continue;
        }
        
        //black king cannot move on his first turn
        if(piece.type === PieceType.KING && piece.color === PieceColor.BLACK && totalTurns === 2){
            break;
        }

        if(this.tileIsOccupied(destination.x, destination.y, boardState)){
            break;
        }

        if((destination.x - piece.position.x === -i && destination.y - piece.position.y === -i) 
        && (this.tileIsOccupied(destination.x - 1, destination.y - 1, boardState) || (destination.x < 1 || destination.y < 1))){
            possibleMoves.push(destination);
        }         

    }


        // movement top left
        for(let i = 1; i < 5; i++){

        const destination: Position = {x: piece.position.x - i, y: piece.position.y + i};

        //pawn cannot go to center
        if(piece.type === PieceType.PAWN && (destination.x === 2 && destination.y === 2)){
            continue;
        } 

        //white king cannot move on his first turn
        if(piece.type === PieceType.KING && piece.color === PieceColor.WHITE && totalTurns === 1){
            break;
        }              

        if(this.tileIsOccupied(destination.x, destination.y, boardState)){
            break;
            
        }

        if((destination.x - piece.position.x === -i && destination.y - piece.position.y === i) 
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
                return this.getPossibleMoves(piece, boardState);
            case PieceType.KING:
                console.log(this.getPossibleMoves(piece, boardState))
                return this.getPossibleMoves(piece, boardState);
            default: 
                return [];    
        }
    }
}
