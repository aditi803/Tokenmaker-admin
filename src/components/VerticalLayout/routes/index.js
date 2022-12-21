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
import Login1 from "../../../pages/AuthenticationInner/Login"
import Login2 from "../../../pages/AuthenticationInner/Login2"
import Register1 from "../../../pages/AuthenticationInner/Register"
import Register2 from "../../../pages/AuthenticationInner/Register2"
import Recoverpw from "../../../pages/AuthenticationInner/Recoverpw"
import Recoverpw2 from "../../../pages/AuthenticationInner/Recoverpw2"
import ForgetPwd1 from "../../../pages/AuthenticationInner/ForgetPassword"
import ForgetPwd2 from "../../../pages/AuthenticationInner/ForgetPassword2"
import LockScreen from "../../../pages/AuthenticationInner/auth-lock-screen"
import LockScreen2 from "../../../pages/AuthenticationInner/auth-lock-screen-2"
import ConfirmMail from "../../../pages/AuthenticationInner/page-confirm-mail"
import ConfirmMail2 from "../../../pages/AuthenticationInner/page-confirm-mail-2"
import EmailVerification from "../../../pages/AuthenticationInner/auth-email-verification"
import EmailVerification2 from "../../../pages/AuthenticationInner/auth-email-verification-2"
import TwostepVerification from "../../../pages/AuthenticationInner/auth-two-step-verification"
import TwostepVerification2 from "../../../pages/AuthenticationInner/auth-two-step-verification-2"

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

  // Authentication Inner
  { path: "/pages-login", component: Login1 },
  { path: "/pages-login-2", component: Login2 },
  { path: "/pages-register", component: Register1 },
  { path: "/pages-register-2", component: Register2 },
  { path: "/page-recoverpw", component: Recoverpw },
  { path: "/page-recoverpw-2", component: Recoverpw2 },
  { path: "/pages-forgot-pwd", component: ForgetPwd1 },
  { path: "/auth-recoverpw-2", component: ForgetPwd2 },
  { path: "/auth-lock-screen", component: LockScreen },
  { path: "/auth-lock-screen-2", component: LockScreen2 },
  { path: "/page-confirm-mail", component: ConfirmMail },
  { path: "/page-confirm-mail-2", component: ConfirmMail2 },
  { path: "/auth-email-verification", component: EmailVerification },
  { path: "/auth-email-verification-2", component: EmailVerification2 },
  { path: "/auth-two-step-verification", component: TwostepVerification },
  { path: "/auth-two-step-verification-2", component: TwostepVerification2 },
]

export { authProtectedRoutes, publicRoutes }
