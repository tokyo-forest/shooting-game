import Sprite = PIXI.Sprite;

/**
 * 画面に表示される実態を表す.
 */
export interface Entity {
    sprite: Sprite
    vx: number
    vy: number
    play: () => void
}
