import type { Farm } from "../assets/utils/types";

const AdminStats = ({ farms }: { farms: Farm[] }) => {
  const totalTrees = farms.reduce((sum, f) => sum + f.totalTrees, 0);
  const dnaVerified = farms.reduce((sum, f) => sum + f.dnaVerifiedCount, 0);

  return (
    <div className="admin-stats">
      <div>Total Farms: {farms.length}</div>
      <div>Total Trees: {totalTrees}</div>
      <div>DNA Verified Trees: {dnaVerified}</div>
    </div>
  );
};

export default AdminStats;
