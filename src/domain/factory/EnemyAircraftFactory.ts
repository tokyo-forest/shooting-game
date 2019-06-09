import BulletFactory from "./BulletFactory";
import EnemyAircraft from "../aircraft/EnemyAircraft";
import EnemyBulletFactory from "./EnemyBulletFactory";
import ActPattern from "../actPattern/ActPattern";
import EntityView from "../../controller/view/EntityView";
import BulletManager from "../../controller/BulletManager";

/**
 * 敵機体を作成するファクトリクラス
 */
export default class EnemyAircraftFactory {
    private bulletFactory: BulletFactory;
    private actPattern: ActPattern;

    constructor(bulletManager: BulletManager, actPattern: ActPattern) {
        this.bulletFactory = new EnemyBulletFactory(bulletManager);
        this.actPattern = actPattern;
    }

    // 敵機の画像
    private ENEMY_AIRCRAFT_VIEW: string = 'contents/img/ufo.gif';

    // 敵機の判定範囲
    private ENEMY_AIRCRAFT_RADIUS: number = 10;

    public createAircraft(): EntityView<EnemyAircraft> {
        let newEnemy = new EnemyAircraft(this.ENEMY_AIRCRAFT_RADIUS, this.bulletFactory, this.actPattern);
        newEnemy.position1.x = this.getRandomNumberWithRange(20, 400);
        newEnemy.position1.y = 20;

        return new EntityView<EnemyAircraft>(this.ENEMY_AIRCRAFT_VIEW, newEnemy);
    }

    // Util的な場所に移動する
    private getRandomNumberWithRange(max: number, min: number): number {
        return Math.floor(Math.random() * (max + 1 - min)) + min;
    }
}