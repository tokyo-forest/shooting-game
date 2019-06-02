import BaseFactory from "./BaseFactory";
import Bullet from "../bullet/Bullet";
import Aircraft from "../aircraft/Aircraft";
import {IBuletCreateObservable, IBulletCreateObserver} from "../../controller/BulletManager";

export interface IcreateBullet {
    createBullet(aircraft: Aircraft) : Bullet;
}


/**
 * 弾を作成するファクトリクラス
 * BulletFactory自身をinterfaceにして、createメソッドだけをもたせたい
 */
export default abstract class BulletFactory extends BaseFactory implements IcreateBullet, IBuletCreateObservable{
    createObservers: Array<IBulletCreateObserver>;

    constructor(stage: PIXI.Container, observer: IBulletCreateObserver) {
        super(stage);
        this.createObservers = new Array<IBulletCreateObserver>();
        this.bulletOn(observer);
    }

    /**
     * 弾を削除する
     * @param target
     */
    deleteBullet(target: Bullet): void{
        this.removeChildSprite(target.sprite);
    }

    abstract createBullet(aircraft: Aircraft): Bullet



    bulletOn(createObserver: IBulletCreateObserver): void {
        this.createObservers.push(createObserver);
    }

    notifyBulletCreate(bullet: Bullet): void {
        this.createObservers.forEach(
            c => {
                c.addBullets(bullet);
            }
        )
    }
}