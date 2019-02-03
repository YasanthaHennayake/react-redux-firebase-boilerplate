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
    {name: 'section', link:'/section'}
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