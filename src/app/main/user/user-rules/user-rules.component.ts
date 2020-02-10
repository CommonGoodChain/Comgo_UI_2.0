import { Component, OnInit } from '@angular/core';
import { ComGoAnimations } from '@ComGo/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatTableDataSource, MatRadioButton,MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../../environments/environment';
import { ComGoTranslationLoaderService } from '@ComGo/services/translation-loader.service';
import { locale as english } from '../../../layout/i18n/en';
import { locale as spanish } from '../../../layout/i18n/tr';
import { TranslateService } from '@ngx-translate/core';
import * as $ from 'jquery';
import { ComGoConfigService } from '@ComGo/services/config.service';
@Component({
  selector: 'app-user-rules',
  templateUrl: './user-rules.component.html',
  styleUrls: ['./user-rules.component.scss'],
  animations: ComGoAnimations
})
export class UserRulesComponent implements OnInit {
  dataOfRules;
  dataSource;
  form: FormGroup;
displayedColumns = ['rules','icons','selectAll'];
urlPort = environment.urlPort;
reportTypes = [
  true,
  false,
];
role;
checkValue=false;
tableData
username;
rulesOComGor;
orgName;
userType;
indexOfOrg;
rulesDefined = false;
// displayedColumns;
loading1;
private _unsubscribeAll: Subject<any>;

/**
* Constructor
* @param {FormBuilder} _formBuilder
* @param {Location} _location
* @param {MatSnackBar} _matSnackBar
*/

constructor(
    private router: Router,
    private _ComGoConfigService: ComGoConfigService,
    private routerData: ActivatedRoute,
    private http: Http,
    private _formBuilder: FormBuilder,
    private httpCLient :HttpClient,
    private _matSnackBar: MatSnackBar,
    public dialog: MatDialog,
    private _ComGoTranslationLoaderService: ComGoTranslationLoaderService,
    private _translateService: TranslateService
    ) { 
     this._ComGoTranslationLoaderService.loadTranslations(english, spanish);
    // this.product = new Product();

    // Set the private defaults
    this._unsubscribeAll = new Subject();
}

// -----------------------------------------------------------------------------------------------------
// @ Lifecycle hooks
// -----------------------------------------------------------------------------------------------------

/** 
 * @author:sagar
 * @argument:project id
 * @description:it is method to call function at initialize phase..calling get milestones list for specific project id
*/

/**
 * @author: Madhu
 * @argument:none
 * @description:to fix position
 */
horizontalPosition: MatSnackBarHorizontalPosition = 'right'; verticalPosition: MatSnackBarVerticalPosition = 'top';

