import Aircraft from "./Aircraft";
import BulletFactory from "../factory/BulletFactory";
import ActPattern from "../actPattern/ActPattern";
import MovementDirection from "../actPattern/MovementDirection";
import DamageValue from "../valueObject/DamageValue";

/**
 * 敵機のドメインクラス.
 */
export default class EnemyAircraft extends Aircraft {

    actPattern: ActPattern;

    constructor(radius: number, bulletFactory: BulletFactory, actPattern: ActPattern, score: number) {
        super(radius, bulletFactory);
        this.score = score;
        this.actPattern = actPattern;
    }

    // 次の異動先の計算を行う
    nextAction(): void {
        const direction: MovementDirection = this.actPattern.nextAction();
        this.velocity.vx = direction.vx;
        this.velocity.vy = direction.vy;
    }

    // 相手に与えるダメージを定義する
    defineDamage(): DamageValue {
        return new DamageValue(1);
    }

    play(): void {
        this.position1.x += this.velocity.vx;
        this.position1.y += this.velocity.vy;
    }
}