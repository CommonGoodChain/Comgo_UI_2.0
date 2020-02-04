import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-crm-tab',
  templateUrl: './crm-tab.component.html',
  styleUrls: ['./crm-tab.component.scss']
})
export class CrmTabComponent implements OnInit {

  
  constructor(private router: Router) { }

  ngOnInit() {
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

}
