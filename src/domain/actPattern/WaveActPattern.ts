import MovementDirection from "./MovementDirection";
import ActPattern from "./ActPattern";

export default class WaveActPattern extends ActPattern{
    private counter:number = 0;
    nextAction(): MovementDirection {
        return new MovementDirection(Math.sin(Date.now()/1000), 1);
    }
}