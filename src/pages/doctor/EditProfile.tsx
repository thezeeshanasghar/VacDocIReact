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
import React, { FormEvent, useState } from "react";
import Header from "../../components/header/Header";
import useFetch from "../../hook/useFetch";
import { format } from "date-fns";
type UserData = {
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
  const { data, error, isLoading } = useFetch<UserData>(
    "http://localhost:5041/api/Doctor/1"
  );
  console.log(data);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pdmc, setPdmc] = useState("");
  const [doctorType, setDoctorType] = useState("");
  const [validUpto, setValidUpto] = useState("");
  const [isApproved, setIsApproved] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log("name:", name);
    console.log("password:", password);
    console.log("email:", email);
    console.log("phone:", phone);
    console.log("pdmc:", pdmc);
    console.log("doctorType:", doctorType);
    console.log("validUpto:", validUpto);
    console.log("isApproved:", isApproved);
    console.log("isEnabled:", isEnabled);
  }

  if (isLoading) return <h1>loading..</h1>;
  if (error) new Error("couldnt get data");
  return (
    <>
      {data && (
        <IonPage>
          <Header pageName="Update Profile" />
          <IonContent className="ion-padding">
            <IonCard>
              <IonCardContent>
                <form onSubmit={handleSubmit}>
                  <IonItem>
                    <IonLabel position="floating">Name</IonLabel>
                    <IonInput
                      type="text"
                      value={(data && data.Name) || name}
                      onIonChange={(e) => setName(e.detail.value!)}
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput
                      type="email"
                      value={(data && data.Email) || email}
                      onIonChange={(e) => setEmail(e.detail.value!)}
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Phone No</IonLabel>
                    <IonInput
                      type="tel"
                      value={(data && data.MobileNumber) || phone}
                      onIonChange={(e) => setPhone(e.detail.value!)}
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Password</IonLabel>
                    <IonInput
                      type="text"
                      value={(data && data.Password) || password}
                      onIonChange={(e) => setPassword(e.detail.value!)}
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">PDMC</IonLabel>
                    <IonInput
                      type="text"
                      value={(data && data.PMDC) || pdmc}
                      onIonChange={(e) => setPdmc(e.detail.value!)}
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Doctor Type</IonLabel>
                    <IonInput
                      type="text"
                      value={(data && data.DoctorType) || doctorType}
                      onIonChange={(e) => setDoctorType(e.detail.value!)}
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">Valid UpTo</IonLabel>
                    <IonInput
                      type="date"
                      value={
                        (data &&
                          format(new Date(data.ValidUpto), "yyyy-MM-dd")) ||
                        validUpto
                      }
                      onIonChange={(e) => setValidUpto(e.detail.value!)}
                    />
                  </IonItem>
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        <IonItem>
                          <IonLabel>Set as Approved</IonLabel>
                          <IonCheckbox
                            slot="start"
                            name="isApproved"
                            checked={(data && data.Isapproved) || isApproved}
                            onIonChange={(e) => setIsApproved(e.detail.checked)}
                          />
                        </IonItem>
                      </IonCol>
                      <IonCol>
                        <IonItem>
                          <IonLabel>Set as Enabled</IonLabel>
                          <IonCheckbox
                            slot="start"
                            name="isEnabled"
                            checked={(data && data.IsEnabled) || isEnabled}
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
