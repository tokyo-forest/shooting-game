import MyAircraft from "../aircraft/MyAircraft";
import MyBulletFactory from "./MyBulletFactory";
import BulletFactory from "./BulletFactory";
import EntityView from "../../controller/view/EntityView";
import BulletManager from "../../controller/BulletManager";

/**
 * 機体を作成するファクトリクラス
 */
export default class MyAircraftFactory {
    private bulletFactory: BulletFactory;

    constructor(bulletManager: BulletManager) {
        this.bulletFactory = new MyBulletFactory(bulletManager);
    }

    // 自機の画像
    MY_AIRCRAFT_VIEW: string = 'contents/img/shuttle.gif';

    MY_AIRCRAFT_RADIUS: number = 10;
    MY_AIRCRAFT_LAUNCH_INTERVAL: number = 20;

    // 初期位置
    DEFAULT_POS_X: number = 100;
    DEFAULT_POS_Y: number = 100;

    createAircraft(): EntityView<MyAircraft> {
        let myAircraft: MyAircraft = new MyAircraft(
            this.MY_AIRCRAFT_RADIUS,
            this.MY_AIRCRAFT_LAUNCH_INTERVAL,
            this.bulletFactory);
        // TODO:anchorを設定せねば
        myAircraft.position1.x = this.DEFAULT_POS_X;
        myAircraft.position1.y = this.DEFAULT_POS_Y;

        return new EntityView<MyAircraft>(this.MY_AIRCRAFT_VIEW, myAircraft);
    }
}