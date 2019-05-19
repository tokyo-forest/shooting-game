/**
 * 弾を管理するオブザーバ
 */
import Bullet from "../bullet/Bullet";
import * as PIXI from 'pixi.js'

export interface IBulletCreateObserver {
    // 弾を追加する
    addBullets(bullet: Bullet): void;
}

/**
 * 弾を作成するクラスでは、以下を呼ぶことでBulletManagerに作成したことを通知させる
 */
export interface IBuletCreateObservable {
    createObservers: Array<IBulletCreateObserver>;

    bulletOn(createObserver: IBulletCreateObserver): void;

    // Observerへの通知を行う
    notifyBulletCreate(bullet: Bullet): void;
}

/**
 * ゲーム画面上の弾を管理するマネージャークラス
 */
export default class BulletManager implements IBulletCreateObserver {
    bullets: Array<Bullet>;
    stage: PIXI.Container;

    constructor(stage: PIXI.Container) {
        this.bullets = new Array<Bullet>();
        this.stage = stage;
    }

    addBullets(bullet: Bullet): void {
            this.bullets.push(bullet);
    }

    // 弾の表示ステータス監視を行う
    observeBulletDisable(): void {
        const disableBullets = this.bullets.filter(b => b.disable);
        if (disableBullets.length >= 1) {
            disableBullets.forEach(b => this.stage.removeChild(b.sprite));
            this.bullets = this.bullets.filter(b => !b.disable);
        }
    }

}