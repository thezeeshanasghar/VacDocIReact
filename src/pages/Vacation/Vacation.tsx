import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCheckbox,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Toast from "../../components/custom-toast/Toast";
import { useHistory } from "react-router-dom";
import "./vacation.css";
import { today } from "ionicons/icons";
type ClinicType = { Name: string };
const Vacation: React.FC = () => {
  const storedValue = JSON.parse(sessionStorage.getItem("docData"));
  console.log(storedValue);
  const history = useHistory();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [toDay, setToDay] = useState("")
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [clinic, setClinic] = useState<ClinicType[]>([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}api/Clinic`)
      .then((res) => res.json())
      .then((data) => setClinic(data))
      .catch((err) => console.error(err));

      const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');

const today = `${year}-${month}-${day}`;

console.log(today);
setToDay(today)
  }, []);
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch(
      `${
        import.meta.env.VITE_API_URL
      }update_date_for_Vacations?doctorId=${storedValue.Id}&fromDate=${fromDate}&toDate=${toDate}`,
      {
        method: "PATCH",

        //   body: JSON.stringify(data_to_be_sent),
      }
    )
      // .then((res) => (res.status === 200 ? setSuccess(true) : setError(true)))
      .then((res) => {
        if (res.status === 200) {
          setSuccess(true);
          localStorage.clear()
          history.push("/members/doctor/schedule", "back");
          window.location.reload();
        } else {
          setError(false);
          localStorage.clear()
        }
      })
      .catch((err) => setError(true))
      .finally(() => {
        clearStateVariables();
      });
  };
  const clearStateVariables = () => {
    setToDate("");
    setFromDate("");
  };
  const canSubmit=fromDate.length>0&&toDate.length>0;
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
              min={toDay}
              value={fromDate}
              onIonChange={(e) => setFromDate(e.detail.value!)}
              required
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">To Date</IonLabel>
            <IonInput
              slot="end"
              type="date"
              min={toDay}
              value={toDate}
              onIonChange={(e) => setToDate(e.detail.value!)}
              required
            />
          </IonItem>
          {/* <h2>Clinics</h2>
            {clinic &&
        clinic.map((item, index) => (
          <div key={index}>
            <IonCheckbox
              // type="checkbox"
              // checked={item.selected}
              // onChange={() => handleCheckboxChange(item.id)}
            >
            <span>{item.Name}</span>
            </IonCheckbox>
          </div>
        ))} */}
          <IonButton 
          expand="full" 
          type="submit"
          disabled={!canSubmit}
          >
            Go
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Vacation;
