import * as PIXI from 'pixi.js'
import PixiAdapter from './PixiAdapter';
import Container = PIXI.Container;
import GameScene from "./scene/GameScene";

/**
 * ゲームマネージャクラス
 */
export default class GameManager {
    static createGame(app: PIXI.Application) {

        let gameContainer = new Container();
        app.stage.addChild(gameContainer);
        const gamePixiAdapter: PixiAdapter = new PixiAdapter(gameContainer);

        let gameOverContainer = new Container();
        app.stage.addChild(gameOverContainer);
        gameOverContainer.visible = false;
        const gameOverPixiAdapter: PixiAdapter = new PixiAdapter(gameOverContainer);

        let gameScene = new GameScene();

        gameScene.create(app, gamePixiAdapter);
    }
}