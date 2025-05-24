import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Table } from "lucide-react";
import { databases } from "../App";

interface TableData {
  tableName: string;
  columns: number;
  records: string;
  lastUpdate: string;
  size: string;
}

const MasterSheet: React.FC = () => {
  const { dbName } = useParams<{ dbName: string }>();
  const navigate = useNavigate();

  // URL 파라미터로 데이터베이스 찾기
  const selectedDB = databases.find((db) => db.name === dbName);

  // 데이터베이스를 찾을 수 없는 경우
  if (!selectedDB) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Database not found</h3>
          <p className="mt-1 text-sm text-gray-500">The database "{dbName}" could not be found.</p>
          <div className="mt-6">
            <button
              onClick={() => navigate("/overview")}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Back to Overview
            </button>
          </div>
        </div>
      </div>
    );
  }

  const masterSheetData: TableData[] = [
    { tableName: "users", columns: 12, records: "125,430", lastUpdate: "2 mins ago", size: "45MB" },
    { tableName: "products", columns: 8, records: "8,720", lastUpdate: "15 mins ago", size: "12MB" },
    { tableName: "orders", columns: 15, records: "89,340", lastUpdate: "5 mins ago", size: "78MB" },
    { tableName: "categories", columns: 5, records: "156", lastUpdate: "2 days ago", size: "1MB" },
    { tableName: "reviews", columns: 9, records: "45,670", lastUpdate: "1 hour ago", size: "23MB" },
  ];

  const handleBack = (): void => {
    navigate("/overview");
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-4">
          <li>
            <div>
              <button onClick={() => navigate("/overview")} className="text-gray-400 hover:text-gray-500">
                <svg className="flex-shrink-0 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span className="sr-only">Home</span>
              </button>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <button
                onClick={() => navigate("/overview")}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Databases
              </button>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-4 text-sm font-medium text-gray-900">{selectedDB.name}</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold text-gray-900">{selectedDB.name} - Tables Overview</h2>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  selectedDB.status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {selectedDB.status}
              </span>
            </div>
            <button onClick={handleBack} className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
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
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MasterSheet;
