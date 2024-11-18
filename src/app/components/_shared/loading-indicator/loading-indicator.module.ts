import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadIndicatorComponent } from './loading-indicator.component';

@NgModule({
  declarations: [LoadIndicatorComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [LoadIndicatorComponent]
})
export class LoadIndicatorModule { }
