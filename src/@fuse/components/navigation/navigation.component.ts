import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';
import { ComGoNavigationService } from './navigation.service';

@Component({
    selector: 'ComGo-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ComGoNavigationComponent implements OnInit {
    navigate;
    profile;
    username;
    regUser;
    orgName;
    allRules;
    userType;
    // url = config.url;
    // port = config.port;
    urlPort = environment.urlPort;


    @Input()
    layout = 'vertical';

    @Input()
    navigation: Array<any> = [];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     */
    constructor(
        private _ComGoNavigationService: ComGoNavigationService,
        private http: Http,
        private httpClient: HttpClient
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.allRules = JSON.parse(sessionStorage.getItem("rules"))
        this.userType = sessionStorage.getItem('userType');
        this.profile = sessionStorage.getItem('profile');
        this.username = sessionStorage.getItem('username')
        this.orgName = sessionStorage.getItem("organizationName");
        this.regUser = sessionStorage.getItem('regUser')
        // Load the navigation either from the input or from the service
        this.navigation = this.navigation || this._ComGoNavigationService.getCurrentNavigation();

        // Subscribe to the current navigation changes
        this._ComGoNavigationService.onNavigationChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.navigate = this._ComGoNavigationService.getCurrentNavigation();
                var Organizations = []
                var children;
                if (this.allRules != '' && this.allRules != undefined) {
                    for (var i = 0; i < this.allRules.length; i++) {
                        var Org = {
                            id: this.allRules[i].orgName,
                            title: this.allRules[i].orgName,
                            type: 'collapsable',
                            // url: '/donor/donor/' + this.allRules[i].orgName,
                            icon: 'folder',
                            children:  [{
                                id: 'PrePublished',
                                title: 'Pre Published Projects',
                                type: 'item',
                                url: '/projects/project/' + this.allRules[i].orgName,
                                icon: 'folder'
                            },{
                                id: 'PostPublishedProjects',
                                title: 'Post Published Projects',
                                type: 'item',
                                url: '/donor/donor/' + this.allRules[i].orgName,
                                icon: 'folder'
                            }
                        ]
                        }
                        Organizations.push(Org);
                    }
                   children =  [{
                        id: 'MyProjects',
                        title: 'My Projects',
                        type: 'collapsable',
                        icon: 'folder',
                        children: Organizations
                    },{
                        id: 'allPublishedProjects',
                        title: 'All Published Projects',
                        type: 'item',
                        url: '/donor/donor/otherproject',
                        icon: 'folder'
                    },{
                        id: 'myDonations',
                        title: 'My Social Impact Record',
                        type: 'item',
                        url: '/donor/donor/mydonations',
                        icon: 'folder'
                    }]
                } else{
                    children =  [{
                        id: 'allPublishedProjects',
                        title: 'All Published Projects',
                        type: 'item',
                        url: '/donor/donor/otherproject',
                        icon: 'folder'
                    },
                    {
                        id: 'myDonations',
                        title: 'My Social Impact Record',
                        type: 'item',
                        url: '/donor/donor/mydonations',
                        icon: 'folder'
                    }]
                }
                // var Projects
                // Projects = {
                //     id: 'allPublishedProjects',
                //     title: 'All Published Projects',
                //     type: 'item',
                //     url: '/donor/donor/otherproject',
                //     icon: 'folder'
                // }
                // children.push(Projects)
                // Projects = {
                //     id: 'myDonations',
                //     title: 'My Donations',
                //     type: 'item',
                //     url: '/donor/donor/mydonations',
                //     icon: 'folder'
                // }
                // children.push(Projects);
                if (this.userType == 'Organization' && this.profile == 'true' && this.regUser == '1') {
                    this.navigation = [
                        {
                            id: 'mainprojects',
                            type: 'group',
                            icon: 'project',
                            children: [
                                {
                                    id: 'Users',
                                    title: 'Users',
                                    type: 'collapsable',
                                    icon: 'folder',
                                    children: [{
                                        id: 'myUsers',
                                        title: 'My Users',
                                        type: 'item',
                                        url: '/user/user/myUsers',
                                        icon: 'folder'
                                    },
                                    {
                                    id: 'searchUsers',
                                    title: 'Search Users',
                                    type: 'item',
                                    url: '/user/user/searchUsers',
                                    icon: 'folder'
                                }]
                                },
                                {
                                    id: 'Projects',
                                    title: 'Projects',
                                    type: 'collapsable',
                                    icon: 'folder',
                                    children: [{
                                        id: 'MyProjects',
                                        title: 'My Projects',
                                        type: 'collapsable',
                                        icon: 'folder',
                                        children: [{
                                            id: 'prePublishedProjects',
                                            title: 'Pre Pulished Projects',
                                            type: 'item',
                                            url: '/projects/project/prePublished',
                                            icon: 'folder'
                                        },
                                        {
                                            id: 'PublishedProjects',
                                            title: 'Published Projects',
                                            type: 'item',
                                            url: '/donor/donor/published',
                                            icon: 'folder'
                                        }]
                                    },
                                    {
                                        id: 'publishedProjects',
                                        title: 'All Projects',
                                        type: 'item',
                                        url: '/donor/donor/otherproject',
                                        icon: 'folder'
                                    },
                                    {
                                        id: 'allPublishedProjects',
                                        title: 'My Social Impact Record',
                                        type: 'item',
                                        url: '/donor/donor/mydonations',
                                        icon: 'folder'
                                    }]
                                },
                                {
                                    id: 'users',
                                    title: 'FAQ',
                                    type: 'item',
                                    icon: 'import_contacts',
                                    url: '/user/user/FAQ'
                                }
                            ]
                        }
                    ];
                } else if (this.userType == 'Private User') {
                    this.navigation = [
                        {
                            id: 'mainprojects',
                            type: 'group',
                            icon: 'project',
                            children: [
                                {
                                    id: '',
                                    title: 'My Organizations',
                                    type: 'item',
                                    url: '/user/user/myOrganization',
                                    icon: 'folder'
                                },
                                {
                                    id: 'Projects',
                                    title: 'Projects',
                                    type: 'collapsable',
                                    icon: 'folder',
                                    children: children
                                },
                                {
                                    id: 'users',
                                    title: 'FAQ',
                                    type: 'item',
                                    icon: 'import_contacts',
                                    url: '/user/user/FAQ'
                                }
                            ]
                        }
                    ];
                } else if (this.userType == 'admin') {
                    this.navigation = [
                        {
                            id: 'mainprojects',
                            type: 'group',
                            icon: 'project',
                            children: [
                                {
                                    id: 'Private Users',
                                    title: 'Private Users',
                                    type: 'item',
                                    url: '/user/user/viewUsers',
                                    icon: 'folder'
                                },
                                {
                                    id: 'Organization Users',
                                    title: 'Organizations',
                                    type: 'collapsable',
                                    icon: 'folder',
                                    children: [
                                        {
                                            id: 'Registered Users',
                                            title: 'Registered Users',
                                            type: 'item',
                                            url: '/user/user/registeredUsers',
                                            icon: 'folder'
                                        },
                                        {
                                            id: 'Pending Users',
                                            title: 'Pending Users',
                                            type: 'item',
                                            url: '/user/user/pendingUsers',
                                            icon: 'folder'
                                        }
                                    ]
                                }
                            ]
                        }
                    ];
                } else {
                    this.navigation = [
                        {
                            id: 'mainprojects',
                            type: 'group',
                            icon: 'project',
                            children: [
                                {
                                    id: 'viewUsers',
                                    title: 'Organization Profile',
                                    type: 'item',
                                    url: '/user/user/userProfile',
                                    icon: 'folder'
                                }
                            ]
                        }
                    ];
                }
            });
    }
}