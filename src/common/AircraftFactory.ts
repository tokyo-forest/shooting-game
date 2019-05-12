import {MyAircraft} from "../domain/MyAircraft";
import * as PIXI from 'pixi.js'
import {EnemyAircraft} from "../domain/EnemyAircraft";

/**
 * 機体を作成するファクトリクラス
 */
export default class AircraftFactory {
    // 自機の画像
    MY_AIRCRAFT_VIEW: string = 'contents/img/shuttle.gif';

    // 敵機の画像
    ENEMY_AIRCRAFT_VIEW: string = 'contents/img/ufo.gif';

    /**
     * 自機を作成する
     */
    createMyAircraft(): MyAircraft {
        let sprite = PIXI.Sprite.from(this.MY_AIRCRAFT_VIEW);
        return new MyAircraft(sprite);
    }

    /**
     * 敵機を作成する
     */
    createEnemyAircraft(): EnemyAircraft {
        let sprite = PIXI.Sprite.from(this.ENEMY_AIRCRAFT_VIEW);
        return new EnemyAircraft(sprite);
    }
}