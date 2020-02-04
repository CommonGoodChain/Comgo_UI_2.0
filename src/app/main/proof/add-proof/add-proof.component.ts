import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { fuseAnimations } from '@fuse/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { MatSnackBar, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { environment } from '../../../../environments/environment';
import { DialogElementsExampleDialog } from '../../dialog/dialog.component';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { locale as english } from '../../../layout/i18n/en';
import { locale as spanish } from '../../../layout/i18n/tr';
import * as $ from 'jquery';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
  selector: 'app-add-proof',
  templateUrl: './add-proof.component.html',
  styleUrls: ['./add-proof.component.scss'],
  animations: fuseAnimations
})
export class AddProofComponent implements OnInit {
  pageType: string;
  productForm: FormGroup;
  purpose;
  file;
  getCountryCodes;
  public form: FormGroup;
  formErrors: any;
  projectId;
  anotherArray = [];
  codeArray = [];
  currencyArray = [];
  hash;
  documentId;
  getDocTypes;
  id;
  getCurrency;
  operationalFlag;
  responseAfterAddingMilestone;
  MilestoneNameFromLastPage;
  dataOfExpenses;
  periodFromLastPage;
  periodToFromLastPage;
  projectIdFromLastPage;
  secondaryValidation;
  budgetedAmountFromLastPage;
  milestoneIdFromLastPage;
  detailsOfActivity;
  urlPort = environment.urlPort;
  activityFundReleased;
  public loading1 = false;
  addDialogResult;
  updateDialogResult;
  expenseId;
  projectName;
  role;
  activityId;
  proofId;
  filename;
  fundRaised;
  activityName;
  username;
  getData;                //this variable is use for validator
  tableData;              //this variable is use for validator    
  foundationCompany;      //this variable is use for validator
  detailsOfValidators;   //this variable is use for validator
  cancelDialogResult;
  supEmail;  //flag for hideing email div
  supDiv;  //flag for hiding email div
  validationCheck;
  proofAmount = 0;
  userRules;
  transactions;
  donors = [];
  /**
   * Constructor
   * @param {FormBuilder} _formBuilder
   * @param {Location} _location
   * @param {MatSnackBar} _matSnackBar
   */
  constructor(
    // private _ecommerceProductService: EcommerceProductService,
    private _formBuilder: FormBuilder,
    private _fuseConfigService: FuseConfigService,
    private _location: Location,
    private _matSnackBar: MatSnackBar,
    private routerData: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    private http: Http,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private _translateService: TranslateService,
    public dialog: MatDialog

  ) {
    this._fuseTranslationLoaderService.loadTranslations(english, spanish);
    this._fuseConfigService.config = {
      layout: {
          footer: {
              hidden: true
          },
          sidepanel: {
              hidden: true
          }
      }
  };
  }

