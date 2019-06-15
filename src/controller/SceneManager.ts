import * as PIXI from 'pixi.js'
import {SceneStatus} from "./scene/SceneStatus";
import BaseScene from "./scene/BaseScene";

/**
 * 画面遷移などのシーン制御を行う
 */
export default class SceneManager {
    private ticker: PIXI.Ticker;

    // 全てのシーンクラス.
    private scenes: BaseScene[];

    // 現在のシーンを保持する
    private currentSceneStatus: SceneStatus;

    // 現在のシーンに対応するシーンクラスを保持
    private currentScene: BaseScene;

    constructor(ticker: PIXI.Ticker, scene: SceneStatus, scenes: BaseScene[], initScene: BaseScene) {
        this.ticker = ticker;
        this.scenes = scenes;
        this.currentSceneStatus = scene;
        this.currentScene = initScene;
        this.ticker.add(param => this.play(param));
        this.currentScene.create();
    }

    play(param: any): any {
        this.currentScene.getTickerStore().play();
        const nextScene = this.currentScene.nextScene();

        // 現在のシーンステータスを次のシーンが異なる場合、切り替え処理を行う
        if (this.currentSceneStatus !== nextScene) {
            const previousScene = this.currentScene;
            previousScene.destroy();

            this.currentSceneStatus = nextScene;
            this.currentScene = this.scenes
                .filter(s => s.getTickerStore().scene == nextScene)[0];
            this.currentScene.create();
        }
    }
}

// tickerで実行するための情報を格納する
export class TickerStore {
    private array: ((...params: any[]) => any)[];

    scene: SceneStatus;

    constructor(scene: SceneStatus) {
        this.array = [];
        this.scene = scene;
    }

    add(fn: (...params: any[]) => any, context?: any, priority?: number): void {
        this.array.push(fn);
    }

    play() {
        // arrayに設定されている項目を実行する.
        this.array.forEach(a => a());
    }
}