import {Aircraft} from "./Aircraft";
import {ActPattern, MovementDirection} from "../actPattern/ActPattern";
import BulletFactory from "../factory/BulletFactory";

/**
 * 敵機のドメインクラス.
 */
export class EnemyAircraft extends Aircraft {

    actPattern: ActPattern;

    constructor(sprite: PIXI.Sprite, radius: number, bulletFactory: BulletFactory, actPattern: ActPattern) {
        super(sprite, radius, bulletFactory);
        this.actPattern = actPattern;
    }

    // 次の異動先の計算を行う
    nextAction(): void {
        const direction: MovementDirection = this.actPattern.nextAction();
        this.vx = direction.vx;
        this.vy = direction.vy;
    }

    play(): void {
        this.sprite.x += this.vx;
        this.sprite.y += this.vy;
    }
}