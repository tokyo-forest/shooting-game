import MovementDirection from "./MovementDirection";
import ActPattern from "./ActPattern";
import { Direction } from "../valueObject/Direction";

export default class DiagonalActPattern extends ActPattern {
    direction: Direction;

    constructor(direction: Direction) {
        super();
        this.direction = direction;
    }

    nextAction(): MovementDirection {
        switch ( this.direction ){
            case Direction.LOWER:
                return new MovementDirection(0,1);
            case Direction.LOWER_LEFT:
                return new MovementDirection(-0.5,1);
            case Direction.LOWER_RIGHT:
                return new MovementDirection(0.5,1);
            default:
                return new MovementDirection(0,1);
        }
    }

}