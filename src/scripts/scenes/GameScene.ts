import { Board } from "../models/Board";

const Rows = 8;
const Cols = 8;
const Bombs = 8;

export class GameScene extends Phaser.Scene {
    private _board: Board = null;
    
    constructor() {
        super("Game");
    }

    public create(): void {
        this._board = new Board(this, Rows, Cols, Bombs);
    }
}