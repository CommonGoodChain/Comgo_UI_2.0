import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ComGoConfigService } from '@ComGo/services/config.service';
import { ComGoAnimations } from '@ComGo/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { environment } from '../../../../../environments/environment';
import { Response, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatDialog, MatSnackBarVerticalPosition } from '@angular/material';
import { ComGoTranslationLoaderService } from '@ComGo/services/translation-loader.service';
import { locale as english } from '../../../../layout/i18n/en';
import { locale as spanish } from '../../../../layout/i18n/tr';
import { Login2Service } from './login2.service'
var introJS = require('intro.js')

@Component({
    selector: 'login-2',
    templateUrl: './login-2.component.html',
    styleUrls: ['./login-2.component.scss'],
    animations: ComGoAnimations
})
export class Login2Component implements OnInit {
    loginForm: FormGroup;
    role
    formErrors;
    foundationName;
    myip;
    urlPort = environment.urlPort;
    imageUrl = environment.imageUrl;
    foundation = environment.foundation;
    languages: any;
    selectedLanguage: any;
    subRole;
    orgName;
    username;
    projectId;
    userDeatils;
    donorList = undefined;
    fundAmount;
    donatedAmount: number = 0;
  foundationAmount: number = 0;
    dataOfProjectByProjectId = [];
    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    lang;
    data = "Educational";
    language;
    public loading1 = false;

    constructor(
        private login2Service: Login2Service,
        private _ComGoConfigService: ComGoConfigService,
        private _formBuilder: FormBuilder,
        private routerData: ActivatedRoute,
        private dialogRef: MatDialog,
        private httpClient: HttpClient,
        private router: Router,
        private _translateService: TranslateService,
        private http: Http,
        private _matSnackBar: MatSnackBar,
        private _ComGoTranslationLoaderService: ComGoTranslationLoaderService
    ) {
        // Configure the layout
        this._ComGoConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
        // Reactive form errors
        this.formErrors = {
            username: {},
            password: {},
        };
        this.languages = [
            {
                id: 'en',
                title: 'English',
                flag: 'us'
            },
            {
                id: 'tr',
                title: 'Spanish',
                flag: 'es'
            }
        ];

        this._ComGoTranslationLoaderService.loadTranslations(english, spanish);
    }

    ngOnInit(): void {
        this.routerData.queryParams.subscribe(params => {
            this.projectId = params['projectId'];
            console.log("projectId: ",this.projectId)
            var BKCAllByParamsData = {
                "projId": this.projectId
              }

              /**
              * @author Kuldeep
              * @param: data- JSON  consist of projectId
              * @description This function will return Project Details
              */
             this.login2Service.getProjectDetails(BKCAllByParamsData)
             .catch((err) => {
                            this.openSnackBar("Failed to get Project Details");
                            this.loading1 = false;
                            return Observable.throw(err)
                        })
                        .then(res => {
                  this.dataOfProjectByProjectId.push(JSON.parse(res["_body"]));
                  console.log("this.dataOfProjectByProjectId: ",this.dataOfProjectByProjectId[0])
                  this.loading1 = false;
        })
        })
        this.language = this._translateService.currentLang;
        this.lang = sessionStorage.getItem("lang");
        this.loginForm = this._formBuilder.group({
            username: [''],
            password: ['']
        });
        this.dialogRef.closeAll();
        if (this.lang) {
            this._translateService.currentLang = this.lang;
        }
        this.selectedLanguage = _.find(this.languages, { 'id': this._translateService.currentLang });
    }

