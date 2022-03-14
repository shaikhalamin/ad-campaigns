import React from "react";
import { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getCampaignList } from "../../../helpers/api.helpers";
import Layout from "../../layouts/Layout";
import List from "./List";

function Home() {
  const [campaigns, setCampaigns] = useState({});

  useEffect(() => {
    getCampaignList().then((result) => {
      setCampaigns(result?.data?.data);
    });
  }, []);

  return (
    <>
      <Layout>
        <Row className="mt-5">
          <Col lg={12}>
            <h4 className="text-center mb-2">Advertise Campaigns List</h4>

            <Link
              to="/create"
              className="text-dark btn btn-info text-dark mb-5"
            >
              Create Campaign
            </Link>
          </Col>
        </Row>
        <List items={campaigns.data} />
      </Layout>
    </>
  );
}

export default Home;
