import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
} from "@ionic/react";
import React, { FormEvent, useEffect, useState } from "react";
import Header from "../../components/header/Header";
import useFetch from "../../hook/useFetch";
import { format } from "date-fns";
import Toast from "../../components/custom-toast/Toast";
type DoctorData = {
  Id: number;
  Name: string;
  MobileNumber: string;
  Password: string;
  Isapproved: boolean;
  IsEnabled: boolean;
  Email: string;
  DoctorType: string;
  PMDC: string;
  ValidUpto: string;
};
const EditProfile: React.FC = () => {
  const [data, setData] = useState<DoctorData>();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [pmdc, setPmdc] = useState("");
  const [doctorType, setDoctorType] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);

  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    //@ts-ignore
    const data_to_be_sent = {
      id: 1,
      name: name ? name : data?.Name,
      mobileNumber: mobileNumber ? mobileNumber : data?.MobileNumber,
      password: password ? password : data?.Password,
      isEnabled: isEnabled ? 1 : 0,
      email: email ? email : data?.Email,
      doctorType: doctorType ? doctorType : data?.DoctorType,
      pmdc: pmdc ? pmdc : data?.PMDC,
    };
    fetch(`http://localhost:5041/api/Doctor/doctors/${1}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data_to_be_sent),
    })
      .then((response) => {
        response.status === 204 ? setSuccess(true) : setError(true);
      })
      .catch((error) => setError(true))
      .finally(() => {
        clearVariables();
        fetchInitialDocData();
      });
  }
  //function to clear all state variables;
  const clearVariables = () => {
    setName("");
    setPassword("");
    setEmail("");
    setMobileNumber("");
    setPmdc("");
    setDoctorType("");
    setIsEnabled(false);
  };
  const fetchInitialDocData = () => {
    fetch(`http://localhost:5041/api/Doctor/${1}`)
      .then((response) => response.json())
      .then((data: DoctorData) => setData(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchInitialDocData();
  }, []);
  return (
    <>
      {data && (
        <IonPage>
          <Toast
            isOpen={success}
            setOpen={setSuccess}
            message="Updated successfully."
            color="success"
          />
          <Toast
            isOpen={error}
            setOpen={setError}
            message="An error occurred while updating doctor profile. plz try again"
            color="danger"
          />
          <Header pageName="Update Profile" />
          <IonContent className="ion-padding">
            <IonCard>
              <IonCardContent>
                <form onSubmit={handleSubmit}>
                  <IonItem>
                    <IonLabel position="floating">Name</IonLabel>
                    <IonInput
                      type="text"
                      value={name || data.Name}
                      onIonChange={(e) => setName(e.detail.value!)}
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput
                      type="email"
                      value={email || data.Email}
                      onIonChange={(e) => setEmail(e.detail.value!)}
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Mobile Number</IonLabel>
                    <IonInput
                      type="tel"
                      value={mobileNumber || data.MobileNumber}
                      onIonChange={(e) => setMobileNumber(e.detail.value!)}
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">pmdc</IonLabel>
                    <IonInput
                      type="text"
                      value={pmdc || data.PMDC}
                      onIonChange={(e) => setPmdc(e.detail.value!)}
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Doctor Type</IonLabel>
                    <IonInput
                      type="text"
                      value={doctorType || data.DoctorType}
                      onIonChange={(e) => setDoctorType(e.detail.value!)}
                    />
                  </IonItem>
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        <IonItem>
                          <IonLabel>Set as Enabled</IonLabel>
                          <IonCheckbox
                            slot="start"
                            name="isEnabled"
                            checked={isEnabled || data.IsEnabled}
                            onIonChange={(e) => setIsEnabled(e.detail.checked)}
                          />
                        </IonItem>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                  <IonButton type="submit" expand="full">
                    Update
                  </IonButton>
                </form>
              </IonCardContent>
            </IonCard>
          </IonContent>
        </IonPage>
      )}
    </>
  );
};

export default EditProfile;
