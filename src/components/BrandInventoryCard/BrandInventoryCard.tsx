import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

interface ClinicCardProps {
    initialConsultationFee?: number;
    initialOffDays?: string;
    initialTimings?: string;
    initialPatientCount?: number;
    initialIsOnline?: boolean;
  }
const BrandInventoryCard: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Page Title</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                UI goes here...
            </IonContent>
        </IonPage>
    );
};

export default BrandInventoryCard;