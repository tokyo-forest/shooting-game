import MovementDirection from "./MovementDirection";
import ActPattern from "./ActPattern";

export default class RandomActPattern extends ActPattern {
    nextAction(): MovementDirection {
        const actDeterminant = Math.random();
        if (actDeterminant < 0.33) {
            return new MovementDirection(0, 1);
        } else if (actDeterminant < 0.67) {
            return new MovementDirection(0.707, 0.707);
        } else {
            return new MovementDirection(-0.707, 0.707);
        }
    }
}