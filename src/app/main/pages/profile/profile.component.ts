import { Component, ElementRef, HostListener } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { ComGoAnimations } from '@ComGo/animations';
import { environment } from 'environments/environment';
import { Observable, Subject } from 'rxjs/Rx';
import { MatSnackBar, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSort } from '@angular/material';
import * as $ from 'jquery';
import { ComGoTranslationLoaderService } from '@ComGo/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { locale as english } from '../../../layout/i18n/en';
import { locale as spanish } from '../../../layout/i18n/tr';
import { ViewChild } from '@angular/core';
import { ComGoConfigService } from '@ComGo/services/config.service';
import { DialogElementsExampleDialog } from '../../dialog/dialog.component';
import { ProfileService } from './profile.service';
import { takeUntil } from 'rxjs/operators';
var introJS = require('intro.js')
import { saveAs } from 'file-saver';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { navigation } from '../../../navigation/navigation';
import * as _ from 'lodash';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { Meta, Title } from '@angular/platform-browser';
@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    animations: [
      trigger('detailExpand', [
        state('collapsed', style({height: '0px', minHeight: '0'})),
        state('expanded', style({height: '*'})),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      ]),
    ],
})

export class ProfileComponent {
  url = 'https://localhost:3010';
    showToolbar = true
    projectName;
    ngoName;
    urlPort = environment.urlPort;
    imageUrl = environment.imageUrl;
    profileImageUrl = environment.profileImageUrl;
    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    dataOfProjectByProjectId;
    file;
    SDGType;
    public projectId;
    public imageName;
    imageCollection;
    sdgUrl;
    imageExtenstion;
    default
    filesToUpload
    projectOwner
    status;
    defaultImageUrl
    bgImageUrl;
    public loading1 = false;
    username;
    lang;
    isPublished;
    approved;
    isActive = true
    userRules;
    backFromExpense;
  viewActivities = 0;
  selectedItem = 'tab1'
  milestoneData = [];
  public milestone = [];
  widget6: any = {};
  doughnut = false;

    // @ViewChild(InfoComponent) private infoComponent: InfoComponent;
    // @ViewChild(ProfileTimelineComponent) private timelineComponent: ProfileTimelineComponent;
    // @ViewChild(ActivitiesComponent) private activitiesComponent: ActivitiesComponent;
    // @ViewChild(ProfileAboutComponent) private profileAboutComponent: ProfileAboutComponent;
    @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
    fundAllocationType;
    currency;
    fundNotAllocated;
    fundBudgeted: string;
    projectStatusForPublish;
    displayedColumns: string[];
    milestoneId: any;
    activities;
    milestoneStartDate;
    milestoneEndDate;
    allActivities = [];
    date = new Date();
    dataOfProjectByMilestoneId: any;
    milestoneName: any;
    fundReq;
    dataOfMilestoneByProjectId: any;
    private _unsubscribeAll: Subject<any>;
    tableData: any;
    timeLine: Array<any> = [];
    timeline: any;
    imageCollectionData = [];
    videoCollection = [];
    approveStatusForPublish: string;
    todoData = {};
    activityApprovedStatus: number;
    activitiesData;
    displayedColumnsToDo: string[];
    projectApproveStatus: string;
    routeBack;
    lat;
    lng;
    percentage;
    balance;
    projectsAll;
    projectDocument;
    projectFile;
    projectSupporters;
    pastEvents;
    doc = undefined;
    docName = 'Not available';
    filename;
    donorList = undefined;
    donatedAmount: number = 0;
  foundationAmount: number = 0;
  fundAmount;
  form: FormGroup;
  radioStatus = [
    "Public",
    "Only Organizations",
    "Just Me"
  ];
  j;
  k;
  donated = 1;
  sticky: any;
  showUpperNav = false;
  addSpace = false;
  publishDialogResult;
  projectApproveResult;
  approvalResultForBoard;
  firstLoad = true;
  language: string;
  languages: any;
  selectedLanguage: any;
  userType;
  horizontalNavbar: boolean;
  rightNavbar: boolean;
  hiddenNavbar: boolean;
  navigation: any;
  userName: string;
  userStatusOptions: any[];
  projectData: { name: string; value: number; }[];
  loaded;
  mySlideOptions = { items: 1, dots: false, nav: false, loop: true, autoplay: true, autoplayTimeout: 2500, autoplayHoverPause: true, stagePadding: 30, margin: 10, smartSpeed: 2000 };
  myString = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque viverra justo nec ultrices dui sapien eget. Nunc scelerisque viverra mauris in aliquam sem fringilla. Faucibus et molestie ac feugiat sed lectus vestibulum. Aenean et tortor at risus. Adipiscing tristique risus nec feugiat in. Malesuada proin libero nunc consequat interdum. Ullamcorper velit sed ullamcorper morbi. Semper risus in hendrerit gravida rutrum quisque non. Tellus molestie nunc non blandit massa enim nec dui. Eget est lorem ipsum dolor sit amet. Lobortis scelerisque fermentum dui faucibus in ornare. Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc. Libero enim sed faucibus turpis in eu mi. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida. Ullamcorper alacus vestibulum sed arcu non odio. Vel risus commodo viverra maecenas accumsan lacus. Purus in mollis nunc sed id semper. Elementum curabitur vitae nunc sed. Mattis aliquam faucibus purus in massa.Ipsum suspendisse ultrices gravida dictum fusce ut placerat orci. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit. Velit sed ullamcorper morbi tincidunt. Ultricies mi eget maurispharetra et. Nunc sed blandit libero volutpat sed cras. Nulla facilisi etiam dignissim diam quis enim lobortis. Vitae tempus quam pellentesque nec nam aliquam sem et. In eu mi bibendum neque egestascongue. Etiam erat velit scelerisque in. Quam nulla porttitor massa id neque aliquam vestibulum morbi. Aliquam purus sit amet luctus venenatis lectus."
  displayDocs = ['Documents','file','icons'];
  displayDocsItems=[{
    "docs":"Project Documents"
  },
  {
    "docs":"Past Events"
  }
]
  /**
     * Constructor
     */
    constructor(
      private _formBuilder: FormBuilder,
      private meta: Meta,
        private http: Http,
        private _profileService: ProfileService,
        private _ComGoConfigService: ComGoConfigService,
        public dialog: MatDialog,
        private httpClient: HttpClient,
        private router: Router,
        private _matSnackBar: MatSnackBar,
        private _translateService: TranslateService,
        private _ComGoTranslationLoaderService: ComGoTranslationLoaderService,
        private titleService: Title 
    ) {
      this.userName = sessionStorage.getItem("username")
      if(this.userName != ''){
       this.profileImageUrl = environment.profileImageUrl
      }
       this.userStatusOptions = [
           {
               'title': 'Online',
               'icon': 'icon-checkbox-marked-circle',
               'color': '#4CAF50'
           },
           {
               'title': 'Away',
               'icon': 'icon-clock',
               'color': '#FFC107'
           },
           {
               'title': 'Do not Disturb',
               'icon': 'icon-minus-circle',
               'color': '#F44336'
           },
           {
               'title': 'Invisible',
               'icon': 'icon-checkbox-blank-circle-outline',
               'color': '#BDBDBD'
           },
           {
               'title': 'Offline',
               'icon': 'icon-checkbox-blank-circle-outline',
               'color': '#616161'
           }
       ];
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
      this.navigation = navigation;
        this._ComGoTranslationLoaderService.loadTranslations(english, spanish);
    this.milestone = this.milestoneData.slice()
    this._unsubscribeAll = new Subject();
    }
    ngOnInit() {
     this.loaded = false
      $(document).ready(function(){
        $("#toolbar").delay(5000);
     })
      this.language = this._translateService.currentLang;
        this.lang = sessionStorage.getItem("lang");
        var donatedParams = {
          username: sessionStorage.getItem("username"),
          projectId: sessionStorage.getItem("projectIdForProjectProfile")
        }
        this.httpClient.post(this.urlPort + "/api/alldonor/getDonorProjectDonation", donatedParams, { withCredentials: true })
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
          this.openSnackBar("Failed to get list of donor");
        }
        return Observable.throw(err)
      })
      .subscribe((res: Response) => {
        this.donated = 0;
        if (res["length"] > 0) {
          this.donated = 1;
        }
      })
        if (this.lang) {
            this._translateService.currentLang = this.lang;
        }
        this.selectedLanguage = _.find(this.languages, { 'id': this._translateService.currentLang });
        this.userType = sessionStorage.getItem("userType")
        // Subscribe to the config changes
        this._ComGoConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });
      if(this.firstLoad){
      var navbar = document.getElementById("navbar");
      var sticky = navbar.offsetTop;
      this.sticky = sticky;
      this.firstLoad = false;
      }
      this.form = this._formBuilder.group({
        visibility: ['', Validators.required]
     });
        this.routeBack  = sessionStorage.getItem('backRoute');
        this.imageCollectionData = [];
        this.videoCollection = [];
        this._ComGoConfigService.config = {
            layout: {
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                },
                toolbar: {
                  hidden: true
              }
            }
        };
        this.username = sessionStorage.getItem("username")
        if (sessionStorage.getItem('userType') == 'Private User' && sessionStorage.getItem("userRules") != '' && sessionStorage.getItem("userRules") != 'undefined' && sessionStorage.getItem("userRules") != undefined) {
            var rules = JSON.parse(sessionStorage.getItem("userRules"))
            this.userRules = rules[0]
        }
        this.lang = sessionStorage.getItem("lang");
    this.lat = parseFloat(sessionStorage.getItem("latForProjectProfile"));
    this.lng = parseFloat(sessionStorage.getItem("lngForProjectProfile"));
        this.approveStatusForPublish = sessionStorage.getItem('approveStatusForPublish');
        this.fundAllocationType = sessionStorage.getItem("fundAllocationType")
    this.currency = sessionStorage.getItem('currencyTypeForProjectProfile');
    this.projectOwner = sessionStorage.getItem('projectOwnerForProjectProfile');
    this.fundNotAllocated = Number(sessionStorage.getItem('fundNotAllocated'))
    this.viewActivities = 0;
    this.loading1 = true;
    this.fundBudgeted = sessionStorage.getItem('fundBudgeted');
    this.projectStatusForPublish = sessionStorage.getItem('projectStatusForPublish');
        this.SDGType = JSON.parse(sessionStorage.getItem("SDG"));
        this.projectApproveStatus =  sessionStorage.getItem("projectApproveStatus")
        this.projectId = sessionStorage.getItem("projectIdForProjectProfile")
        this.lang = sessionStorage.getItem("lang");
        var projectFlag = sessionStorage.getItem("flagForProjectProfile");
        this.projectName = sessionStorage.getItem("projectNameForProjectProfile");
        this.username = sessionStorage.getItem("username");
        this.status = sessionStorage.getItem("projectStatusForProjectProfile");
        this.backFromExpense = sessionStorage.getItem("backFromMilestone");
        this.default = '/DefaultImage/default.jpg';
        this.defaultImageUrl = this.imageUrl + this.default;

        if (this.backFromExpense != 'true') {
            this.backFromExpense = 'false';
        }
        if (this.lang == 'en' || this.lang == null) {
            this.sdgUrl = "assets/SDG/";
            this.imageExtenstion = ".png";
        } else {
            this.sdgUrl = "assets/SDGSpanish/";
            this.imageExtenstion = ".jpg";
        }
        this.loading1 = true;
        var projId = sessionStorage.getItem("projectIdForProjectProfile");
        this.httpClient.get(this.urlPort + "/api/projects/getByProjId/" + this.projectId, { withCredentials: true })
            .map(
                (response) => response
            ).catch((err) => {
                var error = err["_body"]
                if (error == "session expired") {
                    this.sessionSnackBar(err["_body"]);
                    this.router.navigate(['/pages/auth/login-2']);
                } else {
                    var snackBar = this._translateService.instant("Failed to get project details");
                    this.openSnackBar(snackBar);
                }
                this.loading1 = false;
                return Observable.throw(err)
            })
            .subscribe(res => {
                this.loading1 = false;
                this.dataOfProjectByProjectId = res;
                this.approved = this.dataOfProjectByProjectId.isApproved
                this.isPublished = this.dataOfProjectByProjectId.isPublished
                var projectData;
                projectData = res
                this.fundNotAllocated = projectData.fundNotAllocated
                // var arr = [];
                // for (var i = 0; i < this.dataOfProjectByProjectId.projectOwner.length; i++) {
                //     arr.push(this.dataOfProjectByProjectId.projectOwner[i].OrgName)
                // }
                // this.ngoName = arr

                this.projectOwner = this.dataOfProjectByProjectId.projectOwner;
                this.projectsAll = res;
            this.percentage = (this.projectsAll.fundRaised) * 100 / this.projectsAll.projectBudget
            // domain: ['#00d1b2', 'lightgrey']
            this.widget6 = {
              currentRange : 'TW',
              legend       : false,
              explodeSlices: false,
              labels       : true,
              doughnut     : true,
              gradient     : false,
              scheme       : {
                  domain: ['#01579b', 'lightgrey']
              },
              onSelect     : (ev) => {
                  console.log(ev);
              }
          };
          
          var balancePer = 100 - this.percentage
          this.projectData = [
            {name: "Fund Raised in %", value: this.percentage },
            {name: "Balance in %", value: balancePer}
          ]
            this.balance = this.projectsAll.projectBudget - this.projectsAll.fundRaised   
          this.form.controls['visibility'].setValue(this.projectsAll["visibility"]);  
          })

             /**
    * @author: Kuldeep
    * @argument:projectId
    * @description:Get data of projectFiles by Id
    */
   
        this.httpClient.get(this.urlPort + "/api/projectdoc/allByProjId/" + this.projectId, { withCredentials: true})
        .map(
          (response) => response
        )
        .catch((err) => {
          this.loading1 = false;
          var error = err["_body"]
          if(error == "session expired"){
            this.sessionSnackBar(err["_body"]);
            this.router.navigate(['/pages/auth/login-2']);
          }
          return Observable.throw(err)
        })
        .subscribe(res => {
          this.loading1 = false;
          this.projectDocument = res;
          if(this.projectDocument.length > 0){
          this.projectFile = this.projectDocument[0].docName
          }
          
        })
  //End


  /**
   * @author: Kuldeep
   * @argument:projectId
   * @description:Get data of projectFiles by Id
   */
  this.httpClient.get(this.urlPort + "/api/projects/projectFiles/" + this.projectId, { withCredentials: true})
  .map(
    (response) => response
  )
  .catch((err) => {
    this.loading1 = false;
    var error = err["_body"]
    if(error == "session expired"){
      this.sessionSnackBar(err["_body"]);
      this.router.navigate(['/pages/auth/login-2']);
    }else{
      // var snackBar = this._translateService.instant("Failed to get project files");
    // this.openSnackBar(snackBar);
    }
    return Observable.throw(err)
  })
  .subscribe((res: any[]) => {
    var getData = res;
    var pastEventSet = [];
    var projectSupporterSet = [];
    var pastEventSetTableData;
    var projectSupporterTableData;
    this.j = 0;
    this.k = 0;
    for (var i = 0; i < getData.length; i++) {
      if (getData[i].projectRelation == 'Past Event') {
        if (this.j < 3) {
          pastEventSetTableData = getData[i];
          pastEventSet.push(pastEventSetTableData);
          this.j++;
        }
      }
      if (getData[i].projectRelation == 'Project Supporter') {
        if (this.k < 3) {
          projectSupporterTableData = getData[i];
          projectSupporterSet.push(projectSupporterTableData);
          this.k++;
        }
      }
    }
    this.pastEvents = pastEventSet;
    this.projectSupporters = projectSupporterSet;
    this.loading1 = false;
  })
