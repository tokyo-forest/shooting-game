/**
 * ダメージを受けた時の振る舞いの定義
 */
import DamageValue from "../valueObject/DamageValue";

export default interface IDamage {
    // ダメージを与える時の振る舞いを定義
    defineDamage():DamageValue;
    // ダメージを受けた時の振る舞いを定義
    applyDamage():void;
}
