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
  console.log(numberOfInputs);
  console.log(oldDate);

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
  const [newDate, setNewDate] = useState();
  const [brandId, setBrandId] = useState<number[]>([]); // Changed to specify the type as number[]
  const [brandData, setBrandData] = useState<IBrand[][]>([]); // Changed to specify the type as IBrand[][]
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState<String>("");

  // Get the value of the "oldDate" parameter from the query parameters
  console.log(formatDate(oldDate));
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
        const ids = data.map((item: { Id: any, IsSkip: boolean }) => item.IsSkip === false && item.Id);
        // const ids = data.map((item: { Id: any; }) => item.Id);
        setBrandId(ids);
        console.log("Initial Data:", data);
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
        console.log("Data for Brand IDs:", resultData);
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
        currentDate: formatDate(oldDate),
        isDone: 1,
        isSkip: 0,
        newDate: newDate,
        brandId: selectedBrandIds[i],
      };

      dataToBeSent.push(obj);
    }

    console.log(dataToBeSent);
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
        router.push(`/members/child/vaccine/${Id}${query}`, "back");
        // window.location.reload();
      } else if (!response.ok) setErrorToast(true);
    } catch (err) {
      console.log("not add");
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

  // Update selected brand IDs when a brand is selected in the <IonSelect> element
  const handleBrandChange = (index: number, value: string) => {
    setSelectedBrandIds((prevSelectedBrandIds) => {
      const newSelectedBrandIds = [...prevSelectedBrandIds];
      newSelectedBrandIds[index] = value || ""; // Ensure a valid value is set or an empty string
      return newSelectedBrandIds;
    });
  };

  // ... (previous code)

  // Log selectedBrandIds whenever it changes
  useEffect(() => {
    console.log("Selected Brand IDs:", selectedBrandIds);
  }, [selectedBrandIds]);

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
            {/* <IonItem>
                  <IonLabel position="floating" color="primary">
                    Weight
                  </IonLabel>
                  <IonInput
                    type="number"
                    value={weight}
                    onIonChange={(e) => setWeight(parseFloat(e.detail.value!))}
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating" color="primary">
                    Height
                  </IonLabel>
                  <IonInput
                    type="number"
                    value={height}
                    onIonChange={(e) => setHeight(parseFloat(e.detail.value!))}
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating" color="primary">
                    OFC
                  </IonLabel>
                  <IonInput
                    type="number"
                    value={OFC}
                    onIonChange={(e) => setOFC(parseFloat(e.detail.value!))}
                  ></IonInput>
                </IonItem> */}
            {/* <IonItem>
              <IonLabel color="primary">Brands</IonLabel>
              <IonSelect
                value={brand}
                onIonChange={(e) => setBrand(e.detail.value)}
              >
                {brandData.map((brandOption) => (
                  <IonSelectOption key={brandOption.Id} value={brandOption.Id}>
                    {brandOption.Name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem> */}
            {/* @ts-ignore */}
            {Array.from({ length: numberOfInputs }, (_, index) => (
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
            ))}
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
