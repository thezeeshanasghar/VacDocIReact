import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React,{useState} from 'react';
import Header from '../../components/header/Header';
import Toast from '../../components/custom-toast/Toast';

const Vacation: React.FC = () => {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
    
        fetch(`http://localhost:5041/update_date_for_Vaccations?doctorId=1&fromDate=${fromDate}&toDate=${toDate}`, {
          method: "PATCH",
        
        //   body: JSON.stringify(data_to_be_sent),
        })
          .then((res) => (res.status === 200 ? setSuccess(true) : setError(true)))
          .catch((err) => setError(true))
          .finally(() => {
            clearStateVariables();
          });
      };
      const clearStateVariables = () => {
        setToDate("");
        setFromDate("");}
    return (
        <IonPage>
            <Toast
        isOpen={success}
        setOpen={setSuccess}
        message="Vaccation dates add successfully."
        color="success"
      />
      <Toast
        isOpen={error}
        setOpen={setError}
        message="An error occurred while adding vaccation dates. plz try again"
        color="danger"
      />
           <Header pageName="Vacation" />
            <IonContent className="ion-padding">
                <form onSubmit={handleFormSubmit}>
            <IonItem>
              <IonLabel position="floating">From Date</IonLabel>
              <IonInput
                slot="end"
                type="date"
                value={fromDate}
                onIonChange={(e) => setFromDate(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">To Date</IonLabel>
              <IonInput
                slot="end"
                type="date"
                value={toDate}
                onIonChange={(e) => setToDate(e.detail.value!)}
              />
            </IonItem>
            
            <IonButton expand="full" type="submit">Go</IonButton>
           
            </form>
            
            </IonContent>
        </IonPage>
    );
};

export default Vacation;