import { CarModelData } from '../types';

export abstract class AbstractCarModelLoader {
    abstract load(): Promise<CarModelData>;
}
