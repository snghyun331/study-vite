import React from "react";
import { Table } from "lucide-react";

interface Database {
  name: string;
  tables: number;
  size: string;
  lastUpdate: string;
  status: "active" | "maintenance";
}

interface MasterSheetProps {
  selectedDB: Database;
  onBack: () => void;
}

interface TableData {
  tableName: string;
  columns: number;
  records: string;
  lastUpdate: string;
  size: string;
}

const MasterSheet: React.FC<MasterSheetProps> = ({ selectedDB, onBack }) => {
  const masterSheetData: TableData[] = [
    { tableName: "users", columns: 12, records: "125,430", lastUpdate: "2 mins ago", size: "45MB" },
    { tableName: "products", columns: 8, records: "8,720", lastUpdate: "15 mins ago", size: "12MB" },
    { tableName: "orders", columns: 15, records: "89,340", lastUpdate: "5 mins ago", size: "78MB" },
    { tableName: "categories", columns: 5, records: "156", lastUpdate: "2 days ago", size: "1MB" },
    { tableName: "reviews", columns: 9, records: "45,670", lastUpdate: "1 hour ago", size: "23MB" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">{selectedDB.name} - Tables Overview</h2>
          <button onClick={onBack} className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
            ← Back to Overview
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Table Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Columns
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Records
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Update
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {masterSheetData.map((table, index) => (
              <tr key={index} className="hover:bg-gray-50 cursor-pointer transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Table className="mr-3 text-blue-500" size={16} />
                    <span className="font-medium text-gray-900">{table.tableName}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{table.columns}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{table.records}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{table.size}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{table.lastUpdate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MasterSheet;
