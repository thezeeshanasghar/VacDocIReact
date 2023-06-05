import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonGrid,
  IonButton,
  IonCol,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonListHeader,
} from "@ionic/react";
import React from "react";
import Header from "../../components/header/Header";
import "./css/addpatient.css";

const AddPatient: React.FC = () => {
  return (
    <IonPage>
      <Header pageName="Add Patient" />
      <IonCard style={{ overflowY: "scroll" }}>
        {/* <IonCardHeader>
          <IonCardTitle>Form</IonCardTitle>
        </IonCardHeader> */}
        <IonCardContent>
          <IonItem>
            <IonLabel position="floating">Patient Name</IonLabel>
            <IonInput type="text" />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Father's Name</IonLabel>
            <IonInput type="text" />
          </IonItem>
          <IonRadioGroup value="Boy">
            <IonListHeader>Gender</IonListHeader>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel>Boy</IonLabel>
                    <IonRadio slot="start" value="Boy" />
                  </IonItem>
                </IonCol>
                <IonCol>
                  <IonItem>
                    <IonLabel>Girl</IonLabel>
                    <IonRadio slot="start" value="Girl" />
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonRadioGroup>
          <IonRadioGroup value="special">
            <IonListHeader>Schedule Type</IonListHeader>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel>Regular</IonLabel>
                    <IonRadio slot="start" value="regular" />
                  </IonItem>
                </IonCol>
                <IonCol>
                  <IonItem>
                    <IonLabel>Special</IonLabel>
                    <IonRadio slot="start" value="special" />
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonRadioGroup>
          <IonItem>
            <IonLabel position="floating">Date of Birth</IonLabel>
            <IonInput slot="end" type="date" />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput type="email" />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Mobile Number</IonLabel>
            <IonInput type="tel" />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Preferred Day of week</IonLabel>
            <IonSelect multiple>
              <IonSelectOption value="Any">Any</IonSelectOption>
              <IonSelectOption value="Monday">Monday</IonSelectOption>
              <IonSelectOption value="Tuesday">Tuesday</IonSelectOption>
              <IonSelectOption value="Wednesday">Wednesday</IonSelectOption>
              <IonSelectOption value="Thursday">Thursday</IonSelectOption>
              <IonSelectOption value="Friday">Friday</IonSelectOption>
              <IonSelectOption value="Saturday">Saturday</IonSelectOption>
              <IonSelectOption value="Sunday">Sunday</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Preferred Day of Reminder</IonLabel>
            <IonSelect multiple>
              <IonSelectOption value="Any">On Due Day</IonSelectOption>
              <IonSelectOption value="Monday">
                Due Day + 1 Day before
              </IonSelectOption>
              <IonSelectOption value="Tuesday">
                Due Day + 2 Day before
              </IonSelectOption>
              <IonSelectOption value="Wednesday">
                Due Day + 3 Day before
              </IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">City</IonLabel>
            <IonSelect multiple>
              <IonSelectOption value="Any">City 1</IonSelectOption>
              <IonSelectOption value="Monday">2</IonSelectOption>
              <IonSelectOption value="Tuesday">3</IonSelectOption>
              <IonSelectOption value="Wednesday">4</IonSelectOption>
            </IonSelect>
          </IonItem>
          <div className="patient-checkboxes">
            <IonItem>
              <IonCheckbox slot="start" />
              <IonLabel>Is Epilepsy patient?</IonLabel>
            </IonItem>
            <IonItem>
              <IonCheckbox slot="start" />
              <IonLabel>Verified</IonLabel>
            </IonItem>
          </div>
          <IonButton expand="full">Submit</IonButton>
        </IonCardContent>
      </IonCard>
    </IonPage>
  );
};

export default AddPatient;
