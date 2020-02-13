import React, {useState, useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';

import { StageProps } from './wizard-stages';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

export type WizardChildren = React.ReactElement<StageProps<any>>[] | React.ReactElement<StageProps<any>>;

export default function Wizard(props: {
  currentStage?: number,
  onMove?: (stepNumber: number) => void,
  children: WizardChildren,
  isStageValid: boolean
}) {
  const stages = Array.isArray(props.children)
    ? props.children
    : [props.children];

  // State variables
  const [currentStage, setCurrentStage] = useState(props.currentStage || 0);

  useEffect(() => {
    if (props.onMove) {
      props.onMove(currentStage);
    }
  }, [currentStage]);

  // Local variables
  const classes = useStyles({});
  const backButton = (
    <Button disabled={false}
            onClick={() => setCurrentStage(currentStage - 1)}
            className={classes.button}>
      Back
    </Button>
  );

  return (
    <>
      <Stepper activeStep={currentStage} orientation='vertical'>
        {stages.map((stage, index) => (
          <Step key={index}>
            <StepLabel>{stage.props.title}</StepLabel>
            <StepContent>
              <Typography></Typography>

              {stage}

              <div className={classes.actionsContainer}>
                <div>
                  {(index > 0) ? backButton : null}
                  <Button
                    variant='contained'
                    color='primary'
                    disabled={!props.isStageValid}
                    onClick={() => {
                      if (props.isStageValid) {
                        setCurrentStage(currentStage + 1);
                      }
                    }}
                    className={classes.button}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </>);
}
