import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import * as moment from 'moment';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Setting } from '../setting.interface';
import { SettingsService } from '../settings.service';
import { Router, ActivatedRoute } from '@angular/router';
import { error } from '@angular/compiler/src/util';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  setting: Setting;
  errorMessage: string;
  successMessage: string;
 
  constructor(
    private settingsService: SettingsService,
  ) { }

  ngOnInit() {
    
    this.settingsService.getSettings().subscribe(result => {
      this.setting = result
    });
  }

  updateSetting(setting) {

    this.settingsService.updateSettings(this.setting).subscribe({
      next: response => this.successMessage = "Settings were successfully updated",
      error: errorMessage => this.errorMessage = errorMessage
    });

  }

}

