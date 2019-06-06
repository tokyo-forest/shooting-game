import Aircraft from "../aircraft/Aircraft";

/**
 * 機体を作成するファクトリクラス
 */
export default abstract class AircraftFactory {
    abstract createAircraft(): Aircraft
}