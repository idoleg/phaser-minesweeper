import { Field} from "./Field";

export class Board extends Phaser.Events.EventEmitter {
    private _scene: Phaser.Scene = null;
    private _rows: number = 0;
    private _cols: number = 0;
    private _bombs: number = 0;
    private _fields: Field[] = [];

    constructor(scene: Phaser.Scene, rows: number, cols: number, bombs: number) {
        super();
        this._scene = scene;
        this._rows = rows;
        this._cols = cols;
        this._bombs = bombs;
        this._fields = [];
        this._create();
    }

    public get cols(): number {
        return this._cols;
    }

    public get rows(): number {
        return this._rows;
    }

    private _create(): void {
        this._createFields();
    }

    private _createFields(): void {
        for (let row = 0; row < this._rows; row++) {
            for (let col = 0; col < this._cols; col++) {
                this._fields.push(new Field(this._scene, this, row, col));
            }
        }
    }
}
