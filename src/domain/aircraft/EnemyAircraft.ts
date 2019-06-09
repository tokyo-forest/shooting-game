import Aircraft from "./Aircraft";
import BulletFactory from "../factory/BulletFactory";
import ActPattern from "../actPattern/ActPattern";
import MovementDirection from "../actPattern/MovementDirection";
import DamageValue from "../valueObject/DamageValue";
import IFirePattern from "../firePattern/IFirePattern";
import {Camp} from "../valueObject/Camp";

/**
 * 敵機のドメインクラス.
 */
export default class EnemyAircraft extends Aircraft {

    actPattern: ActPattern;
    firePattern: IFirePattern;
    camp = Camp.ENEMY;

    constructor(radius: number, bulletFactory: BulletFactory, actPattern: ActPattern, score: number, firePattern: IFirePattern) {
        super(radius, bulletFactory);
        this.score = score;
        this.actPattern = actPattern;
        this.firePattern = firePattern;
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

    // 弾を発射する
    fire(): void {
        this.bulletFactory.createBullet(this);
    }

    play(): void {
        this.position1.x += this.velocity.vx;
        this.position1.y += this.velocity.vy;
        if (this.firePattern.isFired()) {
            this.fire();
        }
    }
}