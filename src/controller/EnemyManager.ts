import EnemyAircraftFactory from "../domain/factory/EnemyAircraftFactory";
import PixiAdapter from "./PixiAdapter";
import EntityView from "./view/EntityView";
import EnemyAircraft from "../domain/aircraft/EnemyAircraft";
import ScoreManager from "./ScoreManager";
import CommonValue from "../domain/valueObject/CommonValue";

/**
 * 敵を管理するクラス
 */
export default class EnemyManager {

    enemyAircraftFactoryList: Array<EnemyAircraftFactory>;
    timer: number;
    nextCreateTimer: number;
    pixiAdapter: PixiAdapter;
    scoreManager: ScoreManager;


    // 敵の出現頻度
    frequencyOfAppearance: number;

    enemys: Array<EntityView<EnemyAircraft>>;
    private commonValue: CommonValue;

    constructor(enemyAircraftFactoryList: Array<EnemyAircraftFactory>, pixiAdapter: PixiAdapter, scoreManager: ScoreManager, commonValue: CommonValue) {
        this.enemyAircraftFactoryList = enemyAircraftFactoryList;
        this.timer = 0;
        this.frequencyOfAppearance = 60;
        this.nextCreateTimer = this.getRandomNumberWithRange(this.frequencyOfAppearance, 1);
        this.pixiAdapter = pixiAdapter;
        this.enemys = new Array<EntityView<EnemyAircraft>>();
        this.scoreManager = scoreManager;
        this.commonValue = commonValue;
    }

    play() {
        this.timer++;

        // 時間が立つと敵を出現させる
        if (this.timer >= this.nextCreateTimer) {
            let chosenEnemyFactory = this.enemyAircraftFactoryList[Math.floor(Math.random() * this.enemyAircraftFactoryList.length)];
            let entityView: EntityView<EnemyAircraft> = chosenEnemyFactory.createAircraft();
            this.enemys.push(entityView);
            this.pixiAdapter.addChildSprite(entityView.$sprite);
            this.nextCreateTimer += this.getRandomNumberWithRange(1, this.frequencyOfAppearance)
        }

        // 時間経過で出現頻度を上げる
        if(this.timer % 600 === 0) {
            console.log("level up");
            this.frequencyOfAppearance = this.frequencyOfAppearance - 5;
            if(this.frequencyOfAppearance <= 0) {
                this.frequencyOfAppearance = 1;// 1以下にはならない
            }
        }
    }


    // 敵の表示ステータス監視を行う
    observeEnemyDisable(): void {
        const disableEnemys = this.enemys.filter(b => b.$entity.disable);
        if (disableEnemys.length >= 1) {
            disableEnemys.forEach(e => {
                this.pixiAdapter.removeChildSprite(e.$sprite);
                this.scoreManager.updateScore(e.$entity.score);
            });
            this.enemys = this.enemys.filter(b => !b.$entity.disable);
        }
    }

    // Util的な場所に移動する
    private getRandomNumberWithRange(max: number, min: number): number {
        return Math.floor(Math.random() * (max + 1 - min)) + min;
    }

}