import { IonButton, IonIcon, IonInput, IonItem } from "@ionic/react";
import React, { FormEvent, useState } from "react";
import { closeCircleOutline } from "ionicons/icons";
import { IPatientData } from "../../pages/patient/PatientCardList";
import { format } from "date-fns";
import PatientFemaleCard from "./PatientFemaleCard";
import PatientMaleCard from "./PatientMaleCard";
interface ISearchData {
  data: IPatientData[];
  hideCards: React.Dispatch<React.SetStateAction<boolean>>;
}
const PatientSearch: React.FC<ISearchData> = ({ data, hideCards }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<IPatientData[]>([]);

  const handleInputChange = (e: CustomEvent) => {
    setSearchText(e.detail.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Performing search logic and update searchResults state here
    const filteredData = data.filter((item: IPatientData) =>
      item.Name.toLowerCase().includes(searchText.toLowerCase())
    );
    if (filteredData.length > 0) {
      setSearchResults(filteredData);
      hideCards(true);
    }
  };

  const handleClear = () => {
    setSearchText("");
    setSearchResults([]);
    hideCards(false);
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit}>
        <IonItem lines="full">
          <IonInput
            name="Name"
            value={searchText}
            onIonChange={handleInputChange}
            placeholder="Search"
            required
            type="text"
            color="primary" 
          ></IonInput>
          <IonButton type="submit" className="ion-margin-start">
            Search
          </IonButton>
          {searchResults.length > 0 && (
            <IonButton onClick={handleClear}>
              <IonIcon icon={closeCircleOutline} />
            </IonButton>
          )}
        </IonItem>
      </form>

      {/* rendering results card here */}
      {searchResults &&
        searchResults.map((item, index) => {
          if (item.Gender.includes("boy" || "male")) {
            return (
              <PatientMaleCard
                key={index * 3 * 2}
                Name={item.Name}
                Guardian={item.Guardian}
                DOB={format(new Date(item.DOB), "dd MMMM yyyy")}
              />
            );
          }
          return (
            <PatientFemaleCard
              key={index * 3}
              Name={item.Name}
              Guardian={item.Guardian}
              DOB={format(new Date(item.DOB), "dd MMMM yyyy")}
            />
          );
        })}
    </>
  );
};

export default PatientSearch;