  ngOnInit() {

    this._ComGoConfigService.config = {
      layout: {
          footer: {
              hidden: true
          },
          sidepanel: {
              hidden: true
          }
      }
  };
    this.userType = sessionStorage.getItem('userType')
    if(sessionStorage.getItem('userType') == 'Organization'){
    this.orgName =  sessionStorage.getItem("orgName")
    } else {
      this.orgName = sessionStorage.getItem("userRulesOrg")
    }
    this.username = sessionStorage.getItem("username")
    this.dataOfRules = [{
      "rules":"Add Project","id":"add_Project"
    },{
      "rules":"Add Beneficiaries","id":"add_Beneficiaries"
    },{
      "rules":"Update Beneficiaries","id":"update_Beneficiaries"
    },
    {
      "rules":"View Project","id":"view_Project"
    },
    {
      "rules":"Edit Project Document","id":"edit_ProjectDoc"
    },
    {
      "rules":"Edit Project Past Events","id":"edit_Project_PastEvents"
    },
    {
      "rules":"Edit Project Supporters","id":"edit_Project_Supporters"
    },
    {
      "rules":"Edit Project","id":"edit_Project"
    },{
      "rules":"Add Milestone","id":"add_Milestone"
    },
    {
      "rules":"View Milestones","id":"view_Milestone"
    },
    {
      "rules":"Edit Milestone","id":"edit_Milestone"
    },
    {
      "rules":"Add Activity","id":"add_Activity"
    },
    {
      "rules":"View Activity","id":"view_Activity"
    },
    {
      "rules":"Edit Activity","id":"edit_Activity"
    },
    {
      "rules":"Send For Approval","id":"send_For_Approval"
    },
    {
      "rules":"Approve/Reject Activity","id":"approve_Reject"
    },
    {
      "rules":"Approve Project","id":"approve_Project"
    },
    {
      "rules":"Publish Project","id":"publish_Project"
    },
    {
      "rules":"Self Donate to Project","id":"donate_Project"
    },
    {
      "rules":"Allocate Funds","id":"allocate_Fund"
    },
    {
      "rules":"View Expense","id":"view_Expense"
    },
    {
      "rules":"Add Expense","id":"add_Expense"
    },
    {
      "rules":"Update Expense","id":"update_Expense"
    },
    {
      "rules":"Request Fund","id":"request_Fund"
    },
    {
      "rules":"Release Fund","id":"release_Fund"
    },
    {
      "rules":"Add Proof","id":"add_Proof"
    },
    {
      "rules":"Validate Proof","id":"validate_Proof"
    },
    {
      "rules":"Close Activity","id":"activity_Closed"
    },
    {
      "rules":"CRM Notification","id":"crm_Notification"
    }
    ]
    this.dataSource = new MatTableDataSource(this.dataOfRules);

  //   this.form = this._formBuilder.group({
  //     finalRepOly: ['']
  //  });

    this.form = this._formBuilder.group({
     add_Project: [''],
     add_Beneficiaries:[''],
     update_Beneficiaries:[''],
    view_Project: [''],
   edit_Project: [''],
   add_Milestone: [''],
   view_Milestone: [''],
   edit_Milestone: [''],
    add_Activity: [''],
   view_Activity: [''],
    edit_Activity: [''],
   send_For_Approval: [''],
   approve_Reject: [''],
  approve_Project: [''],
  edit_ProjectDoc: [''],
  edit_Project_PastEvents: [''],
  edit_Project_Supporters: [''],
  publish_Project: [''],
  donate_Project: [''],
  allocate_Fund: [''],
  view_Expense: [''],
  add_Expense: [''],
  update_Expense: [''],
  request_Fund: [''],
  release_Fund: [''],
  add_Proof: [''],
  validate_Proof:[''],
  activity_Closed:[''],
  crm_Notification:['']
  });

  // this.displayedColumns = ['username','createdBy','role','status', 'icons'];
  this.getUserDetails()
  }

  clickedCheckBtn(event){
    if(event.checked){
      this.form.controls['add_Project'].setValue(true);
      this.form.controls['add_Beneficiaries'].setValue(true);
      this.form.controls['update_Beneficiaries'].setValue(true);
      this.form.controls['view_Project'].setValue(true);
      this.form.controls['edit_Project'].setValue(true);
      this.form.controls['add_Milestone'].setValue(true);
      this.form.controls['view_Milestone'].setValue(true);
      this.form.controls['edit_Milestone'].setValue(true);
      this.form.controls['add_Activity'].setValue(true);
      this.form.controls['view_Activity'].setValue(true);
      this.form.controls['edit_Activity'].setValue(true);
      this.form.controls['send_For_Approval'].setValue(true);
      this.form.controls['approve_Reject'].setValue(true);
      this.form.controls['approve_Project'].setValue(true);
      this.form.controls['edit_ProjectDoc'].setValue(true);
      this.form.controls['edit_Project_PastEvents'].setValue(true);
      this.form.controls['edit_Project_Supporters'].setValue(true);
      this.form.controls['publish_Project'].setValue(true);
      this.form.controls['donate_Project'].setValue(true);
      this.form.controls['view_Expense'].setValue(true);
      this.form.controls['add_Expense'].setValue(true);
      this.form.controls['update_Expense'].setValue(true);
      this.form.controls['request_Fund'].setValue(true);
      this.form.controls['release_Fund'].setValue(true);
      this.form.controls['add_Proof'].setValue(true);
      this.form.controls['validate_Proof'].setValue(true);
      this.form.controls['activity_Closed'].setValue(true);
      this.form.controls['crm_Notification'].setValue(true);
      this.form.controls['allocate_Fund'].setValue(true); 
    } else {
      this.getUserDetails()
    }
  }
  
