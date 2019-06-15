import {Keyboard} from "./Keyboard";

/**
 * キーボード操作の管理を行う
 */
export default class KeyboardManager {
    //@see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
    private leftKeyValue = "ArrowLeft";
    private upKeyValue = "ArrowUp";
    private rightKeyValue = "ArrowRight";
    private downKeyValue = "ArrowDown";
    private spaceKeyValue = " ";

    left: Keyboard;
    up: Keyboard;
    right: Keyboard;
    down: Keyboard;
    space: Keyboard;

    constructor() {
        this.left = new Keyboard(this.leftKeyValue);
        this.up = new Keyboard(this.upKeyValue);
        this.right = new Keyboard(this.rightKeyValue);
        this.down = new Keyboard(this.downKeyValue);
        this.space = new Keyboard(this.spaceKeyValue);
    }

    /**
     * 全てのキー押下のイベントをunsubscribeさせる.
     */
    clearAllKeyEvent() {
        this.left.unsubscribe();
        this.up.unsubscribe();
        this.right.unsubscribe();
        this.down.unsubscribe();
        this.space.unsubscribe();
    }
}
