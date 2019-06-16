import * as PIXI from 'pixi.js'
import BaseScene from "./BaseScene";
import PixiAdapter from "../PixiAdapter";
import {TickerStore} from "../SceneManager";
import {SceneStatus} from "./SceneStatus";
import KeyboardManager from "../../common/KeyboardManager";
import CommonValue from "../../domain/valueObject/CommonValue";
import InteractionData = PIXI.interaction.InteractionData;
import TopLayout from "../layout/TopLayout";

export default class TopScene implements BaseScene {
    tickerStore: TickerStore;
    app: PIXI.Application;
    pixiAdapter: PixiAdapter;
    keyboardManager: KeyboardManager;
    move: boolean;
    commonValue: CommonValue;

    constructor(app: PIXI.Application, gamePixiAdapter: PixiAdapter, commonValue: CommonValue) {
        this.tickerStore = new TickerStore(SceneStatus.TOP);
        this.app = app;
        this.pixiAdapter = gamePixiAdapter;
        this.keyboardManager = new KeyboardManager();
        this.move = false;
        this.commonValue = commonValue;
    }

    create() {
        this.move = false;
        this.keyboardManager = new KeyboardManager();

        // レイアウト作成
        const layout = new TopLayout(this.app, this.pixiAdapter, this.commonValue);
        layout.create();

        // キーボードイベントの制御
        this.keyboardManager.space.pushPressHandler((event: any) => {
            this.move = true;
        });

        // touchイベントの制御
        if (PIXI.utils.isMobile.any === true) {
            const windowSize = this.commonValue.windowSize;
            const hitArea = new PIXI.Rectangle(0, 0, windowSize.x, windowSize.y);
            const dummy = new PIXI.Graphics();
            dummy.interactive = true;
            dummy.buttonMode = true;
            dummy.hitArea = hitArea;
            this.pixiAdapter.addChildSprite(dummy);
            let touchOut = (event: any) => {
                const inter: InteractionData = event.data;
                inter.getLocalPosition(dummy);
                this.move = true;
            };
            dummy.on('touchstart', touchOut);
        }

        this.pixiAdapter.showContainer();
    }

    destroy(): void {
        this.move = false;
        this.pixiAdapter.hideContainer();
        this.pixiAdapter.removeChildren();
        this.commonValue.score = 0;
    }

    getTickerStore(): TickerStore {
        return this.tickerStore;
    }

    nextScene(): SceneStatus {
        if (this.move === true) {
            return SceneStatus.GAME;
        }
        return SceneStatus.TOP;
    }
}