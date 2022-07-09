import "./App.css";
import "./util.scss";
import SideMenu from "./component/SideMenu/SideMenu";
import { Layout } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CountryCard from "./component/CountryCard/CountryCard";
import LocationsPage from "./component/LocationsPage/LocationsPage";
import CreateLocationPopup from "./component/CreateLocationPopup/CreateLocationPopup";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Layout className="Wrapper" style={{ minHeight: "100vh" }}>
          <SideMenu />
          <Layout.Content>
            <Routes>
              <Route
                path="/settings/locations"
                element={<LocationsPage />}
              ></Route>
            </Routes>
          </Layout.Content>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
