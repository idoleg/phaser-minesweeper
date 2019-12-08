import { Board } from "./Board";
import { FieldView } from "../views/FieldViews";

export class Field extends Phaser.Events.EventEmitter {
    private _scene: Phaser.Scene = null;
    private _board: Board = null;
    private _row: number = 0;
    private _col: number = 0;
    private _view: FieldView = null;

    constructor(scene: Phaser.Scene, board: Board, row: number, col: number) {
        super();
        this._init(scene, board, row, col);
    }

    public get row(): number {
        return this._row;
    }

    public get col(): number {
        return this._col;
    }

    public get board(): Board {
        return this._board;
    }

    public get view(): FieldView {
        return this._view;
    }

    private _init (scene: Phaser.Scene, board: Board, row: number, col: number) {
        this._scene = scene;
        this._board = board;
        this._row = row;
        this._col = col;
        this._view = new FieldView(this._scene, this);
    }
}