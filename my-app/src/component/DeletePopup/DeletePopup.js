import { Modal } from "antd";
import { WarningOutlined } from "@ant-design/icons";

import "./DeletePopup.scss";

function DeletePopup({ isVisible, createCard, closePopup, deleteCard, title }) {
  const handleDelete = () => {
    deleteCard(title);
    closePopup();
  };

  return (
    <Modal
      visible={isVisible}
      className="DeletePopup"
      title="Delete Location"
      width={460}
      onCancel={closePopup}
    >
      <div className="Delete-Title">
        Are you sure want to delete “USA” Location?
      </div>
      <div className="Delete-Warning">
        <WarningOutlined className="Warning-Icon" />
        <span className="Warning-Info">
          Deleting a location might impact the users' configuration and leave
          information (e.g. the initial brought forward days).
        </span>
      </div>
      <button className="Delete-Button" onClick={handleDelete}>
        Yes, Delete
      </button>
    </Modal>
  );
}

export default DeletePopup;
