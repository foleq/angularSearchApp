import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

export interface IConfig {
    heroesUrl: string;
    textfile: string;
}

export interface IFilter {
    name: string;
    values: string[];
    availableValues: string[];
    type: IFilterType;
    filterKind: IFilterKind;
    isSelected?: boolean;
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
        // TODO: it could come from server?
        return [
            {
                name: 'title',
                values: [],
                availableValues: ['test 1', 'test 2', 'test 3', 'test 4'],
                type: IFilterType.singleTextValue,
                filterKind: IFilterKind.include,
                isSelected: true
            },
            {
                name: 'country',
                values: [],
                availableValues: ['Poland', 'Germany', 'USA'],
                type: IFilterType.singleTextValue,
                filterKind: IFilterKind.include
            },
            {
                name: 'filter_1',
                values: [],
                availableValues: ['f 1', 'f 2'],
                type: IFilterType.singleTextValue,
                filterKind: IFilterKind.include
            },
            {
                name: 'filter_2',
                values: [],
                availableValues: ['xxx', 'yyy'],
                type: IFilterType.singleTextValue,
                filterKind: IFilterKind.include
            }
        ];
    }
}
