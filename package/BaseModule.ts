import DataModule from "./modules/DataModule";
import StateModule from "./modules/StateModule";

type TObject = { [key: string | number | symbol]: any };

/**
 * Module with a dynamically updated data.
 * Manages the state and data variables of modules and stores.
 *
 * S — stored state type (this.state).
 *
 * D — stored data type (this.data).
 */
export default class BaseModule<S = TObject, D = TObject> {
    readonly #dataModule: DataModule<D>;
    readonly #stateModule: StateModule<S>;

    /**
     * Module with a dynamically updated data.
     * Manages the state and data variables of modules and stores.
     *
     * @param {TObject} defaultState - default value for the state.
     * @param {TObject} defaultData - default value for stored data.
     */
    constructor (defaultState: S, defaultData: D) {
        this.#stateModule = new StateModule<S>(defaultState);
        this.#dataModule = new DataModule<D>(defaultData);
    }

    /**
     * Method for getting current state.
     */
    public get state () { return this.#stateModule.state; }

    /**
     * Method for getting the current data stored in the module.
     */
    public get data () { return this.#dataModule.data; }

    /**
     * Method for changing multiple module states.
     * @param {Partial<TObject>} state - an object with a new state.
     */
    public setState (state: Partial<S>): void;

    /**
     * Method for changing a particular state of a module.
     * @param {keyof TObject} state - state key (name).
     * @param {TObject[keyof TObject]} value - new value for state.
     */
    public setState (state: keyof S, value: S[keyof S]): void;

    /**
     * Method for changing one or more module states.
     *
     * @param {Partial<TObject> | keyof TObject} state - an object with new state data or a key.
     * @param {TObject[keyof TObject]} value - new value for state (if key is given).
     */
    public setState (state: Partial<S> | keyof S, value?: S[keyof S]) { this.#stateModule.setState(state, value); }

    /**
     * Method for resetting module state to its defaults.
     * @param {keyof TObject} keep - state keys that should not be reset.
     */
    public resetState (...keep: (keyof S)[]) { this.#stateModule.resetState(...keep); }

    /**
     * Method to change multiple module data keys.
     * @param {Partial<TObject>} data - an object with a new state data.
     */
    public setData (data: Partial<D>): void;

    /**
     * Method to change a specific module data key.
     * @param {keyof TObject} data - data key.
     * @param {TObject[keyof TObject]} value - new value for provided key.
     */
    public setData (data: keyof D, value: D[keyof D]): void;

    /**
     * Method for changing one or more module states.
     *
     * @param {Partial<TObject> | keyof TObject} data - object with new data or key.
     * @param {TObject[keyof TObject]} value - new data value by key (if given).
     */
    public setData (data: Partial<D> | keyof D, value?: D[keyof D]) { this.#dataModule.setData(data, value); }

    /**
     * Method for resetting data stored by the module to its defaults.
     * @param {keyof TObject} keep - data keys that should not be reset.
     */
    public resetData (...keep: (keyof D)[]) { this.#dataModule.resetData(...keep); }
}
