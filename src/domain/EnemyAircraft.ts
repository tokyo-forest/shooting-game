import {Aircraft} from "./Aircraft";

/**
 * 自機のドメインクラス.
 */
export class EnemyAircraft implements Aircraft {
    sprite: PIXI.Sprite;
    vx: number;
    vy: number;

    constructor(sprite: PIXI.Sprite) {
        this.sprite = sprite;
        this.vx = 0;
        this.vy = 0.1;
    }

    play(): void {
        this.sprite.x += this.vx;
        this.sprite.y += this.vy;
    }
}