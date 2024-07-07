import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ModalComponent } from './components/modal/modal.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [ModalComponent, LoaderComponent],
  imports: [CommonModule, NgxPermissionsModule.forRoot()],
  exports: [ModalComponent, LoaderComponent, CommonModule],
})
export class SharedModule {}
