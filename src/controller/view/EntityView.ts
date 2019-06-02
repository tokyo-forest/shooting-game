import Position from "../../domain/valueObject/Position"
import {Entity} from "../../domain/entity/Entity";

/**
 * 画面描画用のオブジェクト.
 */
export default class EntityView {
    private sprite: PIXI.Sprite;

    private entity: Entity;

    constructor(sprite: PIXI.Sprite, entity: Entity) {
        this.entity = entity;
        this.sprite = sprite;
    }

    /**
     * 表示箇所を更新する.
     */
    public update() {
        this.sprite.x = this.entity.position().x;
        this.sprite.y = this.entity.position().y;
    }
}