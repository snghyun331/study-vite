import React from "react";
import StatsCard from "../components/StatsCard";
import DatabaseList from "../components/DatabaseList";
import { Database, Table, HardDrive, Zap } from "lucide-react";

interface DatabaseType {
  name: string;
  tables: number;
  size: string;
  lastUpdate: string;
  status: "active" | "maintenance";
}

interface OverviewProps {
  databases: DatabaseType[];
  onDBSelect: (db: DatabaseType) => void;
}

const Overview: React.FC<OverviewProps> = ({ databases, onDBSelect }) => {
  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          value="4"
          label="Total Databases"
          change="↗ 8%"
          changeType="positive"
          icon={<Database className="mr-2 text-blue-500" size={16} />}
        />

        <StatsCard
          value="41"
          label="Total Tables"
          change="↘ 3%"
          changeType="negative"
          icon={<Table className="mr-2 text-orange-500" size={16} />}
        />

        <StatsCard
          value="847"
          label="Total Columns"
          change="Active"
          changeType="warning"
          icon={<HardDrive className="mr-2 text-purple-500" size={16} />}
        />

        <StatsCard
          value="2 mins ago"
          label="Last Update"
          change="Live"
          changeType="info"
          icon={<Zap className="mr-2 text-green-500" size={16} />}
        />
      </div>

      {/* Database List */}
      <DatabaseList databases={databases} onDBSelect={onDBSelect} />
    </>
  );
};

export default Overview;
