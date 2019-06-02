export class MovementDirection {
    vx: number;
    vy: number;
    constructor(vx: number, vy: number) {
        this.vx = vx;
        this.vy = vy;
    }
}

export interface INextAction {
    actPattern: ActPattern;
    moveDirection: MovementDirection;

    nextAction(): void;
}


export abstract class ActPattern {
    abstract nextAction(): MovementDirection;
}

export class StraightActPattern extends ActPattern{
    nextAction(): MovementDirection {
        return new MovementDirection(0, 1);
    }
}