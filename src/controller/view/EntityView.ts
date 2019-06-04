import Position from "../../domain/valueObject/Position"
import { Entity } from "../../domain/entity/Entity";

/**
 * 画面描画用のオブジェクト.
 */
export default class EntityView {
    private sprite: PIXI.Sprite;

    private imagePath: string;

    private entity: Entity;

    constructor(imagePath: string, entity: Entity) {
        this.imagePath = imagePath;
        this.entity = entity;
        this.sprite = PIXI.Sprite.from(imagePath);
    }

    /**
     * 表示箇所を更新する.
     */
    public update() {
        this.sprite.x = this.entity.position().x;
        this.sprite.y = this.entity.position().y;
    }
}