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
  useIonRouter
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
  const router = useIonRouter();
  // Extract the query parameters from the location.search
  const queryParams = new URLSearchParams(location.search);
  // Get the value of the "oldDate" parameter from the query parameters
  const oldDate = queryParams.get("oldDate");
console.log(oldDate);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { doseId } = useParams<{ doseId: string }>();
  const { childId } = useParams<{ childId: string }>();
  const [brand, setBrand] = useState<string>();
  const [brandData, setBrandData] = useState<IBrand[]>([]);
  const [scheduleDate, setScheduleDate] = useState<string>();
  const formatDate = (dateString: string | null) => {
    if (!dateString) {
      return null;
    }
    const [month, day, year] = dateString.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };
  const formattedOldDate = oldDate ? formatDate(oldDate) : null;

  // Set the initial state of givenDate to formattedOldDate
  const [givenDate, setGivenDate] = useState<string | null>(formattedOldDate);
  const [newDate, setNewDate] = useState();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}api/PatientSchedule/GetBrandForPatientSchedule?Id=${doseId}`)
      .then((res) => res.json())
      .then((data) => {
        setBrandData(data);
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, [doseId]);

  const handleDateChange = (e: { target: { value: any; }; }, value:any) => {
    // Get the selected date from the event
    const selectedDate = e.target.value;

    // Update the givenDate state with the selected date (no need to format it again)
    setNewDate(selectedDate);
  };

  const postSingleDone = async () => {
    console.log(brand)
    console.log(newDate)
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
            date:newDate,
            brandId: brand,
          }),
        }
      );
      if (res.status === 204) {
        console.log("first");
        setSuccess(true);
        router.push(`/members/child/vaccine/${childId}`, "back");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  // const dates=formatDate(givenDate);
  // console.log(dates);
    // const dataTobeSent = {
    //   Id: doseId,
    //   date: newDate,
    // };
    // console.log(dataTobeSent)
    // try {
    //   const response = await fetch(
    //     `${import.meta.env.VITE_API_URL}api/PatientSchedule/single_updateDate?Id=${doseId}`,
    //     {
    //       method: "PATCH",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(dataTobeSent),
    //     }
    //   );
    //   if (response.ok) {
    //     // Handle success, if needed
    //     setSuccess(true);
    //     router.push(`/members/child/vaccine/${childId}`, "back");
    //     window.location.reload();
    //   } else {
    //     // Handle error, if needed
    //     setError(true);
    //   }
    // } catch (error) {
    //   // Handle error, if needed
    //   setError(true);
    // }
  
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
              <IonTitle>Single</IonTitle>
            </IonToolbar>
          </IonHeader>
          <form noValidate onSubmit={postSingleDone}>
            <IonItem>
              <IonLabel color="primary">Brands</IonLabel>
              <IonSelect
                value={brand}
                onIonChange={(e) => setBrand(e.detail.value)}
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
                value={givenDate || ""} // Use the givenDate directly without formatting it again
                onIonChange={(e) => handleDateChange(e, e.detail.value)}
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