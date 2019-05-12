import {Entity} from "./Entity";
import BulletFactory from "../common/BulletFactory";

/**
 * 機体ドメインクラス.
 */
export interface Aircraft extends Entity{
    bulletFactory: BulletFactory;
}
