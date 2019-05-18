import {Aircraft} from "./Aircraft";

/**
 * 自機のドメインクラス.
 */
export class EnemyAircraft extends Aircraft {
    play(): void {
        this.sprite.x += this.vx;
        this.sprite.y += this.vy;
    }
}