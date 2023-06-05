import { IonContent,IonPage } from '@ionic/react';
import React from 'react';
import Header from '../../components/header/Header';
import PatientSearch from '../../components/PatientSearch';
import PatientCard from './PatientCard';

const PatientCardList: React.FC = () => {

    return (
        <IonPage>
            <Header pageName='Patients'/>
            <IonContent className="ion-padding">
                {/* patient component to render patient data */}
               <PatientSearch data={[]}/>

               {/* list of patient cards to be rendered. */}
               {Array.from({length: 6}).flatMap((item, index) => {
                return <React.Fragment key={index}>
                    <PatientCard/>
                </React.Fragment>
               })}
            </IonContent>
        </IonPage>
    );
};

export default PatientCardList;