  /**
   * On init
   */
  /**
     * @author: Madhu
     * @argument:none
     * @description:to fix position
     */
  horizontalPosition: MatSnackBarHorizontalPosition = 'right'; verticalPosition: MatSnackBarVerticalPosition = 'top';
  ngOnInit() {
    if (sessionStorage.getItem('userType') == 'Private User' && sessionStorage.getItem("userRules") != '' && sessionStorage.getItem("userRules") != 'undefined' && sessionStorage.getItem("userRules") != undefined) {
      var rules = JSON.parse(sessionStorage.getItem("userRules"))
      this.userRules = rules[0]
    }
    this.supDiv = false
    this.expenseId = sessionStorage.getItem("expenseId")
    this.fundRaised = sessionStorage.getItem("fundRaisedForProjectProfile");
    this.role = sessionStorage.getItem("role");
    this.projectName = sessionStorage.getItem("projectNameForProjectProfile")
    this.projectId = sessionStorage.getItem('projectIdForProjectProfile');
    this.username = sessionStorage.getItem("username");
    this.foundationCompany = sessionStorage.getItem("foundationCompany")
    this.activityName = sessionStorage.getItem("activityName");
    this.activityFundReleased = sessionStorage.getItem("activityFundReleased")
    this.operationalFlag = this.routerData.snapshot.paramMap.get('operationalFlag');
    this.proofId = this.routerData.snapshot.paramMap.get('proofId');
    this.id = this.routerData.snapshot.paramMap.get('id');
    this.activityId = this.routerData.snapshot.paramMap.get('activityId');
    if (this.operationalFlag == 0) {
      this.form = this._formBuilder.group({
        supplierMobNo: ['', [Validators.pattern("[0-9]{8,20}")]],
        supplierName: ['', [Validators.pattern("[A-Za-z0-9 À-ÿ]{1,80}")]],
        countryCode: [''],

        proofType: ['', [Validators.required, Validators.pattern("[A-Za-z0-9 À-ÿ]{1,80}")]],
        amount: ['', [Validators.pattern("[0-9]{1,15}")]],
        currencyType: [''],
        docType: [''],
        remarks: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9 -_\.'!/,:~À-ÿ]{1,200}")]],
        smsBody: ['', [Validators.pattern("[a-zA-Z0-9 -_\.'!/,:~À-ÿ]{1,1000}")]]
      });
    } else {
      this.form = this._formBuilder.group({
        supplierMobNo: ['', [Validators.pattern("[0-9]{8,20}")]],
        supplierName: [''],
        countryCode: [''],

        proofType: ['', [Validators.pattern("[A-Za-z0-9 À-ÿ]{1,80}")]],
        amount: ['', [Validators.pattern("[0-9]{1,15}")]],
        currencyType: [''],
        docType: [''],
        remarks: ['', [Validators.pattern("[a-zA-Z0-9 -_\.'!/,:~À-ÿ]{1,200}")]],
        smsBody: ['', [Validators.pattern("[a-zA-Z0-9 -_\.'!/,:~À-ÿ]{1,1000}")]]
      });
    }
    this.httpClient.get(this.urlPort + "/api/activity/getActivityById/" + this.routerData.snapshot.paramMap.get('activityId'), { withCredentials: true })
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
      .subscribe(res => {
        var result = res;
        this.activityName = result["activityName"];
        this.secondaryValidation = result["secondaryValidation"];
        this.validationCheck = result["validationCheck"];
      })

    /**
       * @author:sagar
       * @description:to get activity info by id
       */

    this.httpClient.get(this.urlPort + "/api/currency/all", { withCredentials: true })
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
        this.getCurrency = res;
        this.currencyArray = this.getCurrency;
      })

    this.httpClient.get(this.urlPort + "/api/proofs/getDocTypeForAddProof", { withCredentials: true })
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
        this.getDocTypes = res;
      })

    /**
  * @author: Kuldeep
  * @argument:none
  * @description:Get Country Codes
  */
    var countryCodesBody = {
      sessionCheck: true
    }
    this.httpClient.post(this.urlPort + "/api/country/countryCodes", countryCodesBody, { withCredentials: true })
      .map(
        (response) => response
      )
      .catch((err) => {
        this.loading1 = false;
        // var error = err["_body"]
        // if (error == "session expired") {
        //   this.sessionSnackBar(err["_body"]);
        //   this.router.navigate(['/pages/auth/login-2']);
        // } else {
        var snackBar = this._translateService.instant("Failed to get country codes");
        this.openSnackBar(snackBar);
        // }
        return Observable.throw(err)
      })
      .subscribe(res => {
        this.getCountryCodes = res;
        this.codeArray = this.getCountryCodes
      })

    this.httpClient.get(this.urlPort + "/api/proofs/all/" + sessionStorage.getItem('activityIdForProfile') + '/' + this.projectId, { withCredentials: true })
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
        if (res["length"] > 0) {
          for (var i = 0; i < res["length"]; i++) {
            this.proofAmount = this.proofAmount + res[i].amount;
          }
        }
      })

    var organizations = JSON.parse(sessionStorage.getItem("organization"))
    var arr = []
    for (var i = 0; i < organizations.length; i++) {
      arr.push(organizations[i].OrgName)
    }
    /**
     * @author : Kuldeep.N
     * @description Get all validators list
     */
    this.httpClient.get(this.urlPort + "/api/users/getAllValidator/" + sessionStorage.getItem("username") + "/" + JSON.stringify(arr), { withCredentials: true })
      .map(
        (response) => response
      )
      .catch((err) => {
        this.loading1 = false;
        var error = err["_body"]
        if (error == "session expired") {
          this.sessionSnackBar(err["_body"]);
          this.router.navigate(['/pages/auth/login-2']);
        } else {
          var snackBar = this._translateService.instant(this.userRules.orgName + " organization has no validators");
          this.openSnackBar(snackBar)
        }
        return Observable.throw(err)
      })
      .subscribe((res: Response) => {
        this.getData = res;
        var set = []
        // for (var i = 0; i < this.getData.length; i++) {
        //   if (this.getData[i].foundationCompany == this.foundationCompany) {
        //     this.tableData = {
        //       "firstName": this.getData[i].firstName,
        //       "username": this.getData[i].username
        //     }
        //     set.push(this.tableData)

        //   }
        // }
        this.detailsOfValidators = this.getData;
        this.anotherArray = this.detailsOfValidators
      })

    this.httpClient.get(this.urlPort + "/api/milestone/BKCGetAll/" + this.projectId, { withCredentials: true })
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
      .subscribe((res: any[]) => {
        this.transactions = res.reverse();
        var length = this.transactions.length
        var donationsLength = this.transactions[0].Value.donations.length
        var donations = this.transactions[0].Value.donations;
        for (var i = 0; i < donationsLength; i++) {
          if (donations) {
            var donationsString = donations[i].split("-", 5);
            if (donationsString[2] == sessionStorage.getItem('activityIdForProfile') && donationsString[4] > 0) {
              this.donors.push(donationsString[3])
            }
          }
        }
      })

      if(this.proofId != undefined && this.proofId != '' && this.proofId != null){
        this.httpClient.get(this.urlPort + "/api/proofs/getProof/" + this.proofId, { withCredentials: true })
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
          $(document).ready(function () {
            $("#otherValidator").attr("disabled", true)
            $("#proofCountryCode").attr("disabled",true)
            $("#otherValidatorMobNo").attr("disabled",true)
            $("#otherValidatorProofType").attr("disabled",true)
            $("#proofCurrency").attr("disabled",true)
            $("#proofDocType").attr("disabled",true)
            $("#proofRemarks").attr("disabled",true)
            $("#proofSMSBody").attr("disabled",true)
            })
          this.form.controls['supplierName'].setValue(res[0].supplierName);
          this.form.controls['countryCode'].setValue(res[0].countryCode);
          this.form.controls['supplierMobNo'].setValue(res[0].supplierMobNo);
          this.form.controls['proofType'].setValue(res[0].proofType);
          this.form.controls['amount'].setValue(res[0].amount);
          this.form.controls['currencyType'].setValue(res[0].currencyType);
          this.form.controls['docType'].setValue(res[0].docType);
          this.form.controls['remarks'].setValue(res[0].remarks);
          this.form.controls['smsBody'].setValue(res[0].smsBody);
          // this.form.controls['activityName'].setValue(res[0].activityName);
          // res[0]
        })
      }
  }

  backTo(){
    if(this.operationalFlag == 1){
      this.router.navigate(["/proof/proof/viewProof", { id: this.id, activityId: sessionStorage.getItem("activityIdForProfile") }]);
    } else {
      this.router.navigate(['/expenses/expenses/viewexpenses'])
    }
  }

