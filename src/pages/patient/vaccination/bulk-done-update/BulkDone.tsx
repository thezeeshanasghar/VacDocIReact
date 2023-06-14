import React, { useState } from "react";
import { IonItem, IonLabel, IonInput, IonButton, IonPage, IonContent, IonHeader, IonToolbar, IonTitle } from "@ionic/react";

const BulkDone: React.FC = () => {
  const [weight, setWeight] = useState<number>();
  const [height, setHeight] = useState<number>();
  const [OFC, setOFC] = useState<number>();
  const [givenDate, setGivenDate] = useState<string>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Weight:", weight);
    console.log("Height:", height);
    console.log("OFC:", OFC);
    console.log("Given Date:", givenDate);
  };

  return (
    <IonPage>
        <IonContent>
            <IonHeader>
                <IonToolbar color={"primary"}><IonTitle>Bulk</IonTitle></IonToolbar>
            </IonHeader>
            <form noValidate onSubmit={handleSubmit}>
              <IonItem>
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

export default BulkDone;
