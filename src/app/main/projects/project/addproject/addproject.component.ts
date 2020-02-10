import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ComGoAnimations } from '@ComGo/animations';
import { Observable } from 'rxjs/Rx';
import { Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { MouseEvent } from '@agm/core';
import { MatSnackBar, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { DialogElementsExampleDialog } from '../../../dialog/dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { ComGoTranslationLoaderService } from '@ComGo/services/translation-loader.service';
import { locale as english } from '../../../../layout/i18n/en';
import { locale as spanish } from '../../../../layout/i18n/tr';
import { ComGoConfigService } from '@ComGo/services/config.service';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.scss'],
  animations: ComGoAnimations
})
export class AddprojectComponent implements OnInit {
  sdgUrl;
  imageExtenstion;
  bgImageUrl;
  default;
  projectId;
  projectSupportersFileName;
  getProjectType;
  getCountry;
  imageName;
  projectsAll;
  updateDialogResult;
  createData;
  detailsOfProject;
  addDialogResult;
  projectName;
  getCurrency;
  sdg;
  publishedStatus = false;
  SDGData;
  lang;
  ngoOrg;
  routeBack;
  operationalFlag;
  imgUrl = '';
  sdgStatus = false;
  mapStatus = false;
  urlPort = environment.urlPort;
  imageUrl = environment.imageUrl;
  lat: number = 0;
  lng: number = 0;
  zoom: number = 2;
  uploadProjectSupportersError = 0;
  uploadPastEventsError = 0;
  imgUploaded = 0;
  paramData = {};
  anotherArray = [];
  currencyArray = [];
  countryArray = [];
  organizationsArray:any;
  selectedSDGs = [];
  file = undefined;
  doc = undefined;
  pastEventFile = undefined;
  projectSupportersFile = undefined;
  docName = 'Not available';
  projectSupportersDocName = 'Not available';
  formStatus = 'Fill all mandatory fields*'
  pastEventDocName = 'Not available';
  public addProjectForm: FormGroup;
  public editProjectForm: FormGroup;
  public loading1 = false;
  organizations:any;
  beneficiariesArr = [];
  userRules;

  mapClicked($event: MouseEvent) {
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
    if (this.lat !== 0 && this.lng !== 0) {
      this.mapStatus = true
    } else {
      this.mapStatus = false
    }
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private _ComGoConfigService: ComGoConfigService,
    private _formBuilder: FormBuilder,
    private _matSnackBar: MatSnackBar,
    private router: Router,
    private routerData: ActivatedRoute,
    private httpClient: HttpClient,
    private http: Http,
    public dialog: MatDialog,
    private _translateService: TranslateService,
    private _ComGoTranslationLoaderService: ComGoTranslationLoaderService

  ) { this._ComGoTranslationLoaderService.loadTranslations(english, spanish); 
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


  ngOnInit(): void {
    this.routeBack = sessionStorage.getItem('backRoute')
    this.lang = sessionStorage.getItem("lang");
    this.operationalFlag = this.routerData.snapshot.paramMap.get('operationalFlag');
    this.paramData["projectId"] = this.routerData.snapshot.paramMap.get('projectId');
    this.projectId = this.routerData.snapshot.paramMap.get('projectId');
    this.default = '/DefaultImage/default.jpg';
    this.bgImageUrl = this.imageUrl + this.default;
    if (this.lang == 'en' || this.lang == null) {
      this.sdgUrl = "assets/SDG/";
      this.imageExtenstion = ".png";
    } else {
      this.sdgUrl = "assets/SDGSpanish/";
      this.imageExtenstion = ".jpg";
    }

    if (this.operationalFlag == 0) {
      /**
      * @author: Madhu
      * @argument:none
      * @description:Form Validation
      */
      this.addProjectForm = this._formBuilder.group({
        projectOwner: ['', Validators.required],
        fundGoal: ['', [Validators.required, Validators.pattern("[0-9]{1,15}")]],
        projectBudget: ['', [Validators.required, Validators.pattern("[0-9]{1,15}")]],
        currency: ['', Validators.required],
        startDate: ['', Validators.required],
        organizations:[''],
        endDate: ['', Validators.required],
        country: ['', Validators.required],
        projectName: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9 -_\.'!/,:~À-ÿ]{1,60}")]],
        projectType: ['', Validators.required],
        description: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9 -_\.'!/,:~À-ÿ]{1,2000}")]],
        fundAllocation: [''],
        beneficiaries: this._formBuilder.array([
          this.addBenefeciaries()
        ])
      });
    } else {
    //   if(this.beneficiariesArr.length != 0){
    //   this.editProjectForm = this._formBuilder.group({
    //     projectOwner: ['', Validators.required],
    //     fundGoal: ['', [Validators.required, Validators.pattern("[0-9]{1,15}")]],
    //     projectBudget: ['', [Validators.required, Validators.pattern("[0-9]{1,15}")]],
    //     currency: ['', Validators.required],
    //     startDate: ['', Validators.required],
    //     organizations:[''],
    //     endDate: ['', Validators.required],
    //     country: ['', Validators.required],
    //     projectName: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9 -_\.'!/,:~À-ÿ]{1,60}")]],
    //     projectType: ['', Validators.required],
    //     description: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9 -_\.'!/,:~À-ÿ]{1,2000}")]],
    //     SDG: [''],
    //     fundAllocation: [''],
    //     beneficiaries: this._formBuilder.array([])
    //   });
    // } else {
      this.editProjectForm = this._formBuilder.group({
        projectOwner: ['', Validators.required],
        fundGoal: ['', [Validators.required, Validators.pattern("[0-9]{1,15}")]],
        projectBudget: ['', [Validators.required, Validators.pattern("[0-9]{1,15}")]],
        currency: ['', Validators.required],
        startDate: ['', Validators.required],
        organizations:[''],
        endDate: ['', Validators.required],
        country: ['', Validators.required],
        projectName: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9 -_\.'!/,:~À-ÿ]{1,60}")]],
        projectType: ['', Validators.required],
        description: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9 -_\.'!/,:~À-ÿ]{1,2000}")]],
        SDG: [''],
        fundAllocation: [''],
        beneficiaries: this._formBuilder.array([])
      });
    // }
    }


    if(sessionStorage.getItem('userType') == 'Private User' && sessionStorage.getItem("userRules") != '' && sessionStorage.getItem("userRules") != 'undefined' && sessionStorage.getItem("userRules") != undefined){
      var rules = JSON.parse(sessionStorage.getItem("userRules"))
      this.userRules = rules[0]
      }
      
    /**
      * @author: Kuldeep
      * @argument:none
      * @description:Get project Image
      */
    this.httpClient.get(this.urlPort + "/api/projectImage/getImageByProjId/" + this.projectId, { withCredentials: true })
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
        var imageCollection = res;
        this.imageName = imageCollection[imageCollection["length"] - 1].imageName;
        this.bgImageUrl = this.imageUrl + '/' + this.projectId + '/' + 'img1';
      })
    // ends here

