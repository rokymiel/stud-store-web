import { axiosInstance } from "../instance";
import { Endpoints } from "../endpoints";

export const allProjectsService = () =>
  axiosInstance.get(Endpoints.ADMIN.PROJECTS);

export const statusUpdateService = (projectId, new_status) =>
  axiosInstance.patch(
    Endpoints.ADMIN.STATUS_UPDATE(projectId),
    {
      newStatus: new_status,
    }
  );
