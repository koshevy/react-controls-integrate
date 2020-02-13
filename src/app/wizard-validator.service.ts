import { Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';
import {
  AbstractWizardValidator,
  WizardValidatorToken,
  WizardStage,
  WizardStageData
} from 'react-controls';

@Injectable({
  providedIn: 'root'
})
export class WizardValidatorService implements AbstractWizardValidator {

  constructor() {}

  validate<Stage extends WizardStage>(stageData: WizardStageData<Stage>): Observable<boolean> {
    if (stageData.stage === WizardStage.Profile) {
      const {
        name,
        phoneNumber,
        surname
      } = (stageData as WizardStageData<WizardStage.Profile>).payload;

      return of(!!name && !!phoneNumber && !!surname);
    }

    if (stageData.stage === WizardStage.Checklist) {
      const {
        neverGonnaGive,
        neverGonnaLet,
        neverGonnaMake,
        neverGonnaRun
      } = (stageData as WizardStageData<WizardStage.Checklist>).payload;

      return of(
        !!neverGonnaGive &&
        !!neverGonnaLet &&
        !!neverGonnaMake &&
        !!neverGonnaRun);
    }

    return of(false);
  }
}
