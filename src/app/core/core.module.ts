import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpService} from './services/http.service';
import {HttpClientModule} from '@angular/common/http';
import {NoAuthGuard} from './guard/no-auth.guard';

@NgModule({
  declarations: [],
  providers: [HttpService, NoAuthGuard],
  imports: [CommonModule, HttpClientModule],
})
export class CoreModule {}
