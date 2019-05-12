import * as PIXI from 'pixi.js'
import Bullet from "../domain/Bullet";

/**
 * 弾を作成するファクトリクラス
 */
export default class BulletFactory {
    // 自機の弾
    private MY_BULLET_VIEW: string = 'contents/img/bullet_red.png';

    // 敵機の弾
    private ENEMY_BULLET_VIEW: string = 'contents/img/bullet_blue.png';

    /**
     * 自機の弾を作成する
     */
    createMyAircraft(): Bullet {
        let sprite = PIXI.Sprite.from(this.MY_BULLET_VIEW);
        return new Bullet(sprite);
    }

    /**
     * 敵機の弾を作成する
     */
    createEnemyAircraft(): Bullet {
        let sprite = PIXI.Sprite.from(this.ENEMY_BULLET_VIEW);
        return new Bullet(sprite);
    }
}