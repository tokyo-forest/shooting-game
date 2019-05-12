import * as PIXI from 'pixi.js'

/**
 * ファクトリクラスの基底クラス
 */
export default class BaseFactory {
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
}