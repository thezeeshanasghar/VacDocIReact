import React, { useState } from "react";
import {
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const SingleDone: React.FC = (props) => {
  console.log(props)
  // const [weight, setWeight] = useState<number>();
  // const [height, setHeight] = useState<number>();
  // const [OFC, setOFC] = useState<number>();
  const [brand, setBrand] = useState<string>();
  const [scheduleDate, setScheduleDate] = useState<string>();
  const [givenDate, setGivenDate] = useState<string>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    // console.log("Weight:", weight);
    // console.log("Height:", height);
    // console.log("OFC:", OFC);
    console.log("Brand:", brand);
    console.log("Schedule Date:", scheduleDate);
    console.log("Given Date:", givenDate);
  };

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar color={"primary"}>
            <IonTitle>Fill Child Vaccine</IonTitle>
          </IonToolbar>
        </IonHeader>
        <form noValidate onSubmit={handleSubmit}>
          

          <IonItem>
            <IonLabel color="primary">Brands</IonLabel>
            <IonSelect
              value={brand}
              onIonChange={(e) => setBrand(e.detail.value)}
            >
              <IonSelectOption value="brand1">Brand 1</IonSelectOption>
              <IonSelectOption value="brand2">Brand 2</IonSelectOption>
              <IonSelectOption value="brand3">Brand 3</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel color="primary">Schedule Date</IonLabel>
            <input
              type="date"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              max="2023-06-13"
            />
          </IonItem>

          <IonItem>
            <IonLabel color="primary">Given Date</IonLabel>
            <input
              type="date"
              value={givenDate}
              onChange={(e) => setGivenDate(e.target.value)}
              max="2023-06-13"
            />
          </IonItem>

          <IonButton type="submit">Submit</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default SingleDone;

{/* <IonItem>
            <IonLabel position="floating" color="primary">
              Weight
            </IonLabel>
            <IonInput
              type="number"
              value={weight}
              onIonChange={(e) => setWeight(parseFloat(e.detail.value!))}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating" color="primary">
              Height
            </IonLabel>
            <IonInput
              type="number"
              value={height}
              onIonChange={(e) => setHeight(parseFloat(e.detail.value!))}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating" color="primary">
              OFC
            </IonLabel>
            <IonInput
              type="number"
              value={OFC}
              onIonChange={(e) => setOFC(parseFloat(e.detail.value!))}
            ></IonInput>
          </IonItem> */}