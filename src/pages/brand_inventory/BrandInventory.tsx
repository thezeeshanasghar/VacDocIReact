import {
  IonContent,
  IonPage,
  IonCard,
  IonCardContent,
  IonCardHeader,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import ErrorComponent from "../Error/ErrorComponent";
type BrandInventoryType = { Count: number; VaccineName: string; Brand: string };

const BrandInventory: React.FC = () => {
  const storedValue = JSON.parse(sessionStorage.getItem("docData"));
  console.log(storedValue);
  const [brandData, setBrandData] = useState<BrandInventoryType[]>([]);
  useEffect(() => {
    fetchInventoryData();
  }, []);

  const fetchInventoryData = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }api/BrandInventory/doctor-vaccine-Count/${storedValue.Id}`
      ); // Replace 'API_ENDPOINT' with the actual API endpoint URL
      const data = await response.json();
      setBrandData(data);
    } catch (error) {
      console.error("Error fetching brand data:", error);
    }
  };

  return (
    <IonPage>
      <Header pageName="Brand Inventory" />
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader
            style={{
              color: "black",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "10px",
            }}
          >
            <b>
              <div>VaccineName</div>
            </b>
            <b>
              {" "}
              <div>Brand</div>
            </b>
            <b>
              {" "}
              <div>Count</div>
            </b>
          </IonCardHeader>
        </IonCard>
        {brandData.length>0?(brandData &&
          brandData.map((item, index) => (
            <IonCard  key={index}>
              <IonCardContent
                style={{
                  color: "black",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "10px",
                }}
              >
                <div>{item.VaccineName}</div>
                <div>{item.Brand}</div>
                <div>{item.Count}</div>
              </IonCardContent>
            </IonCard>
          ))):(
            <ErrorComponent title="Brand Inventory" />
          )}
      </IonContent>
    </IonPage>
  );
};

export default BrandInventory;
