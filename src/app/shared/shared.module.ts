import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {SpinnerComponent} from './component/spinner/spinner.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  declarations: [SpinnerComponent],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, SpinnerComponent],
})
export class SharedModule {}
