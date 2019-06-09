/**
 * 弾を管理するオブザーバ
 */
import Bullet from "../domain/bullet/Bullet";
import PixiAdapter from "./PixiAdapter";
import EntityView from "./view/EntityView";

/**
 * ゲーム画面上の弾を管理するマネージャークラス
 */
export default class BulletManager {
    // TODO:EntityView に型変数取るのはありかもしれぬ
    bullets: Array<EntityView<Bullet>>;
    pixiAdapter: PixiAdapter;

    constructor(pixiAdapter: PixiAdapter) {
        this.pixiAdapter = pixiAdapter;
        this.bullets = new Array<EntityView<Bullet>>();
    }

    addBullets(entityView: EntityView<Bullet>): void {
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