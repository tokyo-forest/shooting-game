import * as PIXI from 'pixi.js'
import {SceneStatus} from "./scene/SceneStatus";

/**
 * 画面遷移などのシーン制御を行う
 */
export default class SceneManager {
    private ticker: PIXI.Ticker;

    private tickerStores: TickerStore[];

    private scene: SceneStatus;

    constructor(ticker: PIXI.Ticker, scene: SceneStatus) {
        this.ticker = ticker;
        this.tickerStores = [];
        this.scene = scene;
        this.ticker.add(param => this.play(param));
    }

    setScene(scene: SceneStatus) {
        this.scene = scene;
    }

    play(param: any): any {
        this.tickerStores
            .filter(store => this.scene === store.getScene())
            .forEach(store => store.play());
        return param;
    }

    addTickerStore(tickerStore: TickerStore) {
        this.tickerStores.push(tickerStore);
    }

}

// tickerで実行するための情報を格納する
export class TickerStore {
    private array: ((...params: any[]) => any)[];

    private scene: SceneStatus;

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

    getScene(): SceneStatus {
        return this.scene;
    }
}