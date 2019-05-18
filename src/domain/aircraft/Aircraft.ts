/**
 * 機体ドメインクラス.
 */
import {Entity} from "../entity/Entity";
import BulletFactory from "../factory/BulletFactory";

export abstract class Aircraft extends Entity{

    bulletFactory: BulletFactory;

    constructor(sprite: PIXI.Sprite, radius: number, bulletFactory: BulletFactory) {
        super(sprite, radius);
        this.bulletFactory = bulletFactory;
    }
}
