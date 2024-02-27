import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import Toast from "../../../../components/custom-toast/Toast";
import { format, isValid, parse } from "date-fns";

interface IBrand {
  Id: number;
  Name: string;
  VaccineId: number;
}

interface IParam {
  match: {
    params: {
      childId: number;
      doseId: number;
    };
  };
}

const SingleDone: React.FC<IParam> = () => {
  const location = useLocation();
  const history = useHistory();
  const router = useIonRouter();
  const [errMsg, setErrMsg] = useState("");
  // Extract the query parameters from the location.search
  const queryParams = new URLSearchParams(location.search);
  // Get the value of the "oldDate" parameter from the query parameters
  const oldDate = queryParams.get("oldDate");
  let DOB = queryParams.get("DOB");
  let doctorId = queryParams.get("doctorId");
  console.log(oldDate);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { doseId: scheduleId } = useParams<{ doseId: string }>();
  const { childId } = useParams<{ childId: string }>();
  const [brand, setBrand] = useState<string>();
  const [brandData, setBrandData] = useState<IBrand[]>([]);
  const [scheduleDate, setScheduleDate] = useState<string>();
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [ofc, setOFC] = useState("");
  const formatDate = (inputDate: string | null) => {
    if (!inputDate) {
      return null;
    }

    // List of possible date formats to try
    const possibleFormats = [
      "dd-MMM-yy",
      "yyyy-MM-dd",
      "M/d/yyyy", 
      "yyyy-M-d",
    ];

    let parsedDate = null;

    for (const formatString of possibleFormats) {
      parsedDate = parse(inputDate, formatString, new Date());
      if (isValid(parsedDate)) {
        break;
      }
    }

    // Check if the parsed date is valid
    if (!isValid(parsedDate)) {
      console.error("Error parsing date:", inputDate);
      return null;
    }

    // Format the parsed date to "yyyy-MM-dd"
    //@ts-ignore
    const formattedDate = format(parsedDate, "yyyy-MM-dd");
    return formattedDate;
  };

  const formattedOldDate = oldDate ? formatDate(oldDate) : null;

  const [givenDate, setGivenDate] = useState<string | null>(formattedOldDate);
  const [newDate, setNewDate] = useState();
  const validateDecimalInput = (input: string, allowEmpty: boolean = false) => {
    // If the input is empty and empty inputs are allowed, return true
    if (allowEmpty && input === '') {
      return true;
      
    }
    
    // Regular expression to match numbers with at most one decimal point
    const regex = /^[0-9]+(\.[0-9]+)?$/;
  
    // Test the input against the regular expression
    return regex.test(input);
  };
  useEffect(() => {
    fetch(
      `${
        import.meta.env.VITE_API_URL
      }api/PatientSchedule/GetBrandForPatientSchedule?Id=${scheduleId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setBrandData(data);
        console.log("brand data ", data);
      })
      .catch((err) => console.error(err));
  }, [scheduleId]);

  const handleDateChange = (e: { target: { value: any } }, value: any) => {
    // Get the selected date from the event
    const selectedDate = e.target.value;

    // Update the givenDate state with the selected date (no need to format it again)
    setNewDate(selectedDate);
  };

  const postSingleDone = async (e: any) => {
    e.preventDefault();
    console.log(brand);
    console.log(newDate);
    
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }api/PatientSchedule/single_updateDone?Id=${scheduleId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: +scheduleId,
            isDone: 1,
            givenDate: newDate,
            brandId: brand,
          }),
        }
      );
      if (res.status === 204) {
        console.log("first");
        setSuccess(true);
        router.push(
          `/members/child/vaccine/${childId}?DOB=${DOB}&doctorId=${doctorId}`,
          "back"
        );
        // window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setErrMsg("Something went wrong");
      setError(true);
    }
   
  };

  return (
    <>
      <Toast
        isOpen={success}
        setOpen={setSuccess}
        message="Single date of patient schedule updated successfully."
        color="success"
      />
      
      <Toast isOpen={error} setOpen={setError} color="danger" errMsg={errMsg} />
      <IonPage>
        <IonContent>
          <IonHeader>
            <IonToolbar color={"primary"}>
              <IonTitle>Single</IonTitle>
            </IonToolbar>
          </IonHeader>
          <form noValidate onSubmit={postSingleDone}>
          <IonItem>
            <IonLabel>Height</IonLabel>
            <IonInput
              placeholder="00.00"
              type="text"
              value={height}
              onIonChange={(e) => {
                const inputValue = e.detail.value || '';
                if (!validateDecimalInput(inputValue, true)) {
                  setErrMsg("Please enter a valid height ");
                  setError(true);
                } else {
                  setError(false);
                  setHeight(inputValue);
                }
              }}
              id="height"
            />
              </IonItem>
              <IonItem>
              <IonLabel>Weight</IonLabel>
                <IonInput
                  placeholder="00.00"
                  type="text"
                  value={weight}
                  onIonChange={(e) => {
                    const inputValue = e.detail.value || '';
                    if (!validateDecimalInput(inputValue, true)) {
                      setErrMsg("Please enter a valid weight.");
                      setError(true);
                    } else {
                      setError(false);
                      setWeight(inputValue);
                    }
                  }}
                  id="weight"
                />
              </IonItem>
              <IonItem>
              <IonLabel>OFC</IonLabel>
                <IonInput
                  placeholder="00.00"
                  type="text"
                  value={ofc}
                  onIonChange={(e) => {
                    const inputValue = e.detail.value || '';
                    if (!validateDecimalInput(inputValue, true)) {
                      setErrMsg("Please enter a valid OFC.");
                      setError(true);
                    } else {
                      setError(false);
                      setOFC(inputValue);
                    }
                  }}
                  id="ofc"
                />
              </IonItem>

            <IonItem>
              <IonLabel color="primary">Old Date</IonLabel>
              <IonInput
                slot="end"
                type="date"
                disabled
                value={formattedOldDate} // Use the givenDate directly without formatting it again
                // onIonChange={(e) => handleDateChange(e, e.detail.value)}
              />
            </IonItem>
            <IonItem>
              <IonLabel color="primary">Actual Date</IonLabel>
              <IonInput
                slot="end"
                type="date"
                value={formattedOldDate} // Use the givenDate directly without formatting it again
                //@ts-ignore
                onIonChange={(e) => setNewDate(e.detail.value)}
                id="date12"
              />
            </IonItem>
            <IonItem>
              <IonLabel color="primary">Brands</IonLabel>
              <IonSelect
                value={brand}
                onIonChange={(e) => setBrand(e.detail.value)}
                id="brand1"
              >
                {brandData.map((brandOption) => (
                  <IonSelectOption key={brandOption.Id} value={brandOption.Id}>
                    {brandOption.Name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonButton id="submit" type="submit">
              Submit
            </IonButton>
          </form>
        </IonContent>
      </IonPage>
    </>
  );
};

export default SingleDone;
