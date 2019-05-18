import BaseFactory from "./BaseFactory";
import {Aircraft} from "../aircraft/Aircraft";

/**
 * 機体を作成するファクトリクラス
 */
export default abstract class AircraftFactory extends BaseFactory{
    abstract createAircraft(): Aircraft
}