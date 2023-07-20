import React, { useEffect, useState } from "react";
import { IonItem, IonLabel, IonInput, IonButton, IonPage, IonContent, IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import Toast from "../../../../components/custom-toast/Toast";

interface IParam {
  match: {
    params: {
      Date: string;
      Id: string;
    };
  };
}

const GetBrand: React.FC<IParam> = ({
  match: {
    params: { Date, Id },
  },
}: IParam) => {
//   const [weight, setWeight] = useState<number>();
//   const [height, setHeight] = useState<number>();
//   const [successToast, setSuccessToast] = useState(false);
//   const [errorToast, setErrorToast] = useState(false);
//   const [OFC, setOFC] = useState<number>();
  const [givenDate, setGivenDate] = useState<string>();

//   useEffect(() => {
//     console.log('Date', Date, '  ID: ', Id)
//   }, []); 

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log("Weight:", weight);
//     console.log("Height:", height);
//     console.log("OFC:", OFC);
//     console.log("Given Date:", Date);
//     const dataTobeSent = [
//       {
        
//         path: "isDone",
//         op: "replace",
//         from: "false",
//         value: "true"
//       }
//     ];
//     const url = `${import.meta.env.VITE_API_URL}api/PatientSchedule/patient_bulk_updateDone/${Id}/${Date}`;
//     try {
//       const response = await fetch(url, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(dataTobeSent),
//       });
//       if (response.ok) {
//         console.log("add")
//         setSuccessToast(true);
//       } 
//       else if (!response.ok) setErrorToast(true);
//     } catch (err) {
//       console.log("not add")
//       setErrorToast(true);
//     } finally {
//       // setShowLoading(false);
//       // setName("");
//     }

//   };

  return (
    <>
     {/* <Toast 
        isOpen={successToast}
        setOpen={setSuccessToast}
        color="success"
        message="Date updated successfully"
      />
      <Toast
        isOpen={errorToast}
        setOpen={setErrorToast}
        color="danger"
        message="an Error occurred while updating date, please try again later"
      /> */}
        <IonPage>
          <IonContent>
              <IonHeader>
                  <IonToolbar color={"primary"}><IonTitle>Single Update Done</IonTitle></IonToolbar>
              </IonHeader>
              <form noValidate >
                  <IonItem>
                    <IonLabel color="primary">Given Date</IonLabel>
                    <IonInput
                      type="date"
                      value={Date}
                      slot="end"
                      onIonChange={(e) => setGivenDate(e.detail.value!)}
                      min={Date}/>
                  </IonItem>
          
                <IonButton type="submit">Submit</IonButton>
              </form>
          </IonContent>
        </IonPage>
              </>
  );
};

export default GetBrand;
