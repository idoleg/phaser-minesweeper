import { FieldView } from "../views/FieldView";
import { Board } from "./Board";

const Positions = [
    { row: 0, col: 1 },
    { row: 0, col: -1 },
    { row: 1, col: 0 },
    { row: 1, col: 1 },
    { row: 1, col: -1 },
    { row: -1, col: 0 },
    { row: -1, col: 1 },
    { row: -1, col: -1 },
];

enum States {
    Closed = "closed",
    Opened = "opened",
    Marked = "flag",
}

export class Field extends Phaser.Events.EventEmitter {

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

    public get value(): number {
        return this._value;
    }

    public set value(value: number) {
        this._value = value;
    }

    public get empty(): boolean {
        return this._value === 0;
    }

    public get mined(): boolean {
        return this._value === -1;
    }

    public get filled(): boolean {
        return this._value > 0;
    }

    public set exploded(exploded: boolean) {
        this._exploded = exploded;
        this.emit("change");
    }

    public get exploded(): boolean {
        return this._exploded;
    }

    public get marked(): boolean {
        return this._state === States.Marked;
    }

    public get closed(): boolean {
        return this._state === States.Closed;
    }

    public get opened(): boolean {
        return this._state === States.Opened;
    }

    public get completed(): boolean {
        return this.marked && this.mined;
    }
    private _scene: Phaser.Scene = null;
    private _board: Board = null;
    private _row: number = 0;
    private _col: number = 0;
    private _view: FieldView = null;
    private _value: number = 0;
    private _state: string = States.Closed;
    private _exploded: boolean = false;

    constructor(scene: Phaser.Scene, board: Board, row: number, col: number) {
        super();
        this._init(scene, board, row, col);
    }

    public setBomb(): void {
        this._value = -1;
    }

    public addFlag(): void {
        this._setState(States.Marked);
    }

    public removeFlag(): void {
        this._setState(States.Closed);
    }

    public open(): void {
        this._setState(States.Opened);
    }

    public getClosestFields(): Field[] {
        const results = [];

        Positions.forEach((position) => {
            const field = this._board.getField(this._row + position.row, this._col + position.col);

            if (field) {
                results.push(field);
            }
        });

        return results;
    }

    private _setState(state: string): void {
        if (this._state !== state) {
            this._state = state;
            this.emit("change");
        }
    }

    private _init(scene: Phaser.Scene, board: Board, row: number, col: number) {
        this._scene = scene;
        this._board = board;
        this._row = row;
        this._col = col;
        this._view = new FieldView(this._scene, this);
    }
}
