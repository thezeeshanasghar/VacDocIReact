import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React,{useState,useEffect} from 'react';
import Header from '../../components/header/Header';
import { useIonRouter } from "@ionic/react";
import ErrorComponent from '../Error/ErrorComponent';
type PatientDataType = { Id: number; Name: string; ClinicId: number;DoctorId: number};
const Alert: React.FC = () => {
    const [patientData, setPatientData] = useState<PatientDataType[]>([]);
    const fetchPatientData = () => {
        fetch(`${import.meta.env.VITE_API_URL}patients?doctorId=1`)
          .then((response) => response.json())
          .then((data) => setPatientData(data))
          .catch((error) => {
            console.log(error);
          });
      };
      const data = useIonRouter();
   
    const ClickHandler=(DoctorId:number,Id:number)=>{
console.log("DoctorId:",DoctorId,"childId",Id)
data.push(`/members/child/vaccine/${Id}?doctorId=${DoctorId}`);
    }
      useEffect(() => {
        fetchPatientData();
      }, []);

    return (
        <IonPage>
            <Header  pageName='Alert'/>
            <IonContent className="ion-padding">
            {patientData.length>0?(patientData &&
              patientData.map((item, index) => {
                return(
                    <div key={item.Id}>
                    <IonCard onClick={() => ClickHandler( item.DoctorId, item.Id)}>
                    <IonCardHeader>
                      <IonCardTitle>{item.Name}</IonCardTitle>
                    </IonCardHeader>
                    </IonCard>
                    </div>
                )
              })
    ):(
      <ErrorComponent title="Alert" />
    )
            }
            </IonContent>
        </IonPage>
    );
};

export default Alert;