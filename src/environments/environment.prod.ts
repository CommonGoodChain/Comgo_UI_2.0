var host = window.location.host
export const environment = {
    production: true,
    hmr: false,
    urlPort: "https://"+host,
    regUrl: "https://"+host,
    imageUrl: "https://"+host+"/img/project",
    angularIp : "https://"+host+"/pages/auth/login-2",
    profileImageUrl: "https://"+host+"/getProfileImage/",
    foundation: "ComGoMarketUI",
    createdBy: "sagar",
    defaultImage: "this.src='https://"+host+"/img/project/DefaultImage/default.jpg'",
    forgetPasswordUrl: "https://"+host+"/pages/auth/forgot-password-3",
    viewWorkSpaceUrl: "https://"+host+"/pages/auth/your-workspace"

};