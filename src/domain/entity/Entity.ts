import {IWallCollision} from "../collision/WallCollision";
import {ICollisionObject} from "../collision/ICollisionObject";
import IDamage from "../damage/IDamave";
import INextAction from "./INextAction";
import IPlay from "./IPlay";
import DamageValue from "../valueObject/DamageValue";
import Position from "../valueObject/Position"
import Velocity from "../valueObject/Velocity";

/**
 * 画面に表示されるオブジェクトを表す.
 */
export abstract class Entity implements ICollisionObject, IDamage, IPlay, INextAction, IWallCollision {
    life: number;
    position1: Position;
    velocity: Velocity;
    disable: boolean;
    radius: number;
    damageList: Array<DamageValue>;

    protected constructor( radius: number) {
        this.velocity = new Velocity(0,0);
        this.position1 = new Position(0,0);
        this.disable = false;
        this.radius = radius;
        this.damageList = new Array<DamageValue>();
        this.life = 1;
    }

    // 移動を行う
    play(): void {
    }

    // 次の異動先の計算を行う
    nextAction(): void {

    }

    // ダメージの処理を行う
    applyDamage(): void {
        this.damageList.forEach(
            d => {
                this.life -= d.getAttack();
            }
        );
        // ダメージ判定処理が終了したため値を空にする
        this.damageList = new Array<DamageValue>();

        if (this.life <= 0) {
            this.disable = true;
        }
    }

    // 衝突時の処理を行う
    collided(collisionObject: ICollisionObject): void {
        this.damageList.push(collisionObject.defineDamage());
    }

    // 現在の座標を返却する
    position(): Position {
        return new Position(this.position1.x, this.position1.y);
    }

    // 相手に与えるダメージを定義する
    defineDamage(): DamageValue {
        return new DamageValue(0);
    }

    // 壁への衝突時の振る舞いを定義
    collidedWallDown(): void {
        this.disable = true;
    }
    collidedWallLeft(): void {
        this.disable = true;
    }
    collidedWallRight(): void {
        this.disable = true;
    }
    collidedWallUp(): void {
        this.disable = true;
    }
}
