import BaseFactory from "./BaseFactory";
import Bullet from "../bullet/Bullet";
import {Aircraft} from "../aircraft/Aircraft";

export interface IcreateBullet {
    createBullet(aircraft: Aircraft) : Bullet;
}


/**
 * 弾を作成するファクトリクラス
 * BulletFactory自身をinterfaceにして、createメソッドだけをもたせたい
 */
export default abstract class BulletFactory extends BaseFactory implements IcreateBullet{
    /**
     * 弾を削除する
     * @param target
     */
    deleteBullet(target: Bullet): void{
        this.removeChildSprite(target.sprite);
    }

    abstract createBullet(aircraft: Aircraft): Bullet
}