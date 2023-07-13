import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonInput,
  IonItem,
} from "@ionic/react";
import React, { FormEvent, useState } from "react";
import { closeCircleOutline } from "ionicons/icons";
import { IPatientData } from "../../pages/patient/PatientCardList";
import PatientFemaleCard from "./PatientFemaleCard";
import PatientMaleCard from "./PatientMaleCard";
import axios, { AxiosError, AxiosResponse } from "axios";
interface ISearchData {
  hideCards: React.Dispatch<React.SetStateAction<boolean>>;
  renderList: () => void;
}
interface ISearchPatient {
  id: number;
  name: string;
  guardian: string;
  fatherName: string;
  email: string;
  dob: string;
  gender: string;
  type: string;
  city: string;
  cnic: string;
  preferredSchedule: string;
  isEPIDone: boolean;
  isVerified: boolean;
  isInactive: boolean;
  clinicId: number;
  doctorId: number;
}

const PatientSearch: React.FC<ISearchData> = ({ hideCards, renderList }) => {
  const [searchData, setSearchData] = useState<IPatientData[]>([]);
  const [searchText, setSearchText] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showErrorCard, setShowErrorCard] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Performing search logic and update searchResults state here
    fetchSearchResults();
  };

  const handleClear = () => {
    setSearchText("");
    setSearchData([]);
    setShowErrorCard(false);
    hideCards(false);
    renderList();
  };
  const fetchSearchResults = () => {
    console.log(searchText)
    axios
      .get<IPatientData[], AxiosResponse<IPatientData[]>>(
        `${
          import.meta.env.VITE_API_URL
        }api/Child/search-by-doctor-name?name=${searchText}`
      )
      .then((res: AxiosResponse<IPatientData[]>) => {
        if (Object.keys(res.data).length !== 0) {
          setSearchData(res.data);
          hideCards(true);
          console.log(res.data)
        }
      })
      .catch((err: AxiosError) => {
        if (err.response) {
          //@ts-ignore
          setErrMsg(err.response.data);
          setShowErrorCard(true);
          hideCards(true);
        } else {
          //@ts-ignore
          setErrMsg(err.response.data);
          setShowErrorCard(true);
          hideCards(true);
        }
      });
  };
  const canSearch = searchText.length>0;
  return (
    <>
      <form noValidate onSubmit={handleSubmit}>
        <IonItem lines="full">
          <IonInput
            name="Name"
            value={searchText}
            onIonChange={(e) => setSearchText(e.detail.value!)}
            placeholder="Search"
            required
            type="text"
            color="primary"
          ></IonInput>
          <IonButton
            type="submit"
            disabled={!canSearch}
            className="ion-margin-start"
          >
            Search
          </IonButton>
          {searchData.length > 0 || showErrorCard ? (
            <IonButton onClick={handleClear}>
              <IonIcon icon={closeCircleOutline} />
            </IonButton>
          ) : null}
        </IonItem>
      </form>

      {searchData.length > 0 ? (
        <>
          {/* rendering results card here */}
          {searchData &&
            searchData.map((item, index) => {
              if (item.Gender == 0) {
                return (
                  <PatientMaleCard
                    key={index + item.DOB}
                    Name={item.Name}
                    Id={item.Id}
                    renderList={renderList}
                    DoctorId={item.DoctorId}
                    ClinicId={item.ClinicId} DOB={""} />
                );
              }
              return (
                <PatientFemaleCard
                  key={index + item.DOB}
                  Name={item.Name}
                  Id={item.Id}
                  renderList={renderList}
                  DoctorId={item.DoctorId}
                  ClinicId={item.ClinicId} DOB={""}                />
              );
            })}
        </>
      ) : (
        showErrorCard && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>
                {errMsg
                  ? "Not Found, Please add more details."
                  : "No data available"}
              </IonCardTitle>
            </IonCardHeader>
          </IonCard>
        )
      )}
    </>
  );
};

export default PatientSearch;
