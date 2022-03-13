import React from "react";
import Table from "react-bootstrap/Table";
import CampaignPreview from "./CampaignPreview";

function List({ items }) {
  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>From Date ~ To Date</th>
            <th>Daily budget</th>
            <th>Total budget </th>
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
