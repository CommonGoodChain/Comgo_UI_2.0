import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ComGoAnimations } from '@ComGo/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { MatSnackBar, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { environment } from '../../../../environments/environment';
import { DialogElementsExampleDialog } from '../../dialog/dialog.component';
import { ComGoTranslationLoaderService } from '@ComGo/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { locale as english } from '../../../layout/i18n/en';
import { locale as spanish } from '../../../layout/i18n/tr';
import * as $ from 'jquery';
import { ComGoConfigService } from '@ComGo/services/config.service';
import { AddProofService } from './add-proof.service'

@Component({
  selector: 'app-add-proof',
  templateUrl: './add-proof.component.html',
  styleUrls: ['./add-proof.component.scss'],
  animations: ComGoAnimations
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
    private addProofService: AddProofService,
    private _formBuilder: FormBuilder,
    private _ComGoConfigService: ComGoConfigService,
    private _location: Location,
    private _matSnackBar: MatSnackBar,
    private routerData: ActivatedRoute,
    private router: Router,
    private http: Http,
    private _ComGoTranslationLoaderService: ComGoTranslationLoaderService,
    private _translateService: TranslateService,
    public dialog: MatDialog

  ) {
    this._ComGoTranslationLoaderService.loadTranslations(english, spanish);
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

    /**
 * @author Kuldeep
 * @param activityId Activity Id of a Activity
 * @description This function will return activity Details
 */
    this.addProofService.getActivityData(this.routerData.snapshot.paramMap.get('activityId'))
      .catch((err) => {
        this.loading1 = false;
        var error = err["_body"]
        if (error == "session expired") {
          this.sessionSnackBar(err["_body"]);
          this.router.navigate(['/pages/auth/login-2']);
        }
        return Observable.throw(err)
      })
      .then(res => {
        var result = res;
        this.activityName = result["activityName"];
        this.secondaryValidation = result["secondaryValidation"];
        this.validationCheck = result["validationCheck"];
      })

    /**
 * @author Kuldeep
 * @description This function will return all the currencies
 */
    this.addProofService.getAllCurrencies()
      .catch((err) => {
        this.loading1 = false;
        var error = err["_body"]
        if (error == "session expired") {
          this.sessionSnackBar(err["_body"]);
          this.router.navigate(['/pages/auth/login-2']);
        }
        return Observable.throw(err)
      })
      .then(res => {
        this.getCurrency = res;
        this.currencyArray = this.getCurrency;
      })

      /**
 * @author Kuldeep
 * @description This function will return proof document types.
 */
    this.addProofService.getDocTypes()
      .catch((err) => {
        this.loading1 = false;
        var error = err["_body"]
        if (error == "session expired") {
          this.sessionSnackBar(err["_body"]);
          this.router.navigate(['/pages/auth/login-2']);
        }
        return Observable.throw(err)
      })
      .then(res => {
        this.getDocTypes = res;
      })

    var countryCodesBody = {
      sessionCheck: true
    }

     /**
    * @author Kuldeep
    * @param countryCodesBody is a json consist of sessionCheck
    * @description This function will return all the Country Codes.
    */
    this.addProofService.getCountryCodes(countryCodesBody)
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
      .then(res => {
        this.getCountryCodes = res;
        this.codeArray = this.getCountryCodes
      })

      /**
 * @author Kuldeep
 * @param projectId Project Id of a Project
 * @description This function will return all the Proofs Submitted For Activity.
 */
    this.addProofService.getProofSubmittedForActivity(this.projectId)
      .catch((err) => {
        this.loading1 = false;
        var error = err["_body"]
        if (error == "session expired") {
          this.sessionSnackBar(err["_body"]);
          this.router.navigate(['/pages/auth/login-2']);
        }
        return Observable.throw(err)
      })
      .then(res => {
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
     * @param arr Array of Organizations whose Validator have to fetch
     * @description Get all validators of organization.
     */
    this.addProofService.getAllValidators(arr)
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
      .then(res => {
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

      /**
     * @author : Kuldeep.N
     * @param projectId Project Id of a project.
     * @description Returns Transactions of a project.
     */
    this.addProofService.getProjectTransactions(this.projectId)
      .catch((err) => {
        this.loading1 = false;
        var error = err["_body"]
        if (error == "session expired") {
          this.sessionSnackBar(err["_body"]);
          this.router.navigate(['/pages/auth/login-2']);
        }
        return Observable.throw(err)
      })
      .then(res => {
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

        /**
     * @author : Kuldeep.N
     * @param proofId MongoId of Proof.
     * @description Returns Proof Details.
     */
        this.addProofService.getProofDetails(this.proofId)
        .catch((err) => {
            this.loading1 = false;
            var error = err["_body"]
            if (error == "session expired") {
                this.sessionSnackBar(err["_body"]);
                this.router.navigate(['/pages/auth/login-2']);
            }
            return Observable.throw(err)
        })
        .then(res => {
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

            /**
            * @author : Kuldeep.N
            * @param path Path where file will be stored.
            * @param projectId Project Id of a Project.
            * @param milestoneId Milestone Id of a Project
            * @param purpose Purpose of file upload.
            * @param fd File to upload.
            * @description Upload Proof File.
            */
            this.addProofService.saveFile(path, proof.projectId, proof.milestoneId, purpose, fd)
              .catch((err) => {
                this.loading1 = false;
                var error = err["_body"]
                if (error == "session expired") {
                  this.sessionSnackBar(err["_body"]);
                  this.router.navigate(['/pages/auth/login-2']);
                }
                return Observable.throw(err)
              })
              .then(res => {
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

                /**
                * @author : Kuldeep.N
                * @param doc Data of Proof Document.
                * @description Submit Proof Document Data.
                */
                this.addProofService.submitProofDocumentData(proof)
                  .catch((err) => {
                    this.loading1 = false;
                    var error = err["_body"]
                    if (error == "session expired") {
                      this.sessionSnackBar(err["_body"]);
                      this.router.navigate(['/pages/auth/login-2']);
                    }
                    return Observable.throw(err)
                  })
                  .then(res => {
                    this.documentId = res;
                    proof.documentId = this.documentId.insertedIds[0];
                    proof.hash = this.hash;

                    /**
                    * @author : Kuldeep.N
                    * @param proof Proof Data.
                    * @description Returns Proof Details.
                    */
                    this.addProofService.submitProof(proof)
                      .catch((err) => {
                        this.loading1 = false;
                        var error = err["_body"]
                        if (error == "session expired") {
                          this.sessionSnackBar(err["_body"]);
                          this.router.navigate(['/pages/auth/login-2']);
                        }
                        return Observable.throw(err)
                      })
                      .then(res => {
                        var status = 'Closed';
                        var milestoneId = proof.milestoneId

                        /**
                        * @author : Kuldeep.N
                        * @param milestoneId milestoneId.
                        * @param status Status Value.
                        * @description Changes Proof Status.
                        */
                        this.addProofService.updateProofStatus(milestoneId,status)
                          .catch((err) => {
                            this.loading1 = false;
                            var error = err["_body"]
                            if (error == "session expired") {
                              this.sessionSnackBar(err["_body"]);
                              this.router.navigate(['/pages/auth/login-2']);
                            }
                            return Observable.throw(err)
                          })
                          .then(res => {
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
        /**
        * @author : Kuldeep.N
        * @param proof Updated Proof Data.
        * @description Update Proof Details.
        */
        this.addProofService.updateProof(proof)
          .catch((err) => {
            this.loading1 = false;
            var error = err["_body"]
            if (error == "session expired") {
              this.sessionSnackBar(err["_body"]);
              this.router.navigate(['/pages/auth/login-2']);
            }
            return Observable.throw(err)
          })
          .then(res => {
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
