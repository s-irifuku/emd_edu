import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EmpListComponent } from './emp-list/emp-list.component';
import { EmpDetailComponent } from './emp-detail/emp-detail.component';
import { EmpInsertComponent } from './emp-insert/emp-insert.component';
import { EmpUpdateComponent } from './emp-update/emp-update.component';
import { ResListComponent } from './res-list/res-list.component';

const routes:Routes = [
  {path: 'emp-list', component: EmpListComponent},
  {path: 'emp-detail', component: EmpDetailComponent},
  {path: 'emp-insert', component: EmpInsertComponent},
  {path: 'emp-update', component: EmpUpdateComponent},
  {path: 'res-list', component: ResListComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    EmpListComponent,
    EmpDetailComponent,
    EmpInsertComponent,
    EmpUpdateComponent,
    ResListComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      routes,
      {enableTracing: true}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }