
const routes = [
    {
        path: "/login",
        name: "LoginPage",
        component: () => import('@/views/auths/LoginPage.vue')
    },
    {
        path: "/registration-page",
        name: "RegistrationPage",
        component: () => import('@/views/auths/RegistrationPage.vue')
    },
    {
        path: "/forgot-password-page",
        name: "ForgotPasswordPage",
        component: () => import('@/views/auths/ForgotPasswordPage.vue')
    },
    // {
    //     path: "/otp-page",
    //     name: "OTPPage",
    //     component: () => import('@/views/auths/OtpPage.vue')
    // },
    {
        path: "/email-verification-page",
        name: "EmailVerificationPage",
        component: () => import('@/views/auths/EmailVerificationPage.vue')
    },
    // {
    //     path: "/update-password-page",
    //     name: "ResetPasswordPage",
    //     component: () => import('@/views/auths/ResetPasswordPage.vue')
    // },

];

export default routes;