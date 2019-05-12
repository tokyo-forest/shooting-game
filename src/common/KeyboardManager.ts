import {Keyboard} from "./Keyboard";

/**
 * キーボード操作の管理を行う
 */
export default class KeyboardManager {
    private leftKeyValue = "ArrowLeft";
    private upKeyValue = "ArrowUp";
    private rightKeyValue = "ArrowRight";
    private downKeyValue = "ArrowDown";

    left: Keyboard;
    up: Keyboard;
    right: Keyboard;
    down: Keyboard;

    constructor() {
        this.left = new Keyboard(this.leftKeyValue);
        this.up = new Keyboard(this.upKeyValue);
        this.right = new Keyboard(this.rightKeyValue);
        this.down = new Keyboard(this.downKeyValue);
    }

    /**
     * 全てのキー押下のイベントをunsubscribeさせる.
     */
    clearAllKeyEvent() {
        this.left.unsubscribe();
        this.up.unsubscribe();
        this.right.unsubscribe();
        this.down.unsubscribe();
    }
}
