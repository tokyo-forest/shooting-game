import * as PIXI from 'pixi.js'
import Bullet from "../bullet/Bullet";
import Aircraft from "../aircraft/Aircraft";
import BulletFactory from "./BulletFactory";
import MyBullet from "../bullet/MyBullet";

/**
 * 自機弾を作成するファクトリクラス
 */
export default class MyBulletFactory extends BulletFactory{
    // 自機の弾
    MY_BULLET_VIEW: string = 'contents/img/bullet_red.png';

    /**
     * 自機の弾を作成する
     */
    createBullet(aircraft: Aircraft): Bullet {
        let sprite = PIXI.Sprite.from(this.MY_BULLET_VIEW);
        sprite.anchor.set(0.5);
        sprite.x = aircraft.position1.x;
        sprite.y = aircraft.position1.y;

        let myBullet = new MyBullet(sprite);
        myBullet.velocity.vy = -1;
        this.notifyBulletCreate(myBullet,this.MY_BULLET_VIEW);

        return myBullet
    }
}