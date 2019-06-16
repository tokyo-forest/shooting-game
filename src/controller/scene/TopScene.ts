import * as PIXI from 'pixi.js'
import BaseScene from "./BaseScene";
import PixiAdapter from "../PixiAdapter";
import {TickerStore} from "../SceneManager";
import {SceneStatus} from "./SceneStatus";
import KeyboardManager from "../../common/KeyboardManager";
import CommonValue from "../../domain/valueObject/CommonValue";

export default class TopScene implements BaseScene {
    tickerStore: TickerStore;
    app: PIXI.Application;
    gamePixiAdapter: PixiAdapter;
    keyboardManager: KeyboardManager;
    move: boolean;
    commonValue: CommonValue;

    constructor(app: PIXI.Application, gamePixiAdapter: PixiAdapter, commonValue: CommonValue) {
        this.tickerStore = new TickerStore(SceneStatus.TOP);
        this.app = app;
        this.gamePixiAdapter = gamePixiAdapter;
        this.keyboardManager = new KeyboardManager();
        this.move = false;
        this.commonValue = commonValue;
    }

    create() {
        this.move = false;
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
        textSprite = new PIXI.Text("SHOOTING GAME TOKYO", style);
        textSprite.x = 20;
        textSprite.y = 20;

        let textSprite2: PIXI.Text;
        textSprite2 = new PIXI.Text("PRESS SPACE", style);
        textSprite2.x = 20;
        textSprite2.y = 120;

        this.gamePixiAdapter.addChildSprite(textSprite);
        this.gamePixiAdapter.addChildSprite(textSprite2);

        this.keyboardManager.space.pushPressHandler((event: any) => {
            this.move = true;
        });

        this.gamePixiAdapter.showContainer();
    }

    destroy(): void {
        this.gamePixiAdapter.hideContainer();
        this.gamePixiAdapter.removeChildren();
        this.commonValue.score = 0;
    }

    getTickerStore(): TickerStore {
        return this.tickerStore;
    }

    nextScene(): SceneStatus {
        if(this.move === true) {
            return SceneStatus.GAME;
        }
        return SceneStatus.TOP;
    }
}