import Aircraft from "./Aircraft";
import Bullet from "../bullet/Bullet";
import BulletFactory from "../factory/BulletFactory";

/**
 * 自機のドメインクラス.
 */
export default class MyAircraft extends Aircraft {
    // 弾の発射間隔
    launchInterval: number;

    counter: number;

    bullets: Array<Bullet>;

    // 移動速度
    speed: number;

    constructor(sprite: PIXI.Sprite, radius: number, launchInterval: number, bulletFactory: BulletFactory) {
        super(sprite, radius, bulletFactory);
        this.bullets = new Array<Bullet>();
        this.launchInterval = launchInterval;
        this.counter = 0;
        this.life = 3;
        this.speed = 5;
    }

    moveLeft(): void {
        this.vx = -1 * this.speed;
    }

    stopLeft(): void {
        this.vx = 0;
    }

    moveUp(): void {
        this.vy = -1 * this.speed;
    }

    stopUp(): void {
        this.vy = 0;
    }

    moveRight(): void {
        this.vx = this.speed;
    }

    stopRight(): void {
        this.vx = 0;
    }

    moveDown(): void {
        this.vy = this.speed;
    }

    stopDown(): void {
        this.vy = 0;
    }

    // 壁への衝突時の振る舞いを定義
    collidedWallDown(): void {
        this.vx = 0;
        this.vy = 0;
        this.sprite.y -= this.speed;
    }

    collidedWallLeft(): void {
        this.vx = 0;
        this.vy = 0;
        this.sprite.x += this.speed;
    }

    collidedWallRight(): void {
        this.vx = 0;
        this.vy = 0;
        this.sprite.x -= this.speed;
    }

    collidedWallUp(): void {
        this.vx = 0;
        this.vy = 0;
        this.sprite.y += this.speed;
    }

    play(): void {
        this.sprite.x += this.vx;
        this.sprite.y += this.vy;
        this.counter++;

        // 発射間隔ごとに弾を発射する
        if (this.counter % this.launchInterval === 0) {
            this.bulletFactory.createBullet(this);
        }
    }
}