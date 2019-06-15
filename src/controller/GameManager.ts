import * as PIXI from 'pixi.js'
import PixiAdapter from './PixiAdapter';
import GameScene from "./scene/GameScene";
import GameOverScene from './scene/GameOverScene';
import SceneManager from "./SceneManager";
import {SceneStatus} from "./scene/SceneStatus";
import Container = PIXI.Container;

/**
 * ゲームマネージャクラス
 */
export default class GameManager {
    static createGame(app: PIXI.Application) {
        // ゲーム画面のコンテナ
        let gameContainer = new Container();
        app.stage.addChild(gameContainer);
        const gamePixiAdapter: PixiAdapter = new PixiAdapter(gameContainer);
        let gameScene = new GameScene(app, gamePixiAdapter);

        // ゲームオーバー画面のコンテナ
        let gameOverContainer = new Container();
        app.stage.addChild(gameOverContainer);
        const gameOverPixiAdapter: PixiAdapter = new PixiAdapter(gameOverContainer);
        const gameOverScene = new GameOverScene(app, gameOverPixiAdapter);

        // SceneManager
        new SceneManager(app.ticker, SceneStatus.GAME,
            [gameScene, gameOverScene], gameScene);

        /**
         * サンプル実装を見る限り、この階層でsetup,gameloopを用意してあげるのがよさそう。
         * gameloopでplay,endメソッドを呼ぶ。関数オブジェクトstateを使ってた。typescriptでもできるのか？
         * endでcontainerのvisibleを切り替えてあげるみたいな。
         * 
         */
    }
}