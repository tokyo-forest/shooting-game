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
     * @param sprite
     */
    protected addChildSprite(sprite: PIXI.Sprite) {
        this.stage.addChild(sprite);
    }

    /**
     * spriteをstageから削除する
     *
     * @param sprite
     */
    protected removeChildSprite(sprite: PIXI.Sprite) {
        this.stage.removeChild(sprite);
    }
}