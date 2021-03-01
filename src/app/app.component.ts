import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'pan-marga';
  pass = 'pan';
  contra: string = 'pan';
  constructor(){
    ;
  }
  passAdd(contra: string): void {
    this.contra = contra;
  }
}
