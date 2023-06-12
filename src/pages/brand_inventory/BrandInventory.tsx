 import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
 import React from 'react';
import Header from '../../components/header/Header';
 
 const BrandInventory: React.FC = () => {
 
    return (
        <IonPage>
            <Header pageName="Brand Inventory" />
            <IonContent className="ion-padding">
                UI goes here...
            </IonContent>
        </IonPage>
    );
 };
 
 export default BrandInventory;