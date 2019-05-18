import Sprite = PIXI.Sprite;
import {Position, ICollisionObject} from "../collision/Collision";
import {IDamage} from "../damage/Damage";


export interface IPlay {
    play: () => void
}

/**
 * 画面に表示されるオブジェクトを表す.
 */
export abstract class Entity implements ICollisionObject, IDamage, IPlay {
    sprite: Sprite;
    vx: number;
    vy: number;
    disable: boolean;
    radius: number;

    protected constructor(sprite: PIXI.Sprite, radius: number) {
        this.sprite = sprite;
        this.vx = 0;
        this.vy = 0;
        this.disable = false;
        this.radius = radius;
    }


    play(): void {
    }

    applyDamage(): void {
    }

    collided(): void {
    }

    position(): Position {
        return new Position(this.sprite.x, this.sprite.y);
    }
}
