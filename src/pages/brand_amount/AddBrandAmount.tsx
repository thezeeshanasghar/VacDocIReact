import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import React,{useState,useEffect} from 'react';
import Header from '../../components/header/Header';
import Toast from '../../components/custom-toast/Toast';
// import BrandAmount from './BrandAmount';
type BrandInventoryType = { Id: number; Name: string };
const AddBrandAmount: React.FC = () => {
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [brandData, setBrandData] = useState<BrandInventoryType[]>([]);
    const [brandAmount, setBrandAmount] = useState("");
    const [brandName, setBrandName] = useState("");

    const handleSubmit = () => {
        // e.preventDefault();
        // const formatedDate = format(
        //   new Date(dob),
        //   "yyyy-MM-dd'T'HH:mm:ss.SSSX"
        // );
        const data_to_be_sent = {
            "Amount": brandAmount,
            "brandId": brandName,
            "doctorId": 1
        };
    console.log(data_to_be_sent)
        fetch("http://localhost:5041/api/BrandAmount", {
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
            setBrandName("");
          });
      };
      // const clearStateVariables = () => {
      //   setBrandAmount("");
      //   setBrandName("");
     
      // };
      useEffect(() => {
        fetch("http://localhost:5041/BrandName")
          .then((res) => res.json())
          .then((data) => setBrandData(data))
          .catch((err) => console.error(err));
    
        // fetch("https://myapi.fernflowers.com/api/Clinic")
        //   .then((res) => res.json())
        //   .then((data) => setClinicData(data))
        //   .catch((err) => console.error(err));
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
              <Header pageName='Add Brand Amount'></Header>
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
              <IonLabel position="floating">Brand Name</IonLabel>
              <IonSelect
                value={brandName}
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
            <IonButton onClick={handleSubmit}>
              Add Amount
            </IonButton>
          
        </IonCardContent>
      </IonCard>
              </IonContent>
            </IonPage>
        </>
    );
                  }
                  
                  export default AddBrandAmount;