import { Component } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss']
})
export class AccountPage {

  // nEmployee: NmsEmployee;
  // account: JhiUser;
  // nmsActZones: NmsZone[];
  // modalAccount: any;
  // modalPass: any;

  // languages: any[];
  // lang: String;

  // constructor(
  //   private accountServ: AccountService,
  //   private activatedRoute: ActivatedRoute,
  //   public toastCtrl: ToastController,
  //   private router: Router,
  //   private socket: Socket,
  //   private nEmployeeService: NEmployeeService,
  //   public translateService: TranslateService,
  //   private modalCtrl: ModalController,
  //   public menuCtrl: MenuController) { }

  // ngOnInit() {

  // }

  // ionViewWillEnter() {
  //   this.languages = this.nEmployeeService.languages;
  //   this.loadAll();
  // }

  // loadAll(refresher?) {
  //   this.accountServ.get().subscribe((account) => {
  //     this.account = account;
  //     this.lang = this.languages.find(o => o.key === account.langKey).name;
  //     console.log('LANGUAGE', account.langKey);
  //     console.log(this.translateService.getLangs());
  //     this.nEmployeeService.findByUser(this.account.id).subscribe(data => {
  //       this.nEmployee = data;
  //       this.setZonesTenant(this.nEmployee.tenant.id);
  //       if (typeof (refresher) !== 'undefined') { refresher.target.complete(); }
  //       console.log(data);
  //       this.socket.on('connect', () => {
  //         if (this.nmsActZones) {
  //           this.socket.emit('connectZones', this.nmsActZones);
  //         }
  //       });
  //     });
  //   });
  // }
  // async edit() {
  //   this.router.navigate(['/my-account-edit']);
  // }

  // setZonesTenant(tenantId) {
  //   this.nmsActZones = this.nEmployee.activeZones.filter(zones =>
  //     zones.tenant.id === tenantId &&
  //     zones.active
  //   );
  // }

  // async changePwd() {
  //   this.router.navigate(['/change-pwd', 'my-account']);
  // }

  // async presentToast(text) {
  //   const toast = await this.toastCtrl.create({ message: text, duration: 3000, position: 'middle' });
  //   toast.present();
  // }

}
