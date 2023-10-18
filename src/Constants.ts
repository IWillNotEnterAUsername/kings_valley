export const verticalAxis = ['1','2','3','4','5'];
export const horizontalAxis = ['a', 'b', 'c', 'd', 'e'];

export const gridSize = 200;

export function samePosition(p1: Position, p2 : Position){
    return p1.x === p2.x && p2.y === p1.y;
}

export interface Position{
    x: number;
    y: number;
}

export enum PieceColor {
    WHITE,
    BLACK
};

export enum PieceType {
    PAWN,
    KING
};

export interface Piece {
    image: string;
    position: Position;
    type: PieceType;
    color: PieceColor;
    possibleMoves?: Position[];
};



export const sun = "kings_valley/assets/images/sun.png";

export const initialBoardState: Piece[] = [
{image: "kings_valley/assets/images/white-pawn.png", position:{x: 0, y: 0}, type: PieceType.PAWN, color: PieceColor.WHITE},
{image: "kings_valley/assets/images/white-pawn.png", position:{x: 1, y: 0}, type: PieceType.PAWN, color: PieceColor.WHITE},

{image: "kings_valley/assets/images/white-king.png", position:{x: 2, y: 0}, type: PieceType.KING, color: PieceColor.WHITE},

{image: "kings_valley/assets/images/white-pawn.png", position:{x: 3, y: 0}, type: PieceType.PAWN, color: PieceColor.WHITE},
{image: "kings_valley/assets/images/white-pawn.png", position:{x: 4, y: 0}, type: PieceType.PAWN, color: PieceColor.WHITE},



{image: "kings_valley/assets/images/black-pawn.png", position:{x: 0, y: 4}, type: PieceType.PAWN, color: PieceColor.BLACK},
{image: "kings_valley/assets/images/black-pawn.png", position:{x: 1, y: 4}, type: PieceType.PAWN, color: PieceColor.BLACK},

{image: "kings_valley/assets/images/black-king.png", position:{x: 2, y: 4}, type: PieceType.KING, color: PieceColor.BLACK},

{image: "kings_valley/assets/images/black-pawn.png", position:{x: 3, y: 4}, type: PieceType.PAWN, color: PieceColor.BLACK},
{image: "kings_valley/assets/images/black-pawn.png", position:{x: 4, y: 4}, type: PieceType.PAWN, color: PieceColor.BLACK}
];
