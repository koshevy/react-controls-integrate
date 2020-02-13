import { TestBed } from '@angular/core/testing';

import { WizardValidatorService } from './wizard-validator.service';

describe('WizardValidatorService', () => {
  let service: WizardValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WizardValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
