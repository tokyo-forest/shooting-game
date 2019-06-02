import EnemyAircraftFactory from "../domain/factory/EnemyAircraftFactory";
import {Aircraft} from "../domain/aircraft/Aircraft";
import * as PIXI from 'pixi.js'

/**
 * 敵を管理するクラス
 */
export default class EnemyManager {
    stage: PIXI.Container;

    enemyAircraftFactory: EnemyAircraftFactory;
    timer: number;
    nextCreateTimer: number;


    // 敵の出現頻度
    frequencyOfAppearance: number;

    enemys: Array<Aircraft>;

    constructor(enemyAircraftFactory: EnemyAircraftFactory, stage: PIXI.Container) {
        this.enemyAircraftFactory = enemyAircraftFactory;
        this.timer = 0;
        this.frequencyOfAppearance = 20;
        this.nextCreateTimer = this.getRandomNumberWithRange(this.frequencyOfAppearance, 1);
        this.enemys = new Array<Aircraft>();
        this.stage = stage;
    }

    play() {
        this.timer++;

        if (this.timer >= this.nextCreateTimer) {
            let newEnemy: Aircraft= this.enemyAircraftFactory.createAircraft();
            newEnemy.sprite.x = this.getRandomNumberWithRange(20, 400);
            newEnemy.sprite.y = 20;
            this.enemys.push(newEnemy);
            this.nextCreateTimer += this.getRandomNumberWithRange(1, this.frequencyOfAppearance)
        }
    }


    // 弾の表示ステータス監視を行う
    observeEnemyDisable(): void {
        const disableEnemys = this.enemys.filter(b => b.disable);
        if (disableEnemys.length >= 1) {
            disableEnemys.forEach(e => this.stage.removeChild(e.sprite));
            this.enemys = this.enemys.filter(b => !b.disable);
        }
    }

    // Util的な場所に移動する
    private getRandomNumberWithRange(max: number, min: number): number {
        return Math.floor(Math.random() * (max + 1 - min)) + min;
    }

    private getRandomNumber(max: number): number {
        return this.getRandomNumberWithRange(max, 0);
    }

}