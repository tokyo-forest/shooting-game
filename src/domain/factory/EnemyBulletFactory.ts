import * as PIXI from 'pixi.js'
import Bullet from "../bullet/Bullet";
import Aircraft from "../aircraft/Aircraft";
import BulletFactory from "./BulletFactory";
import EnemyBullet from "../bullet/EnemyBullet";

/**
 * 敵弾を作成するファクトリクラス
 */
export default class EnemyBulletFactory extends BulletFactory{
    // 敵機の弾
    ENEMY_BULLET_VIEW: string = 'contents/img/bullet_blue.png';

    /**
     * 敵機の弾を作成する
     */
    createBullet(aircraft: Aircraft): Bullet {
        const enemyBullet: EnemyBullet = new EnemyBullet();

        this.notifyBulletCreate(enemyBullet,this.ENEMY_BULLET_VIEW);
        return enemyBullet;
    }
}