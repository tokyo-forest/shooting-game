/**
 * ダメージ情報の移送に利用する
 */
export default class DamageValue {
    private attack: number;

    constructor(attack: number) {
        this.attack = attack;
    }

    public getAttack(): number{
        return this.attack;
    };
}