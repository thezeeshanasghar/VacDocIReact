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
  


  
  const AddNewDosesList: React.FC = () => {
    // const { childId } = useParams<{ childId: string }>();
    const currentUrl = window.location.href;
    
    const history = useHistory();
    const location = useLocation();

    // Extract the last digit from the URL
    const childIdMatch = currentUrl.match(/(\d+)$/);
    const childId = childIdMatch ? parseInt(childIdMatch[0], 10) : undefined;

    //@ts-ignore
    const [vaccineData, setVaccineData] = useState<IVaccineData[]>([]);
    const [selectedVaccines, setSelectedVaccines] = useState<{ [key: number]: boolean }>({});
    const [noDoses, setNoDoses] = useState<boolean>(false)

     useEffect(() => {
    // Fetch vaccine data from your API
    // Example using fetch:
    fetch(`${import.meta.env.VITE_API_URL}api/PatientSchedule/GetDosesWhereIsSpecialIsFalse?childId=${childId}`)
      .then(response => {  if (response.status === 200) {
        return response.json();
      } else if (response.status === 404) {
        // No doses are present, set noDoses to true and return an empty array
        setNoDoses(true);
        return [];
      
      } else {
        throw new Error('Failed to fetch vaccine data');
      }})
      .then(data =>  {
        if (!data || data.length === 0) {
          setNoDoses(true); // Set the state variable to true if no doses are present
        }
        setVaccineData(data);
      })
      .catch(error => console.error('Error fetching vaccine data:', error));
  }, [location.pathname]);
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

    fetch(`${import.meta.env.VITE_API_URL}api/PatientSchedule/isspecial_true?ChildId=${childId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedVaccineIds),
      })
        .then((res) => {
          if (res.status === 200) {
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
          {noDoses && (
          <div className="ion-text-center ion-margin">
            <p>No doses are present. Please contact the admin.</p>
          </div>
        )}
            <form onSubmit={handleFormSubmit}>
            
           
                {vaccineData.map(dose => (
                <div key={dose.Id}>
                    <IonCard >
                        <IonItem>
                            <IonLabel>{dose.Name}</IonLabel>
                            <IonCheckbox
                            slot="start"
                            name={`vaccine_${dose.Id}`}
                            checked={selectedVaccines[dose.Id] || false}
                            onIonChange={(e) => handleCheckboxChange(dose.Id, e.detail.checked)}
                            id={`vaccine_${dose.Id}`}
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
  
  export default AddNewDosesList;
  
  