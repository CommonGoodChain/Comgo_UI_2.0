import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response, Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { fuseAnimations } from '@fuse/animations';
import { DialogElementsExampleDialog } from '../../../../dialog/dialog.component';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Rx';
import { saveAs } from 'file-saver';
import { MatSnackBar, MatDialog, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as english } from '../../../../../layout/i18n/en';
import { locale as spanish } from '../../../../../layout/i18n/tr';

@Component({
    selector: 'profile-photos-videos',
    templateUrl: './photos-videos.component.html',
    styleUrls: ['./photos-videos.component.scss'],
    animations: fuseAnimations
})
export class ProfilePhotosVideosComponent implements OnInit {
    photosVideos: any;
    public projectId;
    urlPort = environment.urlPort;
    imageUrl = environment.imageUrl;
    file;
    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    filesToUpload;
    role;
    dialogResult;
    imageCollection = [];
    videoCollection = [];
    public loading1 = false;

    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */
    constructor(
        private httpClient: HttpClient,

        private http: Http,
        private _matSnackBar: MatSnackBar,
        public dialog: MatDialog,
        private router: Router,
        private _translateService: TranslateService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, spanish);

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.imageCollection = [];
        this.videoCollection = [];
        this.projectId = sessionStorage.getItem("projectIdForProjectProfile")
        this.role = sessionStorage.getItem("role")
        // this._profileService.photosVideosOnChanged
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(photosVideos => {
        //         this.photosVideos = photosVideos;
        //     });



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
                this.loading1 = false;
                // this.imageCollection = res;

                for (var i = 0; i < res.length; i++) {
                    if (res[i].type.startsWith("image")) {
                        this.imageCollection.push(res[i])
                    }
                    if (res[i].type.startsWith("video")) {
                        this.videoCollection.push(res[i])
                    }
                }
            })

        // this.httpClient.get(this.urlPort + "/api/filesUpload/getIPFSFile", { withCredentials: true, responseType: "blob" })
        //     .subscribe(blob => {
        //         // var URL = window.URL.createObjectURL(res);
        //         // var Image = res;
        //         // var URL = "data:image/png;base64," + Image;
        //         const file = new File([blob],"education.jpg",{ type: 'image/jpeg' });
        //         // saveAs(file, "imageFile")
        //         // var reader = new window.FileReader();
        //         // reader.readAsDataURL(blob);
        //         // reader.onloadend = function () {
        //             // base64data = reader.result;
        //         // }
        //     })
    }

    // checkImageClick(imageName,index){
    //     if(index == (this.imageCollection.length-1)){
    //         $("#photos").click()
    //     }
    // }

  
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

    openSnackBar(data) {
        var endNow = this._translateService.instant('End now');
        this._matSnackBar.open(data, endNow, {
            duration: 10000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }

    deleteImage(imageData) {
        let dialogRef = this.dialog.open(DialogElementsExampleDialog, {
            width: '500px',
            height: '200px',
            data: { operation: 'delete' }
        });
        dialogRef.afterClosed().subscribe(result => {

            this.dialogResult = result;
            if (this.dialogResult == 'yes') {
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

            this.dialogResult = result;
            if (this.dialogResult == 'yes') {
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
            this.dialogResult = result;
            if (this.dialogResult == 'setProfile') {
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

    sessionSnackBar(data) {
        var endNow = this._translateService.instant('End now');
        this._matSnackBar.open(data, endNow, {
            duration: 10000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
}
