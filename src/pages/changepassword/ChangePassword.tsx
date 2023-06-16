import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonPage,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Toast from "../../components/custom-toast/Toast";
type DoctorDataType = { Password: string; Name: string };
const ChangePassword: React.FC = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [fetchOldPassword, setFetchOldPassword] = useState<string>();
  const [doctorData, setDoctorData] = useState<DoctorDataType[]>([]);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [msg, setMsg] = useState("");

  const handelChangePassword = () => {
    console.log("old pass", oldPassword);
    console.log("new pass", newPassword);
    console.log("con pass", confirmNewPassword);
    console.log("old pass", fetchOldPassword);
    if (oldPassword === fetchOldPassword) {
      if (newPassword === confirmNewPassword) {
        // Passwords match, handle form submission
        const data_to_be_sent = [
          {
            path: "password",
            op: "replace",
            from: oldPassword,
            value: newPassword,
          },
        ];
        console.log(data_to_be_sent);
        fetch(`${import.meta.env.VITE_API_URL}api/Doctor/password/1`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data_to_be_sent),
        })
          .then((res) =>
            res.status === 204 ? setSuccess(true) : setError(true)
          )
          .catch((err) => setError(true))
          .finally(() => {
            setOldPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
          });
        // Add your logic here for handling the form submission, such as sending data to an API
      } else {
        // Passwords do not match
        console.log("first");
        setPasswordMatch(false);
        setError(true);
        setMsg("your new password & confirm password is not same");
      }
    } else {
      setPasswordMatch(false);
      setError(true);
      setMsg("your old password is wrong");
    }
  };
  const pass = () => {
    fetch(`${import.meta.env.VITE_API_URL}api/Doctor`) 
      .then((res) => res.json())
      .then((data) => {
        setDoctorData(data[0].Password);
        console.log(data[0].Password);
        setFetchOldPassword(data[0].Password);
      });
  };
  useEffect(() => {
    pass();
  }, [doctorData]);
  // const handlePasswordChange = (e:any) => {
  //   setNewPassword(e.target.value);
  //   setPasswordMatch(true);
  // };

  // const handleConfirmPasswordChange = (e:any) => {
  //   setConfirmNewPassword(e.target.value);
  //   setPasswordMatch(true);
  // };
  // const handlePasswordChange = (e: any) => {
  //   console.log(e.target.value);
  //   setOldPassword(e.target.value);
  // };

  const canSubmit =
    oldPassword.length > 0 &&
    newPassword.length > 0 &&
    confirmNewPassword.length > 0;

  useEffect(() => {
    console.log("oldPassword", oldPassword);
  }, [oldPassword]);

  useEffect(() => {
    console.log("newPassword", newPassword);
  }, [newPassword]);

  useEffect(() => {
    console.log("confirmNewPassword", confirmNewPassword);
  }, [confirmNewPassword]);

  return (
    <>
      <IonPage>
        <Toast
          isOpen={success}
          setOpen={setSuccess}
          message="Change password successfully."
          color="success"
        />
        <Toast isOpen={error} setOpen={setError} message={msg} color="danger" />
        <Header pageName="Change Password" />
        <IonContent className="ion-padding">
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
          <IonItem>
            <IonInput
              type="password"
              label="Old Password"
              labelPlacement="floating"
              placeholder="Enter Old Password"
              value={oldPassword}
              onIonChange={(e)=> setOldPassword(e.detail.value!)}
            ></IonInput>
          </IonItem>

          <IonButton
            type="submit"
            disabled={!canSubmit}
            onClick={() => {
              handelChangePassword();
            }}
          >
            Change Password
          </IonButton>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ChangePassword;