  changedSelect(value){
  // matSelectCheck
  this.checkValue=true;
  if(value == 'true'){
    this.form.controls['add_Project'].setValue(true);
    this.form.controls['add_Beneficiaries'].setValue(true);
    this.form.controls['update_Beneficiaries'].setValue(true);
    this.form.controls['view_Project'].setValue(true);
    this.form.controls['edit_Project'].setValue(true);
    this.form.controls['add_Milestone'].setValue(true);
    this.form.controls['view_Milestone'].setValue(true);
    this.form.controls['edit_Milestone'].setValue(true);
    this.form.controls['add_Activity'].setValue(true);
    this.form.controls['view_Activity'].setValue(true);
    this.form.controls['edit_Activity'].setValue(true);
    this.form.controls['send_For_Approval'].setValue(true);
    this.form.controls['approve_Reject'].setValue(true);
    this.form.controls['approve_Project'].setValue(true);
    this.form.controls['edit_ProjectDoc'].setValue(true);
    this.form.controls['edit_Project_PastEvents'].setValue(true);
    this.form.controls['edit_Project_Supporters'].setValue(true);
    this.form.controls['publish_Project'].setValue(true);
    this.form.controls['donate_Project'].setValue(true);
    this.form.controls['view_Expense'].setValue(true);
    this.form.controls['add_Expense'].setValue(true);
    this.form.controls['update_Expense'].setValue(true);
    this.form.controls['request_Fund'].setValue(true);
    this.form.controls['release_Fund'].setValue(true);
    this.form.controls['add_Proof'].setValue(true);
    this.form.controls['validate_Proof'].setValue(true);
    this.form.controls['activity_Closed'].setValue(true);
    this.form.controls['crm_Notification'].setValue(true);
    this.form.controls['allocate_Fund'].setValue(true); 
  } else {
    this.form.controls['add_Project'].setValue(false);
    this.form.controls['add_Beneficiaries'].setValue(false);
    this.form.controls['update_Beneficiaries'].setValue(false);
    this.form.controls['view_Project'].setValue(false);
    this.form.controls['edit_Project'].setValue(false);
    this.form.controls['add_Milestone'].setValue(false);
    this.form.controls['view_Milestone'].setValue(false);
    this.form.controls['edit_Milestone'].setValue(false);
    this.form.controls['add_Activity'].setValue(false);
    this.form.controls['view_Activity'].setValue(false);
    this.form.controls['edit_Activity'].setValue(false);
    this.form.controls['send_For_Approval'].setValue(false);
    this.form.controls['approve_Reject'].setValue(false);
    this.form.controls['approve_Project'].setValue(false);
    this.form.controls['edit_ProjectDoc'].setValue(false);
    this.form.controls['edit_Project_PastEvents'].setValue(false);
    this.form.controls['edit_Project_Supporters'].setValue(false);
    this.form.controls['publish_Project'].setValue(false);
    this.form.controls['donate_Project'].setValue(false);
    this.form.controls['view_Expense'].setValue(false);
    this.form.controls['add_Expense'].setValue(false);
    this.form.controls['update_Expense'].setValue(false);
    this.form.controls['request_Fund'].setValue(false);
    this.form.controls['release_Fund'].setValue(false);
    this.form.controls['add_Proof'].setValue(false);
    this.form.controls['validate_Proof'].setValue(false);
    this.form.controls['activity_Closed'].setValue(false);
    this.form.controls['crm_Notification'].setValue(false);
    this.form.controls['allocate_Fund'].setValue(false); 
  }
  }

