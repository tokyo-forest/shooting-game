import BaseFactory from "./BaseFactory";
import {Aircraft} from "../aircraft/Aircraft";
import BulletFactory from "./BulletFactory";
import {EnemyAircraft} from "../aircraft/EnemyAircraft";
import EnemyBulletFactory from "./EnemyBulletFactory";
import * as PIXI from 'pixi.js'

/**
 * 敵機体を作成するファクトリクラス
 */
export default class EnemyAircraftFactory extends BaseFactory {
    private bulletFactory: BulletFactory;

    constructor(stage: PIXI.Container) {
        super(stage);
        this.bulletFactory = new EnemyBulletFactory(stage);
    }


    // 敵機の画像
    private ENEMY_AIRCRAFT_VIEW: string = 'contents/img/ufo.gif';

    // 敵機の判定範囲
    private ENEMY_AIRCRAFT_RADIUS: number = 10;

    public createAircraft(): Aircraft {
        let sprite = PIXI.Sprite.from(this.ENEMY_AIRCRAFT_VIEW);
        sprite.anchor.set(0.5);
        this.addChildSprite(sprite);
        return new EnemyAircraft(sprite,
            this.ENEMY_AIRCRAFT_RADIUS,
            this.bulletFactory);
    }
}