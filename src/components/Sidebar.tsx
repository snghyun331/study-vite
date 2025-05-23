import React, { useState } from "react";
import { Database, Table, Server, Activity, Settings, BarChart3, Calendar, Shield } from "lucide-react";

interface Database {
  name: string;
  tables: number;
  size: string;
  lastUpdate: string;
  status: "active" | "maintenance";
}

interface SidebarProps {
  databases: Database[];
  onDBSelect: (db: Database) => void;
}

interface SidebarItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  active?: boolean;
  hasDropdown?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ databases, onDBSelect }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const sidebarItems: SidebarItem[] = [
    { icon: BarChart3, label: "Overview", active: true },
    { icon: Database, label: "Databases", hasDropdown: true },
    { icon: Table, label: "Tables" },
    { icon: Server, label: "Connections" },
    { icon: Activity, label: "Performance" },
    { icon: Shield, label: "Security" },
    { icon: Calendar, label: "Backups" },
    { icon: Settings, label: "Settings" },
  ];

  const handleDBClick = (db: Database): void => {
    onDBSelect(db);
    setActiveDropdown(null);
  };

  return (
    <div className="w-16 bg-gray-900 flex flex-col items-center py-4">
      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mb-8">
        <span className="text-white font-bold text-sm">DB</span>
      </div>

      {sidebarItems.map((item, index) => (
        <div key={index} className="relative group mb-2">
          <button
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              item.active ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
            onMouseEnter={() => item.hasDropdown && setActiveDropdown("databases")}
            onMouseLeave={() => !item.hasDropdown && setActiveDropdown(null)}
          >
            <item.icon size={20} />
          </button>

          {/* Database Dropdown */}
          {item.hasDropdown && activeDropdown === "databases" && (
            <div
              className="absolute left-12 top-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-48 z-50"
              onMouseEnter={() => setActiveDropdown("databases")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {databases.map((db, dbIndex) => (
                <button
                  key={dbIndex}
                  onClick={() => handleDBClick(db)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium text-gray-900">{db.name}</div>
                    <div className="text-xs text-gray-500">
                      {db.tables} tables • {db.size}
                    </div>
                  </div>
                  <div
                    className={`w-2 h-2 rounded-full ${db.status === "active" ? "bg-green-400" : "bg-yellow-400"}`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
