import { IonButton, IonCard, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React,{useState,useEffect} from 'react';
import Header from '../../components/header/Header';
type PatientDataType = { Id: number; Name: string; ClinicId: number;DoctorId: number};
const Alert: React.FC = () => {
    const [patientData, setPatientData] = useState<PatientDataType[]>([]);
    const fetchPatientData = () => {
        fetch("http://localhost:5041/patients?doctorId=1")
          .then((response) => response.json())
          .then((data) => setPatientData(data))
          .catch((error) => {
            console.log(error);
          });
      };
    const ClickHandler=(ClinicId:number,DoctorId:number,name:string)=>{
console.log("ClinicId:",ClinicId,"DoctorId:",DoctorId,"name:",name)
    }
      useEffect(() => {
        fetchPatientData();
      }, []);

    return (
        <IonPage>
            <Header  pageName='Alert'/>
            <IonContent className="ion-padding">
            {patientData &&
              patientData.map((item, index) => {
                return(
                    <div key={item.Id}>
                    <IonCard onClick={() => ClickHandler(item.ClinicId, item.DoctorId, item.Name)}>
                    <IonCardHeader>
                      <IonCardTitle>{item.Name}</IonCardTitle>
                      {/* <IonCardSubtitle>Card Subtitle</IonCardSubtitle> */}
                    </IonCardHeader>
                    </IonCard>
                    </div>
                )
              })}
            </IonContent>
        </IonPage>
    );
};

export default Alert;