import * as PIXI from 'pixi.js'
import PixiAdapter from './PixiAdapter';
import GameScene from "./scene/GameScene";
import GameOverScene from './scene/GameOverScene';
import SceneManager from "./SceneManager";
import {SceneStatus} from "./scene/SceneStatus";
import Container = PIXI.Container;
import CommonValue from "../domain/valueObject/CommonValue";
import TopScene from "./scene/TopScene";
import Position from "../domain/valueObject/Position"

/**
 * ゲームマネージャクラス
 */
export default class GameManager {
    static createGame(app: PIXI.Application) {

        let windowSize = new Position(window.innerWidth, window.innerHeight);
        let commonValue = new CommonValue(0, windowSize);

        // windowsizeを監視して更新する.
        app.ticker.add(a => {
            commonValue.windowSize = new Position(window.innerWidth, window.innerHeight);
            app.renderer.resize(window.innerWidth, window.innerHeight);
        });

        // トップ画面のコンテナを作成
        let topContainer = new Container();
        app.stage.addChild(topContainer);
        const topPixiAdapter: PixiAdapter = new PixiAdapter(topContainer);
        const topScene = new TopScene(app, topPixiAdapter, commonValue);

        // ゲーム画面のコンテナを作成
        let gameContainer = new Container();
        app.stage.addChild(gameContainer);
        const gamePixiAdapter: PixiAdapter = new PixiAdapter(gameContainer);
        let gameScene = new GameScene(app, gamePixiAdapter, commonValue);

        // ゲームオーバー画面のコンテナを作成
        let gameOverContainer = new Container();
        app.stage.addChild(gameOverContainer);
        const gameOverPixiAdapter: PixiAdapter = new PixiAdapter(gameOverContainer);
        const gameOverScene = new GameOverScene(app, gameOverPixiAdapter, commonValue);

        // SceneManager
        new SceneManager(app.ticker, SceneStatus.TOP,
            [topScene, gameScene, gameOverScene], topScene);

        /**
         * サンプル実装を見る限り、この階層でsetup,gameloopを用意してあげるのがよさそう。
         * gameloopでplay,endメソッドを呼ぶ。関数オブジェクトstateを使ってた。typescriptでもできるのか？
         * endでcontainerのvisibleを切り替えてあげるみたいな。
         * 
         */
    }
}