//End

            if (this.viewActivities == 0) {
                this.displayedColumns = ['milestone', 'startDate', 'endDate', 'status', 'operation'];
              }
              else if (this.viewActivities == 1) {
                this.displayedColumns = ['activity', 'startDate', 'endDate', 'funds', 'status', 'Remarks', 'operation'];
              }

              var projId = sessionStorage.getItem("projectIdForProjectProfile");
              this.loading1 = true;
              this.httpClient.get(this.urlPort + "/api/milestone/getProjectMilestones/" + projId, { withCredentials: true })
                .map(
                  (response) => response
                ).catch((err) => {
                  this.loading1 = false;
                  var error = err["_body"]
                  if (error == "session expired") {
                    this.sessionSnackBar(err["_body"]);
                    this.router.navigate(['/pages/auth/login-2']);
                  } else {
                    var snackBar = this._translateService.instant("Failed to get all details! Try again");
                    this.openSnackBar(snackBar)
                  }
                  return Observable.throw(err)
                })
                .subscribe(res => {
                  this.loading1 = false;
                  this.dataOfMilestoneByProjectId = JSON.parse(res['data']);
                  this.milestone = this.dataOfMilestoneByProjectId
                  // this.dataSource = new MatTableDataSource(this.dataOfProjectByProjectId);
                  // var tabledata = [];
                  // // if (this.role != 'donor') {
                  // this.milestone = this.dataOfProjectByProjectId.milestones;
                  // this.milestone.sort((a, b) => {
                  //   return <any>new Date(a.startDate) - <any>new Date(b.startDate);
                  // });
                  // this.dataSource = new MatTableDataSource(this.milestone);
                  // this.dataSource.paginator = this.paginator;
                  // var milestones = this.dataOfProjectByProjectId.milestones;
                  // for (var i = 0; i < milestones.length; i++) {
                  //   var activities = milestones[i].activities
                  //   for (var j = 0; j < activities.length; j++) {
                  //     activities[j].milestoneId = milestones[i].milestoneId
                  //     this.allActivities.push(activities[j]);
                  //   }
                  // }
                  // this.allActivities.sort((a, b) => {
                  //   return <any>new Date(a.startDate) - <any>new Date(b.startDate);
                  // });
                  // // } 
                  // // else {
                  // var milestones = this.dataOfProjectByProjectId.milestones;
                  // for (var i = 0; i < milestones.length; i++) {
                  //   if (milestones[i].approved == true || milestones[i].fundAllocated > 0) {
                  //     tabledata.push(milestones[i]);
                  //   }
                  // }
                  // this.milestone = tabledata;
                  // this.dataSource = new MatTableDataSource(this.milestone);
                  // this.dataSource.paginator = this.paginator;
                  // // }
                  // sessionStorage.setItem("projectStatusForPublish", this.dataOfProjectByProjectId.published);
                  // sessionStorage.setItem("approveStatusForPublish", this.dataOfProjectByProjectId.approved);
                  // this.backFromExpense = sessionStorage.getItem("backFromMilestone");
                  // if (this.backFromExpense == 'true') {
                  //   $(document).ready(function () {
                  //     var milestoneId = sessionStorage.getItem("milestoneIdTillActivity");
                  //     $("#" + milestoneId).trigger("click");
                  //   });
                  //   sessionStorage.setItem("backFromMilestone", "false")
                  // }
                })

            $(document).ready(()=> {
              $(window).scroll(function(){
                console.log("scroll")
              })
              var windoxSize = window.screen.height;
              $(".scroll").css("height",windoxSize);
              console.log("windoxSize: ",windoxSize)
            /**
             * @author: Kuldeep
             * @description: This api will return project ratings
             */
            this.loading1 = true;
            this.httpClient.get(this.urlPort + "/api/projects/getProjRatings/" + this.projectId, { withCredentials: true })
            .map(
                (response) => response
            ).catch((err) => {
                var error = err["_body"]
                if (error == "session expired") {
                    this.sessionSnackBar(err["_body"]);
                    this.router.navigate(['/pages/auth/login-2']);
                } 
                $(".full-stars"). css("width", 0);
                this.loading1 = false;
                return Observable.throw(err)
            })
            .subscribe(res => {
                this.loading1 = false;
               console.log("getByProjRating res: ",res)
               var totalRating = 0
               for(var i=0;i<res["length"];i++){
                totalRating = totalRating + Number(res[i].rating) 
               }
               var average = totalRating/res["length"]
               var per = average * 17
               console.log("totalRating: ",totalRating,per)
               $(".full-stars"). css("width", per);
            })
            /** */
        })
        this.loading1 = true;
        this.httpClient.get(this.urlPort + "/api/projectImage/getImageByProjId/" + this.projectId, { withCredentials: true })
            .map(
                (response) => response
            ).catch((err) => {
                this.bgImageUrl = ''
                var error = err["_body"]
                if (error == "session expired") {
                    this.sessionSnackBar(err["_body"]);
                    this.router.navigate(['/pages/auth/login-2']);
                } 
                this.loading1 = false;
                return Observable.throw(err)
            })
            .subscribe(res => {
                if (res == '') {
                    this.bgImageUrl = ''
                }
                else {
                  this.loaded = true;
                    this.imageCollection = res;
                    this.imageName = this.imageCollection[this.imageCollection.length - 1].imageName;
                    this.bgImageUrl = this.imageUrl + '/' + this.projectId + '/' + 'img1';
                }
                this.loading1 = false;
            })

    //     $(document).ready(()=> {
    //         $('#profileMilestones').trigger('click');
    //         $("#scroll").scroll(()=>{
    //           function elementScrolled(elem)
    // {
    //     var docViewTop = $(window).scrollTop() + 200;
    //     var docViewBottom = docViewTop + $(window).height();
    //     console.log("height: ",docViewTop,docViewBottom)
    //     var elemTop = $(elem).offset().top;
    //     return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
    // }
    // if(elementScrolled('#destination1')) {
    //     this.selectedItem = 'tab1'
    // }
    // else if(elementScrolled('#destination2')) {
    //     this.selectedItem = 'tab2'
    // }
    // else if(elementScrolled('#destination3') || elementScrolled('#timelineEnd')) {
    //     this.selectedItem = 'tab3'
    // }
    // else if(elementScrolled('#destination4')) {
    //     this.selectedItem = 'tab4'
    // }
    // else if(elementScrolled('#destination5')) {
    //     this.selectedItem = 'tab5'
    // }
    // else if(elementScrolled('#destination6')) {
    //     this.selectedItem = 'tab6'
    // }
    // else if(elementScrolled('#destination7')) {
    //     this.selectedItem = 'tab7'
    // }
                    
    //         });
    //     });


        /**
         * @author: Kuldeep
         * @argument:none
         * @description:Get allAudit
         */
        this.loading1 = true;
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
                this.activities = res.reverse();

                this._profileService.timelineOnChanged
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe(timeline => {
                        this.timeline = timeline.activities;
                        for (var i = 0; i < this.activities.length; i++) {
                            this.tableData = {}
                            var date = this.activities[i].Timestamp.toString();
                            var year = date.slice(0, 4)
                            var month = date.slice(5, 7)
                            var day = date.slice(8, 10)
                            var time = date.slice(11, 19)
                            if (this.activities[i].Value.flag.startsWith('Partial Validation for Activity')) {
                                var str1 = this.activities[i].Value.flag;
                                var activityId = str1.split("-", 3);
                                this.tableData["Status"] = 'Partial Validation done for Activity ' + activityId[1] +' by '+activityId[2];
                            } else if (this.activities[i].Value.flag.startsWith('Validation for Activity')) {
                                var str2 = this.activities[i].Value.flag;
                                var activityId = str2.split("-", 3);
                                this.tableData["Status"] = 'Validation done for Activity ' + activityId[1] +' by '+activityId[2];
                            } else if (this.activities[i].Value.flag.startsWith('Funds transferred from')) {
                                var str3 = this.activities[i].Value.flag;
                                var activityId = str3.split("-", 4);
                                this.tableData["Status"] = 'Fund Transferred from ' + activityId[1] + ' to ' + activityId[2] + ' for Activity ' + activityId[3];
                            } else if (this.activities[i].Value.flag.startsWith('Donation')) {
                                this.tableData["Status"] = this.activities[i].Value.flag;
                            } else {
                                var str4 = this.activities[i].Value.flag;
                                var Stat = str4.split(" ", 3);
                                var status = Stat[0] + " " + Stat[2]
                                this.tableData["Status"] = this.activities[i].Value.flag
                            }
                            this.tableData["fundGoal"] = this.activities[i].Value.fundGoal;
                            this.tableData["projectBudget"] = this.activities[i].Value.projectBudget;
                            this.tableData["timeStamp"] = new Date(year + "/" + month + "/" + day + " " + time + " UTC");
                            this.tableData["txnId"] = this.activities[i].TxId;
                            this.tableData["fundRaised"] = this.activities[i].Value.fundRaised;
                            this.tableData["fundAllocated"] = this.activities[i].Value.fundAllocated;
                            this.tableData["avatar"] = "assets/images/avatars/alice.jpg";
                            this.tableData["media"] = "assets/images/examples/shiba2.jpg"
                            this.timeLine.push(this.tableData);
                        }
                        this.loading1 = false;
                    });

            })
            var _projId = this.projectId;
        this.loading1 = true;
        this.httpClient.get(this.urlPort + "/api/projectImage/getImageByProjId/" + _projId, { withCredentials: true })
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
            .subscribe((res: any[]) => {
                // this.imageCollection = res;

                for (var i = 0; i < res.length; i++) {
                    if (res[i].type.startsWith("image")) {
                        this.imageCollectionData.push(res[i])
                    }
                    if (res[i].type.startsWith("video")) {
                        this.videoCollection.push(res[i])
                    }
                }
                this.loading1 = false;
            })

            this.displayedColumnsToDo = ['activity', 'status', 'operation'];
            this.loading1 = true;
            this.httpClient.get(this.urlPort + "/api/projects/getProjectActivities/" + this.projectId, { withCredentials: true })
      .map(
        (response) => response
      ).catch((err) => {
        this.loading1 = false;
        var error = err["_body"]
        if (error == "session expired") {
          this.sessionSnackBar(err["_body"]);
          this.router.navigate(['/pages/auth/login-2']);
        } else {
          var snackBar = this._translateService.instant("Failed to get all details! Try again");
          this.openSnackBar(snackBar)
        }
        return Observable.throw(err)
      })
      .subscribe(res => {
        var dataOfActivitiesByProjectId;
        dataOfActivitiesByProjectId = JSON.parse(res['data']);
          this.activitiesData = dataOfActivitiesByProjectId;
          if (this.activitiesData != null) {
            for (var i = 0; i < this.activitiesData.length; i++) {
              if(this.activitiesData[i].Record.status != 'Activity Approved'){
                this.activityApprovedStatus = 1;
                break;
              } else {
                this.activityApprovedStatus = 0;
              }
            }
          }
          this.loading1 = false;
      })

      if(this.approveStatusForPublish == 'true'){
        this.todoData = [
          {
            "activityName": "Project need to be Published",
            "currentStatus": "Approved",
          }]
      } else if(this.approveStatusForPublish == 'false'){
        this.todoData = [
                {
                  "activityName": "All the activities must be approved to approve the project",
                  "currentStatus": "Not Approved",
                }]
      }
    }

    /** 
       * @author:sagar
       * @argument:string
       * @description:open snackbar
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
    uploadFile(event) {
        this.filesToUpload = <Array<File>>event.target.files;
        const files: Array<File> = this.filesToUpload;
        if (event.target.files[0].type.startsWith("image") || event.target.files[0].type.startsWith("video")) {
            var fd = new FormData();
            this.projectId = sessionStorage.getItem("projectIdForProjectProfile")
            var _projId = this.projectId;
            var filesData = [];
            var tableData;
            this.loading1 = true;
            for (var i = 0; i < files.length; i++) {
                var randomImageId = Math.floor(Math.random() * (999999 - 100000)) + 100000;
                var fileName = files[i].name + randomImageId
                fd.append("files", files[i], files[i]['name'] + randomImageId);
                tableData = {
                    imagePath: '/uploadImage/' + 'projectimages/' + this.projectId + '/',
                    projectId: this.projectId,
                    imageName: fileName,
                    type: files[i].type
                }
                filesData.push(tableData);
            }
            var fileInformation = filesData
            fd.append('fileInformation', JSON.stringify(fileInformation));
            var purpose = 'uploadProjectProfileImage'
            var path = './projectimages/' + _projId + '/';
            this.http.post(this.urlPort + "/api/uploadMultipleImage/" + _projId, fd, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
            .map((response) => response.json())
            .catch((err) => {
                this.loading1 = false;
                        var error = err["_body"]
                        if (error == "session expired") {
                            this.sessionSnackBar(err["_body"]);
                            this.router.navigate(['/pages/auth/login-2']);
                        } else {
                            this.openSnackBar("Failed to upload file");
                        }
                        return Observable.throw(err)
            })
            .subscribe(res => {
                this.loading1 = false;
                var fileUploaded = this._translateService.instant('File uploaded');
                this.openSnackBar(fileUploaded);
                window.location.reload();
            })
        } else {
            var snackBar = this._translateService.instant("Only Images and videos are accepted");
            this.openSnackBar(snackBar);
        }
    }

    // onTabChanged(event: MatTabChangeEvent) {
    //     var index = event.index;
    //     if (index == 4) {
    //         this.infoComponent.ngOnInit();
    //     }
    //     else if (index == 2) {
    //         this.timelineComponent.ngOnInit();
    //     }
    //     else if (index == 1) {
    //         this.activitiesComponent.ngOnInit();
    //     }
    // }

    validationApproved(val) {
        var check
        var validateApproveDialogResult;
        var validators = val.validatorId.split("-", 2);
        var projectId = sessionStorage.getItem("projectIdForProjectProfile");
        var financialValidator = validators[1];
    
        if (val.status == 'Proof Submitted' && financialValidator) {
          check = 'Partial Validation Successful-' + sessionStorage.getItem("username");
        } else {
          check = 'Validation Successful';
        }
        // var data = {
        //   projectId: projectId,
        //   milestoneId: this.milestoneId,
        //   activityId: val.activityId,
        //   check: check
        // }
    
        let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
          width: '500px',
          height: '200px',
          data: { operation: 'validateApprove' }
        });
        dialogRef.afterClosed().subscribe(result => {
          validateApproveDialogResult = result;
          if (validateApproveDialogResult == 'yes') {
            val.projectId = projectId
            val.milestoneId = this.milestoneId
            val.status = check
            val.milestoneStatus = sessionStorage.getItem("milestoneStatusTillActivity")
            val.projectStatus = sessionStorage.getItem("projectStatusForProjectProfile")
            this.loading1 = true;
            this.httpClient.post(this.urlPort + "/api/activity/BKCActivityValidation", val, { withCredentials: true })
              .catch((err) => {
                this.loading1 = false
                var error = err["_body"]
                if (error == "session expired") {
                  this.sessionSnackBar(err["_body"]);
                  this.router.navigate(['/pages/auth/login-2']);
                }
                return Observable.throw(err)
              })
              .subscribe((res: Response) => {
                this.loading1 = false;
                var snackBar = this._translateService.instant("Validated");
                this.openSnackBar(snackBar)
                $('#approvalButtonForValidator').hide();
                $('#rejectButtonForValidator').hide();
                sessionStorage.setItem("flagForHitAPI", '1');
                this.ngOnInit()
              })
          } else if (validateApproveDialogResult == 'no') {
            this.loading1 = false;
            var snackBar = this._translateService.instant('operation cancelled!!!');
            this.openSnackBar(snackBar)
          }
        })
      }
    
    
      validationRejected(val) {
        var check = 'Validation failed';
        var validateRejectDialogResult;
        var projectId = sessionStorage.getItem("projectIdForProjectProfile");
        let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
          width: '500px',
          height: '200px',
          data: { operation: 'validateReject' }
        });
        dialogRef.afterClosed().subscribe(result => {
          validateRejectDialogResult = result;
          if (validateRejectDialogResult == 'yes') {
            val.projectId = projectId
            val.milestoneId = this.milestoneId
            val.status = check
            val.milestoneStatus = sessionStorage.getItem("milestoneStatusTillActivity")
            val.projectStatus = sessionStorage.getItem("projectStatusForProjectProfile")
            this.loading1 = true;
            this.httpClient.post(this.urlPort + "/api/activity/BKCActivityValidation", val, { withCredentials: true })
              .catch((err) => {
                this.loading1 = false
                var error = err["_body"]
                if (error == "session expired") {
                  this.sessionSnackBar(err["_body"]);
                  this.router.navigate(['/pages/auth/login-2']);
                }
                return Observable.throw(err)
              })
              .subscribe((res: Response) => {
                this.loading1 = false;
                var snackBar = this._translateService.instant("Validated");
                this.openSnackBar(snackBar)
                $('#approvalButtonForValidator').hide();
                $('#rejectButtonForValidator').hide();
                sessionStorage.setItem("flagForHitAPI", '1')
                this.ngOnInit();
              })
          } else if (validateRejectDialogResult == 'no') {
            this.loading1 = false;
            var snackBar = this._translateService.instant('operation cancelled!!!');
            this.openSnackBar(snackBar)
          }
        })
      }
    
    
      viewProof(val) {
        sessionStorage.setItem('activityStatusForProfile', val.status);
        sessionStorage.setItem('activityIdForProfile', val.activityId);
        sessionStorage.setItem('milestoneIdForProfile', this.milestoneId);
        sessionStorage.setItem("activityName", val.activityName)
        sessionStorage.setItem("activityFundReleased", val.fundReleased)
        this.router.navigate(["/expenses/expenses/viewexpenses"]);
      }
    
      viewExpenses(val) {
        sessionStorage.setItem('activityStatusForProfile', val.status);
        sessionStorage.setItem('activityIdForProfile', val.activityId);
        sessionStorage.setItem('milestoneIdForProfile', this.milestoneId);
        sessionStorage.setItem('activityFundRequested', val.fundAllocated);
        sessionStorage.setItem("activityName", val.activityName)
        this.router.navigate(["/expenses/expenses/viewexpenses"]);
      }
    
      releaseFund(val) {
        var releaseFundDialogResult;
        let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
          width: '500px',
          height: '200px',
          data: { operation: 'releaseFund' }
        });
        dialogRef.afterClosed().subscribe(result => {
          releaseFundDialogResult = result;
          if (releaseFundDialogResult == 'yes') {
            this.loading1 = true;
            var releaseData = {
              activityId: val.activityId,
              status: 'Request FundFund Released',
              fundReq: val.activityBudget,
              activityName: val.activityName,
              milestoneStatus: sessionStorage.getItem("milestoneStatusTillActivity"),
              projectStatus: sessionStorage.getItem("projectStatusForProjectProfile")
            }
            this.httpClient.post(this.urlPort + "/api/milestone/BKCFundReleased", releaseData, { withCredentials: true })
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
                var fundReleased = this._translateService.instant('Fund Released!!!');
                this.loading1 = false;
                this.openSnackBar(fundReleased);
                this.ngOnInit()
              })
          } else if (releaseFundDialogResult == 'no') {
            this.loading1 = false;
            var snackBar = this._translateService.instant('operation cancelled!!!');
            this.openSnackBar(snackBar)
          }
        })
      }
    
      backToMilestones() {
        this.viewActivities = 0;
        this.displayedColumns = ['milestone', 'startDate', 'endDate', 'status', 'operation'];
        sessionStorage.setItem('flagForHitAPI', '1')
        this.ngOnInit();
      }

      sendForApproval(activityData) {
        var sendForApprovalDialogResult;
        var organizations = JSON.parse(sessionStorage.getItem("organization"))
        var arr = []
        for(var i = 0;i<organizations.length; i++){
          arr.push(organizations[i].OrgName)
        }
        activityData.organization = arr
        activityData.projectId = sessionStorage.getItem('projectIdForProjectProfile');
        activityData.milestoneId = this.milestoneId;
        activityData.milestoneStatus = 'Budgeted'
        activityData.remarks = 'No Remarks Added'
        activityData.projectStatus = sessionStorage.getItem("projectStatusForProjectProfile")
        let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
          width: '500px',
          height: '200px',
          data: { operation: 'sendForApprovalActivity' }
        });
        dialogRef.afterClosed().subscribe(result => {
          sendForApprovalDialogResult = result;
          if (sendForApprovalDialogResult == 'yes') {
    
            activityData.status = 'Budgeted';
            this.loading1 = true;
            this.httpClient.post(this.urlPort + "/api/activity/sendForApproval", activityData, { withCredentials: true })
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
                  var snackBar = this._translateService.instant("getting some error on updating Activity");
                  this.openSnackBar(snackBar)
                }
                return Observable.throw(err)
              })
              .subscribe((res: Response) => {
                this.loading1 = false;
                var snackBar = this._translateService.instant('Activity Budgeted!!!');
                this.openSnackBar(snackBar)
                this.ngOnInit();
              })
          } else if (sendForApprovalDialogResult == 'no') {
            this.loading1 = false;
            var snackBar = this._translateService.instant('operation cancelled!!!');
            this.openSnackBar(snackBar)
          }
        })
      }
    
      viewActivitiesDetails(milestoneId, data) {
        // this.titleService.setTitle( "Activities" );
        sessionStorage.setItem("milestoneIdTillActivity", data.milestoneId);
        sessionStorage.setItem("milestoneStatusTillActivity", data.status);
        sessionStorage.setItem("milestoneNameTillActivity", data.milestoneName);
        sessionStorage.setItem("startDateForActivity", data.startDate);
        sessionStorage.setItem("endDateForActivity", data.endDate);
        sessionStorage.setItem("milestoneIdForValidator", data.milestoneId);
        this.milestoneStartDate = data.startDate
        this.milestoneEndDate = data.endDate
        this.viewActivities = 1;
        this.displayedColumns = ['activity', 'startDate', 'endDate', 'funds', 'status', 'Remarks', 'operation', 'exit'];
        this.loading1 = true;
        this.httpClient.get(this.urlPort + "/api/activity/getMilestoneActivities/" + data.milestoneId, { withCredentials: true })
          .map(
            (response) => response
          ).catch((err) => {
            this.loading1 = false;
            var error = err["_body"]
            if (error == "session expired") {
              this.sessionSnackBar(err["_body"]);
              this.router.navigate(['/pages/auth/login-2']);
            } else {
              var snackBar = this._translateService.instant("Failed to get all details! Try again");
              this.openSnackBar(snackBar)
            }
            return Observable.throw(err)
          })
          .subscribe(res => {
            this.loading1 = false;
            this.activities = JSON.parse(res['data']);
            this.activities.sort((a, b) =>  {
              return <any>new Date(a.Record.startDate) - <any>new Date(b.Record.startDate);
            });
          })
      }
    
      approveActivity(activityData, statusFlag) {
        var ApproveOrRejectActivityDialogResult;
        var activityDetails = activityData;
        activityDetails.projectId = sessionStorage.getItem('projectIdForProjectProfile')
        activityDetails.statusFlag = statusFlag;
        activityDetails.projectStatus = sessionStorage.getItem("projectStatusForProjectProfile")
    
        let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
          width: '500px',
          height: '200px',
          data: { operation: 'ApproveOrRejectActivity' }
        });
        dialogRef.afterClosed().subscribe(result => {
          ApproveOrRejectActivityDialogResult = result;
          if (ApproveOrRejectActivityDialogResult.ans == 'yes') {
            if (activityDetails.statusFlag == true) {
              activityDetails.status = 'Activity Approved'
            } else {
              activityDetails.status = 'Activity Rework'
            }
            activityDetails.remarks = ApproveOrRejectActivityDialogResult.remarks;
            activityDetails.isApproved = 'true'
            this.loading1 = true;
            this.httpClient.get(this.urlPort + "/api/activity/getMilestoneActivities/" + activityDetails.milestoneId, { withCredentials: true })
              .map(
                (response) => response
              ).catch((err) => {
                this.loading1 = false;
                var error = err["_body"]
                if (error == "session expired") {
                  this.sessionSnackBar(err["_body"]);
                  this.router.navigate(['/pages/auth/login-2']);
                } else {
                  var snackBar = this._translateService.instant("Failed to get all details! Try again");
                  this.openSnackBar(snackBar)
                }
                return Observable.throw(err)
              })
              .subscribe(res => {
                this.loading1 = false;
                this.activities = JSON.parse(res['data']);
                for (var i = 0; i < this.activities.length; i++) {
                  if ((this.activities[i].Record.status == 'Activity Created' || this.activities[i].Record.status == 'Activity Updated' || this.activities[i].Record.status == 'Activity Rework' || this.activities[i].Record.status == 'Budgeted') && (this.activities[i].Record.activityId != activityDetails.activityId)) {
                    activityDetails.milestoneStatus = 'Pending'
                    break;
                  } else {
                    if (activityDetails.statusFlag == true) {
                      activityDetails.milestoneStatus = 'Approved'
                    } else {
                      activityDetails.milestoneStatus = 'Pending'
                    }
                  }
                }
                this.httpClient.post(this.urlPort + "/api/activity/approveActivity", activityDetails, { withCredentials: true })
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
                      var snackBar = this._translateService.instant("error while approving Activity");
                      this.openSnackBar(snackBar);
                    }
                    return Observable.throw(err)
                  })
                  .subscribe((res: Response) => {
                    this.loading1 = false;
                    if (statusFlag == true) {
                      var snackBar = this._translateService.instant('Activity Approved');
                      this.openSnackBar(snackBar);
                      sessionStorage.setItem("flagForHitAPI", '1')
                      this.viewActivities = 0;
                    } else {
                      var snackBar = this._translateService.instant('Activity Rejected');
                      this.openSnackBar(snackBar);
                      sessionStorage.setItem("flagForHitAPI", '1')
                      this.viewActivities = 0;
                    }
                    this.ngOnInit()
                  })
              })
          } else {
            this.loading1 = false;
            var snackBar = this._translateService.instant('operation cancelled!!!');
            this.openSnackBar(snackBar)
          }
        })
      }

      closeActivity(activityData,index) {
        activityData.status = "Activity Closed"
        activityData.projectOwner = sessionStorage.getItem('projectOwnerForProjectProfile');
        activityData.milestoneId = sessionStorage.getItem("milestoneIdTillActivity")
        activityData.projectId = sessionStorage.getItem("projectIdForProjectProfile");
        activityData.milestoneStatus = sessionStorage.getItem("milestoneStatusTillActivity")
        activityData.projectStatus = sessionStorage.getItem("projectStatusForProjectProfile")
        let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
          width: '500px',
          height: '200px',
          data: { operation: 'closeActivity' }
        });
        dialogRef.afterClosed().subscribe(result => {
          var closeActivityResult = result;
          if (closeActivityResult == 'yes') {
            this.loading1 = true
            activityData.projectName = sessionStorage.getItem("projectNameForProjectProfile");
            this.loading1 = true;
                this.httpClient.get(this.urlPort + "/api/proofs/all/" + activityData.activityId + '/' + sessionStorage.getItem("projectIdForProjectProfile"), { withCredentials: true })
                  .map(
                    (response) => response
                  ).catch((err) => {
                    this.loading1 = false;
                    var error = err["_body"]
                    if (error == "session expired") {
                      this.sessionSnackBar(err["_body"]);
                      this.router.navigate(['/pages/auth/login-2']);
                    } else {
                      var snackBar = this._translateService.instant("Failed to get proof details! Try again");
                      this.openSnackBar(snackBar)
                    }
                    return Observable.throw(err)
                  })
                  .subscribe(res => {
                    var totalProofAmount = 0;
                    var funds = 0;
                    for (var j = 0; j < res["length"]; j++) {
                      totalProofAmount = totalProofAmount + res[j].amount
                    }
                    funds = activityData.fundReleased - totalProofAmount;
                    // this.ngOnInit();
                    if (funds > 0) {
                      activityData.status = "Activity Closed";
                      activityData.projectName = sessionStorage.getItem("projectNameForProjectProfile");
                      this.loading1 = true;
                      this.httpClient.post(this.urlPort + "/api/activity/closeActivity", activityData, { withCredentials: true })
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
                            var snackBar = this._translateService.instant("error while closing Activity");
                            this.openSnackBar(snackBar)
                          }
                          return Observable.throw(err)
                        })
                        .subscribe((res: Response) => {
                          this.openSnackBar('Activity Closed')
                          this.getNextActivity(activityData, funds, index)
                        })
                    } else {
                      activityData.status = "Activity Closed";
                      activityData.projectName = sessionStorage.getItem("projectNameForProjectProfile");
                      this.httpClient.post(this.urlPort + "/api/activity/closeActivity", activityData, { withCredentials: true })
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
                            var snackBar = this._translateService.instant("error while closing Activity");
                            this.openSnackBar(snackBar)
                          }
                          return Observable.throw(err)
                        })
                        .subscribe((res: Response) => {
                          this.loading1 = false;
                          this.openSnackBar('Activity Closed')
                          this.ngOnInit();
                        })
                    }
                  })
          } else {
            this.loading1 = false;
            var snackBar = this._translateService.instant('operation cancelled!!!');
            this.openSnackBar(snackBar)
          }
        })
      }

      getNextActivity(activityData, funds, index) {
        var nextActivity;
        var projId = sessionStorage.getItem("projectIdForProjectProfile");
        var activityDate = new Date(activityData.startDate);
        this.loading1 = true;
        this.httpClient.get(this.urlPort + "/api/projects/getProjectActivities/" + projId, { withCredentials: true })
          .map(
            (response) => response
          ).catch((err) => {
            this.loading1 = false;
            var error = err["_body"]
            if (error == "session expired") {
              this.sessionSnackBar(err["_body"]);
              this.router.navigate(['/pages/auth/login-2']);
            } else {
              var snackBar = this._translateService.instant("Failed to get all details! Try again");
              this.openSnackBar(snackBar)
            }
            return Observable.throw(err)
          })
          .subscribe(res => {
            this.allActivities = JSON.parse(res['data']);
            this.allActivities.sort((a, b) =>  {
              return <any>new Date(a.Record.startDate) - <any>new Date(b.Record.startDate);
            });
            nextActivity = this.allActivities[index + 1].Record
            var requiredFunds = nextActivity.activityBudget - nextActivity.fundAllocated
            nextActivity.funds = funds
            // if(activityData.milestoneId == nextActivity.milestoneId){
            //   nextActivity.milestoneFundAllocated = 0;
            // } else {
            //   nextActivity.milestoneFundAllocated = funds
            // }
            this.httpClient.post(this.urlPort + "/api/activity/balancedFundAllocate", nextActivity, { withCredentials: true })
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
                      var snackBar = this._translateService.instant("error while Allocating Funds");
                      this.openSnackBar(snackBar)
                    }
                    return Observable.throw(err)
                  })
                  .subscribe((res: Response) => {
                    this.loading1 = false;
                    this.ngOnInit();
          })
          })
        // this.httpClient.get(this.urlPort + "/api/milestone/BKCAllByParams/" + projId, { withCredentials: true })
        //   .map(
        //     (response) => response
        //   ).catch((err) => {
        //     this.loading1 = false;
        //     var error = err["_body"]
        //     if (error == "session expired") {
        //       this.sessionSnackBar(err["_body"]);
        //       this.router.navigate(['/pages/auth/login-2']);
        //     } else {
        //       var snackBar = this._translateService.instant("Failed to get all details! Try again");
        //       this.openSnackBar(snackBar)
        //     }
        //     return Observable.throw(err)
        //   })
        //   .subscribe(res => {
        //     nextActivity = this.allActivities[index + 1]
        //     if (nextActivity != undefined) {
        //       nextActivity.projectId = projId;
        //       var balanceFunds = 0;
        //       var requiredFunds = nextActivity.activityBudget - nextActivity.fundAllocated
        //       if (funds >= requiredFunds) {
        //         balanceFunds = funds - requiredFunds
        //         nextActivity.funds = funds
        //       }
        //       else {
        //         nextActivity.funds = funds
        //       }
        //       if (nextActivity.funds > 0) {
        //         this.httpClient.post(this.urlPort + "/api/activity/balancedFundAllocate", nextActivity, { withCredentials: true })
        //           .map(
        //             (response) => response
        //           )
        //           .catch((err) => {
        //             this.loading1 = false;
        //             var error = err["_body"]
        //             if (error == "session expired") {
        //               this.sessionSnackBar(err["_body"]);
        //               this.router.navigate(['/pages/auth/login-2']);
        //             } else {
        //               var snackBar = this._translateService.instant("error while Allocating Funds");
        //               this.openSnackBar(snackBar)
        //             }
        //             return Observable.throw(err)
        //           })
        //           .subscribe((res: Response) => {
        //             this.loading1 = false;
        //             if (res["BCStatus"].startsWith("fundAllocate")) {
        //               var snackBar = this._translateService.instant("Funds has been allocated to next activites.");
        //             } else {
        //               var snackBar = this._translateService.instant("Not enough fund to allocate to the next activity.");
        //             }
        //             this.openSnackBar(snackBar)
        //             this.ngOnInit();
    
        //           })
        //       }
        //     } else {
        //       this.loading1 = false;
        //       var snackBar = this._translateService.instant("Activities does not found to allocate funds.");
        //       this.openSnackBar(snackBar)
        //      this.ngOnInit();
        //     }
        //   })
      }
    
      getActivities(milestoneId) {
        var projId = sessionStorage.getItem("projectIdForProjectProfile");
        this.httpClient.get(this.urlPort + "/api/milestone/BKCAllByParams/" + projId, { withCredentials: true })
          .map(
            (response) => response
          ).catch((err) => {
            this.loading1 = false;
            var error = err["_body"]
            if (error == "session expired") {
              this.sessionSnackBar(err["_body"]);
              this.router.navigate(['/pages/auth/login-2']);
            } else {
              var snackBar = this._translateService.instant("Failed to get all details! Try again");
              this.openSnackBar(snackBar)
            }
            return Observable.throw(err)
          })
          .subscribe(res => {
            this.loading1 = false;
            this.dataOfMilestoneByProjectId = JSON.parse(res['data']);
            this.fundNotAllocated = this.dataOfMilestoneByProjectId.fundNotAllocated
            this.httpClient.get(this.urlPort + "/api/milestone/BKCAllByParams/" + milestoneId, { withCredentials: true })
              .map(
                (response) => response
              ).catch((err) => {
                this.loading1 = false;
                var error = err["_body"]
                if (error == "session expired") {
                  this.sessionSnackBar(err["_body"]);
                  this.router.navigate(['/pages/auth/login-2']);
                } else {
                  var snackBar = this._translateService.instant("Failed to get all details by milestone! Try again");
                  this.openSnackBar(snackBar);
                }
                return Observable.throw(err)
              })
              .subscribe(res => {
                this.loading1 = false;
                this.dataOfProjectByMilestoneId = JSON.parse(res['data']);
    
                this.activities = this.dataOfProjectByMilestoneId.activities;
                if (this.activities != null && this.activities != '' && this.activities != undefined) {
                  this.activities.sort((a, b) => {
                    return <any>new Date(a.startDate) - <any>new Date(b.startDate);
                  });
                }
                this.viewActivities = 1;
                this.milestoneId = milestoneId;
                this.fundReq = this.dataOfProjectByMilestoneId.fundBudgeted;
                this.milestoneName = this.dataOfProjectByMilestoneId.milestoneName;
                this.fundBudgeted = this.dataOfProjectByMilestoneId.fundBudgeted;
              })
          })
      }
    
      allocateFunds(activityData) {
        var allocateFundsResults;
        var requiredAmount = activityData.activityBudget
        if (activityData.fundAllocated < activityData.activityBudget) {
          if (this.fundNotAllocated >= requiredAmount) {
            activityData.funds = requiredAmount;
            let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
              width: '500px',
              height: '200px',
              data: { operation: 'AllocateFunds' }
            });
            dialogRef.afterClosed().subscribe(result => {
              allocateFundsResults = result;
              if (allocateFundsResults == 'yes') {
                if (this.fundNotAllocated > requiredAmount) {
                  activityData.fundsNotAllocated = this.fundNotAllocated - requiredAmount
                } else {
                  activityData.fundsNotAllocated = 0;
                }
                this.loading1 = true;
                activityData.milestoneStatus = "Fund Allocated"
                activityData.projectStatus = sessionStorage.getItem("projectStatusForProjectProfile")
                this.httpClient.post(this.urlPort + "/api/activity/allocateFunds", activityData, { withCredentials: true })
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
                      var snackBar = this._translateService.instant("error while Allocating Funds");
                      this.openSnackBar(snackBar)
                    }
                    return Observable.throw(err)
                  })
                  .subscribe((res: Response) => {
                    this.loading1 = false;
                    var snackBar = this._translateService.instant("Fund Allocated");
                    this.openSnackBar(snackBar)
                    this.ngOnInit();
                  })
              } else {
                this.loading1 = false;
                var snackBar = this._translateService.instant('operation cancelled!!!');
                this.openSnackBar(snackBar)
              }
            })
          } else {
            var snackBar = this._translateService.instant('Amount is not present for Fund Allocation');
            this.openSnackBar(snackBar)
          }
        } else {
          var snackBar = this._translateService.instant('Cannot allocate Fund to this Activity.Fund Budget has been Accomplished');
          this.openSnackBar(snackBar)
        }
      }
    
      addNewMilestone(): void {
        this.router.navigate(["/projects/milestone/addmilestone", { operationalFlag: 0, projectId: sessionStorage.getItem('projectIdForProjectProfile') }]);
      }
    
      addNewActivity(): void {
        this.router.navigate(["/projects/activity/addactivity", { operationalFlag: 0, milestoneId: sessionStorage.getItem("milestoneIdTillActivity") }]);
      }
    
      forEditingMilestone(milestoneId) {
        sessionStorage.setItem("milestoneIdTillActivity", milestoneId);
        this.router.navigate(["/projects/milestone/addmilestone", { operationalFlag: 1, projectId: sessionStorage.getItem('projectIdForProjectProfile'), milestoneId: milestoneId }]);
      }
    
      forUpdatingActivity(index) {
        this.router.navigate(["/projects/activity/addactivity", { operationalFlag: 1, milestoneId: this.milestoneId, activityId: index.activityId }]);
      }
    
      compareDates(date) {
        var endDate = new Date(date);
        return endDate < this.date;
      }

      uploadImageFile(event) {
        this.file = event.target.files[0];
        this.filesToUpload = <Array<File>>event.target.files;
        const files: Array<File> = this.filesToUpload;
        if (event.target.files[0].type.startsWith("image")) {
            var fd = new FormData();
            this.projectId = sessionStorage.getItem("projectIdForProjectProfile")
            var _projId = this.projectId;
            var filesData = [];
            var tableData;
            this.loading1 = true;
            for (var i = 0; i < files.length; i++) {
                var randomImageId = Math.floor(Math.random() * (999999 - 100000)) + 100000;
                var imagename = randomImageId + files[i].name
                fd.append("files", files[i], randomImageId + files[i]['name']);
                tableData = {
                    imagePath: '/uploadImage/' + 'projectimages/' + this.projectId + '/',
                    projectId: this.projectId,
                    imageName: imagename,
                    type: files[i].type
                }
                filesData.push(tableData);
            }
            var fileInformation = filesData
            fd.append('fileInformation', JSON.stringify(fileInformation));
            var purpose = "uploadProjectImages"
            var path = './projectimages/' + _projId + '/';
            this.http.post(this.urlPort + "/api/filesUpload/saveFile/multiple" + "?path=" + path + "&projectId=" + _projId + "&purpose=" + purpose, fd, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
                .map((response) => response.json())
                .catch((err) => {
                    var error = err["_body"]
                    if (error == "session expired") {
                        this.sessionSnackBar(err["_body"]);
                        this.router.navigate(['/pages/auth/login-2']);
                    } else {
                        var snackBar = this._translateService.instant("Failed to upload image");
                        this.openSnackBar(snackBar);
                    }
                    this.loading1 = false;
                    return Observable.throw(err)
                })
                .subscribe(res => {
                    var snackBar = this._translateService.instant("Files uploaded");
                    this.openSnackBar(snackBar);

                    this.loading1 = false;
                    this.ngOnInit();
                    // window.location.reload();
                })
        } else {
            var snackBar = this._translateService.instant("Only Image is accepted");
            this.openSnackBar(snackBar);
        }
    }

    uploadVideoFile(event) {
        this.file = event.target.files[0];
        this.filesToUpload = <Array<File>>event.target.files;
        const files: Array<File> = this.filesToUpload;
        if (event.target.files[0].type.startsWith("video")) {
            var fd = new FormData();
            this.projectId = sessionStorage.getItem("projectIdForProjectProfile")
            var _projId = this.projectId;
            var filesData = [];
            var tableData;
            this.loading1 = true;
            for (var i = 0; i < files.length; i++) {
                var randomImageId = Math.floor(Math.random() * (999999 - 100000)) + 100000;
                var videoname = randomImageId + files[i].name
                fd.append("files", files[i], randomImageId + files[i]['name']);
                tableData = {
                    imagePath: '/uploadImage/' + 'projectimages/' + this.projectId + '/',
                    projectId: this.projectId,
                    imageName: videoname,
                    type: files[i].type
                }
                filesData.push(tableData);
            }
            var fileInformation = filesData
            fd.append('fileInformation', JSON.stringify(fileInformation));
            var purpose = 'uploadProjectVideos'
            var path = './projectimages/' + _projId + '/';
            this.http.post(this.urlPort + "/api/filesUpload/saveFile/multiple" + "?path=" + path + "&projectId=" + _projId + "&purpose=" + purpose, fd, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
                .map((response) => response.json())
                .catch((err) => {
                    var error = err["_body"]
                    if (error == "session expired") {
                        this.sessionSnackBar(err["_body"]);
                        this.router.navigate(['/pages/auth/login-2']);
                    } else {
                        var snackBar = this._translateService.instant("Failed to upload image");
                        this.openSnackBar(snackBar);
                    }
                    this.loading1 = false;
                    return Observable.throw(err)
                })
                .subscribe(res => {
                    var snackBar = this._translateService.instant("Files uploaded");
                    this.openSnackBar(snackBar);
                    this.loading1 = false;
                    this.ngOnInit();
                    // window.location.reload();
                })
        } else {
            var snackBar = this._translateService.instant("Only Video is accepted");
            this.openSnackBar(snackBar);

        }
    }

    deleteImage(imageData) {
        let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
            width: '500px',
            height: '200px',
            data: { operation: 'delete' }
        });
        dialogRef.afterClosed().subscribe(result => {

            var dialogResult = result;
            if (dialogResult == 'yes') {
                var fileInformation = {
                    element: imageData.imageName,
                    oldFilePath: '/projectimages/' + this.projectId + '/' + imageData.imageName,
                    id: imageData._id
                }
                this.loading1 = true;
                this.httpClient.post(this.urlPort + "/api/filesUpload/deleteProjectImage", fileInformation, { withCredentials: true })
                    .catch((err) => {
                        var error = err["_body"]
                        if (error == "session expired") {
                            this.sessionSnackBar(err["_body"]);
                            this.router.navigate(['/pages/auth/login-2']);
                        } else {
                            var snackBar = this._translateService.instant("Image Not Deleted");
                            this.openSnackBar(snackBar);
                        }
                        this.loading1 = false;
                        return Observable.throw(err)
                    })
                    .subscribe((res: Response) => {
                        var snackBar = this._translateService.instant("Image Deleted");
                        this.openSnackBar(snackBar);
                        this.loading1 = false;
                        this.ngOnInit();
                    })
            } else {
                var snackBar = this._translateService.instant("Operation cancelled!!!");
                this.openSnackBar(snackBar);
            }
        })
    }

    deleteVideo(imageData) {
        let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
            width: '500px',
            height: '200px',
            data: { operation: 'delete' }
        });
        dialogRef.afterClosed().subscribe(result => {

            var dialogResult = result;
            if (dialogResult == 'yes') {
                var fileInformation = {
                    element: imageData.imageName,
                    oldFilePath: '/projectimages/' + this.projectId + '/' + imageData.imageName,
                    id: imageData._id
                }
                this.loading1 = true;
                this.httpClient.post(this.urlPort + "/api/filesUpload/deleteProjectImage", fileInformation, { withCredentials: true })
                    .catch((err) => {
                        var error = err["_body"]
                        if (error == "session expired") {
                            this.sessionSnackBar(err["_body"]);
                            this.router.navigate(['/pages/auth/login-2']);
                        } else {
                            var snackBar = this._translateService.instant("Video Not Deleted");
                            this.openSnackBar(snackBar);

                        }
                        this.loading1 = false;
                        return Observable.throw(err)
                    })
                    .subscribe((res: Response) => {
                        var snackBar = this._translateService.instant("Video Deleted");
                        this.openSnackBar(snackBar);

                        this.loading1 = false;
                        this.ngOnInit();
                    })
            } else {
                var snackBar = this._translateService.instant("Operation cancelled!!!");
                this.openSnackBar(snackBar);
            }
        })
    }

    showDialogue(imageName) {
        let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
            width: '500px',
            height: '100px',
            data: { operation: 'setProfile', imageName: imageName }
        });
        dialogRef.afterClosed().subscribe(result => {
            var dialogResult = result;
            if (dialogResult == 'setProfile') {
                var body = {
                    "projectId": this.projectId,
                    "fileName": imageName
                }
                this.httpClient.post(this.urlPort + "/api/filesUpload/profileImage", body, { withCredentials: true })
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
                        window.location.reload();
                    })
            }
        })
    }

    allDonar() {
        sessionStorage.setItem("cameFrom", 'forCrm')
        this.router.navigate(["/donor/donor/alldonor"]);
    
      }
      /**
          * @author: Madhu
          * @argument:none
          * @description:navigate to projectstatus page
          */
      projectStatus() {
        this.router.navigate(["/projects/project/projectstatus"]);
      }
    
      communication() {
        this.router.navigate(["/notification/notification/projectcommunication"]);
      }

      /**
   * @author: Kuldeep.N
   * @method: rateProject
   * @description: opens dialogue to rate project
   */
  rateProject(){
    let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '500px',
      height: '200px',
      data: { operation: 'addReview',projectName:sessionStorage.getItem("projectNameForProjectProfile"), projectId: this.projectId }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'rating complete'){
        window.location.reload();
      }
    })
  }


  editProjectDocuments(event) {
    this.doc = event.target.files[0];
    this.docName = event.target.files[0].name
    var fileInformation1
    if (this.projectDocument.length == 0) {
      var fileName = this.doc.name;
      var extension = fileName.split('.').pop();
      var fd = new FormData();
      this.file = this.doc
      fd.append('file', this.file);
      var _projId = this.projectId;
      fileInformation1 = {
        docPath: '/uploadDocument/' + 'projectDocuments/' + this.projectId + '/',
        projectId: this.projectId,
        docName: 'projectDocument.' + extension,
        docInserted: 0
      }
      fd.append('fileInformation', JSON.stringify(fileInformation1));
      this.loading1 = false;
      var purpose = "uploadProjectDoc"
      var path = './projectDocuments/' + _projId + '/'
      this.http.post(this.urlPort + "/api/filesUpload/saveFile" + "?path=" + path +"&projectId="+ _projId +"&purpose=" + purpose,fd, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
        .map((response) => response.json())
        .catch((err) => {
          this.loading1 = false;
          var error = err["_body"]
          if (error == "session expired") {
            this.sessionSnackBar(err["_body"]);
            this.router.navigate(['/pages/auth/login-2']);
          } else {
            var snackBar = this._translateService.instant("Failed to add project doc");
            this.openSnackBar(snackBar);
          }
          return Observable.throw(err)
        })
        .subscribe(res => {
          this.loading1 = false;
          var projectDocSnackBar = this._translateService.instant("Project Document uploaded");    
          this.openSnackBar(projectDocSnackBar);
          this.httpClient.get(this.urlPort + "/api/projectdoc/allByProjId/" + this.projectId, { withCredentials: true})
          .map(
            (response) => response
          )
          .catch((err) => {
            this.loading1 = false;
            var error = err["_body"]
            if(error == "session expired"){
              this.sessionSnackBar(err["_body"]);
              this.router.navigate(['/pages/auth/login-2']);
            }
            return Observable.throw(err)
          })
          .subscribe(res => {
            this.loading1 = false;
            this.projectDocument = res;
            if(this.projectDocument.length > 0){
              this.projectFile = this.projectDocument[0].docName
              }
          })
        })
    } 
    else {
      var fileName = this.doc.name;
      var extension = fileName.split('.').pop();
      var fd = new FormData();
      this.file = this.doc
      fd.append('file', this.file);
      var _projId = this.projectId;
      fileInformation1 = {
        docPath: '/uploadDocument/' + 'projectDocuments/' + this.projectId + '/',
        projectId: this.projectId,
        docName: 'projectDocument.' + extension,
        docInserted: 1
      }
      fd.append('fileInformation', JSON.stringify(fileInformation1));
      this.loading1 = false;
      var fileId = this.projectDocument[0]._id
      var purpose = 'updateProjectDoc'
      var path = './projectDocuments/' + _projId + '/'
      this.http.post(this.urlPort + "/api/filesUpload/saveFile" + "?path=" + path +"&projectId="+ _projId +"&purpose="+purpose+"&oldDocName="+ this.projectFile +"&fileId="+ fileId,fd, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
        .map((response) => response.json())
        .catch((err) => {
          this.loading1 = false;
          var error = err["_body"]
          if (error == "session expired") {
            this.sessionSnackBar(err["_body"]);
            this.router.navigate(['/pages/auth/login-2']);
          } else {
            var snackBar = this._translateService.instant("Failed to add project doc");
            this.openSnackBar(snackBar);
          }
          return Observable.throw(err)
        })
        .subscribe(res => {
          this.loading1 = false;
          var projectDocSnackBar = this._translateService.instant("Project Document updated");    
            this.openSnackBar(projectDocSnackBar);
          this.httpClient.get(this.urlPort + "/api/projectdoc/allByProjId/" + this.projectId, { withCredentials: true})
          .map(
            (response) => response
          )
          .catch((err) => {
            this.loading1 = false;
            var error = err["_body"]
            if(error == "session expired"){
              this.sessionSnackBar(err["_body"]);
              this.router.navigate(['/pages/auth/login-2']);
            }
            return Observable.throw(err)
          })
          .subscribe(res => {
            this.loading1 = false;
            this.projectDocument = res;
            if(this.projectDocument.length > 0){
              this.projectFile = this.projectDocument[0].docName
              }
          })
        })
    }
  }

  startTour() {
    var intro: any = introJS.introJs();
    intro.setOption('tooltipPosition', 'auto');
			intro.setOption('positionPrecedence', ['left', 'right', 'top', 'bottom']);
    intro.setOptions({
      steps: [
        {
          element: '#addMilestone',
          intro: 'Foundation or NGO can add and edit milestone and activities by clicking here.'
        },
        {
          element: '#editProject',
          intro: 'Foundation or NGO can edit project by clicking here.'
        }
      ],
      showBullets: true,
      showButtons: true,
      exitOnOverlayClick: false,
      keyboardNavigation: true,
    });
    intro.start();
  }

  viewMilestone() {
    sessionStorage.setItem("projectIdTillActivity", this.projectId);
    this.router.navigate(["/projects/milestone/viewmilestone"]);
  }
  editProject() {
    this.router.navigate(["/projects/project/addproject", { operationalFlag: 1, projectId: this.projectId }]);
  }

  /** 
       * @author:Kuldeep
       * @argument:none
       * @description:Download Uploaded Project Document
      */
     downloadFile() {
        var projId = this.projectId;
            this.httpClient.get(this.urlPort + "/api/projectdoc/allByProjId/" + projId, { withCredentials: true})
              .map(
                (response) => response
              )
              .catch((err) => {
                this.loading1 = false;
                var error = err["_body"]
                if(error == "session expired"){
                  this.sessionSnackBar(err["_body"]);
                  this.router.navigate(['/pages/auth/login-2']);
                }else{
                  var snackBar = this._translateService.instant("Failed to download file");
                    this.openSnackBar(snackBar);
                }
                return Observable.throw(err)
              })
              .subscribe(res => {
                if (res) {
                  this.filename = res[0].docName;
                  var body = { filename: this.filename, projectId: this.projectId }
                  // this._http.post("http")
                  this.httpClient.post(this.urlPort + "/api/uploadProjectDoc/download", body, { responseType: "blob",withCredentials: true })
                    .catch((err) => {
                      var snackBar = this._translateService.instant("Failed to download file");
                      this.openSnackBar(snackBar);                  
                      return Observable.throw(err)
                    })
                    .subscribe(res => {
                      saveAs(res, this.filename)
                    })
                }
                else {
                  var snackBar = this._translateService.instant("No file has been uploaded");
                  this.openSnackBar(snackBar);
                  }
                this.loading1 = false;
              })
    
      }

      editPublishedProject() {
        this.router.navigate(["/projects/project/addproject", { operationalFlag: 1, projectId: this.projectId }]);
      }
    
      downloadProjectPastEvents(fileName) {
        this.filename = fileName;
        var body = { filename: this.filename, projectId: this.projectId }
            this.httpClient.post(this.urlPort + "/api/uploadProjectDoc/downloadProjectPastEvents", body, { responseType: "blob",withCredentials: true })
              .catch((err) => {
                this.loading1 = false;
                 var error = err["_body"]
                if(error == "session expired"){
                  this.sessionSnackBar(err["_body"]);
                  this.router.navigate(['/pages/auth/login-2']);
                }else{
                  var snackBar = this._translateService.instant("Failed to download file");
                  this.openSnackBar(snackBar);            
                }
                  var snackBar = this._translateService.instant("Failed to download file");
                  this.openSnackBar(snackBar);            
                return Observable.throw(err)
              })
              .subscribe(res => {
                this.loading1 = false;
                saveAs(res, this.filename)
              })
      }
    
      gotoProjectUploads(projectUploadsPurpose) {
        sessionStorage.setItem("projectUploadsPurpose", projectUploadsPurpose)
        this.router.navigate(["project-uploads/project-uploads/updateProjectUploads"])
      }

      @HostListener('window:scroll', ['$event'])
    handleScroll(event){
      console.log("handleScroll")
      var el = document.querySelector('.scroll')
      var navbar = document.getElementById("navbar");
      var sticky = navbar.offsetTop;
      console.log("windowScroll",this.sticky,el.scrollTop)
      if(el.scrollTop >=  this.sticky){
        console.log("Inside If")
        this.showUpperNav = true;
        this._ComGoConfigService.config = {
          layout: {
              footer: {
                  hidden: true
              },
              sidepanel: {
                  hidden: true
              },
              toolbar: {
                hidden: true
            }
          }
      };
        // navbar.classList.add("sticky")
        $("#navbar").addClass("sticky");
      } else {
        console.log("Inside else")
        this.showUpperNav = false;
        this._ComGoConfigService.config = {
          layout: {
              footer: {
                  hidden: true
              },
              sidepanel: {
                  hidden: true
              },
              toolbar: {
                hidden: true
            }
          }
      };
        $("#navbar").removeClass("sticky");
      }

      if(elementScrolled('#destination1')) {
        this.selectedItem = 'tab1'
    }
      else if(elementScrolled('#destination2')) {
        this.selectedItem = 'tab2'
    }
     else if(elementScrolled('#destination3')) {
        this.selectedItem = 'tab3'
    }
    else if(elementScrolled('#destination4')) {
      this.selectedItem = 'tab4'
      console.log("destination4")
  }
  else if(elementScrolled('#destination5')) {
    this.selectedItem = 'tab5'
    console.log("destination5")
}
else if(elementScrolled('#destination6')) {
  this.selectedItem = 'tab6'
  console.log("destination6")
}
else if(elementScrolled('#destination7')) {
  console.log("destination7")
  this.selectedItem = 'tab7'
}
// else if(elementScrolled('#destination8')) {
//   this.selectedItem = 'tab8'
// }
      function elementScrolled(elem)
    {
        var docViewTop = $(window).scrollTop()+130;
        var docViewBottom = docViewTop + ($(window).height()/3);
        console.log("height: ",docViewTop,docViewBottom,$(elem).offset().top)
        var elemTop = $(elem).offset().top;
        return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
    }
    }

    /** 
          * @author:Madhu
          * @argument:data
          * @description:get data of BKCPublishproject by project id and status
         */
  publishProject(data) {
    var publishProject;
    let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '500px',
      height: '200px',
      data: { operation: 'publishProject' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.publishDialogResult = result;
      if (this.publishDialogResult == 'yes') {
        this.loading1 = true;
        publishProject = {
          remarks: sessionStorage.getItem("boardRemarks"),
          projectId: sessionStorage.getItem("projectIdForProjectProfile"),
          projectName: this.projectName,
          isPublished: 'true',
          isApproved:'true',
          status: 'Published'
        }
        this.httpClient.put(this.urlPort + "/api/projects/publishProject", publishProject, { withCredentials: true })
          .catch((err) => {
            var error = err["_body"]
            if (error == "session expired") {
              this.sessionSnackBar(err["_body"]);
              this.router.navigate(['/pages/auth/login-2']);
            } else {
              var snackbar = this._translateService.instant("Project Not Published!!!");
              this.openSnackBar(snackbar)
            }
            this.loading1 = false;
            return Observable.throw(err)
          })
          .subscribe((res: Response) => {
            this.loading1 = false;
            var snackbar = this._translateService.instant('Project Published');
            this.openSnackBar(snackbar)
            $('#publishProject').hide();
            this.router.navigate([this.routeBack])
          })

      } else if (this.publishDialogResult == 'no') {
        this.loading1 = false;
        var snackBar = this._translateService.instant('operation cancelled!!!');
        this.openSnackBar(snackBar)
      }
    })

  }
  /** 
    * @author:Madhu
    * @argument:data
    * @description:get data of updatedMilestoneStatus by project id ,status and emptyData
   */

  approveProject() {
    var projId = sessionStorage.getItem("projectIdForProjectProfile");
    var remarksData;
    let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '500px',
      height: '200px',
      data: { operation: 'projectApprove' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.projectApproveResult = result;
      if (this.projectApproveResult.ans == 'yes') {
        this.loading1 = true;
        remarksData = {
          remarks: this.projectApproveResult.remarks,
          projectId: projId,
          projectName: this.projectName,
          isPublished: 'false',
          isApproved:'true',
          status: 'Approved'
        }
        // var remarks = this.projectApproveResult
        this.httpClient.put(this.urlPort + "/api/projects/approveProject",remarksData, { withCredentials: true })
          .catch((err) => {
            var error = err["_body"]
            if (error == "session expired") {
              this.sessionSnackBar(err["_body"]);
              this.router.navigate(['/pages/auth/login-2']);
            } else {
            }
            this.loading1 = false;
            return Observable.throw(err)
          })
          .subscribe((res: Response) => {
            this.loading1 = false;

            this.approvalResultForBoard = res;
            var index = this.approvalResultForBoard.errorCode;
            if (index == '2') {
              var approved = this._translateService.instant('Kindly ensure that all activities are approved!!');
              this.openSnackBar(approved)

            }
            else {
              var snack = this._translateService.instant("Project is successfully approved!");
              this.openSnackBar(snack)

            }
            this.router.navigate([this.routeBack])

          })
      } else if (this.projectApproveResult == 'no') {
        this.loading1 = false;
        var snackBar = this._translateService.instant('operation cancelled!!!');
        this.openSnackBar(snackBar)
      }
    })
  }

    gotoMilestones(elem,tabName){
      // this.addSpace = true
      console.log("gotoMilestones")
  //     $('html, body').animate({
  //       scrollTop: $('#destination2').offset().top
  //  }, 500);
  var navbar = document.getElementById(elem);
  var destinationPosition = navbar.offsetTop;
  var position = destinationPosition - 150
  // $('.scroll').scrollTop(destinationPosition);
  $('.scroll').animate({scrollTop: position}, 2000);
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

  logout(): void {
    var data;
    data = { "username": this.userName }
    this.httpClient.post(this.urlPort + "/api/users/logout", data, { withCredentials: true })
        .map(
            (response) => response
        )
        .catch((err) => {
            return Observable.throw(err)
        })
        .subscribe((res: Response) => {
            sessionStorage.clear();
            this.router.navigate(["/pages/auth/login-2"]);
        })
}

gotoUserProfile() {
    this.router.navigate(["/user/user/userProfile"]);
}

changePassword() {
    this.router.navigate(["/pages/auth/reset-password-2"]);
}

updateUser() {
    this.router.navigate(["/user/user/updateUser"]);

}

/**
    * @author:Sagar
    * @description: Open success snak bar
  */
 towardsDonation() {
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
    projectId: this.projectId
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
      sessionStorage.setItem("projectNameForProjectProfile", this.projectName);
      sessionStorage.setItem("currency", this.currency);
      sessionStorage.setItem("owner", this.projectOwner);
      sessionStorage.setItem("projectOwnerForProjectProfile",this.projectOwner);
      var projectId = this.projectId;
      var projectName = this.projectName;
      if (this.foundationAmount > this.projectsAll.projectBudget - this.projectsAll.fundGoal) {
        this.fundAmount = this.projectsAll.projectBudget - this.projectsAll.fundRaised;
      } else {
        this.fundAmount = this.projectsAll.fundGoal - this.donatedAmount;
      }
      this.loading1 = false;
      $("#toolbar").hide();
      this.router.navigate(["/donor/donor/donorForm", { projectId: projectId, projectName: projectName, fundAmount: this.fundAmount, donationType: 'Donation' }])
    })
    } else if(donationType == 'selfDonate'){
      this.towardsSelfDonation()
    }
  })
} 
else {
  var data = {
    projectId: this.projectId
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
      sessionStorage.setItem("projectNameForProjectProfile", this.projectName);
      sessionStorage.setItem("currency", this.currency);
      sessionStorage.setItem("owner", this.projectOwner);
      sessionStorage.setItem("projectOwnerForProjectProfile", this.projectOwner);
      var projectId = this.projectId;
      var projectName = this.projectName;
      if (this.foundationAmount > this.projectsAll.projectBudget - this.projectsAll.fundGoal) {
        this.fundAmount = this.projectsAll.projectBudget - this.projectsAll.fundRaised;
      } else {
        this.fundAmount = this.projectsAll.fundGoal - this.donatedAmount;
      }
      this.loading1 = false;
      $("#toolbar").hide();
      this.router.navigate(["/donor/donor/donorForm", { projectId: projectId, projectName: projectName, fundAmount: this.fundAmount, donationType: 'Donation' }])
    })
}
} else {
  var data = {
    projectId: this.projectId
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
      sessionStorage.setItem("projectNameForProjectProfile", this.projectName);
      sessionStorage.setItem("currency", this.currency);
      sessionStorage.setItem("owner", this.projectOwner);
      sessionStorage.setItem("projectOwnerForProjectProfile", this.projectOwner);
      var projectId = this.projectId;
      var projectName = this.projectName;
      if (this.foundationAmount > this.projectsAll.projectBudget - this.projectsAll.fundGoal) {
        this.fundAmount = this.projectsAll.projectBudget - this.projectsAll.fundRaised;
      } else {
        this.fundAmount = this.projectsAll.fundGoal - this.donatedAmount;
      }
      this.loading1 = false;
      $("#toolbar").hide();
      this.router.navigate(["/donor/donor/donorForm", { projectId: projectId, projectName: projectName, fundAmount: this.fundAmount, donationType: 'Donation' }])
    })
}
}