/** * @author:Akshay * @description: Open success snak bar */ openSnackBar(data) {
    var endNow = this._translateService.instant('End now');
    this._matSnackBar.open(data, endNow,
      {
        duration: 10000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
  }
  /**
   * @author:Akshay
   * @description:just stored the file data (temp)
   */
  uploadFile(event) {
    this.file = event.target.files[0];
    var filename = event.target.files[0].name
    this.filename = event.target.files[0].name
    var fileAdd = this._translateService.instant('File has been added');
    this.openSnackBar(filename + " " + fileAdd);
  }

  /** 
   * @author:Kuldeep
   * @argument:activityId,milestoneId,projectId and fd
   * @description:it is method to add Proof
  */
  addProofData(proof) {
    proof.foundationCompany = sessionStorage.getItem("projectFoundationOrg");
    var totalAmount = this.proofAmount + proof.amount;
    var requireProofAmount = this.activityFundReleased - this.proofAmount;
    if (this.activityFundReleased >= totalAmount) {
      if (this.file) {
        proof.expenseId = this.expenseId
        proof.milestoneId = sessionStorage.getItem("milestoneIdTillActivity");
        proof.projectId = sessionStorage.getItem("projectIdForProjectProfile");
        proof.activityId = sessionStorage.getItem('activityIdForProfile');
        let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
          width: '500px',
          height: '200px',
          data: { operation: 'addProof', smsBody: proof.smsBody }
        });
        dialogRef.afterClosed().subscribe(result => {

          this.addDialogResult = result;
          if (this.addDialogResult == 'yes') {
            this.loading1 = true;
            var fd = new FormData();
            fd.append('file', this.file);
            proof.documentName = this.file.name;
            var purpose = "uploadProof"
            var path = './uploads/' + proof.projectId + '/' + proof.milestoneId + '/'
            this.http.post(this.urlPort + "/api/filesUpload/saveFile" + "?path=" + path + "&projectId=" + proof.projectId + "&milestoneId=" + proof.milestoneId + "&purpose=" + purpose, fd, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
              .map(
                (response) => response.json()
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
                var result = res;
                this.hash = result["hash"];
                var activityName = this.activityName.substring(0, 25);
                var allId = {
                  projectId: proof.projectId,
                  milestoneId: proof.milestoneId,
                  activityId: proof.activityId,
                  role: this.role,
                  projectName: this.projectName,
                  activityName: activityName
                }
                var doc = {
                  "documentPath": '/uploadDoc/' + proof.projectId + '/' + proof.milestoneId + '/',
                  "allId": allId,
                  "documentHash": this.hash,
                  "documentName": this.file.name,
                  "supplierMobNo": proof.countryCode + proof.supplierMobNo,
                  "supplierName": proof.supplierName,
                  "secondaryValidation": this.secondaryValidation,
                  "role": this.role,
                  "username": this.username,
                  "smsBody": proof.smsBody,
                  "validatorId": proof.validatorId,
                  "activityName": this.activityName,
                  "donors": this.donors,
                  "milestoneStatus": sessionStorage.getItem("milestoneStatusTillActivity"),
                  "projectStatus": sessionStorage.getItem("projectStatusForProjectProfile")
                }
                this.httpClient.post(this.urlPort + "/api/documents/create", doc, { withCredentials: true })
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
                    this.documentId = res;
                    proof.documentId = this.documentId.insertedIds[0];
                    proof.hash = this.hash;
                    this.httpClient.post(this.urlPort + "/api/proofs/create", proof, { withCredentials: true })
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
                        var status = 'Closed';
                        var milestoneId = proof.milestoneId
                        this.httpClient.get(this.urlPort + "/api/milestone/updateProofStatus/" + milestoneId + '/' + status, { withCredentials: true })
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
                            var proofSubmitted = this._translateService.instant('Proof Submitted');
                            this.loading1 = false;
                            var snackBar = this._translateService.instant(proofSubmitted);
                            this.openSnackBar(snackBar)
                            this.router.navigate(["/expenses/expenses/viewexpenses"])
                          })
                      })
                  })
              })
          } else if (this.addDialogResult == 'no') {
            this.loading1 = false;
            var snackBar = this._translateService.instant('operation cancelled!!!');
            this.openSnackBar(snackBar)
          }

        })
        // }
      } else {
        var snackBar = this._translateService.instant("File is mandatory");
        this.openSnackBar(snackBar)
      }
    } else {
      var snackBar = this._translateService.instant("Proof Amount exceeds Released Fund Amount. It must be less then equal to " + requireProofAmount);
      this.openSnackBar(snackBar)
    }
  }

  updateProofData(proof){
    let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '500px',
      height: '200px',
      data: { operation: 'update' }
    });
    dialogRef.afterClosed().subscribe(result => {
      var updateDialogResult;
      updateDialogResult = result;
      if (updateDialogResult == 'yes') {
        proof.id = this.proofId;
        this.loading1 = true;
        this.httpClient.put(this.urlPort + "/api/proofs/updateProof", proof, { withCredentials: true })
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
            var snackBar = this._translateService.instant("Proof Updated");
            this.openSnackBar(snackBar)
            this.router.navigate(["/proof/proof/viewProof", { id: this.id, activityId: sessionStorage.getItem("activityIdForProfile") }]);
          })
      } else {
        var snackBar = this._translateService.instant('operation cancelled!!!');
          this.openSnackBar(snackBar)
      }
    })
  }
  /**
   * @author:Madhu
   * @description: this is the method to cancel
   */
  cancel() {
    let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '500px',
      height: '200px',
      data: { operation: 'cancel' }
    });
    dialogRef.afterClosed().subscribe(result => {

      this.cancelDialogResult = result;
      if (this.cancelDialogResult == 'yes') {
        this.loading1 = false;
        var snackBar = this._translateService.instant('operation cancelled!!!');
        this.openSnackBar(snackBar)
        if(this.operationalFlag == 1){
          this.router.navigate(["/proof/proof/viewProof", { id: this.id, activityId: sessionStorage.getItem("activityIdForProfile") }]);
        } else {
          this.router.navigate(['/expenses/expenses/viewexpenses'])
        }
      }
      else if (this.cancelDialogResult == 'no') {
        this.loading1 = false;
      }
    })
  }

  /**
   * @author Akshay Misal
   * @description validator this is function  (click)="addValidator($event)"
   */
  addValidator() {
    this.supDiv = true;
  }

  /**
   * @author Akshay Misal
   * @description hide supllier div (selectionChange)="addValidator($event)"
   */
  hideSup() {
    this.supDiv = false;
  }

  filterListValidator(val) {
    this.detailsOfValidators = this.anotherArray
    this.detailsOfValidators = this.anotherArray.filter(ngo => ngo.username.toLowerCase().indexOf(val) > -1);
  }

  getValidator() {
    this.detailsOfValidators = this.anotherArray
  }

  filterListCareUnit(val) {
    this.getCountryCodes = this.codeArray
    this.getCountryCodes = this.codeArray.filter(country => country.code.toLowerCase().indexOf(val) > -1);
  }

  getCountryCode() {
    this.getCountryCodes = this.codeArray
  }

  filterListCurrency(val) {
    this.getCurrency = this.currencyArray
    this.getCurrency = this.currencyArray.filter(currency => currency.currencyCode.toLowerCase().indexOf(val) > -1);
  }

  getCurrencies() {
    this.getCurrency = this.currencyArray
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
