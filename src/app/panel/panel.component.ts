import {Component, ViewEncapsulation, OnInit, ViewChild} from '@angular/core';
import {TitleService} from '../services/helpers/title.service';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import {AuthInfoService} from '../services/auth/auth.info.service';
import {AddOrganizationModalComponent} from './components/modals/add-organization/add-organization-modal.component';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../assets/styles/pages/panel.component.scss', '../../assets/styles/pages/after-login.scss']
})
export class PanelComponent implements OnInit {
  @ViewChild('addOrganizationModal') public addOrganizationModal:AddOrganizationModalComponent;
  protected user: any;
  protected target: boolean = true;
  protected track: boolean = false;
  protected triage: boolean = false;
  protected graph_only: boolean = false;
  protected table_only: boolean = false;
  public small_breakpoint = false;
  public orgSuccessMsg: string = '';
  public orgErrorMsg: string = '';
  public orgWorking: boolean = false;

  /**
   * Injecting needed services
   * @param pageTitle
   * @param _authService
   * @param _authInfoService
   * @param _router
   */
  constructor(private pageTitle: TitleService,
              private _authService: AuthService,
              private _authInfoService: AuthInfoService,
              private _router:Router) {
  }

  /**
   * on init actions
   */
  ngOnInit() {
    this.pageTitle.setTitle('Panel');
    let str: string = ''+this._authInfoService.getCurrentUser();
    try {
      this.user = JSON.parse(str);
      if (!this.user) {
        this._authService.logout();
        this._router.navigate(['/login']);
      }
    } catch (err) {
      console.log(err);
    }
  }

  updateAddOrgStatus(res) {
    this.orgSuccessMsg = res.success;
    this.orgErrorMsg = res.error;
    this.orgWorking = false;
    if (res.success) {
      setTimeout(() => {
        this.addOrganizationModal.trigger(false);
        this.orgSuccessMsg = '';
        this.orgErrorMsg = '';
        this.orgWorking = false;
      }, 2000);
    }
  }

  onUpdateStateBtns(btn:string):boolean {
    this.target = false;
    this.track = false;
    this.triage = false;
    if (btn === 'target' || btn === 'track' || btn === 'triage') {
      this[btn] = true;
    }
    return false;
  }

  onUpdateDisplayOptions(btn:string):boolean {
    if (btn === 'table') {
      if (this.table_only) {
        this.table_only = false;
      } else {
        this.table_only = true;
        this.graph_only = false;
      }
    }
    if (btn === 'graph') {
      if (this.graph_only) {
        this.graph_only = false;
      } else {
        this.graph_only = true;
        this.table_only = false;
      }
    }
    return false;
  }

  onClick() {
    return false;
  }

  onResizePanel(sizes:number[]) {
    this.small_breakpoint = (sizes[0] < 35);
  }

}
