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
            { name: 'section content', link:'/section/content'}
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