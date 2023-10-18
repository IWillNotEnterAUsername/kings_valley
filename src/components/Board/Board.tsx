import './Board.css';
import Tile from "../Tile/Tile";
import Moveset from '../../Moveset/Moveset';
import { winner } from '../../Moveset/Moveset';
import React, {useRef, useState } from 'react';
import { verticalAxis, 
    horizontalAxis, 
    Piece, PieceType, 
    PieceColor, 
    initialBoardState, 
    Position,
    gridSize,
    samePosition,
    sun
} from '../../Constants';


export default function Board(){

    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);

    const [grabPosition, setGrabPosition] = useState<Position>({x: -1, y: -1});

    const [pieces, setPieces] = useState<Piece[]>(initialBoardState);

    const boardRef = useRef<HTMLDivElement>(null);

    const moveset = new Moveset();

    const gameOverRef = useRef<HTMLDivElement>(null);


    function updateValidMoves(){
        setPieces((currentPieces) => {
            return currentPieces.map(p => {
                p.possibleMoves = moveset.getValidMoves(p, currentPieces);
                return p;
            });
        });
    }

    function grabPiece(e: React.MouseEvent){

        updateValidMoves();

        const element = e.target as HTMLElement;
        const board = boardRef.current;

        if (element.classList.contains("piece") && board){
            const grabX = Math.floor((e.clientX - board.offsetLeft) / gridSize);
            const grabY = Math.abs(Math.ceil((e.clientY - board.offsetTop - 1000) / gridSize))
            setGrabPosition({
                x: grabX, 
                y: grabY
            });


            const x = e.clientX - gridSize / 2;
            const y = e.clientY - gridSize / 2;        
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
    
            setActivePiece(element);
        }
    }
    
    
    function movePiece(e: React.MouseEvent){
        
        const board = boardRef.current;

        if (activePiece && board){
            const minX = board.offsetLeft;
            const minY = board.offsetTop;
            const maxX = board.offsetLeft  + board.clientWidth - gridSize;
            const maxY = board.offsetTop + board.clientHeight - gridSize;            
            const x = e.clientX - gridSize / 2;
            const y = e.clientY - gridSize / 2;        
            activePiece.style.position = "absolute";

            if(x < minX){
                activePiece.style.left = `${minX}px`;
            }
            else if(x > maxX){
                activePiece.style.left = `${maxX}px`;
            }
            else {
                activePiece.style.left = `${x}px`;
            }


            if(y < minY){
                activePiece.style.top = `${minY}px`;
            }
            else if(y > maxY){
                activePiece.style.top = `${maxY}px`;
            }
            else {
                activePiece.style.top = `${y}px`;
            }
    
        }    
    }
    
    function dropPiece(e: React.MouseEvent){
        const board = boardRef.current;        
        if(activePiece && board){
            const x = Math.floor((e.clientX - board.offsetLeft) / gridSize);
            const y = Math.abs(Math.ceil((e.clientY - board.offsetTop - 1000) / gridSize));


            setPieces(value =>{
                const pieces = value.map(p =>{
                    if(samePosition(p.position, grabPosition)){
                        const validMove = moveset.isValidMove(grabPosition, {x,y}, p.type, p.color, value);
                        if(validMove){
                            p.position.x = x;
                            p.position.y = y;
                            if(winner !== ''){
                                gameOverRef.current?.classList.remove("hidden");
                            }
                        }
                        else {
                            activePiece.style.position = "relative";
                            activePiece.style.removeProperty("top");
                            activePiece.style.removeProperty("left");
                        }
                    }
                    return p;
                })
                return pieces;
            })
            setActivePiece(null);
        }
    }

    function restartGame() {
        gameOverRef.current?.classList.add("hidden");
        window.location.reload();
    }     
    let board = [];
    for(let j = verticalAxis.length - 1; j >= 0; j--){
        for(let i = 0; i < horizontalAxis.length; i++){

            const number = j + i + 2;
            const piece = pieces.find(p => p.position.x === i && p.position.y === j);
            let image = piece ? piece.image : undefined;

            let currentPiece = activePiece != null ? pieces.find(p => samePosition(p.position, grabPosition)) : undefined;
            let highlight = currentPiece?.possibleMoves ? currentPiece.possibleMoves.some(p => samePosition(p, {x: i ,y: j})) : false

            if(i === 2 && j === 2){
                const className: string = ["tile black-tile",
                highlight && "sun-highlight"].filter(Boolean).join(' ');

                board.push(<div key={`${j},${i}`} className={className}>
                    {sun && <div style={{backgroundImage : `url(${sun})`}} className='icon'></div>}</div>)
                continue;

            }

            board.push(<Tile key={`${j},${i}`} image={image} number={number} highlight={highlight} />);
        }
    }
    
    return (
    <div 
    onMouseMove={e => movePiece(e)} 
    onMouseDown={e => grabPiece(e)} 
    onMouseUp={e => dropPiece(e)}
    id = "board"
    ref = {boardRef}
    >
    {board}
    <div className="modal hidden" ref = {gameOverRef}>
        <div className="modal-body">
            <div className='gameOver-body'>
                <span>{winner} Won!</span>
                <button onClick={restartGame}>Play again</button>
            </div>
        </div>
    </div>
    </div>
    
    )
}