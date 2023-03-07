import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  lang: any
  constructor() {
    if ('language' in localStorage) {
      this.lang = localStorage.getItem('language')
    }
  }
  ngOnInit(): void {
  }
  changeLang() {
    if (this.lang == 'en') {
      localStorage.setItem('language', 'ar')
    } else {
      localStorage.setItem('language', 'en')
    }
    window.location.reload()
  }
}
