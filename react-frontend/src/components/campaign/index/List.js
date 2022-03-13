import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import CampaignPreview from "./CampaignPreview";

function List({ items }) {
  let navigate = useNavigate();
  return (
    <div>
      <Table className="border" responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>From Date ~ To Date</th>
            <th>Daily budget</th>
            <th>Total budget </th>
            <th>Edit</th>
            <th>Preview Button</th>
          </tr>
        </thead>
        <tbody>
          {items &&
            items.map((campaign) => (
              <tr key={campaign.id}>
                <td>{campaign.name}</td>
                <td>
                  {campaign.from} ~ {campaign.to}
                </td>
                <td>$ {campaign.daily_budget}</td>
                <td>$ {campaign.total_budget} </td>
                <td>
                  <Button
                    variant="info"
                    size={`sm`}
                    onClick={() => navigate(`/edit/${campaign.id}`)}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <CampaignPreview images={campaign.images} />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default List;
