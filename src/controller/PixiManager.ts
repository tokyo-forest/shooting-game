import * as PIXI from 'pixi.js'
import EntityView from "./view/EntityView";
import {Entity} from "../domain/entity/Entity";

/**
 */
export default class PixiManager {
    entityViews: Array<EntityView>;

    constructor() {
        this.entityViews = new Array<EntityView>();
    }
}