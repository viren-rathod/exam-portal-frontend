import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ModalComponent } from './components/modal/modal.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ModalComponent, LoaderComponent, NotFoundComponent],
  imports: [CommonModule, NgxPermissionsModule.forRoot(),RouterModule],
  exports: [ModalComponent, LoaderComponent, CommonModule],
})
export class SharedModule {}
