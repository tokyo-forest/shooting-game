import * as PIXI from 'pixi.js'
import MyAircraftFactory from "../../domain/factory/MyAircraftFactory";
import EnemyAircraftFactory from "../../domain/factory/EnemyAircraftFactory";
import MyAircraft from "../../domain/aircraft/MyAircraft";
import KeyboardManager from "../../common/KeyboardManager";
import Collision from "../../domain/collision/Collision";
import WallCollision from "../../domain/collision/WallCollision";
import BulletManager from "../BulletManager";
import EnemyManager from "../EnemyManager";
import PixiAdapter from '../PixiAdapter';
import EntityView from '../view/EntityView';
import ScoreManager from "../ScoreManager";
import EasyFirePattern from '../../domain/firePattern/EasyFirePattern';
import BaseScene from "./BaseScene";
import {TickerStore} from "../SceneManager";
import {SceneStatus} from "./SceneStatus";
import {Status} from "../../domain/valueObject/Status";
import RandomActPattern from '../../domain/actPattern/RandomActPattern';
import DiagonalActPattern from '../../domain/actPattern/DiagonalActPattern';
import Position from "../../domain/valueObject/Position";
import InteractionData = PIXI.interaction.InteractionData;
import { Direction } from '../../domain/valueObject/Direction';
import WaveActPattern from '../../domain/actPattern/WaveActPattern';
import CommonValue from "../../domain/valueObject/CommonValue";

export default class GameScene implements BaseScene {
    tickerStore: TickerStore;

    myAirCraft: MyAircraft | undefined;

    app: PIXI.Application;
    gamePixiAdapter: PixiAdapter;
    keyboardManager: KeyboardManager;
    commonValue: CommonValue;

    enemyAircraftFactoryList: Array<EnemyAircraftFactory>;

    constructor(app: PIXI.Application, gamePixiAdapter: PixiAdapter, commonValue: CommonValue) {
        this.tickerStore = new TickerStore(SceneStatus.GAME);
        this.app = app;
        this.gamePixiAdapter = gamePixiAdapter;
        this.keyboardManager = new KeyboardManager();
        this.enemyAircraftFactoryList = new Array<EnemyAircraftFactory>();
        this.commonValue = commonValue;
    }

