import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Overview from "./pages/Overview";
import MasterSheet from "./pages/MasterSheet";

// Types
interface Database {
  name: string;
  tables: number;
  size: string;
  lastUpdate: string;
  status: "active" | "maintenance";
}

// Mock data
const databases: Database[] = [
  { name: "UserDB", tables: 15, size: "2.3GB", lastUpdate: "2 mins ago", status: "active" },
  { name: "ProductDB", tables: 8, size: "1.1GB", lastUpdate: "5 mins ago", status: "active" },
  { name: "OrderDB", tables: 12, size: "3.7GB", lastUpdate: "1 hour ago", status: "active" },
  { name: "AnalyticsDB", tables: 6, size: "850MB", lastUpdate: "3 hours ago", status: "maintenance" },
];

const App: React.FC = () => {
  const [selectedDB, setSelectedDB] = useState<Database | null>(null);

  const handleDBSelect = (db: Database): void => {
    setSelectedDB(db);
  };

  const handleBackToOverview = (): void => {
    setSelectedDB(null);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar databases={databases} onDBSelect={handleDBSelect} />

      <div className="flex-1 flex flex-col">
        <Header selectedDB={selectedDB} />

        <main className="flex-1 p-6 overflow-auto">
          {!selectedDB ? (
            <Overview databases={databases} onDBSelect={handleDBSelect} />
          ) : (
            <MasterSheet selectedDB={selectedDB} onBack={handleBackToOverview} />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
