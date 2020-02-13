import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  OnInit,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import React, { useContext } from 'react';
import ReactDOM from 'react-dom';

import {
  InjectorContext,
  PlateWithHooks,
  RouterToken,
  SnackBarToken,
  WizardValidatorToken
} from 'react-controls';

import {
  WizardValidatorService
} from './wizard-validator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: RouterToken,
      useExisting: Router
    },
    {
      provide: WizardValidatorToken,
      useExisting: WizardValidatorService
    },
    {
      provide: SnackBarToken,
      useExisting: MatSnackBar
    }
  ]
})
export class AppComponent implements OnInit {

  @ViewChild('rootContainer', {
    static: true
  }) rootContainer: ElementRef;

  constructor(public injector: Injector) {}

  ngOnInit() {
    ReactDOM.render(
      <InjectorContext.Provider value={{injector: this.injector}}>
        <PlateWithHooks />
      </InjectorContext.Provider>,
      this.rootContainer.nativeElement
    );
  }
}
