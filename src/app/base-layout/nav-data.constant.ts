export const navMenuItems = [
  {
    name: 'Dashboard',
    route: '/home/dashboard',
    icon: 'bi bi-grid-fill',
    iconColor: 'text-property',
    pageTitle: 'Dashboard',
    authRequired: true,
  },
  {
    name: 'Jobs',
    route: '/home/jobs',
    icon: 'bi bi-briefcase-fill',
    iconColor: 'text-property',
    pageTitle: 'Jobs',
    authRequired: false,
  },
  {
    name: 'Applied',
    route: '/home/applied',
    icon: 'bi bi-check-circle-fill',
    iconColor: 'text-property',
    pageTitle: 'Applied Jobs',
    authRequired: true,
  },
  // {
  //   name: 'Shortlisted',
  //   route: '/home/shortlisted',
  //   icon: 'bi bi-person-plus-fill',
  //   iconColor: 'text-property',
  //   pageTitle: 'Shortlisted Jobs',
  //   authRequired: true,
  // },
  {
    name: 'Selected Jobs',
    route: '/home/selected',
    icon: 'bi bi-person-check-fill',
    iconColor: 'text-property',
    pageTitle: 'Selected Jobs',
    authRequired: true,
  },
  {
    name: 'Profile',
    route: '/home/profile',
    icon: 'bi bi-person-circle',
    iconColor: 'text-property',
    pageTitle: 'Profile',
    authRequired: true,
  },
  // {
  //   name: 'Logout',
  //   route: '',
  //   icon: 'bi bi-power',
  //   iconColor: 'text-property',
  //   pageTitle: 'Logout'
  // },
]
