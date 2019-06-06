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
        let myBullet = new MyBullet();
        // TODO:anchorの設定どこにおくか 
        myBullet.position1.x = aircraft.position1.x;
        myBullet.position1.y = aircraft.position1.y;

        myBullet.velocity.vy = -1;
        this.notifyBulletCreate(myBullet,this.MY_BULLET_VIEW);

        return myBullet
    }
}