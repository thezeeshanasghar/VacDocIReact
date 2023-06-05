import { IonButton, IonIcon, IonInput, IonItem } from "@ionic/react";
import React, { FormEvent, useState } from "react";
import { closeCircleOutline } from "ionicons/icons";

const PatientSearch: React.FC<any> = ({ data = [] }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState(data);

  const handleInputChange = (e: CustomEvent) => {
    setSearchText(e.detail.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform search logic and update searchResults state
  };

  const handleClear = () => {
    setSearchText("");
    setSearchResults([]);
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
            color="primary" // Add color prop to set the line color
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
      {/* {searchResults.map((result, index) => (
          <IonItem key={index}></IonItem>
        ))} */}
    </>
  );
};

export default PatientSearch;
