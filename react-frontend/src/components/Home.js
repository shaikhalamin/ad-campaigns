import React from "react";
import { useEffect, useState } from "react";
import { getCampaignList } from "../helpers/api.helpers";
import Layout from "./layouts/Layout";
import List from "./List";

function Home() {
  const [campaigns, setCampaigns] = useState({});

  useEffect(() => {
    getCampaignList().then((result) => {
      setCampaigns(result.data);
      console.log(result.data);
    });
  }, []);

  return (
    <>
      <Layout>
        <List items={campaigns.data} />
      </Layout>
    </>
  );
}

export default Home;