    /**
        * @author:Akshay
        * @description: Open success snak bar
    */
    openSnackBar(data) {
        var endNow = this._translateService.instant('End now');
        this._matSnackBar.open(data, endNow, {
            duration: 10000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }

    /**
     * Set the language
     * @param lang
     */
    setLanguage(lang): void {
        sessionStorage.removeItem("lang");
        this.selectedLanguage = lang;
        this._translateService.use(lang.id);
        sessionStorage.setItem("lang", lang.id);
        window.location.reload();
    }

    startTour() {
        var intro: any = introJS.introJs();
        intro.setOptions({
            steps: [
                {
                    element: '#language',
                    intro: 'Users can change language by clicking this.',
                    position: 'right'
                },
                {
                    element: '#registerUser',
                    intro: 'User can create an Account by clicking on this icon.',
                    position: 'right'
                },
                {
                    element: '#loginButton',
                    intro: 'User can log into Comgo by clicking here.',
                    position: 'left'
                },
                {
                    element: '#forgotPassword',
                    intro: 'If users forgots their password they can reset it by clicking here.',
                    position: 'right'
                }
            ],
            showBullets: true,
            showButtons: true,
            exitOnOverlayClick: false,
            keyboardNavigation: true,
        });
        intro.start();
    }

    login(data) {
        sessionStorage.clear();
        this.loading1 = true;
        var body = {
            "username": data.username,
            "sessionCheck": true
        }

        /**
        * @author Kuldeep
        * @param: body- JSON  consist of username
        * @description This function will return User Details
        */
       this.login2Service.getUserDetails(body)
       .catch((err) => {
                this.loading1 = false;
                var snackBar = this._translateService.instant("Username or Password is Incorrect");
                this.openSnackBar(snackBar)
                return Observable.throw(err)
            })
            .then((res: Response) => {
                // var userCheck = res['createFlag'];
                // this.regUser = res['regUser'];
                sessionStorage.setItem("foundationName", res['foundationName'])
                this.foundationName = res['foundationName'];
                this.role = res['role'];

                // if (userCheck == 0) {
                //     this.loading1 = false;
                //     sessionStorage.setItem("username", data.username)
                //     this.router.navigate(['/pages/auth/reset-password-2'])
                // }
                // if (this.regUser == 0) {
                //     this.loading1 = false
                //     this.openSnackBar("Your Account has been Deactivated");
                // }

                /**
                * @author Kuldeep
                * @description This function will return Current Location of the system.
                */
                this.login2Service.getCurrentLocation()
                .then(
                        (res: Response) => {
                                this.myip = res.json().loc;
                                data.latitude = parseFloat(this.myip.split(",")[0]);
                                data.longitude = parseFloat(this.myip.split(",")[1]);
                                data.ip = window.location.origin
                                if(this.projectId != undefined && this.projectId != null && this.projectId != ''){

                                /**
                                * @author Kuldeep
                                * @param: data- JSON  consist of username and password
                                * @description This function is used to authenticate user
                                */
                               this.login2Service.authenticate(data)
                                    .catch((err) => {
                                        this.loading1 = false;
                                        this.openSnackBar('Username or Password is incorrect.');
                                        return Observable.throw(err)
                                    })
                                    .then((res: Response) => {
                                        var userRules: any
                                        var rules: any
                                        console.log("res: ",res)
                                        sessionStorage.setItem("role", "xyz")
                                        sessionStorage.setItem("username", res["username"])
                                        sessionStorage.setItem("token", res["userToken"])
                                        sessionStorage.setItem("userType", res["userType"])
                                        sessionStorage.setItem("idNumber", res["idNumber"])
                                        this.loading1 = false
                                        if (res["userType"] == 'Organization') {
                                            sessionStorage.setItem("domainName", res["domainName"])
                                            sessionStorage.setItem("orgName", res["orgName"])
                                            sessionStorage.setItem("profile", res["profile"])
                                            sessionStorage.setItem("regUser", res["regUser"])
                                            if (res["profile"] == "false" || res["regUser"] == 0) {
                                                this.router.navigate(["/user/user/userProfile"]);
                                            } else {
                                                this.router.navigate(["/user/user/searchUsers"]);
                                            }
                                        } else if (res["userType"] == 'Private User') {
                                            rules = JSON.stringify(res["Rules"]);
                                            sessionStorage.setItem("rules", rules)
                                            // userRules = JSON.stringify(res["userRules"]);
                                            // sessionStorage.setItem("userRules", undefined)
                                            // if(userRules != undefined){
                                            // sessionStorage.setItem("orgName", res["userRules"][0].orgName)
                                            // } else {
                                            //     sessionStorage.setItem("orgName", '') 
                                            // }
                                            // this.router.navigate(["/projects/project/addproject", { operationalFlag: 0, ProjectName: "comgo", addProjByNgo: "true" }]);    
                                            if (res["regUser"] == 0) {
                                                this.openSnackBar('User Deactivated');
                                            } else {
                                                var data = {
                                                    projectId: this.projectId
                                                  }
                                                  this.loading1 = true;

                                                  /**
                                                  * @author Kuldeep
                                                  * @param: data- JSON  consist of projectId
                                                  * @description This function will return Donations of a project
                                                  */

                                                this.login2Service.getAllDonorListDB(data)
                                                 .catch((err) => {
                                                        console.log("getAllDonorListDB error")
                                                      var error = err["_body"]
                                                      if (error == "session expired") {
                                                        this.sessionSnackBar(err["_body"]);
                                                        this.router.navigate(['/pages/auth/login-2']);
                                                      } else {
                                                        var snackBar = this._translateService.instant("Failed to get list of donor");
                                                        this.openSnackBar(snackBar);
                                                      }
                                                      this.loading1 = false;
                                                      return Observable.throw(err)
                                                    })
                                                    .then(res => {
                                                      this.donorList = res;
                                                      console.log("getAllDonorListDB: ",this.donorList)
                                                      for (var i = 0; i < this.donorList.length; i++) {
                                                        if (this.donorList[i].donationType == "Donation") {
                                              
                                                          this.donatedAmount = this.donorList[i].amount + this.donatedAmount;
                                                        } else {
                                              
                                                          this.foundationAmount = this.donorList[i].amount + this.foundationAmount;
                                                        }
                                                      }
                                                      sessionStorage.setItem("projectNameForProjectProfile", this.dataOfProjectByProjectId[0].projectName);
                                                      sessionStorage.setItem("currency", this.dataOfProjectByProjectId[0].currency);
                                                      sessionStorage.setItem("owner", this.dataOfProjectByProjectId[0].projectOwner);
                                                      sessionStorage.setItem("projectOwnerForProjectProfile", this.dataOfProjectByProjectId[0].projectOwner);
                                                      sessionStorage.setItem("projectIdForLogin",this.projectId)
                                                      var projectId = this.projectId;
                                                      var projectName = this.dataOfProjectByProjectId[0].projectName;
                                                      if (this.foundationAmount > this.dataOfProjectByProjectId[0].projectBudget - this.dataOfProjectByProjectId[0].fundGoal) {
                                                        this.fundAmount = this.dataOfProjectByProjectId[0].projectBudget - this.dataOfProjectByProjectId[0].fundRaised;
                                                      } else {
                                                        this.fundAmount = this.dataOfProjectByProjectId[0].fundGoal - this.donatedAmount;
                                                      }
                                                      this.loading1 = false;
                                                      this.router.navigate(["/donor/donor/donorForm", { projectId: projectId, projectName: projectName, fundAmount: this.fundAmount, donationType: 'Donation' }])
                                                    })
                                                // this.router.navigate(["/user/user/myOrganization"]);
                                            }

                                            
                                        } else {
                                            this.router.navigate(["/user/user/pendingUsers"]);
                                        }
                                    })
                                } else {

                                    /**
                                    * @author Kuldeep
                                    * @param: data- JSON  consist of username and password
                                    * @description This function is used to authenticate user
                                    */
                                   this.login2Service.authenticate(data)
                                    .catch((err) => {
                                        this.loading1 = false;
                                        this.openSnackBar('Username or Password is incorrect.');
                                        return Observable.throw(err)
                                    })
                                    .then((res: Response) => {
                                        var userRules: any
                                        var rules: any
                                        console.log("res: ",res)
                                        sessionStorage.setItem("role", "xyz")
                                        sessionStorage.setItem("username", res["username"])
                                        sessionStorage.setItem("token", res["userToken"])
                                        sessionStorage.setItem("userType", res["userType"])
                                        sessionStorage.setItem("idNumber", res["idNumber"])
                                        this.loading1 = false
                                        if (res["userType"] == 'Organization') {
                                            sessionStorage.setItem("domainName", res["domainName"])
                                            sessionStorage.setItem("orgName", res["orgName"])
                                            sessionStorage.setItem("profile", res["profile"])
                                            sessionStorage.setItem("regUser", res["regUser"])
                                            if (res["profile"] == "false" || res["regUser"] == 0) {
                                                this.router.navigate(["/user/user/userProfile"]);
                                            } else {
                                                this.router.navigate(["/user/user/searchUsers"]);
                                            }
                                        } else if (res["userType"] == 'Private User') {
                                            rules = JSON.stringify(res["Rules"]);
                                            sessionStorage.setItem("rules", rules)
                                            // userRules = JSON.stringify(res["userRules"]);
                                            // sessionStorage.setItem("userRules", undefined)
                                            // if(userRules != undefined){
                                            // sessionStorage.setItem("orgName", res["userRules"][0].orgName)
                                            // } else {
                                            //     sessionStorage.setItem("orgName", '') 
                                            // }
                                            // this.router.navigate(["/projects/project/addproject", { operationalFlag: 0, ProjectName: "comgo", addProjByNgo: "true" }]);    
                                            if (res["regUser"] == 0) {
                                                this.openSnackBar('User Deactivated');
                                            } else {
                                                this.router.navigate(["/user/user/myOrganization"]);
                                            }

                                            
                                        } else {
                                            this.router.navigate(["/user/user/pendingUsers"]);
                                        }
                                    }) 
                                }
                            })
            })
    }

    goToRegister(){
        console.log("this.router.url: ",this.router.url)
        if(this.projectId != undefined && this.projectId != null && this.projectId != ''){
        sessionStorage.setItem("projectIdForLogin",this.projectId)
        } else {
          sessionStorage.setItem("projectIdForLogin",'')
        }
        this.router.navigate(['/pages/auth/register-2'])
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
