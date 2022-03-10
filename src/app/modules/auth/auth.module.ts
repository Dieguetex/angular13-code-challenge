import {NgModule} from '@angular/core';

import {RegisterComponent} from './page/register/register.component';

import {AuthRoutingModule} from './auth.routing';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SharedModule} from 'src/app/shared/shared.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, SharedModule],
})
export class AuthModule {}
