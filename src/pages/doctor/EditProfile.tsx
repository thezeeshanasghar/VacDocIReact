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
// import { format } from "date-fns";
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
  // const [doctorType, setDoctorType] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [doctorId, setDoctorId] = useState<string>("")

  // useEffect(() => {
  //   const storedValue = JSON.parse(sessionStorage.getItem("docData"));
  //   console.log(storedValue);
  //   console.log(storedValue.Id);
  //   setDoctorId(storedValue.Id);
  // }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    //@ts-ignore
    const data_to_be_sent = {
      id: data?.Id,
      name,
      mobileNumber,
      password,
      isEnabled: isEnabled ? 1 : 0,
      email,
      // doctorType,
      pmdc,
    };
    console.log("in submit",doctorId)
    fetch(`${import.meta.env.VITE_API_URL}api/Doctor/doctors/${doctorId}`, {
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
    // setDoctorType("");
    setIsEnabled(false);
  };
  const fetchInitialDocData = () => {
    const storedValue = JSON.parse(sessionStorage.getItem("docData"));
    console.log(storedValue);
    console.log(storedValue.Id);
    const data=storedValue.Id
    setDoctorId(storedValue.Id);
    console.log(doctorId)
    fetch(`${import.meta.env.VITE_API_URL}api/Doctor/${data}`)
      .then((response) => response.json())
      .then((data: DoctorData) => {
        if (Object.keys(data).length !== 0) {
          setName(data.Name);
          setEmail(data.Email);
          setMobileNumber(data.MobileNumber);
          setPmdc(data.PMDC);
          // setDoctorType(data.DoctorType);
          setIsEnabled(data.IsEnabled);
          setData(data);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchInitialDocData();
  }, []);
  // const canSubmit =
  //   name.length>0 &&
  //   email.length>0 &&
  //   mobileNumber.length>0 &&
  //   pmdc.length>0 &&
  //   doctorType.length>0;
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
                      value={name}
                      onIonChange={(e) => setName(e.detail.value!)}
                      required
                      id="name1"
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput
                      type="email"
                      value={email}
                      onIonChange={(e) => setEmail(e.detail.value!)}
                      required
                      id="email"
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Mobile Number</IonLabel>
                    <IonInput
                      type="tel"
                      value={mobileNumber}
                      onIonChange={(e) => setMobileNumber(e.detail.value!)}
                      required
                      id="mob"
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">pmdc</IonLabel>
                    <IonInput
                      type="text"
                      value={pmdc}
                      onIonChange={(e) => setPmdc(e.detail.value!)}
                      required
                      id="pmdc"
                    />
                  </IonItem>
                  {/* <IonItem>
                    <IonLabel position="floating">Doctor Type</IonLabel>
                    <IonInput
                      type="text"
                      value={doctorType}
                      onIonChange={(e) => setDoctorType(e.detail.value!)}
                      required/>
                  </IonItem> */}
                  {/* <IonGrid>
                    <IonRow>
                      <IonCol>
                        <IonItem>
                          <IonLabel>Set as Enabled</IonLabel>
                          <IonCheckbox
                            slot="start"
                            name="isEnabled"
                            checked={isEnabled}
                            onIonChange={(e) => setIsEnabled(e.detail.checked)}
                          />
                        </IonItem>
                      </IonCol>
                    </IonRow>
                  </IonGrid> */}
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
