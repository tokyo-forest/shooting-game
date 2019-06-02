import * as PIXI from 'pixi.js'
import MyAircraftFactory from "../domain/factory/MyAircraftFactory";
import EnemyAircraftFactory from "../domain/factory/EnemyAircraftFactory";
import MyAircraft from "../domain/aircraft/MyAircraft";
import KeyboardManager from "../common/KeyboardManager";
import {StraightActPattern} from "../domain/actPattern/ActPattern";
import Collision from "../domain/collision/Collision";
import WallCollision from "../domain/collision/WallCollision";
import BulletManager from "./BulletManager";
import EnemyManager from "./EnemyManager";

/**
 * ゲームマネージャクラス
 */
export default class GameManager {
    static createGame(app: PIXI.Application) {
        let bulletManager: BulletManager = new BulletManager(app.stage);

        let myAircraftFactory: MyAircraftFactory = new MyAircraftFactory(app.stage, bulletManager);
        let enemyAircraftFactory: EnemyAircraftFactory = new EnemyAircraftFactory(app.stage, bulletManager, new StraightActPattern());

        // 敵の管理クラスの設定
        let enemyManager: EnemyManager = new EnemyManager(enemyAircraftFactory, app.stage);
        app.ticker.add(delta => enemyManager.play());

        // let enemyAircraftFactory2: EnemyAircraftFactory = new EnemyAircraftFactory(app.stage, new XXXXXActPattern());

        let myUfo: MyAircraft = myAircraftFactory.createAircraft();

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

        // 次の行動を設定
        let actNext = () => {
            myUfo.nextAction();
            bulletManager.bullets.forEach(
                b => b.nextAction()
            );
            enemyManager.enemys.forEach(
                e => e.nextAction()
            );
        };
        app.ticker.add(delta => actNext());

        // 弾の衝突判定を定義
        let judgeCollision = () => {
            bulletManager.bullets.forEach(mb => {
                enemyManager.enemys.forEach( enemy => {
                    Collision.determine(enemy, mb);
                })
            });
        };
        app.ticker.add(delta => judgeCollision());

        // 壁の衝突判定を定義
        let wallCollision = new WallCollision(20, 20, 400, 400);
        let judgeWallCollision = () => {
            wallCollision.determine(myUfo);
            bulletManager.bullets.forEach(mb => {
                wallCollision.determine(mb);
            });
            enemyManager.enemys.forEach(enemy => {
                wallCollision.determine(enemy);
            });
        };
        app.ticker.add(delta => judgeWallCollision());

        // ダメージの解決
        let applyDamage = () => {
            myUfo.applyDamage();
            bulletManager.bullets.forEach(
                b => b.applyDamage()
            );
            enemyManager.enemys.forEach(
                e => e.applyDamage()
            );
        };
        app.ticker.add(delta => applyDamage());

        // 弾の状態監視を定義
        app.ticker.add(delta => bulletManager.observeBulletDisable());
        // 敵の状態監視
        app.ticker.add(delta => enemyManager.observeEnemyDisable())

        // 移動処理を定義
        let state = (delta: any) => {
            myUfo.play();
            bulletManager.bullets.forEach(
                b => b.play()
            );
            enemyManager.enemys.forEach(
                e => e.play()
            );
        };

//Start the game loop
        app.ticker.add(delta => state(delta));

    }
}