  getUserDetails(){
    var body = {
      "username": sessionStorage.getItem("rulesSetToUser"),
      "sessionCheck": false
  }
  this.http.post(this.urlPort + "/api/users/getUserDetails", body,{ withCredentials: true})
      .map(
          (response) => response.json()
      )
      .catch((err) => {
          this.loading1 = false;
          var error = err["_body"]
            if (error == "session expired") {
                this.sessionSnackBar(err["_body"]);
                this.router.navigate(['/pages/auth/login-2']);
            } else {
          var snackBar = this._translateService.instant("Failed to get user");
          this.openSnackBar(snackBar)
            }
          return Observable.throw(err)
      })
      .subscribe((res: Response) => {
        this.rulesOComGor = res["Rules"]
          for(var i=0;i<res["Rules"].length;i++){
            if(this.orgName == res["Rules"][i].orgName){
              this.indexOfOrg = i;
              this.rulesDefined = true;
              this.form.controls['add_Project'].setValue(res["Rules"][i].add_Project);
              this.form.controls['add_Beneficiaries'].setValue(res["Rules"][i].add_Beneficiaries);
              this.form.controls['update_Beneficiaries'].setValue(res["Rules"][i].update_Beneficiaries);
              this.form.controls['view_Project'].setValue(res["Rules"][i].view_Project);
              this.form.controls['edit_Project'].setValue(res["Rules"][i].edit_Project);
              this.form.controls['add_Milestone'].setValue(res["Rules"][i].add_Milestone);
              this.form.controls['view_Milestone'].setValue(res["Rules"][i].view_Milestone);
              this.form.controls['edit_Milestone'].setValue(res["Rules"][i].edit_Milestone);
              this.form.controls['add_Activity'].setValue(res["Rules"][i].add_Activity);
              this.form.controls['view_Activity'].setValue(res["Rules"][i].view_Activity);
              this.form.controls['edit_Activity'].setValue(res["Rules"][i].edit_Activity);
              this.form.controls['send_For_Approval'].setValue(res["Rules"][i].send_For_Approval);
              this.form.controls['approve_Reject'].setValue(res["Rules"][i].approve_Reject);
              this.form.controls['approve_Project'].setValue(res["Rules"][i].approve_Project);
              this.form.controls['edit_ProjectDoc'].setValue(res["Rules"][i].edit_ProjectDoc);
              this.form.controls['edit_Project_PastEvents'].setValue(res["Rules"][i].edit_Project_PastEvents);
              this.form.controls['edit_Project_Supporters'].setValue(res["Rules"][i].edit_Project_Supporters);
              this.form.controls['publish_Project'].setValue(res["Rules"][i].publish_Project);
              this.form.controls['donate_Project'].setValue(res["Rules"][i].donate_Project);
              this.form.controls['view_Expense'].setValue(res["Rules"][i].view_Expense);
              this.form.controls['add_Expense'].setValue(res["Rules"][i].add_Expense);
              this.form.controls['update_Expense'].setValue(res["Rules"][i].update_Expense);
              this.form.controls['request_Fund'].setValue(res["Rules"][i].request_Fund);
              this.form.controls['release_Fund'].setValue(res["Rules"][i].release_Fund);
              this.form.controls['add_Proof'].setValue(res["Rules"][i].add_Proof);
              this.form.controls['validate_Proof'].setValue(res["Rules"][i].validate_Proof);
              this.form.controls['activity_Closed'].setValue(res["Rules"][i].activity_Closed);
              this.form.controls['crm_Notification'].setValue(res["Rules"][i].crm_Notification);
              this.form.controls['allocate_Fund'].setValue(res["Rules"][i].allocate_Fund);     
            }
          }
      })
  }

  Submit(formData){
    var user;
    if(this.rulesDefined == false){
      var arr = this.rulesOComGor;
      formData.orgName = this.orgName
      formData.domain = sessionStorage.getItem("domainName")
    arr.push(formData)
    user = sessionStorage.getItem("rulesSetToUser")
    this.httpCLient.post(this.urlPort + "/api/users/updateUserRules/"+user,arr, { withCredentials: true})
  .map(
      (response) => response
  )
  .catch((err) => {
      var error = err["_body"]
      if (error == "session expired") {
        this.sessionSnackBar(err["_body"]);
        this.router.navigate(['/pages/auth/login-2']);
      }
      return Observable.throw(err)
  })
  .subscribe((res: Response) => {
      this.router.navigate(['/user/user/myUsers']);
    })
  } else {
    formData.orgName = this.orgName
    formData.domain = sessionStorage.getItem("domainName")
    this.rulesOComGor.splice(this.indexOfOrg, 1);
    this.rulesOComGor.splice(this.indexOfOrg, 0, formData);
    user = sessionStorage.getItem("rulesSetToUser")
    this.httpCLient.post(this.urlPort + "/api/users/updateUserRules/"+user,this.rulesOComGor, { withCredentials: true})
    .map(
        (response) => response
    )
    .catch((err) => {
        var error = err["_body"]
        if (error == "session expired") {
          this.sessionSnackBar(err["_body"]);
          this.router.navigate(['/user/user/login-2']);
        }
        return Observable.throw(err)
    })
    .subscribe((res: Response) => {
        this.router.navigate(['/user/user/myUsers']);
      })
  }
  }

  sessionSnackBar(data) {
    var endNow = this._translateService.instant('End now');
this._matSnackBar.open(data, endNow, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  openSnackBar(data) {
    var endNow = this._translateService.instant('End now');
    this._matSnackBar.open(data, endNow, {
        duration: 10000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
    });
}

backSpace(){
  var backSpace = this.routerData.snapshot.paramMap.get('backTo');
  this.router.navigate([backSpace])
}
}
