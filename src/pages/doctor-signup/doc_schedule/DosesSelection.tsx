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
  IonHeader,
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
import { useParams } from "react-router-dom";
import Header from "../../../components/header/Header";

import ErrorComponent from "../../Error/ErrorComponent";
import { useLocation } from "react-router";
import { add } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import Toast from "../../../components/custom-toast/Toast";

const DosesSelection: React.FC = () => {
  // const { childId } = useParams<{ childId: string }>();
  const router = useIonRouter();

  //@ts-ignore
  const [vaccineData, setVaccineData] = useState<IVaccineData[]>([]);
  const [selectedVaccines, setSelectedVaccines] = useState<{
    [key: number]: boolean;
  }>({});
  //@ts-ignore

  const storedValue = JSON.parse(sessionStorage.getItem("docData"));
  console.log("clinic", storedValue);
  const [doctorId, setdocorId] = useState(storedValue.Id);

  useEffect(() => {
    // Fetch vaccine data from your API
    // Example using fetch:
    fetch(`${import.meta.env.VITE_API_URL}api/Dose`)
      .then((response) => response.json())
      .then((data) => setVaccineData(data))
      .catch((error) => console.error("Error fetching vaccine data:", error));
  }, []);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const handleCheckboxChange = (vaccineId: number, checked: boolean) => {
    setSelectedVaccines((prevState) => ({
      ...prevState,
      [vaccineId]: checked,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedVaccineIds = Object.entries(selectedVaccines)
      .filter(([vaccineId, isSelected]) => isSelected)
      .map(([vaccineId]) => Number(vaccineId));

    fetch(
      `${
        import.meta.env.VITE_API_URL
      }api/DoctorSchedule/DoseSelection?DoctorId=${doctorId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedVaccineIds),
      }
    )
      .then((res) => {
        if (res.status === 204) {
          setSuccess(true);
          router.push("/members/Dashboard", "root");
        } else {
          setError(true);
        }
      })
      .catch((err) => setError(true))
      .finally(() => {});
  };

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonItem style={{ textAlign: "center" }}>Doses Selection</IonItem>
        </IonHeader>
        <IonContent className="ion-padding">
          <form onSubmit={handleFormSubmit}>
            {vaccineData.map((dose) => (
              <div key={dose.Id}>
                <IonCard>
                  <IonItem>
                    <IonLabel>{dose.Name}</IonLabel>
                    <IonCheckbox
                      slot="start"
                      name={`vaccine_${dose.Id}`}
                      checked={selectedVaccines[dose.Id] || false}
                      onIonChange={(e) =>
                        handleCheckboxChange(dose.Id, e.detail.checked)
                      }
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

export default DosesSelection;
