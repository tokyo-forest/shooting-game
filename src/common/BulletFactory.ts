import * as PIXI from 'pixi.js'
import Bullet from "../domain/Bullet";
import BaseFactory from "./BaseFactory";

/**
 * 弾を作成するファクトリクラス
 */
export default class BulletFactory extends BaseFactory{
    // 自機の弾
    MY_BULLET_VIEW: string = 'contents/img/bullet_red.png';

    // 敵機の弾
    ENEMY_BULLET_VIEW: string = 'contents/img/bullet_blue.png';

    /**
     * 自機の弾を作成する
     */
    createMyBullet(x: number, y: number): Bullet {
        let sprite = PIXI.Sprite.from(this.MY_BULLET_VIEW);
        sprite.anchor.set(0.5);
        sprite.x = x;
        sprite.y = y;

        let myBullet = new Bullet(sprite);
        myBullet.vy = -1;
        this.addChildSprite(sprite);

        return myBullet
    }

    /**
     * 敵機の弾を作成する
     */
    createEnemyBullet(): Bullet {
        let sprite = PIXI.Sprite.from(this.ENEMY_BULLET_VIEW);
        sprite.anchor.set(0.5);
        this.addChildSprite(sprite);
        return new Bullet(sprite);
    }

    /**
     * 弾を削除する
     * @param target
     */
    deleteBullet(target: Bullet): void{
        this.removeChildSprite(target.sprite);
    }
}