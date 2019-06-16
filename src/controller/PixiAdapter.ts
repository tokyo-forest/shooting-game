import * as PIXI from 'pixi.js'

/**
 * PixiAdapter
 */
export default class PixiAdapter {
    private stage: PIXI.Container;

    constructor(stage: PIXI.Container) {
        this.stage = stage;
    }

    /**
     * stageにspriteを登録する.
     *
     * @param container
     */
    public addChildSprite(container: PIXI.Container) {
        this.stage.addChild(container);
    }

    /**
     * spriteをstageから削除する
     *
     * @param sprite
     */
    public removeChildSprite(sprite: PIXI.Sprite) {
        this.stage.removeChild(sprite);
    }

    /**
     * spriteを全て削除する
     */
    public removeChildren() {
        this.stage.removeChildren();
    }

    public hideContainer() {
        this.stage.visible = false;
    }

    public showContainer() {
        this.stage.visible = true;
    }
}