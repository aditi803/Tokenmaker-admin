import React from "react"
import { Redirect } from "react-router-dom"

// Profile
import UserProfile from "../../../pages/Authentication/user-profile"


// Authentication related pages
import Login from "../../../pages/Authentication/Login"
import Logout from "../../../pages/Authentication/Logout"
import Register from "../../../pages/Authentication/Register"
import ForgetPwd from "../../../pages/Authentication/ForgetPassword"
import ResetPassword from "../../../pages/Authentication/ResetPassword"

//  // Inner Authentication


// Dashboard
import Dashboard from "../../../pages/Dashboard/index"

//Contacts
import LandingPageFAQs from "pages/Landing-Page-FAQs"
import LandingPageBanner from "pages/Landing-Page-Banner"
import LandingPageSteps from "pages/Landing-Page-Steps"
import LandingPageStart from "pages/Landing-Page-Start"
import LandingPageCustomDeveloper from "pages/Landing-Page-CustomDevloper"
import LandingPageFeatures from "pages/Landing-Page-Features"
import General from "pages/Settings/General"
import LogoManager from "pages/Settings/LogoManager"
import Footer from "pages/Footer"
import CommissionTable from "pages/Commissions/CommissionTable"
import View from "pages/Networks/View/index"
import Add from "pages/Networks/Add"
import AllTokens from "pages/AllTokens"
import EditView from "pages/Networks/View/EditView"
import TermsOfUse from "pages/Pages/Terms of use"
import PrivacyPolicy from "pages/Pages/Privacy Policy"
import Category from "pages/Networks/Category"
import Payments from "pages/Settings/Payments"
import Profile from "pages/Settings/Profile"
import Users from "pages/Pages/Users/Users"

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/landing-page-faqs", component: LandingPageFAQs },
  { path: "/landing-page-banner", component: LandingPageBanner },
  { path: "/landing-page-steps", component: LandingPageSteps },
  { path: "/landing-page-start", component: LandingPageStart },
  { path: "/landing-page-custom-developer", component: LandingPageCustomDeveloper },
  { path: "/landing-page-features", component: LandingPageFeatures },
  // { path: "/blog", component: Blog },
  // { path: "/dashboard-job", component: DashboardJob },
  { path: "/general", component: General },
  {path: "/logo-manager", component: LogoManager},
  {path: '/footer', component: Footer},
  {path: '/commission-table', component: CommissionTable},
  {path: '/view', component: View},
  {path: '/add', component: Add},
  {path: '/all-tokens', component: AllTokens},
  {path: '/network-edit/:id', component: EditView},
  {path: '/terms-of-use', component: TermsOfUse},
  {path: '/privacy-policy', component: PrivacyPolicy},
  {path: '/subscribed-users', component: Users},

  {path: '/category', component: Category},
  {path: '/payments', component: Payments},
  {path: '/profile-settings', component: Profile},

  // //profile
  { path: "/profile", component: UserProfile },


  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
  
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
  { path: "/password-reset/:userId/:token", component: ResetPassword },

  // { path: "/pages-maintenance", component: PagesMaintenance },
  // { path: "/pages-comingsoon", component: PagesComingsoon },
  // { path: "/pages-404", component: Pages404 },
  // { path: "/pages-500", component: Pages500 },
  // { path: "/crypto-ico-landing", component: CryptoIcoLanding },
]

export { authProtectedRoutes, publicRoutes }
