import Bullet from "../bullet/Bullet";
import Aircraft from "../aircraft/Aircraft";
import BulletFactory from "./BulletFactory";
import EnemyBullet from "../bullet/EnemyBullet";

/**
 * 敵弾を作成するファクトリクラス
 */
export default class EnemyBulletFactory extends BulletFactory {
    // 敵機の弾
    ENEMY_BULLET_VIEW: string = 'contents/img/bullet_blue.png';

    /**
     * 敵機の弾を作成する
     */
    createBullet(aircraft: Aircraft): Bullet {

        let enemyBullet = new EnemyBullet();
        enemyBullet.position1.x = aircraft.position1.x;
        enemyBullet.position1.y = aircraft.position1.y;

        enemyBullet.velocity.vy = 2;
        this.notifyBulletCreate(enemyBullet, this.ENEMY_BULLET_VIEW);
        return enemyBullet;

    }
}