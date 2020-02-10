import { ComGoNavigation } from '@ComGo/types';

export const navigation: ComGoNavigation[] = [


    {
        id: 'mainprojects',
        title: 'Application',
        type: 'group',
        icon: 'project',
        children: [
            {
                id: 'viewUsers',
                title: 'View Users',
                type: 'item',
                url: '/user/user/viewUsers'
            }
        ]
    },



];


// export const navigation: ComGoNavigation[] = [


//     {
//         id: 'mainprojects',
//         title: 'Application',
//         type: 'group',
//         icon: 'project',
//         children: [
//             {
//                 id: 'viewUsers',
//                 title: 'View Users',
//                 type: 'item',
//                 url: '/user/user/viewUsers'
//             },
//             {
//                 id: 'userProfile',
//                 title: 'User Profile',
//                 type: 'item',
//                 url: '/user/user/userProfile'
//             },
//             {
//                 id: 'DonorForm',
//                 title: 'Donor Form',
//                 type: 'item',
//                 url: '/donor/donor/donorForm'
//             },
//             {
//                 id: 'expenses',
//                 title: 'Expenses',
//                 type: 'collapsable',
//                 icon: 'folder',

//                 children: [
//                     {
//                         id: 'viewexpense',
//                         title: 'View Expense',
//                         type: 'item',
//                         url: '/expenses/expenses/viewexpenses'
//                     }

//                 ]
//             },
//             {
//                 id: 'project',
//                 title: 'Project',
//                 type: 'collapsable',
//                 icon: 'folder',

//                 children: [
//                     {
//                         id: 'publishproject',
//                         title: 'View Project',
//                         type: 'item',
//                         url: '/projects/project/publishproject'
//                     },
//                     {
//                         id: 'viewallproject',
//                         title: 'Project Under View',
//                         type: 'item',
//                         url: '/projects/project/viewallproject'
//                     },


//                 ]
//             },
//             {
//                 id: 'donar',
//                 title: 'Donor',
//                 type: 'collapsable',
//                 icon: 'folder',

//                 children: [
//                     {
//                         id: 'myproject',
//                         title: 'My Project',
//                         type: 'item',
//                         url: '/donor/donor/mydonations'
//                     },
//                     {
//                         id: 'otherproject',
//                         title: 'Other Project',
//                         type: 'item',
//                         url: '/donor/donor/otherproject'
//                     },


//                 ]
//             },

//         ]
//     },



// ];
