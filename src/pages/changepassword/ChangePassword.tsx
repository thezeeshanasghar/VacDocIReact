import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonPage,
} from "@ionic/react";
import React,{useState,useEffect} from 'react';
import Header from "../../components/header/Header";
import Toast from "../../components/custom-toast/Toast";

const ChangePassword: React.FC = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handelChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(newPassword)
    console.log(confirmNewPassword)
    if (newPassword === confirmNewPassword) {
        // Passwords match, handle form submission
        const data_to_be_sent = [{
            path: "password",
            op: "replace",
            from: oldPassword,
            value: confirmNewPassword,
          }];
          console.log(data_to_be_sent);
          fetch("http://localhost:5041/api/Doctor/password/1", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data_to_be_sent),
          })
            .then((res) => (res.status === 204 ? setSuccess(true) : setError(true)))
            .catch((err) => setError(true))
            .finally(() => {
              setOldPassword("");
              setNewPassword("");
              setConfirmNewPassword("");
            });
        // Add your logic here for handling the form submission, such as sending data to an API
      } else {
        // Passwords do not match
        console.log("first")
        setPasswordMatch(false);
      }
  };

  const handlePasswordChange = (e:any) => {
    setNewPassword(e.target.value);
    setPasswordMatch(true);
  };

  const handleConfirmPasswordChange = (e:any) => {
    setConfirmNewPassword(e.target.value);
    setPasswordMatch(true);
  };

  return (
    <IonPage>
         <Toast
        isOpen={success}
        setOpen={setSuccess}
        message="Change password successfully."
        color="success"
      />
      <Toast
        isOpen={error}
        setOpen={setError}
        message="An error occurred while changing password. plz try again"
        color="danger"
      />
      <Header pageName="Change Password" />
      <IonContent className="ion-padding">
        <form onSubmit={handelChangePassword}>
        <IonItem>
          <IonInput
           type="password"
            label="Old Password"
            labelPlacement="floating"
            placeholder="Enter Old Password"
            onIonChange={(e) => setOldPassword(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonInput
           type="password"
            label="New Password"
            labelPlacement="floating"
            placeholder="Enter New Password"
            value={newPassword}
            onIonChange={(e) => setNewPassword(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonInput
           type="password"
            label="Confirm Password"
            labelPlacement="floating"
            placeholder="Enter Confirm Password"
            value={confirmNewPassword}
            onIonChange={(e) => setConfirmNewPassword(e.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonButton type="submit">
            Change Password
            </IonButton>
            </form>
      </IonContent>
    </IonPage>
  );
};

export default ChangePassword;
