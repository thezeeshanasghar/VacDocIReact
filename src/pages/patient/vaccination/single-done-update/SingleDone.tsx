import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Toast from "../../../../components/custom-toast/Toast";

interface IBrand {
  Id: number;
  Name: string;
  VaccineId: number;
}

interface IParam {
  match: {
    params: {
      childId: number;
      doseId: number;
    };
  };
}

const SingleDone: React.FC<IParam> = () => {
  const location = useLocation();
  const history = useHistory();
  // Extract the query parameters from the location.search
  const queryParams = new URLSearchParams(location.search);
  // Get the value of the "oldDate" parameter from the query parameters
  const oldDate = queryParams.get("oldDate");
  console.log(oldDate);
  const formatDate = (dateString) => {
    const [month, day, year] = dateString.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };
  
  // Usage example with oldDate

  // const formattedDate = formatDate(oldDate);
  // console.log(formattedDate); 
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { doseId } = useParams<{ doseId: string }>();
  const { childId } = useParams<{ childId: string }>();
  const [brand, setBrand] = useState<string>();
  const [brandData, setBrandData] = useState<IBrand[]>([]);
  const [scheduleDate, setScheduleDate] = useState<string>();
  const [givenDate, setGivenDate] = useState<string>();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}api/PatientSchedule/get_brands_for_dose/${doseId}`)
      .then((res) => res.json())
      .then((data) => {
        setBrandData(data);
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, [doseId]);

  const postSingleDone = async () => {
    console.log(brand)
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}api/PatientSchedule/single_updateDone`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: doseId,
            isDone: 1,
            brandId: brand,
          }),
        }
      );
      if (res.status === 204) {
        console.log("first");
        setSuccess(true);
        history.push(`/members/child/vaccine/${childId}`, "back");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
    if (givenDate) {
    const dataTobeSent = {
      Id: doseId,
      date: givenDate,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}api/PatientSchedule/single_updateDate?Id=${doseId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataTobeSent),
        }
      );
      if (response.ok) {
        // Handle success, if needed
        setSuccess(true);
        history.push(`/members/child/vaccine/${childId}`, "back");
        window.location.reload();
      } else {
        // Handle error, if needed
        setError(true);
      }
    } catch (error) {
      // Handle error, if needed
      setError(true);
    }
  }
  };

  return (
    <>
    <Toast
    isOpen={success}
    setOpen={setSuccess}
    message="Single date of patient schedule updated successfully."
    color="success"
  />
  <Toast
    isOpen={error}
    setOpen={setError}
    message="An error occurred while updating patient schedule. Please try again."
    color="danger"
  />
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar color={"primary"}>
            <IonTitle>Fill Child Vaccine</IonTitle>
          </IonToolbar>
        </IonHeader>
        <form noValidate onSubmit={postSingleDone}>
          <IonItem>
            <IonLabel color="primary">Brands</IonLabel>
            <IonSelect 
            value={brand} 
            onIonChange={(e) => setBrand(e.detail.value)}
            required
            >
              {brandData.map((brandOption) => (
                <IonSelectOption key={brandOption.Id} value={brandOption.Id}>
                  {brandOption.Name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel color="primary">Given Date</IonLabel>
            <IonInput
              slot="end"
              type="date"
              value={formatDate(oldDate)}
              onIonChange={(e) => setGivenDate(e.detail.value)}
              required
            />
          </IonItem>

          <IonButton type="submit">Submit</IonButton>
        </form>
      </IonContent>
    </IonPage>
    </>
  );
};

export default SingleDone;
