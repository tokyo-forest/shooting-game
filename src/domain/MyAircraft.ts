import {Aircraft} from "./Aircraft";
import Bullet from "./Bullet";

/**
 * 自機のドメインクラス.
 */
export class MyAircraft implements Aircraft {
    sprite: PIXI.Sprite;
    vx: number;
    vy: number;

    bullets: Array<Bullet>;

    constructor(sprite: PIXI.Sprite) {
        this.sprite = sprite;
        this.vx = 0;
        this.vy = 0;
        this.bullets = new Array<Bullet>();
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
    }
}