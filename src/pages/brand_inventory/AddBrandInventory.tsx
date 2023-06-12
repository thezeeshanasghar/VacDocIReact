import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import React,{useState,useEffect} from 'react';
import Header from '../../components/header/Header';
import Toast from '../../components/custom-toast/Toast';
type BrandInventoryType = { Id: number; Name: string };
const AddBrandInventory: React.FC = () => {
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [brandData, setBrandData] = useState<BrandInventoryType[]>([]);
    const [brandName, setBrandName] = useState("");
    const [brandCount, setBrandCount] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // const formatedDate = format(
        //   new Date(dob),
        //   "yyyy-MM-dd'T'HH:mm:ss.SSSX"
        // );
        console.log("qatat")
        const data_to_be_sent = {
            "count": brandCount,
            "brandId": brandName,
            "doctorId": 1
        };
    console.log(data_to_be_sent)
        fetch("http://localhost:5041/api/BrandInventory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data_to_be_sent),
        })
          .then((res) => (res.status === 201 ? setSuccess(true) : setError(true)))
          .catch((err) => setError(true))
          .finally(() => {
            clearStateVariables();
          });
      };
      const clearStateVariables = () => {
        setBrandName("");
        setBrandCount("");
        
      };
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
        message="Brand Inventory added successfully."
        color="success"
      />
      <Toast
        isOpen={error}
        setOpen={setError}
        message="An error occurred while adding Brand Inventory. plz try again"
        color="danger"
      />
            <Header pageName="Add Brand Inventory" />
            <IonContent>
            <IonCard>
        <IonCardContent>
        
          <IonItem>
              <IonLabel position="floating">Brand Count</IonLabel>
              <IonInput
                type="number"
                value={brandCount}
                onIonChange={(e) => setBrandCount(e.detail.value!)}
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
              Add Inventory
            </IonButton>
         
        </IonCardContent>
      </IonCard>
      </IonContent>
        </IonPage>
        </>
    );
};

export default AddBrandInventory;