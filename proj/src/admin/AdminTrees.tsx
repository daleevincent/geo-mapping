import { useEffect, useState } from "react";
import api from "../services/api";
import type { TreeData } from "../types/tree";

const AdminTrees = () => {
  const [trees, setTrees] = useState<TreeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrees = async () => {
      try {
        const res = await api.get<TreeData[]>("/admin/trees");
        setTrees(res.data);
      } catch (err) {
        console.error("Failed to load trees", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrees();
  }, []);

  const toggleDNA = async (tree: TreeData) => {
    try {
      await api.patch(`/admin/trees/${tree.id}`, {
        dna_verified: !tree.dna_verified,
      });

      setTrees(prev =>
        prev.map(t =>
          t.id === tree.id
            ? { ...t, dna_verified: !t.dna_verified }
            : t
        )
      );
    } catch (err) {
      console.error("Failed to update tree", err);
    }
  };

  if (loading) return <p>Loading trees...</p>;

  return (
    <div className="admin-page">
      <h2>Admin – Tree Records</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Farm</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>DNA Verified</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {trees.map(tree => (
            <tr key={tree.id}>
              <td>{tree.id}</td>
              <td>{tree.farm_id}</td>
              <td>{tree.latitude}</td>
              <td>{tree.longitude}</td>
              <td>{tree.dna_verified ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => toggleDNA(tree)}>
                  Toggle DNA
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTrees;
