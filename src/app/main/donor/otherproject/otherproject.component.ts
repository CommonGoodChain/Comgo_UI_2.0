import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { ComGoAnimations } from '@ComGo/animations';
import { Observable } from 'rxjs/Rx';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { ComGoTranslationLoaderService } from '@ComGo/services/translation-loader.service';
import { DialogElementsExampleDialog } from '../../dialog/dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { locale as english } from '../../../layout/i18n/en';
import { locale as spanish } from '../../../layout/i18n/tr';
import { ComGoConfigService } from '@ComGo/services/config.service';
import * as $ from 'jquery';
// import { exoRoutes } from '../../donor/donor.module'

@Component({
  selector: 'app-otherproject',
  templateUrl: './otherproject.component.html',
  styleUrls: ['./otherproject.component.scss'],
  animations: ComGoAnimations
})
export class OtherprojectComponent implements OnInit {
  project;
  mydonation;
  fundAmount;
  profileSubmit;
  username;
  role;
  defaultImageUrl;
  myProject;
  filteredIcons;
  default;
  lang;
  // exoRoutes = exoRoutes;
  allProjectTypeData;
  validatorId;
  routeParams;
  otherProject:any;
  rulesOComGor;
  defaultImg = environment.defaultImage
  urlPort = environment.urlPort;
  imageUrl = environment.imageUrl;
  foundation = environment.foundation;
  donorList = undefined;
  donatedAmount: number = 0;
  foundationAmount: number = 0;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  public sdgUrl;
  public imageExtenstion;
  public loading1 = false;
  userRules:any;
  projectUpdate;
  projectType: any[];
  orgName: any[];
  currentOrgs: any;
  currentCategory;
  projectsFilteredByOrgs: any;
  projectsFilteredByCategory: any;
  filteredProjects: any[];
  searchTerm: any;
  SDGData;
  currentSDGType: any;
  projectsFilteredByTerms: any;

  /**
    * Constructor
    *
    * @param {HttpClient} _httpClient
    */
  constructor(
    private _matSnackBar: MatSnackBar,
    private _ComGoConfigService: ComGoConfigService,
    public dialog: MatDialog,
    private router: Router,
    private route:ActivatedRoute,
    private http: Http,
    private httpClient: HttpClient,
    private _translateService: TranslateService,
    private _ComGoTranslationLoaderService: ComGoTranslationLoaderService

  ) {
    this._ComGoTranslationLoaderService.loadTranslations(english, spanish);
    this.currentCategory = 'All';
    this.currentOrgs = 'All';
    this.searchTerm = '';
    this.currentSDGType = '';
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

  ngOnInit() {
    this.route.params.subscribe( params =>
      this.routeParams = params['id']
  )
    var routesPathOrg = this.routeParams
    if(sessionStorage.getItem('userType') == 'Private User'){
    var body = {
      "username": sessionStorage.getItem("username"),
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
            if(routesPathOrg == res["Rules"][i].orgName){
              var rulesArr = []
              rulesArr.push(res["Rules"][i]);
              var userRules = JSON.stringify(rulesArr);
               sessionStorage.setItem("userRules", userRules)
               this.userRules = res["Rules"][i] 
               sessionStorage.setItem("orgName", res["Rules"][i].orgName)
            }
          }
      })
    }
    this.profileSubmit = sessionStorage.getItem("profileSubmit")
    this.projectUpdate = sessionStorage.getItem("projectUpdate")
    this.lang = sessionStorage.getItem("lang");
    if (this.profileSubmit == 'done' || this.projectUpdate == 'done') {
      window.location.reload();
      sessionStorage.setItem("profileSubmit", 'notdone')
      sessionStorage.setItem("projectUpdate", 'notdone')
      this.default = '/DefaultImage/default.jpg';
      this.defaultImageUrl = this.imageUrl + this.default;
    }

