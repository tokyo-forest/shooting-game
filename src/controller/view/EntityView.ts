import * as PIXI from 'pixi.js'
import { Entity } from "../../domain/entity/Entity";

/**
 * 画面描画用のオブジェクト.
 */
export default class EntityView<T extends Entity> {
    private sprite: PIXI.Sprite;

    private entity: T;

    private anchor: number = 0.5;

    constructor(imagePath: string, entity: T) {
        this.entity = entity;
        this.sprite = PIXI.Sprite.from(imagePath);
        this.sprite.anchor.set(this.anchor);
    }

    /**
     * Getter $sprite
     * @return {PIXI.Sprite}
     */
    public get $sprite(): PIXI.Sprite {
        return this.sprite;
    }

    /**
     * Getter $entity
     * @return {Entity}
     */
    public get $entity(): T {
        return this.entity;
    }

    /**
     * 表示箇所を更新する.
     */
    public update() {
        this.sprite.x = this.entity.position().x;
        this.sprite.y = this.entity.position().y;
    }
}