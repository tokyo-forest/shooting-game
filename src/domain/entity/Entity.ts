import {IWallCollision} from "../collision/WallCollision";
import {ICollisionObject} from "../collision/ICollisionObject";
import INextAction from "./INextAction";
import IPlay from "./IPlay";
import DamageValue from "../valueObject/DamageValue";
import Position from "../valueObject/Position"
import Velocity from "../valueObject/Velocity";
import {Camp} from "../valueObject/Camp";

/**
 * 画面に表示されるオブジェクトを表す.
 */
export abstract class Entity implements ICollisionObject, IPlay, INextAction, IWallCollision {
    position1: Position;
    velocity: Velocity;
    disable: boolean;
    radius: number;
    damageList: Array<DamageValue>;
    score: number;
    camp:Camp =Camp.NONE;

    protected constructor(radius: number) {
        this.velocity = new Velocity(0, 0);
        this.position1 = new Position(0, 0);
        this.disable = false;
        this.radius = radius;
        this.damageList = new Array<DamageValue>();
        this.score = 0;
    }

    // 移動を行う
    play(): void {
    }

    // 次の異動先の計算を行う
    nextAction(): void {

    }

    // 衝突時の処理を行う
    collided(entity: Entity): void {
        this.damageList.push(entity.defineDamage());
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
        this.score = 0;
        this.disable = true;
    }

    collidedWallLeft(): void {
        this.score = 0;
        this.disable = true;
    }

    collidedWallRight(): void {
        this.score = 0;
        this.disable = true;
    }

    collidedWallUp(): void {
        this.score = 0;
        this.disable = true;
    }
}
