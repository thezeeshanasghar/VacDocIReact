import React, { useEffect, useState } from "react";
import { IonItem, IonLabel, IonInput, IonButton, IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonSelect, IonSelectOption } from "@ionic/react";
import Toast from "../../../../components/custom-toast/Toast";

interface IParam {
  match: {
    params: {
      Date: string;
      Id: string;
    };
  };
}

interface IBrand {
  Id: number;
  Name: string;
  VaccineId: number;
}

const BulkDone: React.FC<IParam> = ({
  match: {
    params: { Date, Id },
  },
}: IParam) => {
  const [weight, setWeight] = useState<number>();
  const [height, setHeight] = useState<number>();
  const [successToast, setSuccessToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);
  const [OFC, setOFC] = useState<number>();
  const [brand, setBrand] = useState<string>();
  const [brandData, setBrandData] = useState<IBrand[]>([]);
  const [givenDate, setGivenDate] = useState<string>();

  const queryParams = new URLSearchParams(location.search);
  // Get the value of the "oldDate" parameter from the query parameters
  const oldDate = queryParams.get("oldDate");
  console.log(oldDate);
  const formatDate = (dateString) => {
    const [month, day, year] = dateString.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  useEffect(() => {
    console.log('Date', Date, '  ID: ', Id)
   
      fetch(`${import.meta.env.VITE_API_URL}api/PatientSchedule/GetBrandForPatientSchedule?Id=${2}`)
        .then((res) => res.json())
        .then((data) => {
          setBrandData(data);
          console.log(data);
        })
        .catch((err) => console.error(err));
   
  }, []); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Weight:", weight);
    console.log("Height:", height);
    console.log("OFC:", OFC);
    console.log("Given Date:", Date);
    const dataTobeSent = [
      {
        
        path: "isDone",
        op: "replace",
        from: "false",
        value: "true"
      }
    ];
    const url = `${import.meta.env.VITE_API_URL}api/PatientSchedule/patient_bulk_updateDone/${Id}/${Date}`;
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataTobeSent),
      });
      if (response.ok) {
        console.log("add")
        setSuccessToast(true);
      } 
      else if (!response.ok) setErrorToast(true);
    } catch (err) {
      console.log("not add")
      setErrorToast(true);
    } finally {
      // setShowLoading(false);
      // setName("");
    }

  };

  const [brands, setBrands] = useState(["", "", ""]);

  const handleBrandChange = (index, value) => {
    setBrands((prevBrands) => {
      const newBrands = [...prevBrands];
      newBrands[index] = value;
      return newBrands;
    });
  };

  return (
    <>
     <Toast 
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
      />
        <IonPage>
          <IonContent>
              <IonHeader>
                  <IonToolbar color={"primary"}><IonTitle>Bulk</IonTitle></IonToolbar>
              </IonHeader>
              <form noValidate onSubmit={handleSubmit}>
                {/* <IonItem>
                  <IonLabel position="floating" color="primary">
                    Weight
                  </IonLabel>
                  <IonInput
                    type="number"
                    value={weight}
                    onIonChange={(e) => setWeight(parseFloat(e.detail.value!))}
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating" color="primary">
                    Height
                  </IonLabel>
                  <IonInput
                    type="number"
                    value={height}
                    onIonChange={(e) => setHeight(parseFloat(e.detail.value!))}
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating" color="primary">
                    OFC
                  </IonLabel>
                  <IonInput
                    type="number"
                    value={OFC}
                    onIonChange={(e) => setOFC(parseFloat(e.detail.value!))}
                  ></IonInput>
                </IonItem> */}
                {/* <IonItem>
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
            </IonItem> */}
            <div>
      {brands.map((brand, index) => (
        <IonItem key={index}>
          <IonLabel color="primary">Brands {index + 1}</IonLabel>
          <IonSelect
            value={brand}
            onIonChange={(e) => handleBrandChange(index, e.detail.value)}
          >
            {brandData.map((brandOption) => (
              <IonSelectOption key={brandOption.Id} value={brandOption.Id}>
                {brandOption.Name}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
      ))}
    </div>
                  <IonItem>
                    <IonLabel color="primary">Given Date</IonLabel>
                    <IonInput
                      type="date"
                      value={formatDate(oldDate)}
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

export default BulkDone;
