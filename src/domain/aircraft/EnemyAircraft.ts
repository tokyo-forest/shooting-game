import {Aircraft} from "./Aircraft";
import {ActPattern, MovementDirection} from "../actPattern/ActPattern";
import BulletFactory from "../factory/BulletFactory";
import {DamageValue} from "../damage/Damage";

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

    // 相手に与えるダメージを定義する
    defineDamage(): DamageValue {
        return new DamageValue(1);
    }

    play(): void {
        this.sprite.x += this.vx;
        this.sprite.y += this.vy;
    }
}