    /**
    * @author: Madhu
    * @argument:none
    * @description:Get data of Currency
    */
    this.httpClient.get(this.urlPort + "/api/currency/all", { withCredentials: true })
      .map(
        (response) => response
      )
      .catch((err) => {
        var error = err["_body"]
        if (error == "session expired") {
          this.sessionSnackBar(err["_body"]);
          this.router.navigate(['/pages/auth/login-2']);
        } else {
          var snackBar = this._translateService.instant("Failed to get Currency");
          this.openSnackBar(snackBar);
        }
        return Observable.throw(err)
      })
      .subscribe(res => {
        this.getCurrency = res;
        this.currencyArray = this.getCurrency;
      })//End

    /**
     * @author: Madhu
     * @argument:none
     * @description:Get data of Country
     */
    var countryBody = {
      sessionCheck: true
    }
    this.httpClient.post(this.urlPort + "/api/country/all", countryBody, { withCredentials: true })
      .map(
        (response) => response
      )
      .catch((err) => {
        var error = err["_body"]
        if (error == "session expired") {
          this.sessionSnackBar(err["_body"]);
          this.router.navigate(['/pages/auth/login-2']);
        } else {
          var snackBar = this._translateService.instant("Failed to get country data");
          this.openSnackBar(snackBar);
        }
        return Observable.throw(err)
      })
      .subscribe(res => {
        this.getCountry = res;
        this.countryArray = this.getCountry
      })//End

