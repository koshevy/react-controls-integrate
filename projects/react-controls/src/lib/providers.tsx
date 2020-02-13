import { Observable } from 'rxjs';

import React from 'react';
import { WizardStage, WizardStageData } from './wizard-data';

export interface AbstractInjector {
  get<T>(token: T | any, notFoundValue?: T, flags?: any): T;
}

export declare interface AbstractNavigationExtras {
  queryParams?: {[key: string]: any} | null;
  fragment?: string;
  preserveQueryParams?: boolean;
  preserveFragment?: boolean;
  skipLocationChange?: boolean;
  replaceUrl?: boolean;
  state?: {
    [k: string]: any;
  };
}

export interface AbstractRouter {
  navigateByUrl(url: string | any, extras?: AbstractNavigationExtras): Promise<boolean>;
  isActive(url: string | any, exact: boolean): boolean;
  navigate(commands: any[], extras?: AbstractNavigationExtras): Promise<boolean>;
}

export interface AbstractWizardValidator {
  validate<Stage extends WizardStage>(payload: WizardStageData<Stage>): Observable<boolean>;
}

export const InjectorContext = React.createContext<{
  injector: AbstractInjector | null
}>({
  injector: null
});

export const RouterToken = '___RouterToken___';
export const SnackBarToken = '___SnackBarToken___';
export const WizardValidatorToken = '___WizardValidatorToken___';
