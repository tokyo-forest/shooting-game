import Aircraft from "../aircraft/Aircraft";
import BulletFactory from "./BulletFactory";
import EnemyAircraft from "../aircraft/EnemyAircraft";
import EnemyBulletFactory from "./EnemyBulletFactory";
import ActPattern from "../actPattern/ActPattern";
import { IBulletCreateObserver } from "../../controller/BulletManager";

/**
 * 敵機体を作成するファクトリクラス
 */
export default class EnemyAircraftFactory {
    private bulletFactory: BulletFactory;
    private actPattern: ActPattern;

    constructor(bulletCreateObserver: IBulletCreateObserver, actPattern: ActPattern) {
        this.bulletFactory = new EnemyBulletFactory(bulletCreateObserver);
        this.actPattern = actPattern;
    }

    // 敵機の画像
    private ENEMY_AIRCRAFT_VIEW: string = 'contents/img/ufo.gif';

    // 敵機の判定範囲
    private ENEMY_AIRCRAFT_RADIUS: number = 10;

    public createAircraft(): Aircraft {
        return new EnemyAircraft(
            this.ENEMY_AIRCRAFT_RADIUS,
            this.bulletFactory,
            this.actPattern
        );
    }
}