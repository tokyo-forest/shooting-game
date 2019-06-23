import * as PIXI from 'pixi.js'
import PixiAdapter from "../PixiAdapter";
import CommonValue from "../../domain/valueObject/CommonValue";
import MainTextView from "../view/MainTextView";
import Position from "../../domain/valueObject/Position";
import DescriptionView from "../view/DescriptionView";

export default class TopLayout {
    pixiAdapter: PixiAdapter;
    commonValue: CommonValue;

    constructor(app: PIXI.Application, gamePixiAdapter: PixiAdapter, commonValue: CommonValue) {
        this.pixiAdapter = gamePixiAdapter;
        this.commonValue = commonValue;
    }

    create() {
        const windowSize = this.commonValue.windowSize;

        new MainTextView(
            this.pixiAdapter,
            "SHOOTING GAME TOKYO",
            new Position((windowSize.x / 2) - 100, 40)
        );

        new DescriptionView(
            this.pixiAdapter,
            "PRESS SPACE",
            new Position((windowSize.x / 2) - 100, windowSize.y - 100)
        );
    }

}