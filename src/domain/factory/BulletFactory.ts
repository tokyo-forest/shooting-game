import Bullet from "../bullet/Bullet";
import Aircraft from "../aircraft/Aircraft";
import EntityView from "../../controller/view/EntityView";
import BulletManager from "../../controller/BulletManager";

/**
 * 弾を作成するファクトリクラス
 * BulletFactory自身をinterfaceにして、createメソッドだけをもたせたい
 * TODO: aircraftからみるFactoryにはEntityViewとBulletManagerがあるべきではない.
 * 制御の反転をすべき
 */
export default abstract class BulletFactory {
    bulletManagers: Array<BulletManager>;

    constructor(bulletManager: BulletManager) {
        this.bulletManagers = new Array<BulletManager>();
        this.bulletManagers.push(bulletManager);
    }

    abstract createBullet(aircraft: Aircraft): Bullet

    // Managerクラスに知らせるメソッド
    notifyBulletCreate(bullet: Bullet, imagePath: string): void {
        this.bulletManagers.forEach(
            c => {
                let entityView = new EntityView(imagePath, bullet)
                c.addBullets(entityView);
            }
        )
    }
}