import * as PIXI from 'pixi.js'
import MyAircraftFactory from "../factory/MyAircraftFactory";
import EnemyAircraftFactory from "../factory/EnemyAircraftFactory";
import {MyAircraft} from "../aircraft/MyAircraft";
import {Aircraft} from "../aircraft/Aircraft";
import KeyboardManager from "../../common/KeyboardManager";
import {StraightActPattern} from "../actPattern/ActPattern";
import Collision from "../collision/Collision";
import WallCollision from "../collision/WallCollision";
import BulletManager from "./BulletManager";

/**
 * ゲームマネージャクラス
 */
export default class GameManager {
    static createGame(app: PIXI.Application) {
        let bulletManager: BulletManager = new BulletManager(app.stage);

        let myAircraftFactory: MyAircraftFactory = new MyAircraftFactory(app.stage, bulletManager);
        let enemyAircraftFactory: EnemyAircraftFactory = new EnemyAircraftFactory(app.stage, bulletManager, new StraightActPattern());
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

        // 弾の衝突判定を定義
        let judgeCollision = () => {
            myUfo.bullets.forEach(mb => {
                Collision.determine(enemy1, mb);
            });
        };
        app.ticker.add(delta => judgeCollision());

        // 壁の衝突判定を定義
        let wallCollision = new WallCollision(20, 20, 400, 400);
        let judgeWallCollision = () => {
            wallCollision.determine(myUfo);
            myUfo.bullets.forEach(mb => {
                wallCollision.determine(mb);
            })
        };
        app.ticker.add(delta => judgeWallCollision());

        // 弾の状態監視を定義
        app.ticker.add(delta => bulletManager.observeBulletDisable());

        // 移動処理を定義
        let state = (delta: any) => {
            myUfo.play();
            enemy1.play();
            bulletManager.bullets.forEach(
                b => b.play()
            );
        };

//Start the game loop
        app.ticker.add(delta => state(delta));

    }
}