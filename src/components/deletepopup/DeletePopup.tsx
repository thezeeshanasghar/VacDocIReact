import React, { useState } from "react";
import { IonAlert } from "@ionic/react";
import axios from "axios";

interface IProps {
  url: string;
  title: string;
  confirmAlertOpen: boolean;
  setConfirmAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  renderList?: () => void;
}

const DeletePopup: React.FC<IProps> = ({
  url,
  title,
  confirmAlertOpen,
  setConfirmAlertOpen,
  renderList,
}) => {
  const [resultAlertOpen, setResultAlertOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleConfirmDelete = () => {
    //delete action (API call)
    deleteData()
      .then((response) => {
        if (response.status === 204) {
          setSuccessMessage(`${title} deleted successfully`);
          setResultAlertOpen(true);
          // @ts-ignore
          renderList();
        }
      })
      .catch((error) => {
        console.log("error.response : ", error);
        if (error.response) {
          setErrorMessage(error.response.data);
          setResultAlertOpen(true);
        } else {
          console.error("Error while deleting:", error);
          setErrorMessage("An error has occurred, please try again");
          setResultAlertOpen(true);
        }
        
      });
  };

  const handleCancelDelete = () => {
    setConfirmAlertOpen(false);
  };

  const handleAlertDismiss = () => {
    setResultAlertOpen(false);
    setSuccessMessage("");
    setErrorMessage("");
  };

  //delete api call
  const deleteData = () => {
    return axios.delete(url);
  };

  return (
    <>
      <IonAlert
        style={{ zIndex: 9999999999999 }}
        isOpen={confirmAlertOpen}
        onDidDismiss={handleCancelDelete}
        header="Confirm Delete"
        message="Are you sure you want to delete?"
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            handler: handleCancelDelete,
          },
          {
            text: "Confirm",
            handler: handleConfirmDelete,
          },
        ]}
      />

      {/* Result Alert */}
      <IonAlert
        style={{ zIndex: 9999999999999 }}
        isOpen={resultAlertOpen}
        onDidDismiss={handleAlertDismiss}
        header={
          successMessage
            ? "Delete Successful"
            : errorMessage
            ? "Delete Error"
            : ""
        }
        message={successMessage || errorMessage}
        buttons={[
          {
            text: "OK",
            handler: handleAlertDismiss,
          },
        ]}
      />
    </>
  );
};

export default DeletePopup;
