type TObject = { [key: string | number | symbol]: any };

/**
 * Base module with data only.
 */
export default class DataModule<Data = TObject> {
    public data: Data = {} as Data;
    private readonly defaultData: Data;

    constructor (defaultData: Data) {
        this.data = defaultData;
        this.defaultData = defaultData;
    }

    public setData (data: Partial<Data> | keyof Data, value?: Data[keyof Data]): void {
        if (typeof data === "object") {
            this.data = {
                ...this.data,
                ...data
            };
        } else this.data[String(data) as keyof Data] = value as any;
    }

    public resetData (...keep: (keyof Data)[]) {
        const nextData = { ...this.defaultData };

        keep.forEach(keepKey => nextData[keepKey] = this.data[keepKey]);

        this.data = nextData;
    }
}
