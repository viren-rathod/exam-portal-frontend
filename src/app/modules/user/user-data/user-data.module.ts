import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDataRoutingModule } from './user-data-routing.module';
import { UserDataComponent } from './user-data.component';


@NgModule({
  declarations: [
    UserDataComponent
  ],
  imports: [
    CommonModule,
    UserDataRoutingModule
  ]
})
export class UserDataModule { }
