import React, { useEffect, useState } from "react";
import {
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonSelect,
  IonSelectOption,
  useIonRouter,
} from "@ionic/react";
import Toast from "../../../../components/custom-toast/Toast";
import { format, isValid, parse } from "date-fns";
import { useLocation } from "react-router";

interface IParam {
  match: {
    params: {
      Date1: string;
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
    params: { Date1, Id },
  },
}: IParam) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const router = useIonRouter();
  const oldDate = queryParams && queryParams.get("oldDate");
  const numberOfInputs: string | null = queryParams.get("No");
  // let DOB = queryParams.get("DOB");
  // let doctorId = queryParams.get("doctorId");

  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const formatDate = (inputDate: string | null) => {
    if (!inputDate) {
      return null; // Handle null input gracefully
    }

    // List of possible date formats to try
    const possibleFormats = [
      "dd-MMM-yy",
      "yyyy-MM-dd",
      "M/d/yyyy", // Added format: Month/Day/Year
      "yyyy-M-d",
      // Add more formats here as needed
    ];

    let parsedDate = null;

    // Attempt to parse the input date using various formats
    for (const formatString of possibleFormats) {
      parsedDate = parse(inputDate, formatString, new Date());
      if (isValid(parsedDate)) {
        break; // Use the first valid format found
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

  const [successToast, setSuccessToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);
  const [newDate, setNewDate] = useState(formatDate(oldDate));
  const [brandId, setBrandId] = useState<number[]>([]); // Changed to specify the type as number[]
  const [brandData, setBrandData] = useState<IBrand[][]>([]); // Changed to specify the type as IBrand[][]
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState<String>("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [ofc, setOfc] = useState("");
  const [heights, setHeights] = useState<(string | null)[]>(
    Array(numberOfInputs).fill(null)
  );
  const [weights, setWeights] = useState<(string | null)[]>(
    Array(numberOfInputs).fill(null)
  );
  const [ofcs, setOfcs] = useState<(string | null)[]>(
    Array(numberOfInputs).fill(null)
  );

const validateDecimalInput = (input: string, allowEmpty: boolean = false) => {
  // If the input is empty and empty inputs are allowed, return true
  if (allowEmpty && input === "") {
    return true;
  }

  // Regular expression to match numbers with at most one decimal point
  const regex = /^[0-9]+(\.[0-9]+)?$/;

  // Test the input against the regular expression
  return regex.test(input);
};


  
  useEffect(() => {
    let qry = localStorage.getItem("query") as String;
    setQuery(qry);
    // Fetch the initial data
    fetch(
      `${
        import.meta.env.VITE_API_URL
      }api/PatientSchedule/getData_baseOnDate?date=${formatDate(oldDate)}`
    )
      .then((res) => res.json())
      .then((data) => {
        const ids = data.map(
          (item: { Id: any; IsSkip: boolean }) =>
            item.IsSkip === false && item.Id
        );
        // const ids = data.map((item: { Id: any; }) => item.Id);
        console.log("ids", ids);
        setBrandId(ids);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    // Fetch data based on the brandId array
    const fetchDataForBrandIds = async () => {
      try {
        // Ensure there are some IDs before making the second API call
        if (brandId.length === 0) return;

        const dataPromises = brandId.map((id) => {
          return fetch(
            `${
              import.meta.env.VITE_API_URL
            }api/PatientSchedule/GetBrandForPatientSchedule?Id=${id}`
          )
            .then((res) => res.json())
            .catch((err) => {
              console.error(err);
              return null;
            });
        });

        // Wait for all API calls to complete using Promise.all()
        const resultData = await Promise.all(dataPromises);
        // console.log('brand data', resultData)
        setBrandData(resultData);
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        console.error(err);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchDataForBrandIds();
  }, [brandId]);

  //   const handleDateChange = (e: { target: { value: any; }; }, value:any ) => {
  //     // Get the selected date from the event
  //     const selectedDate = e.target.value;
  // console.log(selectedDate)
  // console.log(value)
  //     // Update the givenDate state with the selected date (no need to format it again)
  //     setNewDate(selectedDate);

  //   };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToBeSent = [];
    //@ts-ignore
    for (let i = 0; i < numberOfInputs; i++) {
      const obj = {
        id: brandId[i],
        currentdate: formatDate(oldDate),
        isDone: true,
        isSkip: false,
        givenDate: newDate,
        brandId:
          selectedBrandIds[i] !== "" && selectedBrandIds[i] !== undefined
            ? selectedBrandIds[i]
            : null,
        height:
          heights[i] !== "" &&
          heights[i] !== undefined &&
          heights[i] !== undefined
            ? heights[i]
            : null,
        weight:
          weights[i] !== "" &&
          weights[i] !== undefined &&
          weights[i] !== undefined
            ? weights[i]
            : null,
        ofc:
          ofcs[i] !== "" && ofcs[i] !== undefined && ofcs[i] !== undefined
            ? ofcs[i]
            : null,
      };

      dataToBeSent.push(obj);
    }

    console.log("data to be sent", dataToBeSent);
    const url = `${
      import.meta.env.VITE_API_URL
    }api/PatientSchedule/patient_bulk_updateDone`;
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToBeSent),
      });
      if (response.status === 204) {
        setSuccessToast(true);
        //@ts-ignore
        localStorage.setItem("isDone", "true");
        // router.push(`/members/child/vaccine/${Id}${query}`, "back");
        // window.location.reload();
      } else if (!response.ok) setErrorToast(true);
    } catch (err) {
      setErrorToast(true);
      //@ts-ignore
      localStorage.setItem("isDone", "false");
    }
  };

  // const [brands, setBrands] = useState([3]);

  // const [brands, setBrands] = useState(Array(numberOfInputs).fill(""));
  //@ts-ignore
  const [selectedBrandIds, setSelectedBrandIds] = useState<string[]>(
    // @ts-ignore
    Array(numberOfInputs).fill("")
  );

  // ... (previous code)

  const handleBrandChange = (index: number, value: string) => {
    setSelectedBrandIds((prevSelectedBrandIds) => {
      const newSelectedBrandIds = [...prevSelectedBrandIds];
      newSelectedBrandIds[index] = value !== null ? value : ""; // Ensure null is converted to an empty string
      return newSelectedBrandIds;
    });
  };

const handleHeightChange = (index: number, value: string) => {
  setHeights((prevHeights) => {
    const newHeights = [...prevHeights];
    const trimmedValue = value.trim(); // Trim the value
    if (!validateDecimalInput(trimmedValue, true)) {
      setErrMsg("Please enter a valid height");
      setError(true);
    } else {
      setError(false);
      newHeights[index] = trimmedValue !== "" ? trimmedValue : null;
    }
    return newHeights;
  });
};



const handleWeightChange = (index: number, value: string) => {
setWeights((prevWeights) => {
  const newWeights = [...prevWeights];
  const trimmedValue = value.trim(); // Trim the value
  if (!validateDecimalInput(trimmedValue, true)) {
    setErrMsg("Please enter a valid height");
    setError(true);
  } else {
    setError(false);
    newWeights[index] = trimmedValue !== "" ? trimmedValue : null;
  }
  return newWeights;
});
};



const handleOfcChange = (index: number, value: string) => {
  setOfcs((prevOfcs) => {
    const newOfcs = [...prevOfcs];
    const trimmedValue = value.trim(); // Trim the value
    if (!validateDecimalInput(trimmedValue, true)) {
      setErrMsg("Please enter a valid OFC");
      setError(true);
    } else {
      setError(false);
      newOfcs[index] = trimmedValue !== "" ? trimmedValue : null;
    }
    return newOfcs;
  });
};

  // ... (previous code)

  // Log selectedBrandIds whenever it changes
  useEffect(() => {}, [selectedBrandIds]);

  const selected = newDate !== "";

  return (
    <>
      <Toast
        isOpen={successToast}
        setOpen={setSuccessToast}
        color="success"
        message="Bulk update successfully"
      />
      <Toast
        isOpen={errorToast}
        setOpen={setErrorToast}
        color="danger"
        message="An Error occurred while bulk update, please try again later"
      />
      <IonPage>
        <IonContent>
          <IonHeader>
            <IonToolbar color={"primary"}>
              <IonTitle>Bulk</IonTitle>
            </IonToolbar>
          </IonHeader>
          <form noValidate onSubmit={handleSubmit}>
            {/* @ts-ignore */}

            {Array.from({ length: numberOfInputs }, (_, index) => (
              <>
                <IonItem key={index}>
                  <IonLabel color="primary">Brands {index + 1}</IonLabel>
                  {loading ? ( // Show loading message while fetching brandData
                    <IonSelect disabled>
                      <IonSelectOption>Loading...</IonSelectOption>
                    </IonSelect>
                  ) : brandData[index] && brandData[index].length > 0 ? ( // Show options when brandData is available for this input
                    <IonSelect
                      value={selectedBrandIds[index]}
                      onIonChange={(e) =>
                        handleBrandChange(index, e.detail.value)
                      }
                      id="brand"
                    >
                      {brandData[index].map((brandOption) => (
                        <IonSelectOption
                          key={brandOption.Id}
                          value={brandOption.Id}
                        >
                          {brandOption.Name}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  ) : (
                    // Show message if no brands available for this input
                    <IonSelect disabled>
                      <IonSelectOption>No brands available</IonSelectOption>
                    </IonSelect>
                  )}
                </IonItem>
                <IonItem>
                  <IonLabel>Height {index + 1}:</IonLabel>
                  <IonInput
                    placeholder="00.00"
                    type="text"
                    value={heights[index] || ""}
                    onIonChange={(e) =>
                      handleHeightChange(index, e.detail.value || "")

                    }

                  />
                </IonItem>
                <IonItem>
                  <IonLabel>Weight {index + 1}:</IonLabel>
                  <IonInput
                    placeholder="00.00"
                    type="text"
                    value={weights[index] || ""}
                    onIonChange={(e) =>
                      handleWeightChange(index, e.detail.value || "")
                    }
                  />
                </IonItem>
                <IonItem>
                  <IonLabel>OFC {index + 1}:</IonLabel>
                  <IonInput
                    placeholder="00.00"
                    type="text"
                    value={ofcs[index] || ""}
                    onIonChange={(e) =>
                      handleOfcChange(index, e.detail.value || "")
                    }
                  />
                </IonItem>
              </>
            ))}
            {/* 

            <IonItem>
              <IonLabel>Weight 1:</IonLabel>
              <IonInput
                placeholder="00.00"
                type="text"
                value={weight}
                onIonChange={(e) => {
                  
                }}
              />
            </IonItem>


 */}

            <IonItem>
              <IonLabel color="primary">Old Date</IonLabel>
              <IonInput
                type="date"
                value={formatDate(oldDate)}
                disabled
                slot="end"

                // onIonChange={(e) => handleDateChange(e, e.detail.value)}
                // min={Date1}
              />
            </IonItem>
            <IonItem>
              <IonLabel color="primary">Actual Date</IonLabel>
              <IonInput
                type="date"
                value={newDate}
                slot="end"
                required //@ts-ignore *
                onIonChange={(e) => setNewDate(e.target.value)}
                id="date1"
              />
            </IonItem>

            <IonButton id="submit" type="submit" disabled={!selected}>
              Submit
            </IonButton>
          </form>
        </IonContent>
      </IonPage>
    </>
  );
};

export default BulkDone;
