import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxPermissionsModule} from 'ngx-permissions';

@NgModule({
  imports: [CommonModule,
    NgxPermissionsModule.forRoot(),],
})
export class SharedModule {
}
