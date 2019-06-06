import MyAircraft from "../aircraft/MyAircraft";
import MyBulletFactory from "./MyBulletFactory";
import BulletFactory from "./BulletFactory";
import {IBulletCreateObserver} from "../../controller/BulletManager";

/**
 * 機体を作成するファクトリクラス
 */
export default class MyAircraftFactory {
    private bulletFactory: BulletFactory;

    constructor(bulletCreateObserver: IBulletCreateObserver) {
        this.bulletFactory = new MyBulletFactory(bulletCreateObserver);
    }

    // 自機の画像
    MY_AIRCRAFT_VIEW: string = 'contents/img/shuttle.gif';

    MY_AIRCRAFT_RADIUS: number = 10;
    MY_AIRCRAFT_LAUNCH_INTERVAL: number = 10;

    // 初期位置
    DEFAULT_POS_X: number = 100;
    DEFAULT_POS_Y: number = 100;

    createAircraft(): MyAircraft {
        let myAircraft: MyAircraft = new MyAircraft(
            this.MY_AIRCRAFT_RADIUS,
            this.MY_AIRCRAFT_LAUNCH_INTERVAL,
            this.bulletFactory);
        // TODO:anchorを設定せねば
        myAircraft.position1.x = this.DEFAULT_POS_X;
        myAircraft.position1.y = this.DEFAULT_POS_Y;

        return myAircraft;
    }
}