import {Aircraft} from "./Aircraft";
import Bullet from "./Bullet";
import BulletFactory from "../common/BulletFactory";

/**
 * 自機のドメインクラス.
 */
export class MyAircraft implements Aircraft {
    bulletFactory: BulletFactory;

    sprite: PIXI.Sprite;
    vx: number;
    vy: number;
    counter: number;
    disable: boolean;

    // 弾の発射間隔
    launchInterval: number;

    bullets: Array<Bullet>;

    constructor(sprite: PIXI.Sprite, bulletFactory: BulletFactory) {
        this.sprite = sprite;
        this.vx = 0;
        this.vy = 0;
        this.counter = 0;
        this.launchInterval = 10;
        this.bullets = new Array<Bullet>();
        this.bulletFactory = bulletFactory;
        this.disable = false;
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
            const newBullet: Bullet = this.bulletFactory.createMyBullet(this.sprite.x, this.sprite.y);
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
}