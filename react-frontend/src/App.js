import { Routes, Route } from "react-router-dom";
import AddCampaign from "./components/campaign/AddCampaign";
import EditCampaign from "./components/campaign/EditCampaign";
import Home from "./components/campaign/index/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/create" element={<AddCampaign />} exact />
        <Route path="/edit/:id" element={<EditCampaign />} exact />
      </Routes>
    </>
  );
}

export default App;
