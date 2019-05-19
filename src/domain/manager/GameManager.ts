import * as PIXI from 'pixi.js'
import MyAircraftFactory from "../factory/MyAircraftFactory";
import EnemyAircraftFactory from "../factory/EnemyAircraftFactory";
import {MyAircraft} from "../aircraft/MyAircraft";
import {Aircraft} from "../aircraft/Aircraft";
import KeyboardManager from "../../common/KeyboardManager";
import {StraightActPattern} from "../actPattern/ActPattern";

/**
 * 自機弾を作成するファクトリクラス
 */
export default class GameManager{
    static createGame(app: PIXI.Application) {
        let myAircraftFactory: MyAircraftFactory = new MyAircraftFactory(app.stage);
        let enemyAircraftFactory: EnemyAircraftFactory = new EnemyAircraftFactory(app.stage, new StraightActPattern());
        // let enemyAircraftFactory2: EnemyAircraftFactory = new EnemyAircraftFactory(app.stage, new XXXXXActPattern());

        let myUfo: MyAircraft = myAircraftFactory.createAircraft();
        let enemy1: Aircraft = enemyAircraftFactory.createAircraft();

        let keyboardManager: KeyboardManager = new KeyboardManager();

        keyboardManager.left.pushPressHandler((event: any) => {
            myUfo.moveLeft()
        });
        keyboardManager.left.pushReleaseHandler((event: any) => {
            if (!keyboardManager.right.isDown) {
                myUfo.stopLeft();
            }
        });
        keyboardManager.up.pushPressHandler((event: any) => {
            myUfo.moveUp()
        });
        keyboardManager.up.pushReleaseHandler((event: any) => {
            if (!keyboardManager.down.isDown) {
                myUfo.stopUp();
            }
        });

        keyboardManager.right.pushPressHandler((event: any) => {
            myUfo.moveRight()
        });
        keyboardManager.right.pushReleaseHandler((event: any) => {
            if (!keyboardManager.left.isDown) {
                myUfo.stopRight();
            }
        });

        keyboardManager.down.pushPressHandler((event: any) => {
            myUfo.moveDown()
        });
        keyboardManager.down.pushReleaseHandler((event: any) => {
            if (!keyboardManager.up.isDown) {
                myUfo.stopDown();
            }
        });

//Set the game state
        let state = (delta: any) => {
            myUfo.play();
            enemy1.play();
        };

//Start the game loop
        app.ticker.add(delta => state(delta));

    }
}