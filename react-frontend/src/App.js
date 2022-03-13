import { Routes, Route } from "react-router-dom";
import AddCampaign from "./components/campaign/AddCampaign";
import Home from "./components/campaign/index/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/create" element={<AddCampaign />} exact />
      </Routes>
    </>
  );
}

export default App;
