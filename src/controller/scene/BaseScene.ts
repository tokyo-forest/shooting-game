import * as PIXI from 'pixi.js'
import PixiAdapter from "../PixiAdapter";

export default abstract class BaseScene {
    abstract create(app: PIXI.Application, gamePixiAdapter: PixiAdapter): void;

    abstract destroy(): void;
}