towardsSelfDonation() {
  var routesBack = this.router.url.replace(/%20/g, " ");
  sessionStorage.setItem("projectNameForProjectProfile", this.projectName);
  sessionStorage.setItem("currency", this.currency);
  sessionStorage.setItem("owner", this.projectOwner);
  sessionStorage.setItem("projectOwnerForProjectProfile", this.projectOwner);
  var projectId = this.projectId;
  var projectName = this.projectName;
  this.fundAmount = this.projectsAll.projectBudget - this.projectsAll.fundRaised;
  sessionStorage.setItem("owner", this.projectOwner);
  sessionStorage.setItem('backRoute',routesBack)
  $("#toolbar").hide();
  this.router.navigate(["/donor/donor/donorForm", { projectId: projectId, projectName: projectName, fundAmount: this.fundAmount, donorName: sessionStorage.getItem("username"), donationType: 'Self Donation' }])
}

showUploadMessage(type){
  alert("Maximum File size can be upto 50 MB")
  if(type == 'photos'){
    console.log("Inside Photos")
  $("#photosUpload").trigger("click");
  } else {
    console.log("Inside Videos")
    $("#videosUpload").trigger("click");
  }
}

uploadProjectSupporters(event) {
  var file = event.target.files[0];
  if (file.type.startsWith("image")) {
    var randomImageId = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    var projectSupportersFileName = randomImageId + file.name
    var fd = new FormData();
    fd.append('file', file, randomImageId + file['name']);
    var fileInformation = {
      filePath: '/ProjectFiles/' + this.projectId + '/ProjectSupporters/' + projectSupportersFileName,
      projectId: this.projectId,
      fileName: projectSupportersFileName,
      type: file.type,
      projectRelation: 'Project Supporter'
    }
    fd.append('fileInformation', JSON.stringify(fileInformation));
    const headers = new HttpHeaders({ 'contentType': 'multipart/form-data' });
    this.loading1 = true;
    var purpose = "uploadProjectSupporters";
    var path = './ProjectFiles/'+this.projectId+'/ProjectSupporters/'
    this.http.post(this.urlPort + "/api/filesUpload/saveFile/" + "?path=" + path +"&projectId="+ this.projectId +"&purpose=" + purpose, fd, { withCredentials: true, headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }) })
      .catch((err) => {
        var error = err["_body"]
        if (error == "session expired") {
          this.sessionSnackBar(err["_body"]);
          this.router.navigate(['/pages/auth/login-2']);
        } else {
          var snackBar = this._translateService.instant("Project Supporter not saved");
        this.openSnackBar(snackBar);
        }
        this.loading1 = false;
        return Observable.throw(err)
      })
      .subscribe(res=> {
        var snackBar = this._translateService.instant("Project Supporter file uploaded");
        this.openSnackBar(snackBar);
        
        this.loading1 = false;
        this.ngOnInit();
      })
  } else {
    var snackBar = this._translateService.instant('File Type must be a image');
    this.openSnackBar(snackBar)    }

}

