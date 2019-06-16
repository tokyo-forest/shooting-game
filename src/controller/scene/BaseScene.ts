import * as PIXI from 'pixi.js'
import PixiAdapter from "../PixiAdapter";
import {TickerStore} from "../SceneManager";
import {SceneStatus} from "./SceneStatus";
import CommonValue from "../../domain/valueObject/CommonValue";

export default abstract class BaseScene {
    constructor(app: PIXI.Application, pixiAdapter: PixiAdapter, commonValue: CommonValue){
    };

    // シーンを作成する.
    abstract create(): void;

    // シーンを削除する.
    abstract destroy(): void;

    // TickerStoreを取得する.
    abstract getTickerStore(): TickerStore;

    // 次のシーンを返却する.シーンが変化しない場合、シーンクラスのシーンを返却.
    abstract nextScene(): SceneStatus;
}