import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MoviesComponent } from './movies/movies.component';
import { HttpErrorHandler } from './services/http-error-handler.service';
import { MySelectComponent } from './my-select/my-select.component';


@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MySelectComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    HttpErrorHandler
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
