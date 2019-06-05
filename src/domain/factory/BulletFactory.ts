import Bullet from "../bullet/Bullet";
import Aircraft from "../aircraft/Aircraft";
import { IBuletCreateObservable, IBulletCreateObserver } from "../../controller/BulletManager";
import EntityView from "../../controller/view/EntityView";

export interface IcreateBullet {
    createBullet(aircraft: Aircraft): Bullet;
}

/**
 * 弾を作成するファクトリクラス
 * BulletFactory自身をinterfaceにして、createメソッドだけをもたせたい
 */
export default abstract class BulletFactory implements IcreateBullet, IBuletCreateObservable {
    createObservers: Array<IBulletCreateObserver>;

    constructor(observer: IBulletCreateObserver) {
        this.createObservers = new Array<IBulletCreateObserver>();
        this.bulletOn(observer);
    }

    abstract createBullet(aircraft: Aircraft): Bullet

    bulletOn(createObserver: IBulletCreateObserver): void {
        this.createObservers.push(createObserver);
    }

    // Managerクラスに知らせるメソッド
    notifyBulletCreate(bullet: Bullet, imagePath: string): void {
        this.createObservers.forEach(
            c => {
                let entityView = new EntityView(imagePath, bullet)
                c.addBullets(entityView);
            }
        )
    }
}