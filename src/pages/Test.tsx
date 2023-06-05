import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonImg,
  IonPage,
} from "@ionic/react";
import React from "react";

const Test: React.FC = () => {
  return (
    <IonPage>
      <IonCard className="welcome-card md hydrated">
        <IonImg src="/assets/vaccinepk.jpg" className="md hydrated"></IonImg>
        <IonCardHeader className="ion-inherit-color md hydrated">
          <IonCardTitle className="ion-inherit-color md hydrated">
            Welcome to Doctor Dashboard
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent className="md card-content-md hydrated">
          <p>
            Childhood vaccines are one of the great triumphs of modern medicine.
            Indeed, parents whose children are vaccinated no longer have to
            worry about their child’s death or disability from whooping cough,
            polio, diphtheria, hepatitis, or a host of other infections.
            Vaccines are a miracle; they’re fantastic. Anything that makes
            people hesitate to give their children these vaccines according to
            the recommended schedule creates risk. Risk for the children who
            don’t get vaccinated and risk for children, some of whom don’t have
            an immune system, so they’re benefiting from the fact that the
            community protection means the disease doesn’t get to them..
          </p>
        </IonCardContent>
      </IonCard>
    </IonPage>
  );
};

export default Test;
