/**
 * 機体ドメインクラス.
 */
import { Entity } from "../entity/Entity";
import BulletFactory from "../factory/BulletFactory";
import IDamage from "../damage/IDamave";
import DamageValue from "../valueObject/DamageValue";

export default abstract class Aircraft extends Entity implements IDamage {

    life: number;
    bulletFactory: BulletFactory;

    constructor(radius: number, bulletFactory: BulletFactory) {
        super(radius);
        this.bulletFactory = bulletFactory;
        this.life = 1;
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
}
