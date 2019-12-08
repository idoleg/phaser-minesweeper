import { Field } from "../models/Field";

interface Vec2 {x: number, y: number};

export class FieldView extends Phaser.GameObjects.Sprite {
    private _model: Field = null;
    private _postition: Vec2 = {x: 0, y: 0}

    constructor(scene: Phaser.Scene, model: Field) {
        super(scene, 0, 0, "spritesheet", "closed");
        this._model = model;
        this._init();
        this._create();
    }

    private get _offset(): Vec2 {
        return {
            x: (this.scene.cameras.main.width - this._model.board.cols * this.width) / 2,
            y: (this.scene.cameras.main.height - this._model.board.rows * this.height) / 2
        }
    }

    private _init(): void {
        const offset = this._offset;
        this.x = this._postition.x = offset.x + this.width * this._model.col + this.width / 2;
        this.y = this._postition.y = offset.y + this.height * this._model.row + this.height / 2;
    }

    private _create(): void {
        this.scene.add.existing(this);
        this.setOrigin(0.5);
    }
}