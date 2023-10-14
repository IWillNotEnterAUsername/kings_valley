export const verticalAxis = ['1','2','3','4','5'];
export const horizontalAxis = ['a', 'b', 'c', 'd', 'e'];

export const gridSize = 200;

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
};

export const initialBoardState: Piece[] = [
{image: "assets/images/white-pawn.png", position:{x: 0, y: 0}, type: PieceType.PAWN, color: PieceColor.WHITE},
{image: "assets/images/white-pawn.png", position:{x: 1, y: 0}, type: PieceType.PAWN, color: PieceColor.WHITE},

{image: "assets/images/white-king.png", position:{x: 2, y: 0}, type: PieceType.KING, color: PieceColor.WHITE},

{image: "assets/images/white-pawn.png", position:{x: 3, y: 0}, type: PieceType.PAWN, color: PieceColor.WHITE},
{image: "assets/images/white-pawn.png", position:{x: 4, y: 0}, type: PieceType.PAWN, color: PieceColor.WHITE},



{image: "assets/images/black-pawn.png", position:{x: 0, y: 4}, type: PieceType.PAWN, color: PieceColor.BLACK},
{image: "assets/images/black-pawn.png", position:{x: 1, y: 4}, type: PieceType.PAWN, color: PieceColor.BLACK},

{image: "assets/images/black-king.png", position:{x: 2, y: 4}, type: PieceType.KING, color: PieceColor.BLACK},

{image: "assets/images/black-pawn.png", position:{x: 3, y: 4}, type: PieceType.PAWN, color: PieceColor.BLACK},
{image: "assets/images/black-pawn.png", position:{x: 4, y: 4}, type: PieceType.PAWN, color: PieceColor.BLACK}
];
