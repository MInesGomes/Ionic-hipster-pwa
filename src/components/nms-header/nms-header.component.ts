
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from 'src/app/services/login/login.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-nms-header',
  templateUrl: './nms-header.component.html',
  styleUrls: ['./nms-header.component.scss'],
})
export class NmsHeaderComponent implements OnInit {

  languages: any[];
  // public title = '';
  @Input() title: string;
  constructor(
    public loginService: LoginService,
    public navController: NavController,
    public translateServ: TranslateService) {
  }

  async ngOnInit() {
  }

  logout() {
    this.loginService.logout();
    this.navController.navigateBack('');
  }

}
