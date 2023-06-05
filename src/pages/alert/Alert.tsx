import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import Header from '../../components/header/Header';

const Alert: React.FC = () => {

    return (
        <IonPage>
            <Header  pageName='Alert'/>
            <IonContent className="ion-padding">
                Alert content goes here.
            </IonContent>
        </IonPage>
    );
};

export default Alert;