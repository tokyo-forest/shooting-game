import {MyAircraft} from "../domain/MyAircraft";
import * as PIXI from 'pixi.js'
import {EnemyAircraft} from "../domain/EnemyAircraft";
import BaseFactory from "./BaseFactory";
import BulletFactory from "./BulletFactory";

/**
 * 機体を作成するファクトリクラス
 */
export default class AircraftFactory extends BaseFactory{

    private bulletFactory: BulletFactory;

    constructor(stage: PIXI.Container) {
        super(stage);
        this.bulletFactory = new BulletFactory(stage);
    }

    // 自機の画像
    MY_AIRCRAFT_VIEW: string = 'contents/img/shuttle.gif';

    // 敵機の画像
    ENEMY_AIRCRAFT_VIEW: string = 'contents/img/ufo.gif';

    /**
     * 自機を作成する
     */
    createMyAircraft(): MyAircraft {
        let sprite = PIXI.Sprite.from(this.MY_AIRCRAFT_VIEW);
        this.addChildSprite(sprite);
        return new MyAircraft(sprite, this.bulletFactory);
    }

    /**
     * 敵機を作成する
     */
    createEnemyAircraft(): EnemyAircraft {
        let sprite = PIXI.Sprite.from(this.ENEMY_AIRCRAFT_VIEW);
        this.addChildSprite(sprite);
        return new EnemyAircraft(sprite, this.bulletFactory);
    }
}