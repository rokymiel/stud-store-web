import { axiosInstance } from "../instance";
import { Endpoints } from "../endpoints";

export const newProjectService = (
  shortName,
  fullName,
  description,
  defenceYear,
  groupName,
  mentor
) =>
  axiosInstance.post(Endpoints.CONSOLE.NEW, {
    shortName: shortName,
    fullName: fullName,
    description: description,
    defenceYear: defenceYear,
    groupName: groupName,
    mentor: mentor,
  });

export const updateProject = (projectId, shortName, description) =>
  axiosInstance.put(Endpoints.CONSOLE.UPDATE_PROJECT(projectId), {
    shortName: shortName,
    description: description,
  });

export const myProjectsService = () =>
  axiosInstance.get(Endpoints.CONSOLE.MY_PROJECTS);

export const getProjectService = (projectId) =>
  axiosInstance.get(Endpoints.CONSOLE.GET_PROJECT + `/${projectId}`);

export const uploadBinaryService = (id, file) => {
  var data = new FormData();
  data.append("file", file);
  return axiosInstance.post(Endpoints.CONSOLE.UPLOAD_BINARY, data, {
    params: {
      projectId: id,
    },
  });
};

export const downloadBinary = (fileId) =>
  axiosInstance.get(Endpoints.CONSOLE.DOWNLOAD_BINARY + `/${fileId}`);

export const uploadIconService = (id, file) => {
  var data = new FormData();
  data.append("file", file);
  return axiosInstance.post(Endpoints.CONSOLE.UPLOAD_ICON, data, {
    params: {
      projectId: id,
    },
  });
};

export const uploadPreviewService = (id, file) => {
  var data = new FormData();
  data.append("file", file);
  return axiosInstance.post(Endpoints.CONSOLE.UPLOAD_PREVIEW, data, {
    params: {
      projectId: id,
    },
  });
};
