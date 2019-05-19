/**
 * ダメージを受けた時の振る舞いの定義
 */
export interface IDamage {
    // ダメージを与える時の振る舞いを定義
    defineDamage():DamageValue;
    // ダメージを受けた時の振る舞いを定義
    applyDamage():void;
}

/**
 * ダメージ情報の移送に利用する
 */
export class DamageValue {
    private attack: number;

    constructor(attack: number) {
        this.attack = attack;
    }

    public getAttack(): number{
        return this.attack;
    };
}