    /**
    * @author: Madhu
    * @argument:none
    * @description:Get data of project Type
    */
    this.httpClient.get(this.urlPort + "/api/projecttype/all", { withCredentials: true })
      .map(
        (response) => response
      )
      .catch((err) => {
        var error = err["_body"]
        if (error == "session expired") {
          this.sessionSnackBar(err["_body"]);
          this.router.navigate(['/pages/auth/login-2']);
        } else {
          var snackBar = this._translateService.instant("Failed to get all projectType");
          this.openSnackBar(snackBar);
        }
        return Observable.throw(err)
      })
      .subscribe((res: any[]) => {
        this.getProjectType = res;
      })
      if (this.operationalFlag == 0) {
      this.httpClient.get(this.urlPort + "/api/users/getOrganizationsForProject/"+sessionStorage.getItem("orgName"), { withCredentials: true })
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
                // this.notification.Success(res['response']);
                // this.router.navigate(['/components/collections'])
                this.organizations = res;
                this.organizationsArray = res;
            })
          }

    if (this.operationalFlag == 0) {
      this.addProjectForm.controls['projectOwner'].setValue(sessionStorage.getItem("orgName"));
      this.httpClient.get(this.urlPort + "/api/projects/getAllSDG", { withCredentials: true })
        .map(
          (response) => response
        )
        .catch((err) => {
          var error = err["_body"]
          if (error == "session expired") {
            this.sessionSnackBar(err["_body"]);
            this.router.navigate(['/pages/auth/login-2']);
          } else {
            var snackBar = this._translateService.instant("Failed to get sdg");
            this.openSnackBar(snackBar);

          }
          return Observable.throw(err)
        })
        .subscribe(res => {
          this.sdg = res;
        })
    } else {
      this.mapStatus = true;
      this.sdgStatus = true;

      this.httpClient.get(this.urlPort + "/api/projects/getByProjId/" + this.projectId, { withCredentials: true })
                .map(
                    (response) => response
                ).catch((err) => {
          this.loading1 = false;
          var error = err["_body"]
          if (error == "session expired") {
            this.sessionSnackBar(err["_body"]);
            this.router.navigate(['/pages/auth/login-2']);
          }
          return Observable.throw(err)
        })
        .subscribe(res => {
          this.projectsAll = res
          var org = this.projectsAll.organization
     this.ngoOrg = org;
          // this.ngoOrg.splice(this.ngoOrg.length -1,1);
          // this.ngoOrg = [];
     
     var arr = [];
     this.httpClient.get(this.urlPort + "/api/users/getOrganizationsForEditProject/"+this.projectsAll.projectOwner, { withCredentials: true })
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
         // this.notification.Success(res['response']);
         // this.router.navigate(['/components/collections'])
         this.organizations = res;
     })
     for (var i = 0;i < this.ngoOrg.length;i++){
       if(this.ngoOrg[i].OrgName != this.projectsAll.projectOwner){
       arr.push(this.ngoOrg[i].OrgName)
       } 
     }
     this.ngoOrg = arr
          this.loading1 = false;
          this.projectName = this.projectsAll.projectName;
          this.publishedStatus = this.projectsAll.isPublished;
          // this.editProjectForm.controls['projectOwner'].setValue(sessionStorage.getItem("orgName"));
          console.log("this.projectsAll: ",this.projectsAll)
          this.editProjectForm.controls['currency'].setValue(this.projectsAll.currency);
          this.editProjectForm.controls['projectOwner'].setValue(this.projectsAll.projectOwner);
          this.editProjectForm.controls['fundGoal'].setValue(this.projectsAll.fundGoal);
          this.editProjectForm.controls['projectName'].setValue(this.projectsAll.projectName);
          this.editProjectForm.controls['projectType'].setValue(this.projectsAll.projectType);
          this.editProjectForm.controls['startDate'].setValue(this.projectsAll.startDate);
          this.editProjectForm.controls['projectBudget'].setValue(this.projectsAll.projectBudget);
          this.editProjectForm.controls['endDate'].setValue(this.projectsAll.endDate);
          this.editProjectForm.controls['country'].setValue(this.projectsAll.country);
          this.editProjectForm.controls['description'].setValue(this.projectsAll.description);
          this.editProjectForm.controls['organizations'].setValue(arr);
          this.beneficiariesArr = this.projectsAll.Beneficiaries
          if(this.beneficiariesArr.length > 0){
            for(var k=0;k<this.beneficiariesArr.length;k++){
          (<FormArray>this.editProjectForm.get('beneficiaries')).push(this.setInsertedBenefeciaries(this.beneficiariesArr[k].Beneficiary));
            }
    }
          if(this.projectsAll.fundAllocationType == 1){
          this.editProjectForm.controls['fundAllocation'].setValue(true);
          } else {
            this.editProjectForm.controls['fundAllocation'].setValue(false); 
          }
          this.selectedSDGs = this.projectsAll.SDG;
          this.lat = parseFloat(this.projectsAll.projectLoc.latitude);
          this.lng = parseFloat(this.projectsAll.projectLoc.longitude);
          this.httpClient.get(this.urlPort + "/api/projects/getAllSDG", { withCredentials: true })
            .map(
              (response) => response
            )
            .catch((err) => {
              var error = err["_body"]
              if (error == "session expired") {
                this.sessionSnackBar(err["_body"]);
                this.router.navigate(['/pages/auth/login-2']);
              } else {
                var snackBar = this._translateService.instant("Failed to get sdg");
                this.openSnackBar(snackBar);
              }
              return Observable.throw(err)
            })
            .subscribe(res => {
              this.SDGData = res;
              var tableData = [];
              var same;
              var selectedSDG = this.selectedSDGs;
              // Used to Display SDG which are not been selected
              for (var i = 0; i < this.SDGData.length; i++) {
                for (var j = 0; j < selectedSDG.length; j++) {
                  if (selectedSDG[j].SDGType == this.SDGData[i].SDGType) {
                    same = 1;
                    break;
                  } else {
                    same = 0;
                  }
                }
                if (same == 0) {
                  tableData.push(this.SDGData[i]);
                }
              }
              this.sdg = tableData;
              //get SDG ends here
            })
        })
    }


  }

//   get demoArray() {
//     return this.addProjectForm.get('demoArray') as FormArray;
//  }

 addBenefeciaries(): FormGroup {
   if(this.operationalFlag == 0){
  return this._formBuilder.group({
    'beneficiary':['']
  });
}
}

addBenefeciaries2(): FormGroup {
  return this._formBuilder.group({
    'beneficiary':['']
  });
}

