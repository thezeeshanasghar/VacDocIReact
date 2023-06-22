import React, { useEffect, useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonImg,
  IonIcon,
  IonButton,
  useIonRouter,
  IonText,
} from "@ionic/react";
import { calendar } from "ionicons/icons";
import { IPSchedule } from "./VaccinationCardList";
import syringImage from "../../../assets/injectionFilled.png";
import emptySyringImage from "../../../assets/injectionEmpty.png";
import { format } from "date-fns";
import DatePicker from "./DatePicker";
import { IDose } from "../../doctor-schedule/DoctorScheduleCard";
import Toast from "../../../components/custom-toast/Toast";
import axios from "axios";
interface IBrand {
  Id: number;
  Name: string;
  VaccineId: number;
}
interface IPatientCardProps {
  date: string;
  data: IPSchedule[];
  forceRender: () => void;
  setName: (name: string) => void;
}
const VaccinationCard: React.FC<IPatientCardProps> = ({
  date,
  data,
  forceRender,
  setName,
}) => {
  // console.log(data);
  const router = useIonRouter();
  const [BulkDate, setBulkDate] = useState<string>("");
  const [SingleDate, setSingleDate] = useState<string>("");
  const [successToast, setSuccessToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);
  const [doses, setDoses] = useState<IDose[]>([]);
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [singlePatientSchedule, setSinglePatientSchedule] =
    useState<IPSchedule>();

  const [isSkip, setIsSkip] = useState<boolean>(false);
  const filterDoses = (doseId: number): string | undefined => {
    const filteredDose: IDose | undefined = doses.find((d) => d.Id === doseId);
    return filteredDose?.Name;
  };
  const filterBrand = (brandId: number): string | undefined => {
    console.log("brand id", brandId);
    const filteredBrand: IBrand | undefined = brands.find(
      (b) => b.Id === brandId
    );
    console.log("brands, ", filteredBrand);
    return filteredBrand?.Name;
  };
  const updateBulkDate = (user_selected_date: string) => {
    const data_to_update = [
      {
        path: "Date",
        op: "replace",
        from: date,
        value: user_selected_date.split("T")[0],
      },
    ];

    fetch(
      `${
        import.meta.env.VITE_API_URL
      }api/PatientSchedule/patient_bulk_updateDate/${date}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data_to_update),
      }
    )
      .then((res) => {
        if (res.status === 204) {
          setSuccessToast(true);
          setTimeout(() => {
            forceRender();
          }, 500);
        } else {
          setErrorToast(true);
        }
      })
      .catch((err) => setErrorToast(true));
  };
  const updateSingleDate = (user_selected_date: string) => {
    const data_to_be_sent = {
      Date: user_selected_date.split("T")[0],
      doseId: singlePatientSchedule?.DoseId,
      doctorId: singlePatientSchedule?.DoctorId,
      vaccineId: singlePatientSchedule?.VaccineId,
      childId: singlePatientSchedule?.childId,
    };
    console.log(data_to_be_sent)
    const ID=singlePatientSchedule?.Id;
    fetch(
      `${import.meta.env.VITE_API_URL}api/PatientSchedule/single_updateDate?Id=${ID}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data_to_be_sent),
      }
    )
      .then((res) => {
        if (res.status === 204) {
          forceRender();
          setSuccessToast(true);
        } else {
          setErrorToast(true);
        }
      })
      .catch((err) => setErrorToast(true));
  };

  const fetchDoses = () => {
    fetch(`${import.meta.env.VITE_API_URL}alldoses`)
      .then((res) => res.json())
      .then((doses: IDose[]) => setDoses(doses));
  };
  const fetchBrands = () => {
    fetch(`${import.meta.env.VITE_API_URL}BrandName`)
      .then((res) => res.json())
      .then((brands: IBrand[]) => setBrands(brands));
  };
  const PostSkip = async (patientSchedule: IPSchedule) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}api/PatientSchedule/single_update_Skip`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: patientSchedule.Id,
            doseId: patientSchedule.DoseId,
            doctorId: patientSchedule.DoctorId,
            childId: patientSchedule.childId,
            isSkip: patientSchedule.isSkip ? 0 : 1,
            vaccineId: patientSchedule.VaccineId,
          }),
        }
      );
      console.log({
        doseId: patientSchedule.DoseId,
        doctorId: patientSchedule.DoctorId,
        childId: patientSchedule.childId,
        isSkip: patientSchedule.isSkip ? 0 : 1,
        vaccineId: patientSchedule.VaccineId,
      });
      if (res.status === 204) forceRender();
    } catch (error) {
      console.log(error);
    }
  };

  const PostSingleDone = async (patientSchedule: IPSchedule) => {
    const isDone = patientSchedule.isDone ? 0 : 1;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}api/PatientSchedule/single_updateDone`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },
          
          body: JSON.stringify({
            id: patientSchedule.Id,
            date: format(new Date(), "yyyy-MM-dd"),
            doseId: patientSchedule.DoseId,
            doctorId: patientSchedule.DoctorId,
            childId: patientSchedule.childId,
            vaccineId: patientSchedule.VaccineId,
            isDone,
          }),
          
        }
      );
      console.log({ date: format(new Date(), "yyyy-MM-dd"),
      doseId: patientSchedule.DoseId,
      doctorId: patientSchedule.DoctorId,
      childId: patientSchedule.childId,
      vaccineId: patientSchedule.VaccineId,})
      if (res.status === 204) forceRender();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDoses();
    fetchBrands();
    axios
      .get(`${import.meta.env.VITE_API_URL}api/Child/${data[0].childId}`)
      .then((res) => res.status === 200 && setName(res.data.Name));
  }, [date, data]);
  // console.log(data);
  const formatedDate = (date: string) => format(new Date(date), "MMM d, yyyy");
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
      <div>
        <IonGrid className="md hydrated">
          <IonRow className="md hydrated">
            <IonCol style={{ textAlign: "center" }} className="md hydrated">
              {formatedDate(date)}
              &nbsp;
              <IonImg
                src={syringImage}
                onClick={() =>
                  router.push(`/members/child/vaccine/${423}/bulk/${date}`)
                }
                style={{
                  height: "15px",
                  display: "inline-block",
                  margin: "0px 10px",
                }}
                className="ng-star-inserted md hydrated"
              />
              &nbsp;
              <DatePicker
                selectedDate={date || BulkDate}
                onDateSelected={setBulkDate}
                iconSize="15px"
                executeFunc="bulkDate"
                updateBulkDate={updateBulkDate}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
        <div>
          {doses ? (
            <IonCard className="md hydrated">
              <IonCardContent className="md card-content-md hydrated">
                {data.map((item, index) => {
                  return (
                    <div key={index + date}>
                      <IonItem
                        lines="none"
                        className="item md item-lines-none ion-focusable item-label hydrated"
                      >
                        <IonLabel className="sc-ion-label-md-h sc-ion-label-md-s md hydrated">
                          {filterDoses(item.DoseId)}
                        </IonLabel>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 5,
                          }}
                        >
                          {item.isDone ? (
                            <>
                              <IonText color={"success"}>
                                {formatedDate(date)}
                              </IonText>
                              <IonImg
                                src={syringImage}
                                // onClick={() =>
                                //   router.push(
                                //     `/members/child/vaccine/${item.childId}/fill/${item.Id}?isDone=${item.isDone}`
                                //   )
                                // }
                                onClick={() => PostSingleDone(item)}
                                style={{ height: "30px" }}
                                className="ng-star-inserted md hydrated"
                              />
                            </>
                          ) : (
                            <>
                              {!item.isSkip && (
                                <>
                                  <p
                                    style={{ color: "rgb(55, 231, 10)" }}
                                    onClick={() =>
                                      setSinglePatientSchedule(item)
                                    }
                                  >
                                    <DatePicker
                                      selectedDate={date || SingleDate}
                                      onDateSelected={setSingleDate}
                                      iconSize="20px"
                                      executeFunc="singleDate"
                                      updateSingleDate={updateSingleDate}
                                    />
                                  </p>
                                  <IonImg
                                    src={emptySyringImage}
                                    // onClick={() =>
                                    //   router.push(
                                    //     `/members/child/vaccine/${item.childId}/fill/${item.Id}`
                                    //   )
                                    // }
                                    onClick={() => PostSingleDone(item)}
                                    style={{ height: "30px", color: "orange" }}
                                    className="ng-star-inserted md hydrated"
                                  />
                                </>
                              )}
                              <IonButton
                                size="small"
                                onClick={() => PostSkip(item)}
                                style={{
                                  textTransform: "lowercase",
                                }}
                                color={item.isSkip ? "danger" : "primary"}
                              >
                                {item.isSkip ? "unSkip" : "skip"}
                              </IonButton>
                            </>
                          )}
                        </div>
                      </IonItem>
                      {item.isDone ? (
                        <p style={{ textAlign: "center" }}>
                          Brand:{filterBrand(item.DoseId)}
                        </p>
                      ) : null}
                    </div>
                  );
                })}
              </IonCardContent>
            </IonCard>
          ) : (
            "dose or does didn't load for this particular schedule"
          )}
        </div>
      </div>
    </>
  );
};

export default VaccinationCard;

{
  /* <div >
  <IonItem
    lines="none"
    className="item md item-lines-none ion-focusable item-label hydrated"
  >
    <IonLabel className="sc-ion-label-md-h sc-ion-label-md-s md hydrated">
      OPV #1
    </IonLabel>
    <p
      style={{ color: "rgb(55, 231, 10)" }}
      
    >
      <IonIcon
        color={"primary"}
        icon={calendar}
        className="md ion-color ion-color-primary hydrated"
        aria-label="calendar"
        style={{ fontSize: "20px" }}
      />
    </p>
    <IonImg
      src={syringImage}
      style={{ height: "30px" }}
      className="ng-star-inserted md hydrated"
    />
    <IonButton size="small">skip</IonButton>
  </IonItem>
</div> */
}
