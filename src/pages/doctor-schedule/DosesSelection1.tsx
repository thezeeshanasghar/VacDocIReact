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
    useIonRouter,
  } from "@ionic/react";
  import React, { useEffect, useState } from "react";
  import { useParams } from 'react-router-dom';
  import Header from "../../components/header/Header";

  import ErrorComponent from "../Error/ErrorComponent";
  import { useLocation } from "react-router";
  import { add } from "ionicons/icons";
  import { useHistory } from 'react-router-dom';
import Toast from "../../components/custom-toast/Toast";
import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";
  


  
  const DosesSelection1: React.FC = () => {
    // const { childId } = useParams<{ childId: string }>();
    const router = useIonRouter();
    const location = useLocation();
    const dosesids=localStorage.getItem('test')
    const idsList: number[] = [];
    const [showLoading, setShowLoading] = useState(false);
    //@ts-ignore
    const [vaccineData, setVaccineData] = useState<IVaccineData[]>([]);
    //@ts-ignore
  //   const data = JSON.parse(dosesids)
  //   if (data) {
  //     const idsList :any= [];
  
  //     // Iterate over each date key in the object
  //     for (const dateKey in data) {
  //         const vaccines = data[dateKey];
  //         // Iterate over each vaccine object
  //         vaccines.forEach((doses:any) => {
  //             idsList.push(doses.Id);
  //         });
  //     }
  //     const initialSelectedVaccines: { [key: number]: boolean } = {};
  //     idsList.forEach((id:any) => {
  //       initialSelectedVaccines[id] = true;
  //     });
  //     setSelectedVaccines(initialSelectedVaccines);
      
  //     console.log(idsList); // Output: [1, 2, 3, 8]
  // } else {
  //     console.log('No data found in local storage.');
  // }
  useEffect(() => {
    const dosesids = localStorage.getItem('test');
    if (dosesids) {
      const data = JSON.parse(dosesids);
      const idsList: number[] = [];
  
      for (const dateKey in data) {
        const vaccines = data[dateKey];
        vaccines.forEach((doses: any) => {
          idsList.push(doses.Id);
        });
      }

      // Set selected vaccines initially equal to ids in idsList
      const initialSelectedVaccines: { [key: number]: boolean } = {};
      idsList.forEach((id) => {
        initialSelectedVaccines[id] = true;
      });
      setSelectedVaccines(initialSelectedVaccines);
    } else {
      console.log('No data found in local storage.');
    }
  }, []); // Empty dependency array ensures useEffect runs only once

  // Rest of your component code...

    
    const [selectedVaccines, setSelectedVaccines] = useState<{ [key: number]: boolean }>({});
    //@ts-ignore
 
    const storedValue = JSON.parse(sessionStorage.getItem("docData"));
    // console.log('clinic',storedValue);
    const [doctorId, setdocorId] = useState(storedValue.Id);

     useEffect(() => {
    // Fetch vaccine data from your API
    // Example using fetch:
    fetch(`${import.meta.env.VITE_API_URL}api/Dose`)
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

    fetch(`${import.meta.env.VITE_API_URL}api/DoctorSchedule/DoseSelection?DoctorId=${doctorId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedVaccineIds),
      })
        .then((res) => {
          if (res.status === 204) {
            setSuccess(true);
            localStorage.clear();
            setShowLoading(true);
            router.push("/members/doctor/Schedule")
            
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
      <LoadingSpinner
        isOpen={showLoading}
        setOpen={setShowLoading}
        time={1000}
      />
        <IonPage>
          <Header pageName="Vaccine" />
          <IonContent className="ion-padding">
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
  
  export default DosesSelection1;
  
  