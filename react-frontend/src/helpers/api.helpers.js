import axios from "axios";

const URL = "http://localhost:9047/api/advertisements";

export const getCampaignList = async () => {
  return axios.get(URL);
};

export const saveCampaign = async (campaign) => {
  return axios.post(URL, campaign);
};

export const updateCampaign = async (campaign) => {
  return axios.put(URL, campaign);
};
