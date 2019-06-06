import * as PIXI from 'pixi.js'
import MyAircraftFactory from "../domain/factory/MyAircraftFactory";
import EnemyAircraftFactory from "../domain/factory/EnemyAircraftFactory";
import MyAircraft from "../domain/aircraft/MyAircraft";
import KeyboardManager from "../common/KeyboardManager";
import { StraightActPattern } from "../domain/actPattern/ActPattern";
import Collision from "../domain/collision/Collision";
import WallCollision from "../domain/collision/WallCollision";
import BulletManager from "./BulletManager";
import EnemyManager from "./EnemyManager";
import PixiAdapter from './PixiAdapter';
import EntityView from './view/EntityView';

/**
 * ゲームマネージャクラス
 */
export default class GameManager {
    static createGame(app: PIXI.Application) {
        const pixiAdapter: PixiAdapter = new PixiAdapter(app.stage);

        let bulletManager: BulletManager = new BulletManager(pixiAdapter);
        let myAircraftFactory: MyAircraftFactory = new MyAircraftFactory(bulletManager);
        let enemyAircraftFactory: EnemyAircraftFactory = new EnemyAircraftFactory(bulletManager, new StraightActPattern());

        // 敵の管理クラスの設定
        let enemyManager: EnemyManager = new EnemyManager(enemyAircraftFactory, pixiAdapter);
        // TODO MyAircraftManagerも欲しいところ
        app.ticker.add(delta => enemyManager.play());

        let myUfoEntityView: EntityView = myAircraftFactory.createAircraft();
        pixiAdapter.addChildSprite(myUfoEntityView.$sprite);
        // myAircraftFactoryからつくられているので、必ず下記のキャストは成功する
        let myUfo = myUfoEntityView.$entity as MyAircraft;

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
                b => b.$entity.nextAction()
            );
            enemyManager.enemys.forEach(
                e => e.$entity.nextAction()
            );
        };
        app.ticker.add(delta => actNext());

        // 弾の衝突判定を定義
        let judgeCollision = () => {
            bulletManager.bullets.forEach(mb => {
                enemyManager.enemys.forEach(enemy => {
                    Collision.determine(enemy.$entity, mb.$entity);
                })
            });
        };
        app.ticker.add(delta => judgeCollision());

        // 壁の衝突判定を定義
        let wallCollision = new WallCollision(20, 20, 400, 400);
        let judgeWallCollision = () => {
            wallCollision.determine(myUfo);
            bulletManager.bullets.forEach(mb => {
                wallCollision.determine(mb.$entity);
            });
            enemyManager.enemys.forEach(enemy => {
                wallCollision.determine(enemy.$entity);
            });
        };
        app.ticker.add(delta => judgeWallCollision());

        // ダメージの解決
        let applyDamage = () => {
            myUfo.applyDamage();
            bulletManager.bullets.forEach(
                b => b.$entity.applyDamage()
            );
            enemyManager.enemys.forEach(
                e => e.$entity.applyDamage()
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
                b => b.$entity.play()
            );
            enemyManager.enemys.forEach(
                e => e.$entity.play()
            );
        };

        //Start the game loop
        app.ticker.add(delta => state(delta));

        let updateSprite = (delta: any) => {
            bulletManager.bullets.forEach(b => b.update());
            enemyManager.enemys.forEach(b => b.update());
            myUfoEntityView.update();
        }

        app.ticker.add(delta => updateSprite(delta));

    }
}