export const Endpoints = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    LOGOUT: "/api/v1/auth/logout",
    REFRESH: "/api/v1/auth/refresh",
    REGISTER: "/api/v1/user/register/student",
  },

  CONSOLE: {
    NEW: "/api/v1/project/new",
    MY_PROJECTS: "/api/v1/projects/my",
    UPDATE_PROJECT: (projectId) => {
      return `/api/v1/project/${projectId}/update`;
    },
    GET_PROJECT: "/api/v1/project",
    UPLOAD_PREVIEW: "/api/v1/project/image/preview/upload",
    UPLOAD_ICON: "/api/v1/project/image/icon/upload",
    UPLOAD_BINARY: "/api/v1/project/binary/upload",
    DOWNLOAD_BINARY: "/api/v1/project/binary",
  },

  STORE: {
    PUBLIC: {
      SEARCH: "/api/v1/public/search",
      MAIN: "/api/v1/public/store",
      LANDING: "/api/v1/public/landing",
    },
    STUDENT: {
      SEARCH: "/api/v1/student/search",
      MAIN: "/api/v1/student/store",
    },
    COMMON: {
      PROJECT_INFO: "/api/v1/project/",
      USER_INFO: "/api/v1/user/",
    },
  },

  ADMIN: {
    PROJECTS: "/api/v1/admin/projects_list",
    STATUS_UPDATE: (projectId) => {
      return `/api/v1/admin/project/${projectId}/status/update`;
    },
  },
};
