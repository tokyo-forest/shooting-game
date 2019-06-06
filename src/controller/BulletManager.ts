/**
 * 弾を管理するオブザーバ
 */
import Bullet from "../domain/bullet/Bullet";
import PixiAdapter from "./PixiAdapter";
import EntityView from "./view/EntityView";

export interface IBulletCreateObserver {
    // 弾を追加する
    addBullets(entityView: EntityView): void;
}

/**
 * 弾を作成するクラスでは、以下を呼ぶことでBulletManagerに作成したことを通知させる
 */
export interface IBuletCreateObservable {
    createObservers: Array<IBulletCreateObserver>;

    bulletOn(createObserver: IBulletCreateObserver): void;

    // Observerへの通知を行う
    notifyBulletCreate(bullet: Bullet,imagePath: string): void;
}

/**
 * ゲーム画面上の弾を管理するマネージャークラス
 */
export default class BulletManager implements IBulletCreateObserver {
    // TODO:EntityView に型変数取るのはありかもしれぬ
    bullets: Array<EntityView>;
    pixiAdapter: PixiAdapter;

    constructor(pixiAdapter: PixiAdapter) {
        this.pixiAdapter = pixiAdapter;
        this.bullets = new Array<EntityView>();
    }

    addBullets(entityView: EntityView): void {
            this.pixiAdapter.addChildSprite(entityView.$sprite);
            this.bullets.push(entityView);
    }

    // 弾の表示ステータス監視を行う
    observeBulletDisable(): void {
        const disableBullets = this.bullets.filter(b => b.$entity.disable);
        if (disableBullets.length >= 1) {
            disableBullets.forEach(b => this.pixiAdapter.removeChildSprite(b.$sprite));
            this.bullets = this.bullets.filter(b => !b.$entity.disable);
        }
    }

}