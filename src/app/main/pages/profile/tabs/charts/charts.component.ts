import { Component, ViewChild, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
// import { config } from '../../../../../../config';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Rx';
import { DatePipe } from '@angular/common'
import { Router, ActivatedRoute } from '@angular/router';
import { Headers } from '@angular/http';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss']
})
export class ChartsComponent {
    id = 'AngularChart6';
    width;
    height = 400;
    type = 'bubble';
    dataFormat = 'json';
    donar;
    dataSource;

    donors = [];
    // url = config.url;
    // port = config.port;
    urlPort = environment.urlPort;
    projectId;
    donorList;
    chart;
    x = 4;
    y = 50;
    xAxis = 0;
    goal;
    fundGoal;


    /**
    * @author: Madhu
    * @argument:none
    * @description:to fix position
    */
    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    /** @param {Http}_http
        * @param {Router}_router
       * @param {FormBuilder} _formBuilder
       * @param {MatSnackBar} _matSnackBar
       */
    constructor(private http: Http,
    private httpClient : HttpClient,
    private datePipe: DatePipe,
        private router: Router,
        private _matSnackBar: MatSnackBar, ) {

    }


    ngOnInit() {
        this.fundGoal = Number(sessionStorage.getItem("projectFundGoalForProjectProfile"));
        this.goal = 60000;
        this.projectId = sessionStorage.getItem("projectIdForProjectProfile")
        this.width = 1000;
        var data = {
            projectId: this.projectId
        }
        this.httpClient.post(this.urlPort + "/api/alldonor/getAllDonorListDB", data, { withCredentials: true})
            .map(
                (response) => response
            )
            .catch((err) => {
                return Observable.throw(err)
            })
            .subscribe(res => {
                this.donorList = res;
                this.chart = 'bubble'
                var donationData;
                var categoryData;
                var donationSet = [];
                var categorySet = [];
                for (var i = 0; i < this.donorList.length; i++) {
                    this.xAxis = this.xAxis + 4;
                    var color = Math.floor(0x1000000 * Math.random()).toString(16);

                    for (var j = 0; j < categorySet.length; j++) {
                        if (this.donorList[i].aliasName == categorySet[j].name) {
                            donationData = {
                                "x": this.x,
                                "y": this.donorList[i].amount,
                                "z": (this.donorList[i].amount / this.fundGoal) * 100,
                                "name": this.donorList[i].aliasName,
                                "color": categorySet[j].color
                            }
                            break;
                        }
                        else {
                            donationData = {
                                "x": this.x,
                                "y": this.donorList[i].amount,
                                "z": (this.donorList[i].amount / this.fundGoal) * 100,
                                "name": this.donorList[i].aliasName,
                                "color": '#' + ('000000' + color).slice(-6)
                            }
                        }
                    }
                    if (i == 0) {
                        donationData = {
                            "x": this.x,
                            "y": this.donorList[i].amount,
                            "z": (this.donorList[i].amount / this.fundGoal) * 100,
                            // "z": z,  
                            "name": this.donorList[i].aliasName,
                            "color": '#' + ('000000' + color).slice(-6)
                        }
                    }
                    var donorName = undefined;
                    donorName = categorySet.find(x => x.label == this.donorList[i].aliasName)
                    categoryData = {
                        "label": this.datePipe.transform(this.donorList[i].updatedDate, 'dd-MM-yyyy'),
                        "name": this.donorList[i].aliasName,
                        "x": this.xAxis,
                        "showverticalline": "1",
                        "color": '#' + ('000000' + color).slice(-6)
                    }
                    categorySet.push(categoryData);
                    this.x = this.x + 4;

                    donationSet.push(donationData);

                }
                this.donar = donationSet
                this.dataSource = {
                    "chart": {
                        "theme": "fint",
                        "caption": "Project Donation Analysis",
                        "xAxisMinValue": "0",
                        "xAxisMaxValue": "50",
                        "yAxisMinValue": "0",
                        "yAxisMaxValue": this.fundGoal,
                        "plotFillAlpha": "70",
                        "plotFillHoverColor": "#6baa01",
                        "showPlotBorder": "0",
                        "yAxisName": "Donation Amount",
                        "showValues": "1",
                        "showTrendlineLabels": "0",
                        "plotTooltext": "Amount - $yvalue , Contribution - $zvalue%"
                    },
                    "categories": [
                        {
                            "category": categorySet
                        }
                    ],
                    "dataset": [
                        {

                            "data": this.donar
                        }
                    ],
                    "trendlines": [
                        {
                            "line": [
                                {
                                    "startValue": 0,
                                    "endValue": this.fundGoal,
                                    "isTrendZone": "1",
                                    "color": "#aaaaaa",
                                    "alpha": "14"
                                },
                                {
                                    "startValue": 0,
                                    "endValue": this.fundGoal,
                                    "isTrendZone": "1",
                                    "color": "#aaaaaa",
                                    "alpha": "7"
                                }
                            ]
                        }
                    ]
                }
            })


    }

}
