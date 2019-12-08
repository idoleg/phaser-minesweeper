import * as Phaser from "phaser";
import {GameScene} from "./scenes/GameScene";
import {StartScene} from "./scenes/StartScene";

// tslint:disable-next-line: no-unused-expression
new Phaser.Game({
    type: Phaser.AUTO,
    parent: "minesweeper",
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "#F0FFFF",
    scene: [StartScene, GameScene],
});
