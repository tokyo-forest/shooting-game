export class Keyboard {
    value: string;
    isDown: boolean;
    isUp: boolean;
    pressFunctions: Array<(event: any) => void>;
    releaseFunctions: Array<(event: any) => void>;

    private downListener: any;
    private upListener: any;

    constructor(
        value: string
    ) {
        this.value = value;
        this.isDown = false;
        this.isUp = true;
        this.pressFunctions = new Array<(event: any) => void>();
        this.releaseFunctions = new Array<(event: any) => void>();

        // イベント登録を行う
        const downListener = this.downHandler.bind(this);
        const upListener = this.upHandler.bind(this);

        window.addEventListener("keydown", downListener, false);
        window.addEventListener("keyup", upListener, false);
    }

    downHandler(event: any): void {
        // ボタン押下時、押下時のイベントを全て実行する
        if (event.key === this.value) {
            if (this.isUp) {
                this.pressFunctions.forEach(f => {
                    f(event);
                });
            }
            this.isDown = true;
            this.isUp = false;
            event.preventDefault();
        }
    }

    upHandler(event: any): void {
        // ボタンを離した時、離した時のイベントを全て実行する
        if (event.key === this.value) {
            if (this.isDown) {
                this.releaseFunctions.forEach(f => {
                    f(event);
                });
            }
            this.isDown = false;
            this.isUp = true;
            event.preventDefault();
        }
    }

    /**
     * ボタン押下時のイベントを追加する
     * @param event イベント
     */
    pushPressHandler(event: (event: any) => void): void{
        this.pressFunctions.push(event);
    }

    /**
     * ボタンを離した時のイベントを追加する
     * @param event イベント
     */
    pushReleaseHandler(event: (event: any) => void): void{
        this.releaseFunctions.push(event);
    }

    /**
     * 登録されたイベントを削除する
     */
    unsubscribe(): void {
        window.removeEventListener("keydown", this.downListener);
        window.removeEventListener("keyup", this.upListener);

        this.pressFunctions = new Array<(event: any) => void>();
        this.releaseFunctions = new Array<(event: any) => void>();
    }
}