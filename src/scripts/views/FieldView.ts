import { Field } from "../models/Field";

interface IVec2 { x: number; y: number; }
const States = {
    closed: (field: Field) => field.closed,
    flag: (field: Field) => field.marked,
    empty: (field: Field) => field.opened && !field.mined && !field.filled,
    exploded: (field: Field) => field.opened && field.mined && field.exploded,
    mined: (field: Field) => field.opened && field.mined && !field.exploded,
};

export class FieldView extends Phaser.GameObjects.Sprite {
    private _model: Field = null;
    private _postition: IVec2 = {x: 0, y: 0};

    constructor(scene: Phaser.Scene, model: Field) {
        super(scene, 0, 0, "spritesheet", "closed");
        this._model = model;
        this._init();
        this._create();
    }

    private get _offset(): IVec2 {
        return {
            x: (this.scene.cameras.main.width - this._model.board.cols * this.width) / 2,
            y: (this.scene.cameras.main.height - this._model.board.rows * this.height) / 2,
        };
    }

    private get _frameName(): string {
        for (const key in States) {
            if (States[key](this._model)) {
                return key;
            }
        }

        return this._model.value.toString();
    }

    private _init(): void {
        const offset = this._offset;
        this.x = this._postition.x = offset.x + this.width * this._model.col + this.width / 2;
        this.y = this._postition.y = offset.y + this.height * this._model.row + this.height / 2;
        this._model.on("change", this._onStateChange, this);
    }

    private _create(): void {
        this.scene.add.existing(this);
        this.setOrigin(0.5);
        this.setInteractive();
    }

    private _onStateChange(): void {
        this._render();
    }

    private _render(): void {
        this.setFrame(this._frameName);
    }
}