checkVisibility(value){
  var reqBody = {
    visibility: value,
    projectId: sessionStorage.getItem("projectIdForProjectProfile")
  }
  this.loading1 = true;
          this.httpClient.post(this.urlPort + "/api/projects/changeProjectVisibility", reqBody, { withCredentials: true })
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
                  var snackBar = this._translateService.instant("Project Visibility Changed");
                  this.openSnackBar(snackBar);
                  this.ngOnInit()
              })
  // let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
  //     width: '500px',
  //     height: '200px',
  //     data: { operation: 'changeProjectVisibility' }
  // });
  // dialogRef.afterClosed().subscribe(result => {
  //   dialogueStatus = result;
  //     if (dialogueStatus == 'yes') {
  //         this.loading1 = true;
  //         value.projectId = sessionStorage.getItem("projectIdForProjectProfile");
  //         this.httpCLient.post(this.urlPort + "/api/projects/changeProjectVisibility", value, { withCredentials: true })
  //             .catch((err) => {
  //                 this.loading1 = false;
  //                 var error = err["_body"]
  //                 if (error == "session expired") {
  //                     this.sessionSnackBar(err["_body"]);
  //                     this.router.navigate(['/pages/auth/login-2']);
  //                 }
  //                 return Observable.throw(err)
  //             })
  //             .subscribe((res: Response) => {
  //                 this.loading1 = false;
  //                 var snackBar = this._translateService.instant("Project Visibility Changed");
  //                 this.openSnackBar(snackBar);
  //                 this.ngOnInit()
  //             })
  //     } else {
  //         var snackBar = this._translateService.instant("Operation cancelled!!!");
  //         this.openSnackBar(snackBar);
  //     }
  // })
}

gotoFBShare(){
  console.log("FBSahre")
  // $("#fbLike").trigger("click");
  console.log("this.projectName: ",this.projectName)
  // this.meta.updateTag({ property: 'og:image', content: this.bgImageUrl })
  // this.meta.updateTag({ property: 'og:title', content: this.projectName })
  // this.meta.updateTag({ property: 'og:description', content: this.projectName })
  // $('meta[property="og:image"]').attr('content', this.bgImageUrl);
  // $('meta[property="og:title"]').attr('content', this.projectName);
  // $('meta[property="og:description"]').attr('content', this.projectName);
  $('#fbLike')[0].click();
}
}


