import MovementDirection from "./MovementDirection";
import ActPattern from "./ActPattern";

export default interface INextAction {
    actPattern: ActPattern;
    moveDirection: MovementDirection;

    nextAction(): void;
}
