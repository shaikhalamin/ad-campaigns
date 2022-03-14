import axios from "axios";
import _ from "lodash";

export const BASEURL = "http://localhost:9047";

const API_URL = `${BASEURL}/api/advertisements`;

export const getCampaignList = async () => {
  return axios.get(API_URL);
};

export const saveCampaign = async (formData) => {
  return axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getCampaign = async (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const updateCampaign = async (id, formData) => {
  return axios.post(`${API_URL}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const prepareFormData = (campaign, method = "POST") => {
  const { files, name, from, to, daily_budget, total_budget } = campaign;

  let formData = new FormData();
  formData.append("name", name);
  formData.append("from", new Date(from).toISOString().split("T")[0]);
  formData.append("to", new Date(to).toISOString().split("T")[0]);
  formData.append("daily_budget", daily_budget);
  formData.append("total_budget", total_budget);

  files &&
    _.forEach(files, (file) => {
      formData.append("images[]", file);
    });

  method === "PUT" && formData.append("_method", "PUT");

  return formData;
};
