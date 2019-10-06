//Define all routes here.
//This can be used when programatic navigation is required via "history.push('path')"
export const allRoutes = {
    section: {
        create: '/section/create'
    }
}

//Define main navigation configuration here
export const MainNavConfig = [
    {name: 'home', link:'/'},
    {name: 'dashboard', link:'/dashboard'},
    {name: 'section', link:'/section'},
    {name: 'settings', link:'/settings'}
]

//Define side navigation here for each section
export const sectionNavConfig = [
    { 
        menuHeader: 'Section',
        menuItems: [
            { name: 'records', link:'/section/show'},
            { name: 'create record', link:'/section/create'}            
        ]
    },
    { 
        menuHeader: 'Test Links',
        menuItems: [
            { name: 'home', link:'/'},
            { name: 'dashboard', link:'/dashboard'}
        ]
    }
]

export const settingsNavConfig = [
    { 
        menuHeader: 'Profile',
        menuItems: [
            { name: 'Update Profile', link:'/settings/update-profile'},
            { name: 'Reset Password', link:'/settings/reset-password'}        
        ]
    },
    { 
        menuHeader: 'Access',
        menuItems: [       
            { name: 'Roles', link:'/settings/roles'}       
        ]
    },
    { 
        menuHeader: 'Users',
        menuItems: [
            { name: 'Invitations', link:'/settings/invitations'},  
            { name: 'Users', link:'/settings/users'}      
        ]
    }  
]