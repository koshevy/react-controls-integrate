// import { debounceTime } from 'rxjs/operators';

import React, { useState, useEffect, useContext } from 'react';
import Container from '@material-ui/core/Container';

import PlateAppBar from './app-bar';
import { ProfileStage, CheckListStage } from './wizard-stages';
import Wizard, { WizardChildren } from './wizard';
import { WizardStage, WizardStageData } from './wizard-data';
import {
  AbstractRouter,
  AbstractWizardValidator,
  InjectorContext,
  RouterToken,
  SnackBarToken,
  WizardValidatorToken
} from './providers';

export function PlateWithHooks() {
  const injector = useContext(InjectorContext).injector;
  const router = injector.get(RouterToken) as AbstractRouter;
  const snakBar = injector.get(SnackBarToken) as any;

  // State variables
  const [stage, setStage] = useState(null);
  const [payload, setPayload] = useState(null);
  const [isStageValid, setStageValid] = useState(false);

  // persistent data (save data of stage even it gets destroyed)
  const [stagesData, setStagesData] = useState<{
    [key in WizardStage]?: any
  }>({});

  useEffect(() => {
    const wizardValidator = injector.get(WizardValidatorToken) as AbstractWizardValidator;

    if (stage) {
      wizardValidator.validate({
        stage,
        payload
      }).subscribe(isValid =>
        setStageValid(isValid)
      );
    }
  }, [payload, setPayload]);

  // Events
  const onChange = (curStage: WizardStage, curPayload) => {
    setStage(curStage);
    setPayload(curPayload);
    setStagesData({
      ...stagesData,
      [curStage]: curPayload
    });
  };
  const useOnChange = (stageId) => onChange.bind(null, stageId);

  const onMove = (stepNumber) => {
    const stageId = Object.values(WizardStage)[stepNumber];
    const stageTitle = Object.keys(WizardStage)[stepNumber];

    router.navigate([], {
      queryParams: {step: stageId}
    });

    if (stepNumber > 0) {
      snakBar.open(`Stage passed: ${stageTitle}`, 'Got it!', {
        duration: 2000
      });
    }
  };

  return (
    <>
      <PlateAppBar title='React controls plate' />
      <Container maxWidth='sm'>
        <Wizard onMove={onMove} isStageValid={isStageValid}
                children={Object.values(WizardStage).map(eachStage => {
                  const CurrentStage = {
                    [WizardStage.Profile]: ProfileStage,
                    [WizardStage.Checklist]: CheckListStage
                  }[eachStage];

                  const title = {
                    [WizardStage.Profile]: 'Profile data',
                    [WizardStage.Checklist]: 'Check list'
                  }[eachStage];

                  if (!CurrentStage) {
                    return;
                  }

                  return <CurrentStage title={title}
                                       value={stagesData[eachStage]}
                                       onChange={useOnChange(eachStage)}
                  />;
                }).filter(v => !!v)}
        />
      </Container>
    </>
  );
}
