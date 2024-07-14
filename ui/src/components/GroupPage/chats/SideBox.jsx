/* eslint-disable react/prop-types */
import "./sideBox.css";
import ethglobal from "../../../assets/ethglobal.jpeg";
import { SideContainer } from "../groups/SideContainer";

export const SideBox = ({ ref, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div ref={ref} className="sidebox-container">
      <div className="sidebox-header">
        <div className="sidebox-header-icon">
          <img src={ethglobal} />
        </div>
        <div className="sidebox-header-title">
          <div className="sidebox-header-title-name">ETH Global</div>
          <div className="sidebox-header-title-member">22 Members</div>
        </div>
      </div>
      <SideContainer />
    </div>
  );
};