    if (this.lang == 'en' || this.lang == null) {
      this.sdgUrl = "assets/SDG/";
      this.imageExtenstion = ".png";
    } else {
      this.sdgUrl = "assets/SDGSpanish/";
      this.imageExtenstion = ".jpg";
    }
    this.username = sessionStorage.getItem("username");
    this.role = sessionStorage.getItem("role");
    this.BCGetAllFundDetails();
  }

  BCGetAllFundDetails(){
    var routesPath
    routesPath = this.router.url.split("/", 4)

    if(routesPath[3] == 'otherproject'){
      this.httpClient.get(this.urlPort + '/api/projects/getAllPublishedProjects/'+sessionStorage.getItem('userType'), { withCredentials: true})
      .map(
        (response) => response
      )
      .catch((err) => {
        var error = err["_body"]
        if (error == "session expired") {
          this.sessionSnackBar(err["_body"]);
          this.router.navigate(['/pages/auth/login-2']);
        } else {
          var snackBar = this._translateService.instant("Projects not found");
          this.openSnackBar(snackBar);
        }
        this.loading1 = false;
        return Observable.throw(err)
      })
      .subscribe(res => {
        this.project = res;
      var otherProjectDetails = [];
      for(var i=0;i<this.project.length;i++){
        var otherSingleProject = {};
        otherSingleProject['projectId'] = this.project[i].Key;
        otherSingleProject['isPublished'] = this.project[i].Record.isPublished;
        otherSingleProject['fundAllocationType'] = this.project[i].Record.fundAllocationType;
        otherSingleProject['projectName'] = this.project[i].Record.projectName;
        otherSingleProject['description'] = this.project[i].Record.description;
        otherSingleProject['projectType'] = this.project[i].Record.projectType;
        otherSingleProject['milestones'] = this.project[i].Record.milestones;
        otherSingleProject['fundGoal'] = this.project[i].Record.fundGoal;
        otherSingleProject['remarks'] = this.project[i].Record.remarks;
        otherSingleProject['fundRaised'] = this.project[i].Record.fundRaised;
        if(typeof this.project[i].Record.projectOwner == "string"){
        otherSingleProject['owner'] = this.project[i].Record.projectOwner;
        } else {
          otherSingleProject['owner'] = ''
        }
        otherSingleProject['organization'] = this.project[i].Record.organization;
        // otherSingleProject['owner'] = this.project[i].Record.projectOwner;
        otherSingleProject['status'] = "Published";
        otherSingleProject['fundNotAllocated'] = this.project[i].Record.fundNotAllocated
        otherSingleProject['currency'] = this.project[i].Record.currency;
        otherSingleProject['imageUrl'] = "img/project" + "/" + this.project[i].Key;
        otherSingleProject['SDG'] = this.project[i].Record.SDG;
        otherSingleProject['projectLoc'] = this.project[i].Record.projectLoc;
        otherSingleProject['projectBudget'] = this.project[i].Record.projectBudget;
        otherSingleProject['percentage'] = (otherSingleProject['fundRaised'] * 100) / otherSingleProject['projectBudget']
        otherSingleProject['bgImageUrl'] = this.imageUrl + '/' + this.project[i].Key + '/img1'
        otherSingleProject['txnBalance'] = this.project[i].Record.projectBudget - this.project[i].Record.fundRaised;
        otherProjectDetails.push(otherSingleProject);
      }
      this.otherProject = otherProjectDetails.reverse();
      console.log("otherProject: ",this.otherProject)
      const proj = this.otherProject.map(data => data.projectType);
      const org = this.otherProject.map(data => data.owner);
        this.projectType = proj.filter((x, i, a) => x && a.indexOf(x) === i);
        this.orgName = org.filter((x, i, a) => x && a.indexOf(x) === i);
      sessionStorage.setItem("userRules", undefined)
      this.filterProjectsByOrgs()
    })
  } else if(routesPath[3] == 'published'){
    this.httpClient.get(this.urlPort + '/api/projects/getOrgPublishedProjects/'+sessionStorage.getItem('orgName'), { withCredentials: true})
    .map(
      (response) => response
    )
    .catch((err) => {
      var error = err["_body"]
      if (error == "session expired") {
        this.sessionSnackBar(err["_body"]);
        this.router.navigate(['/pages/auth/login-2']);
      } else {
        var snackBar = this._translateService.instant("Projects not found");
        this.openSnackBar(snackBar);
      }
      this.loading1 = false;
      return Observable.throw(err)
    })
    .subscribe(res => {
      this.project = res;
      var otherProjectDetails = [];
      for(var i=0;i<this.project.length;i++){
        var otherSingleProject = {};
        otherSingleProject['projectId'] = this.project[i].Key;
        otherSingleProject['isPublished'] = this.project[i].Record.isPublished;
        otherSingleProject['fundAllocationType'] = this.project[i].Record.fundAllocationType;
        otherSingleProject['projectName'] = this.project[i].Record.projectName;
        otherSingleProject['description'] = this.project[i].Record.description;
        otherSingleProject['projectType'] = this.project[i].Record.projectType;
        otherSingleProject['milestones'] = this.project[i].Record.milestones;
        otherSingleProject['fundGoal'] = this.project[i].Record.fundGoal;
        otherSingleProject['remarks'] = this.project[i].Record.remarks;
        otherSingleProject['fundRaised'] = this.project[i].Record.fundRaised;
        otherSingleProject['owner'] = this.project[i].Record.projectOwner;
        otherSingleProject['organization'] = this.project[i].Record.organization;
        // otherSingleProject['owner'] = this.project[i].Record.projectOwner;
        otherSingleProject['status'] = "Published";
        otherSingleProject['fundNotAllocated'] = this.project[i].Record.fundNotAllocated
        otherSingleProject['currency'] = this.project[i].Record.currency;
        otherSingleProject['imageUrl'] = "img/project" + "/" + this.project[i].Key;
        otherSingleProject['SDG'] = this.project[i].Record.SDG;
        otherSingleProject['projectLoc'] = this.project[i].Record.projectLoc;
        otherSingleProject['projectBudget'] = this.project[i].Record.projectBudget;
        otherSingleProject['percentage'] = (otherSingleProject['fundRaised'] * 100) / otherSingleProject['projectBudget']
        otherSingleProject['bgImageUrl'] = this.imageUrl + '/' + this.project[i].Key + '/img1'
        otherSingleProject['txnBalance'] = this.project[i].Record.projectBudget - this.project[i].Record.fundRaised;
        otherProjectDetails.push(otherSingleProject);
      }
      this.otherProject = otherProjectDetails.reverse();
      const proj = this.otherProject.map(data => data.projectType);
      const org = this.otherProject.map(data => data.owner);
        this.projectType = proj.filter((x, i, a) => x && a.indexOf(x) === i);
        this.orgName = org.filter((x, i, a) => x && a.indexOf(x) === i);
        this.filterProjectsByOrgs()
    })
  } else {
    this.httpClient.get(this.urlPort + '/api/projects/getOrgPublishedProjects/'+this.routeParams, { withCredentials: true})
    .map(
      (response) => response
    )
    .catch((err) => {
      var error = err["_body"]
      if (error == "session expired") {
        this.sessionSnackBar(err["_body"]);
        this.router.navigate(['/pages/auth/login-2']);
      } else {
        var snackBar = this._translateService.instant("Projects not found");
        this.openSnackBar(snackBar);
      }
      this.loading1 = false;
      return Observable.throw(err)
    })
    .subscribe(res => {
      this.project = res;
      var otherProjectDetails = [];
      for(var i=0;i<this.project.length;i++){
        var otherSingleProject = {};
        otherSingleProject['projectId'] = this.project[i].Key;
        otherSingleProject['isPublished'] = this.project[i].Record.isPublished;
        otherSingleProject['fundAllocationType'] = this.project[i].Record.fundAllocationType;
        otherSingleProject['projectName'] = this.project[i].Record.projectName;
        otherSingleProject['description'] = this.project[i].Record.description;
        otherSingleProject['projectType'] = this.project[i].Record.projectType;
        otherSingleProject['milestones'] = this.project[i].Record.milestones;
        otherSingleProject['fundGoal'] = this.project[i].Record.fundGoal;
        otherSingleProject['remarks'] = this.project[i].Record.remarks;
        otherSingleProject['fundRaised'] = this.project[i].Record.fundRaised;
        // var arr = [];
        //         for (var j = 0; j < this.project[i].Record.projectOwner.length; j++) {
        //             arr.push(this.project[i].Record.projectOwner[j].OrgName)
        //         }
        otherSingleProject['owner'] = this.project[i].Record.projectOwner;
        otherSingleProject['organization'] = this.project[i].Record.organization;
        otherSingleProject['status'] = "Published";
        otherSingleProject['fundNotAllocated'] = this.project[i].Record.fundNotAllocated
        otherSingleProject['currency'] = this.project[i].Record.currency;
        otherSingleProject['imageUrl'] = "img/project" + "/" + this.project[i].Key;
        otherSingleProject['SDG'] = this.project[i].Record.SDG;
        otherSingleProject['projectLoc'] = this.project[i].Record.projectLoc;
        otherSingleProject['projectBudget'] = this.project[i].Record.projectBudget;
        otherSingleProject['percentage'] = (otherSingleProject['fundRaised'] * 100) / otherSingleProject['projectBudget']
        otherSingleProject['bgImageUrl'] = this.imageUrl + '/' + this.project[i].Key + '/img1'
        otherSingleProject['txnBalance'] = this.project[i].Record.projectBudget - this.project[i].Record.fundRaised;
        otherProjectDetails.push(otherSingleProject);
      }
      this.otherProject = otherProjectDetails.reverse();
      const proj = this.otherProject.map(data => data.projectType);
      const org = this.otherProject.map(data => data.owner);
        this.projectType = proj.filter((x, i, a) => x && a.indexOf(x) === i);
        this.orgName = org.filter((x, i, a) => x && a.indexOf(x) === i);
        this.filterProjectsByOrgs()
    })
  }

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
    console.log("SDGData: ",this.SDGData)
  })
  }

  filterProjectsByOrgs() {

    // let orgs: any[] = this.otherProject
    if (this.currentOrgs == 'All') {
      this.projectsFilteredByOrgs = this.otherProject;
      this.filteredProjects = this.otherProject;
    } else {

      this.projectsFilteredByOrgs = this.otherProject.filter((project) => {

        return project.owner == this.currentOrgs;

      });
      this.filteredProjects = [...this.projectsFilteredByOrgs];
      console.log("filteredProjects :", this.filteredProjects)
    }
    this.filterProjectsByCategory();
  }

  filterProjectsByCategory() {
    // Filter
    if (this.currentCategory === 'All') {
      this.projectsFilteredByCategory = this.projectsFilteredByOrgs;
      this.filteredProjects = this.projectsFilteredByOrgs;
    } else {
      this.projectsFilteredByCategory = this.projectsFilteredByOrgs.filter((project) => {
        return project.projectType === this.currentCategory;
      });

      this.filteredProjects = [...this.projectsFilteredByCategory];
    }
    this.filterProjectsByTerm();
  }

  filterProjectsByTerm() {
    const searchTerm = this.searchTerm.toLowerCase();

    // Search
    if (searchTerm === '') {
      this.projectsFilteredByTerms = this.projectsFilteredByCategory;
    } else {
      this.projectsFilteredByTerms = this.projectsFilteredByCategory.filter((project) => {
        return project.projectName.toLowerCase().includes(searchTerm);
      });
    }
    this.filteredProjects = [...this.projectsFilteredByTerms];
    this.filterProjectsBySDG();
    // this.otherProject = this.filteredProjects;
  }

  /**
   * @author:Kuldeep
   * @description: this function will sort projects based on SDG Type
   */

  async filterProjectsBySDG(){
    console.log("filteredProjects: ",this.projectsFilteredByTerms,this.currentSDGType)
    var projectData = []
    this.filteredProjects = []
    for(var i=0;i<this.projectsFilteredByTerms.length;i++){
      await new Promise(next=> {
      console.log("SDG Type: ",this.projectsFilteredByTerms[i].SDG)
      var getSDG = this.projectsFilteredByTerms[i].SDG.filter(SDG => SDG.SDGType.toLowerCase().indexOf(this.currentSDGType.toLowerCase()) > -1);
      if(getSDG.length > 0){
      console.log("SDG: ",getSDG,i)
      this.filteredProjects.push(this.projectsFilteredByTerms[i])
      }
      next()
    })
    }
    console.log("projectData: ",this.filteredProjects)
    // this.filteredProjects = projectData
// this.currentSDGType
  }
  /** */

  // Re-filter by search term
  // this.filterProjectsByTerm();
  /**
    * @author:Sagar
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

  sessionSnackBar(data) {
    var endNow = this._translateService.instant('End now');
    this._matSnackBar.open(data, endNow, {
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  /**
    * @author:Sagar
    * @description: Open success snak bar
  */
  towardsDonation(index) {
    var donationType;
    var routesBack = this.router.url.replace(/%20/g, " ");
    // var routesBack = this.router.url.replace(/%20/g, " ");
    sessionStorage.setItem('backRoute',routesBack)
    if(sessionStorage.getItem('userType') == 'Private User' && this.userRules!= undefined){
    if(this.userRules.donate_Project){
    let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '500px',
      height: '200px',
      data: { operation: 'donationType' }
    });
    dialogRef.afterClosed().subscribe(result => {
      donationType = result
      if(donationType == 'Donate'){
        var data = {
      projectId: index.projectId
    }
    this.loading1 = true;
    this.httpClient.post(this.urlPort + "/api/alldonor/getAllDonorListDB", data, { withCredentials: true })
      .map(
        (response) => response
      )
      .catch((err) => {
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
      .subscribe(res => {
        this.donorList = res;
        for (var i = 0; i < this.donorList.length; i++) {
          if (this.donorList[i].donationType == "Donation") {

            this.donatedAmount = this.donorList[i].amount + this.donatedAmount;
          } else {

            this.foundationAmount = this.donorList[i].amount + this.foundationAmount;
          }
        }
        sessionStorage.setItem("projectNameForProjectProfile", index.projectName);
        sessionStorage.setItem("currency", index.currency);
        sessionStorage.setItem("owner", index.owner);
        sessionStorage.setItem("projectOwnerForProjectProfile",index.owner);
        var projectId = index.projectId;
        var projectName = index.projectName;
        if (this.foundationAmount > index.projectBudget - index.fundGoal) {
          this.fundAmount = index.projectBudget - index.fundRaised;
        } else {
          this.fundAmount = index.fundGoal - this.donatedAmount;
        }
        this.loading1 = false;
        this.router.navigate(["/donor/donor/donorForm", { projectId: projectId, projectName: projectName, fundAmount: this.fundAmount, donationType: 'Donation' }])
      })
      } else if(donationType == 'selfDonate'){
        this.towardsSelfDonation(index)
      }
    })
  } 
  else {
    var data = {
      projectId: index.projectId
    }
    this.loading1 = true;
    this.httpClient.post(this.urlPort + "/api/alldonor/getAllDonorListDB", data, { withCredentials: true })
      .map(
        (response) => response
      )
      .catch((err) => {
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
      .subscribe(res => {
        this.donorList = res;
        for (var i = 0; i < this.donorList.length; i++) {
          if (this.donorList[i].donationType == "Donation") {

            this.donatedAmount = this.donorList[i].amount + this.donatedAmount;
          } else {

            this.foundationAmount = this.donorList[i].amount + this.foundationAmount;
          }
        }
        sessionStorage.setItem("projectNameForProjectProfile", index.projectName);
        sessionStorage.setItem("currency", index.currency);
        sessionStorage.setItem("owner", index.owner);
        sessionStorage.setItem("projectOwnerForProjectProfile", index.owner);
        var projectId = index.projectId;
        var projectName = index.projectName;
        if (this.foundationAmount > index.projectBudget - index.fundGoal) {
          this.fundAmount = index.projectBudget - index.fundRaised;
        } else {
          this.fundAmount = index.fundGoal - this.donatedAmount;
        }
        this.loading1 = false;
        this.router.navigate(["/donor/donor/donorForm", { projectId: projectId, projectName: projectName, fundAmount: this.fundAmount, donationType: 'Donation' }])
      })
  }
} else {
    var data = {
      projectId: index.projectId
    }
    this.loading1 = true;
    this.httpClient.post(this.urlPort + "/api/alldonor/getAllDonorListDB", data, { withCredentials: true })
      .map(
        (response) => response
      )
      .catch((err) => {
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
      .subscribe(res => {
        this.donorList = res;
        for (var i = 0; i < this.donorList.length; i++) {
          if (this.donorList[i].donationType == "Donation") {

            this.donatedAmount = this.donorList[i].amount + this.donatedAmount;
          } else {

            this.foundationAmount = this.donorList[i].amount + this.foundationAmount;
          }
        }
        sessionStorage.setItem("projectNameForProjectProfile", index.projectName);
        sessionStorage.setItem("currency", index.currency);
        sessionStorage.setItem("owner", index.owner);
        sessionStorage.setItem("projectOwnerForProjectProfile", index.owner);
        var projectId = index.projectId;
        var projectName = index.projectName;
        if (this.foundationAmount > index.projectBudget - index.fundGoal) {
          this.fundAmount = index.projectBudget - index.fundRaised;
        } else {
          this.fundAmount = index.fundGoal - this.donatedAmount;
        }
        this.loading1 = false;
        this.router.navigate(["/donor/donor/donorForm", { projectId: projectId, projectName: projectName, fundAmount: this.fundAmount, donationType: 'Donation' }])
      })
  }
  }

  towardsSelfDonation(data) {
    var routesBack = this.router.url.replace(/%20/g, " ");
    sessionStorage.setItem("projectNameForProjectProfile", data.projectName);
    sessionStorage.setItem("currency", data.currency);
    sessionStorage.setItem("owner", data.owner);
    sessionStorage.setItem("projectOwnerForProjectProfile", data.owner);
    var projectId = data.projectId;
    var projectName = data.projectName;
    this.fundAmount = data.projectBudget - data.fundRaised;
    sessionStorage.setItem("owner", data.owner);
    sessionStorage.setItem('backRoute',routesBack)
    this.router.navigate(["/donor/donor/donorForm", { projectId: projectId, projectName: projectName, fundAmount: this.fundAmount, donorName: sessionStorage.getItem("username"), donationType: 'Self Donation' }])
  }

  audit(index) {
    var routesBack = this.router.url.replace(/%20/g, " ");
    var sdg = JSON.stringify(index.SDG)
    sessionStorage.setItem("SDG",sdg)
    sessionStorage.setItem("projectProjectBudgetTillActivity", index.projectBudget);
    sessionStorage.setItem("projectCreatedBy", index.createdBy);
    sessionStorage.setItem("boardRemarks", index.remarks);
    sessionStorage.setItem("descriptionForProjectProfile", index.description);
    sessionStorage.setItem("startDateForMilestone", index.startDate);
    sessionStorage.setItem("endDateForMilestone", index.endDate);
    sessionStorage.setItem("flagForProjectProfile", "db");
    sessionStorage.setItem("projectIdForProjectProfile", index.projectId);
    sessionStorage.setItem("projectNameForProjectProfile", index.projectName);
    sessionStorage.setItem("projectFundGoalForProjectProfile", index.fundGoal);
    sessionStorage.setItem("projectOwnerForProjectProfile", index.owner);
    sessionStorage.setItem("currencyTypeForProjectProfile", index.currency);
    sessionStorage.setItem("latForProjectProfile", index.projectLoc.latitude);
    sessionStorage.setItem("lngForProjectProfile", index.projectLoc.longitude);
    sessionStorage.setItem("fundRaisedForProjectProfile", index.fundRaised);
    sessionStorage.setItem("projectStatusForPublish", index.isPublished);
    sessionStorage.setItem("approveStatusForPublish", index.isApproved);
    // sessionStorage.setItem("projectApproveStatus", index.isApproved);
    sessionStorage.setItem("fundAllocationType", index.fundAllocationType);
    sessionStorage.setItem("fundNotAllocated",index.fundNotAllocated)
    sessionStorage.setItem("projectStatusForProjectProfile", index.status);
    sessionStorage.setItem('organization',JSON.stringify(index.organization))
    // sessionStorage.setItem("boardRemarks", index.remarks);
    // sessionStorage.setItem("projectData", JSON.stringify(index))
    // sessionStorage.setItem("flagForProjectProfile", "bc");
    // sessionStorage.setItem("projectIdForProjectProfile", index.projectId);
    // sessionStorage.setItem("projectIdForProjectProfile", index.projectId);
    // sessionStorage.setItem("projectNameForProjectProfile", index.projectName);
    // sessionStorage.setItem("projectFundGoalForProjectProfile", index.fundGoal);
    // sessionStorage.setItem("projectStatusForProjectProfile", index.status);
    // sessionStorage.setItem("projectOwnerForProjectProfile", index.projectOwner);
    // sessionStorage.setItem("currency", index.currency);
    // sessionStorage.setItem("currencyTypeForProjectProfile", index.currency);
    // sessionStorage.setItem("latForProjectProfile", index.projectLoc.latitude);
    // sessionStorage.setItem("lngForProjectProfile", index.projectLoc.longitude);
    // this.loading1 = false;
    sessionStorage.setItem('backRoute',routesBack)
    this.router.navigate(['/pages/profile', { flag: 'BC'}])
  }

  gotoSearch(){
    console.log("gotoSearch")
    $(document).ready(function () {
    $("#searchInput").trigger("click");
    })
  }

}