    create() {
        this.tickerStore = new TickerStore(SceneStatus.GAME);

        let bulletManager: BulletManager = new BulletManager(this.gamePixiAdapter);
        let myAircraftFactory: MyAircraftFactory = new MyAircraftFactory(bulletManager);
        let scoreManager: ScoreManager = new ScoreManager(this.gamePixiAdapter, this.commonValue);
        this.enemyAircraftFactoryList.push(
            new EnemyAircraftFactory(bulletManager, new DiagonalActPattern(Direction.LOWER), new EasyFirePattern()),
            new EnemyAircraftFactory(bulletManager, new DiagonalActPattern(Direction.LOWER_LEFT), new EasyFirePattern()),
            new EnemyAircraftFactory(bulletManager, new DiagonalActPattern(Direction.LOWER_RIGHT), new EasyFirePattern()),
            new EnemyAircraftFactory(bulletManager, new RandomActPattern(), new EasyFirePattern()),
            new EnemyAircraftFactory(bulletManager, new WaveActPattern(), new EasyFirePattern()));

        // 敵の管理クラスの設定
        let enemyManager: EnemyManager = new EnemyManager(this.enemyAircraftFactoryList, this.gamePixiAdapter, scoreManager);
        // TODO MyAircraftManagerも欲しいところ
        this.tickerStore.add(delta => enemyManager.play());

        let myUfoEntityView: EntityView<MyAircraft> = myAircraftFactory.createAircraft();
        this.gamePixiAdapter.addChildSprite(myUfoEntityView.$sprite);
        // myAircraftFactoryからつくられているので、必ず下記のキャストは成功する
        let myUfo = myUfoEntityView.$entity as MyAircraft;
        this.myAirCraft = myUfo;

        // キーボード押下時の制御
        this.keyboardManager.left.pushPressHandler((event: any) => {
            myUfo.moveLeft()
        });
        this.keyboardManager.left.pushReleaseHandler((event: any) => {
            if (!this.keyboardManager.right.isDown) {
                myUfo.stopLeft();
            }
        });
        this.keyboardManager.up.pushPressHandler((event: any) => {
            myUfo.moveUp()
        });
        this.keyboardManager.up.pushReleaseHandler((event: any) => {
            if (!this.keyboardManager.down.isDown) {
                myUfo.stopUp();
            }
        });

        this.keyboardManager.right.pushPressHandler((event: any) => {
            myUfo.moveRight()
        });
        this.keyboardManager.right.pushReleaseHandler((event: any) => {
            if (!this.keyboardManager.left.isDown) {
                myUfo.stopRight();
            }
        });

        this.keyboardManager.down.pushPressHandler((event: any) => {
            myUfo.moveDown()
        });
        this.keyboardManager.down.pushReleaseHandler((event: any) => {
            if (!this.keyboardManager.up.isDown) {
                myUfo.stopDown();
            }
        });

        // マウス位置での制御
        // https://pixijs.io/examples/#/interaction/dragging.js
        if (PIXI.utils.isMobile.any === true) {
            const dummy = PIXI.Sprite.from("contents/img/shuttle.gif");
            this.gamePixiAdapter.addChildSprite(dummy);
            dummy.interactive = true;
            dummy.anchor.set(0.5);
            dummy.scale.set(1);
            let onDragMove = (event: any) => {
                console.log("drag event called");
                const inter: InteractionData = event.data;
                const p = inter.getLocalPosition(dummy);
                myUfo.position1 = new Position(p.x, p.y);
            };
            let onDragStart = (event: any) => {
                console.log("drag event called");
                const inter: InteractionData = event.data;
                const p = inter.getLocalPosition(dummy);
                myUfo.position1 = new Position(p.x, p.y);
            };
            dummy.on('pointermove', onDragMove);
            dummy.on('pointerdown', onDragStart);

        }

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
        this.tickerStore.add(delta => actNext());

        // 弾の衝突判定を定義
        let judgeCollision = () => {
            bulletManager.bullets.forEach(mb => {
                enemyManager.enemys.forEach(enemy => {
                    Collision.determine(enemy.$entity, mb.$entity);
                });
                Collision.determine(myUfo, mb.$entity);
            });

        };
        this.tickerStore.add(delta => judgeCollision());

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
        this.tickerStore.add(delta => judgeWallCollision());

        // ダメージの解決
        let applyDamage = () => {
            myUfo.applyDamage();
            enemyManager.enemys.forEach(
                e => e.$entity.applyDamage()
            );
        };
        this.tickerStore.add(delta => applyDamage());

        // 弾の状態監視を定義
        this.tickerStore.add(delta => bulletManager.observeBulletDisable());
        // 敵の状態監視
        this.tickerStore.add(delta => enemyManager.observeEnemyDisable());

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
        this.tickerStore.add(delta => state(delta));

        let updateSprite = (delta: any) => {
            bulletManager.bullets.forEach(b => b.update());
            enemyManager.enemys.forEach(b => b.update());
            myUfoEntityView.update();
        };

        this.tickerStore.add(delta => updateSprite(delta));

        this.gamePixiAdapter.showContainer();
    }

    destroy(): void {
        this.gamePixiAdapter.hideContainer();
        this.gamePixiAdapter.removeChildren();
        this.keyboardManager.clearAllKeyEvent();
        this.tickerStore
    }

    getTickerStore(): TickerStore {
        return this.tickerStore;
    }

    nextScene(): SceneStatus {
        // myAirCraftがundefinedのときは想定外のためTopへ戻す.
        if (this.myAirCraft === undefined) {
            return SceneStatus.GAME;
        }

        if (this.myAirCraft.status === Status.GAMEOVER) {
            return SceneStatus.GAMEOVER;
        }

        return SceneStatus.GAME;
    }
}