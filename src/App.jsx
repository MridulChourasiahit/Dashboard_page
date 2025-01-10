// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Template from "./components/templates/Template";
import "./styles/App.scss";
import Messaging from "./pages/MessagePage"
import Report from "./pages/ReportPage"
import Utility from "./pages/UtilityPage"
import AddressBook from "./pages/AddressPage"
import Download from "./pages/DownloadePage"

// Layout  component to maintain consistent structure
const Layout = () => {
  return (
    <div className="main-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="content">
        <div className="navbar-container">
          <Header />
        </div>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
             
            <Route path="/messaging" element={<Messaging />} />
            <Route path="/report" element={<Report />} />
            <Route path="/utility" element={<Utility />} />
            <Route path="/address-book" element={<AddressBook />} />
            <Route path="/templates" element={<Template />} />
            <Route path="/download" element={<Download />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

// Main App component
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;