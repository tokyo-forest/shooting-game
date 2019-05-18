import BaseFactory from "./BaseFactory";
import {MyAircraft} from "../aircraft/MyAircraft";
import MyBulletFactory from "./MyBulletFactory";
import BulletFactory from "./BulletFactory";
import * as PIXI from 'pixi.js'

/**
 * 機体を作成するファクトリクラス
 */
export default class MyAircraftFactory extends BaseFactory {
    private bulletFactory: BulletFactory;

    constructor(stage: PIXI.Container) {
        super(stage);
        this.bulletFactory = new MyBulletFactory(stage);
    }


    // 自機の画像
    MY_AIRCRAFT_VIEW: string = 'contents/img/shuttle.gif';

    MY_AIRCRAFT_RADIUS: number = 10;
    MY_AIRCRAFT_LAUNCH_INTERVAL: number = 10;

    createAircraft(): MyAircraft {
        let sprite = PIXI.Sprite.from(this.MY_AIRCRAFT_VIEW);
        sprite.anchor.set(0.5);
        this.addChildSprite(sprite);
        return new MyAircraft(sprite,
            this.MY_AIRCRAFT_RADIUS,
            this.MY_AIRCRAFT_LAUNCH_INTERVAL,
            this.bulletFactory);
    }
}