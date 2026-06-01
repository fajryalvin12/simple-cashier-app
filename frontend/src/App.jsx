import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/ProductList";

const PAGE_TITLES = {
  dashboard: "Dashboard",
  products: "Products",
  transactions: "Transactions",
};

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "products":
        return <ProductList />;
      case "transactions":
        return (
          <div className="flex flex-col items-center justify-center flex-1 text-gray-400">
            <span className="text-4xl mb-3">🧾</span>
            <p className="text-sm">Transactions page coming soon</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="flex flex-col flex-1 min-w-0">
        <Navbar title={PAGE_TITLES[activePage]} />
        <main className="flex-1 overflow-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
