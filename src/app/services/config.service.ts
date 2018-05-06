import { Injectable } from "@angular/core";

export interface IConfig {
    heroesUrl: string;
    textfile: string;
}

export interface IFilter {
    name: string;
    values: string[];
    type: IFilterType;
    filterKind: IFilterKind;
    isDefault?: boolean;
}

export enum IFilterType {
    singleTextValue = 0,
    multiTextValue = 1,
    date = 2,
}

export enum IFilterKind {
    include = 0,
    exclude = 1
}

@Injectable()
export class ConfigService {

    getAllFilters(): IFilter[] {
        //TODO: it could come from server?
        return [
            {
                name: "title",
                values: [],
                type: IFilterType.singleTextValue,
                filterKind: IFilterKind.include,
                isDefault: true
            },
            {
                name: "country",
                values: [],
                type: IFilterType.singleTextValue,
                filterKind: IFilterKind.include
            },
            {
                name: "filter_1",
                values: [],
                type: IFilterType.singleTextValue,
                filterKind: IFilterKind.include
            },
            {
                name: "filter_2",
                values: [],
                type: IFilterType.singleTextValue,
                filterKind: IFilterKind.include
            }
        ];
    }
}