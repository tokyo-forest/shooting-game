import MovementDirection from "./MovementDirection";
import ActPattern from "./ActPattern";

export default class StraightActPattern extends ActPattern{
    nextAction(): MovementDirection {
        return new MovementDirection(0, 1);
    }
}