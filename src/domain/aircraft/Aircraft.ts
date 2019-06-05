/**
 * 機体ドメインクラス.
 */
import { Entity } from "../entity/Entity";
import BulletFactory from "../factory/BulletFactory";

export default abstract class Aircraft extends Entity {

    bulletFactory: BulletFactory;

    constructor(radius: number, bulletFactory: BulletFactory) {
        super(radius);
        this.bulletFactory = bulletFactory;
    }
}
