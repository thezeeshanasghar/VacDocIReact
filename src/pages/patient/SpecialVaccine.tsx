import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCheckbox,
    IonCol,
    IonContent,
    IonFab,
    IonFabButton,
    IonGrid,
    IonIcon,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
  } from "@ionic/react";
  import React, { useEffect, useState } from "react";
  import { useParams } from 'react-router-dom';
  import Header from "../../components/header/Header";
  import PatientSearch from "../../components/patient/PatientSearch";
  import PatientMaleCard from "../../components/patient/PatientMaleCard";
  import PatientFemaleCard from "../../components/patient/PatientFemaleCard";
  import ErrorComponent from "../Error/ErrorComponent";
  import { useLocation } from "react-router";
  import { add } from "ionicons/icons";
  import { useHistory } from 'react-router-dom';
import Toast from "../../components/custom-toast/Toast";
  


  
  const SpecialVaccine: React.FC = () => {
    // const { childId } = useParams<{ childId: string }>();
    const currentUrl = window.location.href;
    const history = useHistory();

    // Extract the last digit from the URL
    const childIdMatch = currentUrl.match(/(\d+)$/);
    const childId = childIdMatch ? parseInt(childIdMatch[0], 10) : undefined;

    //@ts-ignore
    const [vaccineData, setVaccineData] = useState<IVaccineData[]>([]);
    const [selectedVaccines, setSelectedVaccines] = useState<{ [key: number]: boolean }>({});

     useEffect(() => {
    // Fetch vaccine data from your API
    // Example using fetch:
    fetch(`${import.meta.env.VITE_API_URL}api/Vaccine/IsSpecial`)
      .then(response => response.json())
      .then(data => setVaccineData(data))
      .catch(error => console.error('Error fetching vaccine data:', error));
  }, []);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const handleCheckboxChange = (vaccineId: number, checked: boolean) => {
    setSelectedVaccines(prevState => ({
      ...prevState,
      [vaccineId]: checked
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedVaccineIds = Object.entries(selectedVaccines)
    .filter(([vaccineId, isSelected]) => isSelected)
    .map(([vaccineId]) => Number(vaccineId));

    fetch(`${import.meta.env.VITE_API_URL}api/PatientSchedule/patient_IsSpecial_Vaccine?childId=${childId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedVaccineIds),
      })
        .then((res) => {
          if (res.status === 204) {
            setSuccess(true);
            history.push("/members/child");
            }
          else {
            setError(true);
          }
        })
        .catch((err) => setError(true))
        .finally(() => {
          
          
        });
    }


  
    return (
      <>
        <IonPage>
          <Header pageName="Vaccine" />
          <IonContent className="ion-padding">
            <form onSubmit={handleFormSubmit}>
            
           
                {vaccineData.map(vaccine => (
                <div key={vaccine.Id}>
                    <IonCard >
                        <IonItem>
                            <IonLabel>{vaccine.Name}</IonLabel>
                            <IonCheckbox
                            slot="start"
                            name={`vaccine_${vaccine.Id}`}
                            checked={selectedVaccines[vaccine.Id] || false}
                            onIonChange={(e) => handleCheckboxChange(vaccine.Id, e.detail.checked)}
                            id={`vaccine_${vaccine.Id}`}
                            />
                        </IonItem>
                    </IonCard>
                </div>
                ))}
            <Toast
            isOpen={success}
            setOpen={setSuccess}
            message="Successfully added."
            color="success"
                />
                <Toast
                    isOpen={error}
                    setOpen={setError}
                    message="An error occurred  plz try again"
                    color="danger"
                />
        

                <div className="ion-text-center ion-margin">
                <IonButton type="submit" id="submit">
                    Submit
                </IonButton>
                </div>
            </form> 
              
          </IonContent>
        </IonPage>
      </>
    );
  };
  
  export default SpecialVaccine;
  
  