import { action, computed, makeObservable } from "mobx";
import DataController from "./_DataController";
import StateController from "./_StateController";

type TObject = { [key: string | number | symbol]: any };

/**
 * Controller of dynamically updated data.
 * Manages the state and data variables of controllers and stores.
 *
 * S — stored state type (this.state).
 *
 * D — stored data type (this.data).
 */
export default class BaseController<S = TObject, D = TObject> {
    readonly #dataController: DataController<D>;
    readonly #stateController: StateController<S>;

    /**
     * Controller of dynamically updated data.
     * Manages the state and data variables of controllers and stores.
     *
     * @param {TObject} defaultState - default value for the state.
     * @param {TObject} defaultData - default value for stored data.
     */
    constructor (defaultState: S, defaultData: D) {
        makeObservable(this);

        this.#stateController = new StateController<S>(defaultState);
        this.#dataController = new DataController<D>(defaultData);
    }

    /**
     * Method for getting current state.
     */
    @computed
    public get state () { return this.#stateController.state; }

    /**
     * Method for getting the current data stored in the controller.
     */
    @computed
    public get data () { return this.#dataController.data; }

    /**
     * Method for changing multiple controller states.
     * @param {Partial<TObject>} state - an object with a new state.
     */
    public setState (state: Partial<S>): void;

    /**
     * Method for changing a particular state of a controller.
     * @param {keyof TObject} state - state key (name).
     * @param {TObject[keyof TObject]} value - new value for state.
     */
    public setState (state: keyof S, value: S[keyof S]): void;

    /**
     * Method for changing one or more controller states.
     *
     * @param {Partial<TObject> | keyof TObject} state - an object with new state data or a key.
     * @param {TObject[keyof TObject]} value - new value for state (if key is given).
     */
    @action
    public setState (state: Partial<S> | keyof S, value?: S[keyof S]) { this.#stateController.setState(state, value); }

    /**
     * Method for resetting controller state to its defaults.
     * @param {keyof TObject} keep - state keys that should not be reset.
     */
    @action
    public resetState (...keep: (keyof S)[]) { this.#stateController.resetState(...keep); }

    /**
     * Method to change multiple controller data keys.
     * @param {Partial<TObject>} data - an object with a new state data.
     */
    public setData (data: Partial<D>): void;

    /**
     * Method to change a specific controller data key.
     * @param {keyof TObject} data - data key.
     * @param {TObject[keyof TObject]} value - new value for provided key.
     */
    public setData (data: keyof D, value: D[keyof D]): void;

    /**
     * Method for changing one or more controller states.
     *
     * @param {Partial<TObject> | keyof TObject} data - object with new data or key.
     * @param {TObject[keyof TObject]} value - new data value by key (if given).
     */
    @action
    public setData (data: Partial<D> | keyof D, value?: D[keyof D]) { this.#dataController.setData(data, value); }

    /**
     * Method for resetting data stored by the controller to its defaults.
     * @param {keyof TObject} keep - data keys that should not be reset.
     */
    @action
    public resetData (...keep: (keyof D)[]) { this.#dataController.resetData(...keep); }
}
