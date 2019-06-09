import IFirePattern from "./IFirePattern";

// 易しい発射パターン。1フレーム0.5%の確率で弾が発射される
export default class EasyFirePattern implements IFirePattern {

    // 1フレームで弾が発射される確率(％)
    EASY_FIRE_RATE = 1;

    isFired(): boolean {
        if (this.EASY_FIRE_RATE >= Math.random() * 100) {
            return true;
        } else {
            return false;
        }
    }

}