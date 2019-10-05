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
        menuHeader: 'Access',
        menuItems: [
            //{ name: 'Assign', link:'/setting/accessManagement'},        
            { name: 'Roles', link:'/settings/roles'},           
            //{ name: 'Access Control Template', link:'/setting/accessControlTemplate'}           
        ]
    },
    { 
        menuHeader: 'Members',
        menuItems: [
            { name: 'Invitations', link:'/settings/invitations'},        
        ]
    },
    { 
        menuHeader: 'Profile',
        menuItems: [
            { name: 'Update Profile', link:'/settings/empty'}        
        ]
    }
]