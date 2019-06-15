import * as PIXI from 'pixi.js'
import BaseScene from "./BaseScene";
import PixiAdapter from "../PixiAdapter";
import {TickerStore} from "../SceneManager";
import {SceneStatus} from "./SceneStatus";
import KeyboardManager from "../../common/KeyboardManager";

export default class GameOverScene implements BaseScene {
    tickerStore: TickerStore;
    app: PIXI.Application;
    gamePixiAdapter: PixiAdapter;
    keyboardManager: KeyboardManager;
    move: boolean;

    constructor(app: PIXI.Application, gamePixiAdapter: PixiAdapter) {
        this.tickerStore = new TickerStore(SceneStatus.GAMEOVER);
        this.app = app;
        this.gamePixiAdapter = gamePixiAdapter;
        this.keyboardManager = new KeyboardManager();
        this.move = false;
    }

    create() {
        this.keyboardManager = new KeyboardManager();
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#00ff99'], // gradient
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440,
        });

        let textSprite: PIXI.Text;
        textSprite = new PIXI.Text("gameover", style);
        textSprite.x = 20;
        textSprite.y = 20;

        this.gamePixiAdapter.addChildSprite(textSprite);

        this.keyboardManager.space.pushPressHandler((event: any) => {
            this.move = true;
            console.log("called")
        });

        this.gamePixiAdapter.showContainer();
    }

    destroy(): void {
        this.gamePixiAdapter.hideContainer();
        this.gamePixiAdapter.removeAll();
    }

    getTickerStore(): TickerStore {
        return this.tickerStore;
    }

    nextScene(): SceneStatus {
        if(this.move === true) {
            return SceneStatus.GAME;
        }
        return SceneStatus.GAMEOVER;
    }
}