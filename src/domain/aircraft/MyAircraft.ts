import {Aircraft} from "./Aircraft";
import Bullet from "../bullet/Bullet";
import BulletFactory from "../factory/BulletFactory";
import {DamageValue} from "../damage/Damage";

/**
 * 自機のドメインクラス.
 */
export class MyAircraft extends Aircraft {
    // 弾の発射間隔
    launchInterval: number;

    // 残機
    remainingMachine: number;

    counter: number;

    bullets: Array<Bullet>;

    constructor(sprite: PIXI.Sprite, radius: number, launchInterval: number, bulletFactory: BulletFactory) {
        super(sprite, radius, bulletFactory);
        this.bullets = new Array<Bullet>();
        this.launchInterval = launchInterval;
        this.counter = 0;
        this.remainingMachine = 3;
    }

    moveLeft(): void {
        this.vx = -5;
    }

    stopLeft(): void {
        this.vx = 0;
    }

    moveUp(): void {
        this.vy = -5;
    }

    stopUp(): void {
        this.vy = 0;
    }

    moveRight(): void {
        this.vx = 5;
    }

    stopRight(): void {
        this.vx = 0;
    }

    moveDown(): void {
        this.vy = 5;
    }

    stopDown(): void {
        this.vy = 0;
    }

    play(): void {
        this.sprite.x += this.vx;
        this.sprite.y += this.vy;
        this.counter++;

        // 発射間隔ごとに弾を発射する
        if (this.counter % this.launchInterval === 0) {
            console.log("created");
            const newBullet: Bullet = this.bulletFactory.createBullet(this);
            this.bullets.push(newBullet)
        }

        // TODO MyAircraftの責務なのかは要検討
        this.bullets.forEach(b => b.play());

        // 弾の表示状態を監視
        const disableBullets = this.bullets.filter(b => b.disable);
        if(disableBullets.length >= 1) {
            console.log('bullet delete')
            disableBullets.forEach(b => this.bulletFactory.deleteBullet(b));
            this.bullets = this.bullets.filter(b => !b.disable);
        }
    }

    // ダメージの処理を行う
    applyDamage(): void {
        this.damageList.forEach(
          d => {
              this.remainingMachine -= d.getAttack();
          }
        );
        // ダメージ判定処理が終了したため値を空にする
        this.damageList = new Array<DamageValue>();

        if(this.remainingMachine <= 0) {
            this.disable = true;
        }
    }
}