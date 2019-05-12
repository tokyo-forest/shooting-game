export default interface keyboard {
    value: string,
    isDown: boolean,
    isUp: boolean,
    press: (event: any) => void,
    release: (event: any) => void,
    downHandler: (event: any) => void,
    upHandler: (event: any) => void,
    unsubscribe: () => void
};


export function createKeyboard(value: string): keyboard {

    let resultKey: keyboard = {
        value: value,
        isDown: false,
        isUp: true,
        press: function (event: any): void {
        },
        release: function (event: any): void {
        },
        downHandler: function (event: any): void {
            if (event.key === this.value) {
                if (this.isUp && this.press) this.press(event);
                this.isDown = true;
                this.isUp = false;
                event.preventDefault();
            }
        },
        upHandler: function (event: any): void {
            if (event.key === this.value) {
                if (this.isDown && this.release) this.release(event);
                this.isDown = false;
                this.isUp = true;
                event.preventDefault();
            }
        },
        unsubscribe: function (): void {
            window.removeEventListener("keydown", downListener);
            window.removeEventListener("keyup", upListener);
        }
    };

    //Attach event listeners
    const downListener = resultKey.downHandler.bind(resultKey);
    const upListener = resultKey.upHandler.bind(resultKey);

    window.addEventListener(
        "keydown", downListener, false
    );
    window.addEventListener(
        "keyup", upListener, false
    );

    return resultKey;
}