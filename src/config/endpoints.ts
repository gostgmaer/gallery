// Centralized API endpoint constants
// Use these instead of hardcoded strings to ensure consistency

export const ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: "/user/auth/login",
    SIGNOUT: "/user/auth/signout",
    VERIFY_SESSION: "/user/auth/verify/session",
    FORGET_PASSWORD: "/user/auth/forget-password",
    RESET_PASSWORD_BASE: "/user/auth/reset-password", // append /:token
    CONFIRM_ACCOUNT_BASE: "/user/auth/confirm-account", // append /:token
  },
  // User Management
  USER: {
    PROFILE: "/user/profile",
    UPDATE: "/user",
    REGISTER: "/user/register",
  },
  // Images (external Unsplash)
  IMAGES: {
    PHOTOS: "/photos",
    SEARCH_PHOTOS: "/search/photos",
    RELATED: "/photos/:id/related",
    SINGLE_PHOTO: "/photos/:id",
  },
};
