import {Aircraft} from "./Aircraft";
import BulletFactory from "../common/BulletFactory";

/**
 * 自機のドメインクラス.
 */
export class EnemyAircraft implements Aircraft {
    bulletFactory: BulletFactory;
    sprite: PIXI.Sprite;
    vx: number;
    vy: number;
    disable: false;

    constructor(sprite: PIXI.Sprite, bulletFactory: BulletFactory) {
        this.sprite = sprite;
        this.vx = 0;
        this.vy = 0.1;
        this.bulletFactory = bulletFactory;
        this.disable = false;
    }

    play(): void {
        this.sprite.x += this.vx;
        this.sprite.y += this.vy;
    }
}