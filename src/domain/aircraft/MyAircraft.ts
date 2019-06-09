import Aircraft from "./Aircraft";
import Bullet from "../bullet/Bullet";
import BulletFactory from "../factory/BulletFactory";
import {Camp} from "../valueObject/Camp";

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

    camp = Camp.FAMILY;
    constructor(radius: number, launchInterval: number, bulletFactory: BulletFactory) {
        super(radius, bulletFactory);
        this.bullets = new Array<Bullet>();
        this.launchInterval = launchInterval;
        this.counter = 0;
        this.life = 3;
        this.speed = 5;
    }

    moveLeft(): void {
        this.velocity.vx = -1 * this.speed;
    }

    stopLeft(): void {
        this.velocity.vx = 0;
    }

    moveUp(): void {
        this.velocity.vy = -1 * this.speed;
    }

    stopUp(): void {
        this.velocity.vy = 0;
    }

    moveRight(): void {
        this.velocity.vx = this.speed;
    }

    stopRight(): void {
        this.velocity.vx = 0;
    }

    moveDown(): void {
        this.velocity.vy = this.speed;
    }

    stopDown(): void {
        this.velocity.vy = 0;
    }

    // 壁への衝突時の振る舞いを定義
    collidedWallDown(): void {
        this.velocity.vx = 0;
        this.velocity.vy = 0;
        this.position1.y -= this.speed;
    }

    collidedWallLeft(): void {
        this.velocity.vx = 0;
        this.velocity.vy = 0;
        this.position1.x += this.speed;
    }

    collidedWallRight(): void {
        this.velocity.vx = 0;
        this.velocity.vy = 0;
        this.position1.x -= this.speed;
    }

    collidedWallUp(): void {
        this.velocity.vx = 0;
        this.velocity.vy = 0;
        this.position1.y += this.speed;
    }

    die(): void {
        console.log("gameover");
    }

    play(): void {
        this.position1.x += this.velocity.vx;
        this.position1.y += this.velocity.vy;
        this.counter++;

        // 発射間隔ごとに弾を発射する
        if (this.counter % this.launchInterval === 0) {
            this.bulletFactory.createBullet(this);
        }
    }
}