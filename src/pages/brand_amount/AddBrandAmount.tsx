import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Toast from "../../components/custom-toast/Toast";
import { useIonRouter } from "@ionic/react";
type VaccineDataType = { Id: number; Name: string };
type BrandInventoryType = { Id: number; Name: string };
const AddBrandAmount: React.FC = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [brandData, setBrandData] = useState<BrandInventoryType[]>([]);
  const [brandAmount, setBrandAmount] = useState("");
  const [brandName, setBrandName] = useState("");
  const [vaccineName, setVaccineName] = useState<string>("");
  const [vaccineData, setVaccineData] = useState<VaccineDataType[]>([]);
  const data = useIonRouter();
  const handelList = () => {
    data.push("/members/doctor/brandamount");
  };

  const handleSubmit = () => {
    const data_to_be_sent = {
      Amount: brandAmount,
      brandId: brandName,
      doctorId: 1,
    };
    console.log(data_to_be_sent);
    fetch(`${import.meta.env.VITE_API_URL}api/BrandAmount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data_to_be_sent),
    })
      .then((res) => (res.status === 201 ? setSuccess(true) : setError(true)))
      .catch((err) => setError(true))
      .finally(() => {
        setBrandAmount("");
        setVaccineName("");
        setBrandName("");
      });
  };

  const handleClickVaccine = () => {
    fetch(`${import.meta.env.VITE_API_URL}api/Brand/brand_name/${vaccineName}`)
      .then((res) => res.json())
      .then((data) => setBrandData(data))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}api/Vaccine`)
      .then((res) => res.json())
      .then((data) => setVaccineData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <IonPage>
        <Toast
          isOpen={success}
          setOpen={setSuccess}
          message="Brand amount added successfully."
          color="success"
        />
        <Toast
          isOpen={error}
          setOpen={setError}
          message="An error occurred while adding Brand amount. plz try again"
          color="danger"
        />
        <Header pageName="Add Brand Amount"></Header>
        <IonContent>
          <IonCard>
            <IonCardContent>
              <IonItem>
                <IonLabel position="floating">Brand Amount</IonLabel>
                <IonInput
                  type="number"
                  value={brandAmount}
                  onIonChange={(e) => setBrandAmount(e.detail.value!)}
                  required
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Vaccine Name</IonLabel>
                <IonSelect
                  value={vaccineName}
                  onIonChange={(e) => setVaccineName(e.detail.value!)}
                >
                  {vaccineData &&
                    vaccineData.map((item, index) => (
                      <IonSelectOption key={index} value={item.Id}>
                        {item.Name}
                      </IonSelectOption>
                    ))}
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">
                  Selected Vaccine Brand Name
                </IonLabel>
                <IonSelect
                  value={brandName}
                  onClick={handleClickVaccine}
                  onIonChange={(e) => setBrandName(e.detail.value!)}
                >
                  {brandData &&
                    brandData.map((item, index) => (
                      <IonSelectOption key={index} value={item.Id}>
                        {item.Name}
                      </IonSelectOption>
                    ))}
                </IonSelect>
              </IonItem>
              <IonButton onClick={handleSubmit}>Add Amount</IonButton>
              <br />
              <IonButton onClick={handelList}>list</IonButton>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
};
export default AddBrandAmount;
