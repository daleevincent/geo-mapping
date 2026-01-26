import type { Farm } from "../assets/utils/types";
import "../styles/farmModal.css";

interface FarmModalProps {
  farm: Farm;
  onClose: () => void;
  onViewTrees: () => void;
}

const FarmModal = ({ farm, onClose, onViewTrees }: FarmModalProps) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{farm.name}</h3>
        <p><strong>City/Municipality:</strong> {farm.cityName}</p>
        <p><strong>Barangay:</strong> {farm.barangayName}</p>
        <p><strong>Total Liberica Trees:</strong> {farm.totalTrees}</p>
        <p><strong>DNA Verified:</strong> {farm.dnaVerifiedCount}</p>

        <div className="modal-buttons">
          <button onClick={onViewTrees}>View Trees</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default FarmModal;
