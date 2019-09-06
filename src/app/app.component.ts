import { Account } from 'src/model/account.model';
import { Component, NgZone } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform, MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from './services/auth/account.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.scss'],
})
export class AppComponent {
  public appPages;
  currPage = 0;

  constructor(
    private zone: NgZone,
    private accountService: AccountService,
    public menuCtrl: MenuController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {


      this.zone.run(() => {
        this.accountService.authenticationState.subscribe(state => {
          this.menuCtrl.enable(state);
        });
      });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.initTranslate();
    this.initializePages();
  }

  initializePages() {
    this.currPage = 0;
    this.appPages = [
      { title: 'Home', url: '/tabs/home', icon: 'home', selec: true },
      { title: 'Account', url: '/tabs/account', icon: 'contact', selec: false },
      { title: 'Entities', url: '/tabs/entities', icon: 'apps', selec: false },
    ];
  }

  async pageClicked(index) {
    this.appPages[index].selec = true;
    this.appPages[this.currPage].selec = false;
    this.currPage = index;
  }

  initTranslate() {
    const defaultLang = 'en'; // Set your language here

    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang(defaultLang);
    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use(defaultLang);
    }

    this.translate.get(['Home', 'Account', 'Entities']).subscribe(values => {
      this.appPages[0].title = values.Home;
      this.appPages[1].title = values.Account;
      this.appPages[2].title = values.Entities;

    });
  }

  menuClicked() {

  }
}
