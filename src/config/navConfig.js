//Define main navigation configuration here
export const MainNavConfig = [
    {name: 'home', link:'/'},
    {name: 'dashboard', link:'/dashboard'},
    {name: 'section', link:'/section'}
]

//Define side navigation here for each section
export const SideNavConfig = {
    dashboard: [
        {name: 'section', link:'/section'}
    ],
    section: [
        {name: 'dashboard', link: '/section'}
    ]
}