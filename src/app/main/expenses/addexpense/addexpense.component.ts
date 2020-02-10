import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { comgoAnimations } from '@comgo/animations';
import { comgoTranslationLoaderService } from '@comgo/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { locale as english } from '../../../layout/i18n/en';
import { locale as spanish } from '../../../layout/i18n/tr';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { MatSnackBar, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { environment } from '../../../../environments/environment';
import { DialogElementsExampleDialog } from '../../dialog/dialog.component';
import { comgoConfigService } from '@comgo/services/config.service';

@Component({
  selector: 'app-addexpense',
  templateUrl: './addexpense.component.html',
  styleUrls: ['./addexpense.component.scss'],
  animations: comgoAnimations
})
export class AddexpenseComponent implements OnInit {
  purpose;
  form: FormGroup;
  activityId;
  id;
  status;
  activityName;
  urlPort = environment.urlPort;
  public minDate;
  public maxDate;
  public expItem;
  public loading1 = false;
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
  //  * @param {EcommerceProductService} _ecommerceProductService
   * @param {FormBuilder} _formBuilder
   * @param {MatSnackBar} _matSnackBar
   */
  horizontalPosition: MatSnackBarHorizontalPosition = 'right'; verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private _comgoConfigService: comgoConfigService,
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private routerData: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    public dialog: MatDialog,
    private _translateService: TranslateService,
    private _comgoTranslationLoaderService: comgoTranslationLoaderService
  ) {
    this._comgoTranslationLoaderService.loadTranslations(english, spanish);
    this._unsubscribeAll = new Subject();
    this._comgoConfigService.config = {
      layout: {
          footer: {
              hidden: true
          },
          sidepanel: {
              hidden: true
          }
      }
  };

    /**
     * @author: Madhu
     * @argument:none
     * @description:Reactive form errors
     */

  }

  /** * @author:Akshay * @description: Open success snak bar */
  openSnackBar(data) {
    var endNow = this._translateService.instant('End now');
    this._matSnackBar.open(data, endNow,
      { duration: 10000, horizontalPosition: this.horizontalPosition, verticalPosition: this.verticalPosition, });
  }
  /**
   * On init
   */
  ngOnInit(): void {
    this.minDate = new Date();
    this.maxDate = new Date(sessionStorage.getItem("endDateForMilestone"));


    this.form = this._formBuilder.group({
      expenseItem: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9 -_\.'!/,:~À-ÿ]{1,80}")]],
      description: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9 -_\.'!/,:~À-ÿ]{1,2000}")]],
    });
    this.activityId = sessionStorage.getItem("activityIdForProfile");
    this.id = this.routerData.snapshot.paramMap.get('id');
    this.purpose = this.routerData.snapshot.paramMap.get('purpose');
    this.status = "fund Requested";
    this.activityName = sessionStorage.getItem("activityName");
    var id = this.id;
    if(this.purpose=='Update'){
    this.loading1 = true;
    this.httpClient.get(this.urlPort + "/api/invoices/getExpenseEdit/" + id, { withCredentials: true })
      .map(
        (response) => response
      )
      .catch((err) => {
        this.loading1 = false;
        var error = err["_body"]
        if (error == "session expired") {
          this.sessionSnackBar(err["_body"]);
          this.router.navigate(['/pages/auth/login-2']);
        }
        return Observable.throw(err)
      })
      .subscribe((res: Response) => {
        this.loading1 = false;
        var dataOfExpenses;
        dataOfExpenses = res;
        this.form.controls['expenseItem'].setValue(dataOfExpenses[0].expenseItem);
        this.form.controls['description'].setValue(dataOfExpenses[0].description);
        this.expItem = dataOfExpenses[0].expenseItem
      })
    }
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  /** 
   * @author:sagar
   * @argument:milestone form data i.e. milestone name,start and end date
   * @description:it is method to add milestone for specific project
  */
  addExpenseData(inv) {
    inv.activityId = this.activityId

    if (this.purpose == 'Insert') {
      let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
        width: '500px',
        height: '200px',
        data: { operation: 'add' }
      });
      dialogRef.afterClosed().subscribe(result => {
        var addDialogResult
        addDialogResult = result;
        if (addDialogResult == 'yes') {
          inv.status = 'Not Approved'
          this.loading1 = true;
          this.httpClient.post(this.urlPort + "/api/invoices/create", inv, { withCredentials: true })
            .map(
              (response) => response
            )
            .catch((err) => {
              this.loading1 = false;
              var error = err["_body"]
              if (error == "session expired") {
                this.sessionSnackBar(err["_body"]);
                this.router.navigate(['/pages/auth/login-2']);
              }
              this.openSnackBar("Some errors occurs while inserting expense");
              return Observable.throw(err)
            })
            .subscribe((res: Response) => {
              this.loading1 = false;
              var snackBar = this._translateService.instant('Expense inserted successfully!!!');
              this.openSnackBar(snackBar)
              sessionStorage.setItem("backFromMilestone", "true")
              this.router.navigate(['/expenses/expenses/viewexpenses'])
            })
        } else {
          this.loading1 = false;
          var snackBar = this._translateService.instant('operation cancelled!!!');
          this.openSnackBar(snackBar)
        }
      })
    } else {

      let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
        width: '500px',
        height: '200px',
        data: { operation: 'update' }
      });
      dialogRef.afterClosed().subscribe(result => {
        var updateDialogResult;
        updateDialogResult = result;
        if (updateDialogResult == 'yes') {
          inv._id = this.id
          inv.status = 'Expense Updated'
          this.loading1 = true;
          this.httpClient.put(this.urlPort + "/api/invoices/", inv, { withCredentials: true })
            .map(
              (response) => response
            )
            .catch((err) => {
              this.loading1 = false;
              var error = err["_body"]
              if (error == "session expired") {
                this.sessionSnackBar(err["_body"]);
                this.router.navigate(['/pages/auth/login-2']);
              }
              return Observable.throw(err)
            })
            .subscribe((res: Response) => {
              this.loading1 = false;
              var snackBar = this._translateService.instant("Expense Updated");
              this.openSnackBar(snackBar)
              this.router.navigate(["/expenses/expenses/viewexpenses"])

            })
        } else {
          this.loading1 = false;
          var snackBar = this._translateService.instant('operation cancelled!!!');
          this.openSnackBar(snackBar)
        }
      })
    }
  }
  cancel() {
    let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '500px',
      height: '200px',
      data: { operation: 'cancel' }
    });
    dialogRef.afterClosed().subscribe(result => {
      var cancelDialogResult;
      cancelDialogResult = result;
      if (cancelDialogResult == 'yes') {
        this.loading1 = false;
        var snackBar = this._translateService.instant('operation cancelled!!!');
        this.openSnackBar(snackBar)
        this.router.navigate(["/expenses/expenses/viewexpenses"])
      } else {
        this.loading1 = false;
      }
    })
  }

  sessionSnackBar(data) {
    var endNow = this._translateService.instant('End now');
    this._matSnackBar.open(data, endNow, {
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
