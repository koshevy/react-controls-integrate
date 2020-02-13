import {
  ProfileStageData,
  CheckListStageData
} from './wizard-stages';

export enum WizardStage {
  Profile = 'profile',
  Checklist = 'checklist',
  Disclaimer = 'disclaimer'
}

export interface WizardStageData<T extends WizardStage> {
  stage: T;
  payload:
    T extends WizardStage.Profile
    ? ProfileStageData

    : T extends WizardStage.Checklist
    ? CheckListStageData

    : T extends WizardStage.Disclaimer
    ? {
      acceptPrivacyPolicy: boolean;
      giveUpClaims: boolean;
    }
    : never;
}
