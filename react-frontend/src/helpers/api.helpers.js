import axios from "axios";
import _ from "lodash";

const URL = "http://localhost:9047/api/advertisements";

export const getCampaignList = async () => {
  return axios.get(URL);
};

export const saveCampaign = async (formData) => {
  return axios.post(URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateCampaign = async (formData) => {
  return axios.post(URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const prepareFormData = (campaign) => {
  const { files, name, from, to, daily_budget, total_budget } = campaign;
  
  let formData = new FormData();
  formData.append("name", name);
  formData.append("from", new Date(from).toISOString().split("T")[0]);
  formData.append("to", new Date(to).toISOString().split("T")[0]);
  formData.append("daily_budget", daily_budget);
  formData.append("total_budget", total_budget);
  _.forEach(files, (file) => {
    formData.append("images[]", file);
  });

  return formData;
};
