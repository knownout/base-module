type TObject = { [key: string | number | symbol]: any };

/**
 * Base module with state only.
 */
export default class StateModule<State = TObject> {
    public state: State = {} as State;
    private readonly defaultState: State;

    constructor (defaultState: State) {
        this.state = defaultState;
        this.defaultState = defaultState;
    }

    public setState (state: Partial<State> | keyof State, value?: State[keyof State]): void {
        if (typeof state === "object") {
            this.state = {
                ...this.state,
                ...state
            };
        } else this.state[String(state) as keyof State] = value as any;
    }

    public resetState (...keep: (keyof State)[]) {
        const nextState = { ...this.defaultState };

        keep.forEach(keepKey => nextState[keepKey] = this.state[keepKey]);

        this.state = nextState;
    }
}