setInsertedBenefeciaries(beneficiary): FormGroup {
  return this._formBuilder.group({
    'beneficiary':[beneficiary]
  });
}

addBenefeciariesFields(): void {
  (<FormArray>this.addProjectForm.get('beneficiaries')).push(this.addBenefeciaries());
}

addBenefeciariesFields2(): void {
  (<FormArray>this.editProjectForm.get('beneficiaries')).push(this.addBenefeciaries2());
}

removeBenefeciariesFields(ifConditionGroupIndex: number): void {
  (<FormArray>this.addProjectForm.get('beneficiaries')).removeAt(ifConditionGroupIndex);
}
removeBenefeciariesFields2(ifConditionGroupIndex: number): void {
  (<FormArray>this.editProjectForm.get('beneficiaries')).removeAt(ifConditionGroupIndex);
}

  addProject(val) {
    var organizations = []
    if (val.projectBudget < val.fundGoal) {
      var snackBar = this._translateService.instant("Fund goal cannot be greater than project budget");
      this.openSnackBar(snackBar);
    } else {
      val.lat = this.lat.toString();
      val.long = this.lng.toString();

      val.status = "Not Initiated";
      if(val.fundAllocation == true){
        val.fundAllocationType = "1"
      } else {
        val.fundAllocationType = "2"
      }
        val.SDG = this.selectedSDGs;
      if (val.startDate < val.endDate) {
        if (this.selectedSDGs.length !== 0 && this.lat !== 0 && this.lng !== 0) {
          this.formStatus = '';
          let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
            width: '500px',
            height: '200px',
            data: { operation: 'add' }
          });
          dialogRef.afterClosed().subscribe(result => {

            this.addDialogResult = result;
            if (this.addDialogResult == 'yes') {
              var benefeciariesArr = [];
              if(val.beneficiaries[0].beneficiary != ''){
                var beneficiaries = val.beneficiaries
                for(var i=0;i < beneficiaries.length;i++){
                  benefeciariesArr.push(val.beneficiaries[i].beneficiary)
                }
                console.log("benefeciaries Arr: ",benefeciariesArr)
                val.beneficiaries = benefeciariesArr;
              }
              this.loading1 = true;
              val.FundRaised = 0;
              val.FundAllocated = 0;
              val.fundNotAllocated = 0;
              val.isPublished = 'false';
              if(this.ngoOrg != undefined && this.ngoOrg != '' && this.ngoOrg != null){
                organizations = this.ngoOrg
              }
              organizations.push(val.projectOwner)
              val.organizations = organizations;
              console.log("val: ",val)
              this.httpClient.post(this.urlPort + "/api/projects/create", val, { withCredentials: true })
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
                    var snackBar = this._translateService.instant("Failed to add project");
                    this.openSnackBar(snackBar);
                  }

                  return Observable.throw(err)

                })
                .subscribe(res => {
                  this.createData = res;
                  this.loading1 = false;
                  var snackBar = this._translateService.instant("Project added successfully!!!");
                  this.openSnackBar(snackBar);
                  this.projectId = this.createData['projectId']
                  if (this.file !== undefined) {
                    var randomImageId = Math.floor(Math.random() * (999999 - 100000)) + 100000;
                    var imageName = randomImageId + this.file.name
                    var fd = new FormData();
                    fd.append('file', this.file, randomImageId + this.file['name'])
                    var _projId = this.projectId;
                    var fileInformation = {
                      imagePath: '/uploadImage/' + 'projectimages/' + this.projectId + '/',
                      projectId: this.projectId,
                      imageName: imageName,
                      type: this.file.type
                    }
                    fd.append('fileInformation', JSON.stringify(fileInformation));
                    var purpose = "uploadProjectImageForm"
                    var path = './projectimages/' + _projId + '/'
                    this.http.post(this.urlPort + "/api/filesUpload/saveFile/" + "?path=" + path +"&projectId="+ _projId +"&purpose=" + purpose, fd, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })  
                    .map((response) => response.json())
                      .catch((err) => {
                        var error = err["_body"]
                        if (error == "session expired") {
                          this.sessionSnackBar(err["_body"]);
                          this.router.navigate(['/pages/auth/login-2']);
                        } else {
                          var snackBar = this._translateService.instant("Failed to add project");
                          this.openSnackBar(snackBar);
                        }
                        return Observable.throw(err)
                      })
                      .subscribe(res => {
                      })
                  }

                  if (this.file == undefined) {
                    var body = {
                      "projectId": this.projectId
                    }

                    this.httpClient.post(this.urlPort + "/api/filesUpload/defaultImage", body, { withCredentials: true })
                      .map((response) => response)
                      .catch((err) => {
                        var error = err["_body"]
                        if (error == "session expired") {
                          this.sessionSnackBar(err["_body"]);
                          this.router.navigate(['/pages/auth/login-2']);
                        } else {
                          var snackBar = this._translateService.instant("Failed to add project image");
                          this.openSnackBar(snackBar);
                        }
                        return Observable.throw(err)
                      })
                      .subscribe(res => {
                      })
                  }
                  if (this.doc !== undefined) {
                    var fileName = this.doc.name;
                    var extension = fileName.split('.').pop();
                    var fd = new FormData();
                    this.file = this.doc
                    fd.append('file', this.file);
                    var _projId = this.projectId;
                    var fileInformation1 = {
                      docPath: '/uploadDocument/' + 'projectDocuments/' + this.projectId + '/',
                      projectId: this.projectId,
                      docName: 'projectDocument.' + extension,
                      docInserted: 0
                    }
                    fd.append('fileInformation', JSON.stringify(fileInformation1));
                    var uploadPurpose = "uploadProjectDoc"
                    var path = './projectDocuments/' + _projId + '/'
                    this.http.post(this.urlPort + "/api/filesUpload/saveFile" + "?path=" + path +"&projectId="+ _projId +"&purpose=" + uploadPurpose,fd, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })  
                    .map((response) => response.json())
                      .catch((err) => {
                        this.loading1 = false;
                        var error = err["_body"]
                        if (error == "session expired") {
                          this.sessionSnackBar(err["_body"]);
                          this.router.navigate(['/pages/auth/login-2']);
                        } else {
                          var snackBar = this._translateService.instant("Failed to add project");
                          this.openSnackBar(snackBar);
                        }
                        return Observable.throw(err)
                      })
                      .subscribe(res => {
                        this.loading1 = false;
                      })
                  }
                  if (this.pastEventFile != undefined) {
                    this.uploadPastEventsFiles(this.pastEventFile)
                  }
                  if (this.projectSupportersFile != undefined) {
                    this.projectSupportersFiles(this.projectSupportersFile)
                  }
                  this.router.navigate([this.routeBack])
                })
            } else {
              this.loading1 = false;
              var snackBar = this._translateService.instant('operation cancelled!!!');
              this.openSnackBar(snackBar)
            }
          })
        } else {
          var snackBar = this._translateService.instant("SDG and location are mandatory");
          this.openSnackBar(snackBar)

          this.formStatus = 'Fill all mandatory fields*';
        }
      } else {
        var snackBar = this._translateService.instant("End Date should be greater than Start Date!!!");
        this.openSnackBar(snackBar)
      }

    }
  }
  onSelectDocument(event) {
    this.doc = event.target.files[0];
    this.docName = event.target.files[0].name
  }

  onSelectPastEvents(event) {


    if (event.target.files[0].type == 'application/pdf') {
      this.pastEventFile = event.target.files[0];
      this.pastEventDocName = event.target.files[0].name;
    }
    else {
      var snackBar = this._translateService.instant('File Type must be a pdf');
      this.openSnackBar(snackBar)
    }
  }

  onSelectProjectSupporters(event) {
    if (event.target.files[0].type.startsWith("image")) {
      this.projectSupportersFile = event.target.files[0];
      this.projectSupportersFileName = event.target.files[0].name;
      this.projectSupportersDocName = event.target.files[0].name;
    } else {
      var snackBar = this._translateService.instant('File Type must be a image');
      this.openSnackBar(snackBar)
    }
  }

  onSelectFile(event) {
    if (event.target.files[0].type.startsWith("image")) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
    
        reader.readAsDataURL(event.target.files[0]); // read file as data url

        reader.onload = (event: any) => { // called once readAsDataURL is completed
          this.imgUrl = event.target.result;
        }
      }
      this.file = event.target.files[0]
      this.imgUploaded = 1;
    } else {
      var snackBar = this._translateService.instant("Only Image is accepted");
      this.openSnackBar(snackBar);
    }
  }//End




  cancel() {
    this.router.navigate([this.routeBack])
  }

  cancelForEdit() {
    this.router.navigate(['/pages/profile'])
  }


  uploadPastEventsFiles(file) {
    var randomImageId = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    var pasteventFileName = randomImageId + file.name
    var fd = new FormData();
    fd.append('file', file, randomImageId + file['name']);
    var fileInformation = {
      filePath: '/ProjectFiles/' + this.projectId + '/ProjectPastEvents/' + pasteventFileName,
      projectId: this.projectId,
      fileName: pasteventFileName,
      type: file.type,
      projectRelation: 'Past Event'
    }
    fd.append('fileInformation', JSON.stringify(fileInformation));
    var purpose = 'uploadProjectPastEvents'
    var path = './ProjectFiles/'+this.projectId+'/ProjectPastEvents/'
    this.http.post(this.urlPort + "/api/filesUpload/saveFile" + "?path=" + path +"&projectId="+ this.projectId +"&purpose=" + purpose, fd, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
      .catch((err) => {
        this.loading1 = false;
        var error = err["_body"]
        if (error == "session expired") {
          this.sessionSnackBar(err["_body"]);
          this.router.navigate(['/pages/auth/login-2']);
        } else {
          var snackBar = this._translateService.instant("Past Events Not Saved");
          this.openSnackBar(snackBar);
        }
        return Observable.throw(err)
      })
      .subscribe((res: Response) => {
        this.loading1 = false;
        var snackBar = this._translateService.instant("Past Event File Uploaded");
        this.openSnackBar(snackBar);
      })
  }

  projectSupportersFiles(file) {
    var randomImageId = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    var projectSupportersFileName = randomImageId + file.name
    var fd = new FormData();
    fd.append('file', file, randomImageId + file['name']);
    var filePath = 'ProjectFiles' + this.projectId + '/ProjectSupporters/';
    var fileInformation = {
      filePath: '/ProjectFiles/' + this.projectId + '/ProjectSupporters/' + projectSupportersFileName,
      projectId: this.projectId,
      fileName: projectSupportersFileName,
      type: file.type,
      projectRelation: 'Project Supporter'
    }
    fd.append('fileInformation', JSON.stringify(fileInformation));
    var purpose = "uploadProjectSupporters";
    var path = './ProjectFiles/'+this.projectId+'/ProjectSupporters/'
    this.http.post(this.urlPort + "/api/filesUpload/saveFile/" + "?path=" + path +"&projectId="+ this.projectId +"&purpose=" + purpose, fd, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
      .catch((err) => {
        this.loading1 = false;
        var error = err["_body"]
        if (error == "session expired") {
          this.sessionSnackBar(err["_body"]);
          this.router.navigate(['/pages/auth/login-2']);
        } else {
          var snackBar = this._translateService.instant('Project Supporters not saved');
          this.openSnackBar(snackBar);
        }
        return Observable.throw(err)
      })
      .subscribe((res: Response) => {
        this.loading1 = false;
        var snackBar = this._translateService.instant("Project Supporter file uploaded");
        this.openSnackBar(snackBar);
      })
  }

  uploadProjectDoc(file) {
    this.http.get(this.urlPort + "/api/projectdoc/allByProjId/" + this.projectId, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
      .map(
        (response) => response.json()
      )
      .subscribe(async (res) => {
        var docInserted
        if (res.length > 0) {
          docInserted = 1;
        }
        else {
          docInserted = 0;
        }
        var fd = new FormData();
        fd.append('file', file);
        var _projId = this.projectId;
        var docname = file.name;
        var extension = docname.split('.').pop();
        var fileInformation = {
          docPath: '/uploadDocument/' + 'projectDocuments/' + this.projectId + '/',
          projectId: this.projectId,
          docName: 'projectDocument.' + extension,
          docInserted: docInserted
        }
        fd.append('fileInformation', JSON.stringify(fileInformation));
        this.httpClient.post(this.urlPort + "/api/uploadProjectDoc/" + _projId, fd, { withCredentials: true })
          .map((response) => response)
          .catch((err) => {
            this.loading1 = false;
            var error = err["_body"]
            if (error == "session expired") {
              this.sessionSnackBar(err["_body"]);
              this.router.navigate(['/pages/auth/login-2']);
            } else {
              var snackBar = this._translateService.instant("Failed to add project");
              this.openSnackBar(snackBar);
            }
            return Observable.throw(err)
          })
          .subscribe(res => {
            this.loading1 = false;
            this.openSnackBar(docname + " File has been uploaded");
          })
      })
  }


  /**
   * @author:Madhu
   * @description: Open snak bar
   */
  openSnackBar(data) {
    var endNow = this._translateService.instant('End now');
    this._matSnackBar.open(data, endNow, {
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  //End

  /**
* @author : Akshay
* @param {SDGType} data 
*/
  selectedSDG(data) {
    var type = data;
    var set = {
      SDGType: type
    };
    this.selectedSDGs.push(data);
    for (var i = 0; i < this.sdg.length; i++) {
      if (set.SDGType == this.sdg[i].SDGType) {
        this.sdg.splice(i, 1);
      }
    }
    var body = {
      "peers": ["peer0.org1.example.com", "peer1.org1.example.com"],
      "fcn": "invoke",
      "args": ["init_project", "[" + this.selectedSDGs + "]"]
    }

    if (this.selectedSDGs.length !== 0) {
      this.sdgStatus = true
    } else {
      this.sdgStatus = false
    }
  }//End

  /**
     * @author:Kuldeep
     * @event:contains file
     * @description:used to upload image
     */


  /**
  * @author: AKshay        
  * @param {SDGType} data 
  */
  removeSelectedSDG(data) {
    var removableSDG = data;
    var set = {
      SDGType: removableSDG
    };
    this.sdg.push(set);

    for (var i = 0; i < this.selectedSDGs.length; i++) {
      if (set.SDGType == this.selectedSDGs[i]) {
        this.selectedSDGs.splice(i, 1);
      }
    }

    if (this.selectedSDGs.length !== 0) {
      this.sdgStatus = true
    } else {
      this.sdgStatus = false
    }
  }//End

  selectedSDGForEdit(data) {
    var type = data;
    var set = {
      SDGType: type
    };
    this.selectedSDGs.push(set);
    for (var i = 0; i < this.sdg.length; i++) {
      if (data == this.sdg[i].SDGType) {
        this.sdg.splice(i, 1);
      }
    }


    var body = {
      "peers": ["peer0.org1.example.com", "peer1.org1.example.com"],
      "fcn": "invoke",
      "args": ["init_project", "[" + this.selectedSDGs + "]"]
    }

    if (this.selectedSDGs.length !== 0) {
      this.sdgStatus = true
    } else {
      this.sdgStatus = false
    }
  }//End

  removeSelectedSDGForEdit(data) {
    var set = {
      SDGType: data
    };
    this.sdg.push(set.SDGType);

    for (var i = 0; i < this.selectedSDGs.length; i++) {
      if (set.SDGType == this.selectedSDGs[i]) {
        this.selectedSDGs.splice(i, 1);
      }
    }

    if (this.selectedSDGs.length !== 0) {
      this.sdgStatus = true
    } else {
      this.sdgStatus = false
    }
  }//End

  /**
   * @author:Madhu 
   * @param:edit form data
   * @description: Update project
   * 
   */
   
  editProject(data) {
    var organizations = []
    console.log("this.file: ",this.file)
    // if (this.file !== undefined) {
    //   var fd = new FormData();
    //                 var randomImageId = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    //                 var imageName = randomImageId + this.file.name
    //                 fd.append('file', this.file, randomImageId + this.file['name'])
    //                 var _projId = this.projectId;
    //                 var fileInformation = {
    //                   imagePath: '/uploadImage/' + 'projectimages/' + this.projectId + '/',
    //                   projectId: this.projectId,
    //                   imageName: imageName,
    //                   type: this.file.type
    //                 }
    //                 fd.append('fileInformation', JSON.stringify(fileInformation));
    //                 var purpose = "uploadProjectImageForm"
    //                 var path = './projectimages/' + _projId + '/'
    //                 this.http.post(this.urlPort + "/api/filesUpload/saveFile/" + "?path=" + path +"&projectId="+ _projId +"&purpose=" + purpose, fd, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })  
    //                   .map((response) => response.json())
    //                   .catch((err) => {
    //                     this.loading1 = false;
    //                     var error = err["_body"]
    //                     if (error == "session expired") {
    //                       this.sessionSnackBar(err["_body"]);
    //                       this.router.navigate(['/pages/auth/login-2']);
    //                     } else {
    //                       var snackBar = this._translateService.instant("Image updation failed!!!");
    //                       this.openSnackBar(snackBar)
    //                     }
    //                     return Observable.throw(err)
    //                   })
    //                   .subscribe(res => {
    //                     var snackBar = this._translateService.instant("Image updated successfully!!!");
    //                     this.openSnackBar(snackBar)
    //                     sessionStorage.setItem("projectUpdate", 'done')
    //                   })

    //               }

    if(this.ngoOrg != undefined && this.ngoOrg != '' && this.ngoOrg != null){
      organizations = this.ngoOrg;
    } 
    organizations.push(data.projectOwner)
    data.organizations = organizations;
    if (data.projectBudget < data.fundGoal) {
      var snackBar = this._translateService.instant("Fund goal cannot be greater than project budget");
      this.openSnackBar(snackBar);
    } else {
      data.projectId = this.paramData["projectId"];
      data.SDG = this.selectedSDGs;
      var sdgArray = [];
      for (var i = 0; i < data.SDG.length; i++) {
        var sdg = data.SDG[i]["SDGType"];
        sdgArray.push(sdg)
      }
      data.SDG = sdgArray;
      var startDate = new Date(data.startDate)
      var endDate = new Date(data.endDate)
      if (startDate < endDate) {
        data.lat = this.lat.toString()
        data.long = this.lng.toString()
        if(data.fundAllocation == true){
          data.fundAllocationType = "1"
        } else {
          data.fundAllocationType = "2"
        }
        if (this.selectedSDGs.length !== 0 && this.lat !== 0 && this.lng !== 0) {
          let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
            width: '500px',
            height: '200px',
            data: { operation: "update" }
          });

          dialogRef.afterClosed().subscribe(result => {

            this.updateDialogResult = result;
            if (this.updateDialogResult == 'yes') {
              var benefeciariesArr = [];
              if(data.beneficiaries[0].beneficiary != ''){
                var beneficiaries = data.beneficiaries
                for(var i=0;i < beneficiaries.length;i++){
                  benefeciariesArr.push(data.beneficiaries[i].beneficiary)
                }
                console.log("benefeciaries Arr: ",benefeciariesArr)
                data.beneficiaries = benefeciariesArr;
              }
              this.loading1 = true;
              data.FundAllocated = this.projectsAll.fundAllocated
              data.FundRaised = this.projectsAll.fundRaised
              data.status = "Project Modified";
              data.isPublished = this.projectsAll.isPublished
              data.fundNotAllocated = this.projectsAll.fundNotAllocated;
              this.httpClient.post(this.urlPort + "/api/projects/updateProject", data, { withCredentials: true })
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
                    var snackBar = this._translateService.instant("Failed to update project");
                    this.openSnackBar(snackBar)
                  }
                  return Observable.throw(err)
                })
                .subscribe((res: Response) => {
                  this.loading1 = false;
                  var snackBar = this._translateService.instant("Project updated successfully!!!");
                  this.openSnackBar(snackBar)
                  var fd = new FormData();
                  if (this.file !== undefined) {
                    var randomImageId = Math.floor(Math.random() * (999999 - 100000)) + 100000;
                    var imageName = randomImageId + this.file.name
                    fd.append('file', this.file, randomImageId + this.file['name'])
                    var _projId = this.projectId;
                    var fileInformation = {
                      imagePath: '/uploadImage/' + 'projectimages/' + this.projectId + '/',
                      projectId: this.projectId,
                      imageName: imageName,
                      type: this.file.type
                    }
                    fd.append('fileInformation', JSON.stringify(fileInformation));
                    var purpose = "uploadProjectImageForm"
                    var path = './projectimages/' + _projId + '/'
                    this.http.post(this.urlPort + "/api/filesUpload/saveFile/" + "?path=" + path +"&projectId="+ _projId +"&purpose=" + purpose, fd, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })  
                      .map((response) => response.json())
                      .catch((err) => {
                        this.loading1 = false;
                        var error = err["_body"]
                        if (error == "session expired") {
                          this.sessionSnackBar(err["_body"]);
                          this.router.navigate(['/pages/auth/login-2']);
                        } else {
                          var snackBar = this._translateService.instant("Image updated successfully!!!");
                          this.openSnackBar(snackBar)
                        }
                        return Observable.throw(err)
                      })
                      .subscribe(res => {
                        var snackBar = this._translateService.instant("Image updated successfully!!!");
                        this.openSnackBar(snackBar)
                        sessionStorage.setItem("projectNameForProjectProfile", data.projectName);
                        sessionStorage.setItem("projectUpdate", 'done')
                        if(this.publishedStatus == false){
                          this.router.navigate([this.routeBack])
                        } else {
                          this.router.navigate([this.routeBack])
                        }
                      })

                  } else {
                    sessionStorage.setItem("latForProjectProfile", this.lat.toString());
                    sessionStorage.setItem("lngForProjectProfile", this.lng.toString());
                    sessionStorage.setItem("projectNameForProjectProfile", data.projectName);
                  sessionStorage.setItem("projectUpdate", 'done')
                  if(this.publishedStatus == false){
                    this.router.navigate([this.routeBack])
                    } else {
                      this.router.navigate([this.routeBack])
                    }
                  }
                })
            } else {
              this.loading1 = false;
              var snackBar = this._translateService.instant('operation cancelled!!!');
              this.openSnackBar(snackBar)
            }
          })
        } else {
          var snackBar = this._translateService.instant("SDG and location are mandatory");
          this.openSnackBar(snackBar)
        }
      } else {
        var snackBar = this._translateService.instant("Start Date should be smaller than or equal to End Date!!!");
        this.openSnackBar(snackBar)

      }
    }
  }

  filterListOrg(val){
    this.organizations = this.organizationsArray;
    this.organizations = this.organizationsArray.filter(org => org.orgName.toLowerCase().indexOf(val.toLowerCase()) > -1);
  }
  filterListCountry(val) {
    this.getCountry = this.countryArray
    this.getCountry = this.countryArray.filter(country => country.countryName.toLowerCase().indexOf(val.toLowerCase()) > -1);
  }

  filterListCurrency(val) {
    this.getCurrency = this.currencyArray
    this.getCurrency = this.currencyArray.filter(currency => currency.currencyCode.toLowerCase().indexOf(val.toLowerCase()) > -1);
  }

  changedCountryName() {
    this.getCountry = this.countryArray;
  }

  changedCurrency() {
    this.getCurrency = this.currencyArray;

  }

  changedEditOrganizations(event){
    this.ngoOrg = event;
  }

  changedAddOrganizations(event){
    this.ngoOrg = event;
  }
  


  sessionSnackBar(data) {
    var endNow = this._translateService.instant('End now');
    this._matSnackBar.open(data, endNow, {
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  sendInvitation() {
    var dialogueStatus;
    let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
        width: '500px',
        height: '200px',
        data: { operation: 'sendInvitation' }
    });
    dialogRef.afterClosed().subscribe(result => {
      dialogueStatus = result.ans;
        if (dialogueStatus == 'yes') {
            var data = {
                email: result.email,
                orgName: sessionStorage.getItem('orgName'),
                regURL: environment.regUrl,
                userType: sessionStorage.getItem('userType')
            }
            this.loading1 = true;
            this.httpClient.post(this.urlPort + "/api/users/sendInvitation", data, { withCredentials: true })
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
                    var snackBar = this._translateService.instant("Invitation has been send");
                    this.openSnackBar(snackBar);
                })
        } else {
            var snackBar = this._translateService.instant("Operation cancelled!!!");
            this.openSnackBar(snackBar);
        }
    })
}
}

