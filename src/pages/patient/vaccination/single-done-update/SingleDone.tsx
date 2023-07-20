import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
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
  // Extract the query parameters from the location.search
  const queryParams = new URLSearchParams(location.search);
  // Get the value of the "oldDate" parameter from the query parameters
  const oldDate = queryParams.get("oldDate");
  console.log(oldDate);

  const { doseId } = useParams<{ doseId: string }>();
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
      }
    } catch (error) {
      console.log(error);
    }

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
      } else {
        // Handle error, if needed
      }
    } catch (error) {
      // Handle error, if needed
    }
  };

  return (
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
            <IonSelect value={brand} onIonChange={(e) => setBrand(e.detail.value)}>
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
              value={givenDate}
              onIonChange={(e) => setGivenDate(e.detail.value)}
            />
          </IonItem>

          <IonButton type="submit">Submit</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default SingleDone;
