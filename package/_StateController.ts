import { action, makeObservable, observable } from "mobx";

type TObject = { [key: string | number | symbol]: any };

/**
 * Base state controller.
 *
 * Should not be used as a standalone module, only
 * as part of the BaseController class.
 * @internal
 */
export default class StateController<State = TObject> {
    @observable public state: State = {} as State;
    private readonly defaultState: State;

    constructor (defaultState: State) {
        makeObservable(this);

        this.state = defaultState;
        this.defaultState = defaultState;
    }

    @action
    public setState (state: Partial<State> | keyof State, value?: State[keyof State]): void {
        if (typeof state === "object") {
            this.state = {
                ...this.state,
                ...state
            };
        } else this.state[String(state) as keyof State] = value as any;
    }

    @action
    public resetState (...keep: (keyof State)[]) {
        const nextState = { ...this.defaultState };

        keep.forEach(keepKey => nextState[keepKey] = this.state[keepKey]);

        this.state = nextState;
    }
}
