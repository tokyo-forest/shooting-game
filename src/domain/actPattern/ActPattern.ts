import MovementDirection from "./MovementDirection";


export default abstract class ActPattern {
    abstract nextAction(): MovementDirection;
}

export class StraightActPattern extends ActPattern{
    nextAction(): MovementDirection {
        return new MovementDirection(0, 1);
    }
}