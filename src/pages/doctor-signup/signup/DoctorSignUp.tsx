import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonInput,
  IonLabel,
  IonPage,
  IonButton,
  IonItem,
  // IonSelect,
  // IonSelectOption,
  IonCard,
  IonIcon,
  IonToolbar,
  useIonRouter,
  IonText,
  IonHeader,
} from "@ionic/react";
import { person, arrowForward, eye, eyeOff } from "ionicons/icons";
import "./DocSignUp.css";
import { isValidEmail } from "../../../util/util";
import Toast from "../../../components/custom-toast/Toast";


const DoctorSignUp: React.FC = () => {
  const router = useIonRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [pmdc, setPMDC] = useState("");
  const isInvalid = mobile.startsWith("0") || mobile.startsWith("+");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  // const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [error, setError] = useState<boolean>(false);

  const isNumber = (value: string) => /^\d+$/.test(value);

  const handleMobileNumberChange = (e: CustomEvent) => {
    const inputValue = e.detail.value;
    if (!isNumber(inputValue)) {
      setErrMsg("Mobile Number Must be In 3331234567 Format");
      setError(true);
      setMobile("")
    }else if(inputValue.length > 10){
      setErrMsg("Mobile Number Must contain 10 digit");
      setError(true);
      setMobile("")
    }else if(!inputValue.startsWith('3')){
      setErrMsg("Mobile Number Must Start wth 3");
      setError(true);
      setMobile("")
    } else {
      setMobile(inputValue);
      setError(false);
    }
  };

  const canSubmit =
    name.trim() === "" &&
    email.trim() === "" &&
    mobile.trim() === "" &&
    /\d/.test(password) !== true &&
    password.trim().length > 4 &&
    pmdc.trim() === "";

  const handleSignUp = (e: any) => {
    e.preventDefault();
    if (canSubmit) {
      alert("Please fill in all the fields.");
    } else {
      if (mobile.trim().length < 10) {
        return;
      } else if (mobile.trim().length > 10) {
        return;
      } else if (!isValidEmail(email)) {
        alert("please enter correct email address");
      } else {
        localStorage.clear();
        e.preventDefault();
        localStorage.setItem(
          "drData",
          JSON.stringify({
            name,
            mobileNumber: mobile,
            password,
            email,
            pmdc,
            clinics: [null],
          })
          
        );
        fetch(`${import.meta.env.VITE_API_URL}api/Doctor`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            mobileNumber: mobile,
            password,
            email,
            pmdc,
            clinics: [null],
          }),
        })
          .then((res) => {
            if (res.status === 200 || 204) {
              setSuccess(true);
    
              setTimeout(() => {
                router.push("/", "back");
              }, 1500);
              fetch(`${import.meta.env.VITE_API_URL}api/email`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json-patch+json",
                },
                body: JSON.stringify({userName: name, userEmail: email}),
              })
              
            } else {
              setError(false);
            }
          })
          .catch((err) => setError(true));
       
        clearForm();
      }
    }
  };
  const clearForm = () => {
    setName("");
    setEmail("");
    setMobile("");
    setPassword("");
    setPMDC("");
  };
  const formatDoctorName = (input: string) => {
    return input
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  
  // const handleInputBlur = () => {
  //   if (pmdc.trim() === "") {
  //     // If the input is empty, disable the button
  //     setPMDC(""); // This line is optional, it resets the input to an empty state immediately.
  //   }
  // };
  // useEffect(() => {
  //   // setPassword(generateRandomPassword());
  // }, []);
  // function generateRandomPassword() {
  //   return secureRandomPassword.randomPassword({
  //     length: 8,
  //     characters: [secureRandomPassword.digits],
  //   });
  // }
  return (
    <IonPage>
      {/* <Toast
        isOpen={error}
        setOpen={setError}
        color="danger"
        errMsg="An error occurred while signing up, try again."
      /> */}
      <Toast
        isOpen={success}
        setOpen={setSuccess}
        color="success"
        errMsg="Registration successful. Please wait for approval!"
      />
      <Toast isOpen={error} setOpen={setError} color="danger" errMsg={errMsg} />
      <IonHeader></IonHeader>
      <IonContent className="sign-up-content-doctor">
        <IonToolbar color={"primary"}>
          {" "}
          &nbsp;&nbsp; <b>Doctor Registration</b>
        </IonToolbar>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <IonCard className="form-card-doctor">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "4px",
              }}
            >
              <IonIcon
                icon={person}
                size="large"
                className="signup-icon-doctor"
                style={{ margin: "1rem" }}
              />
            </div>
            <form className="form-wrapper-doctor" onSubmit={handleSignUp}>
              <IonItem style={{ width: "100%" }}>
                <IonLabel position="stacked" id="name">
                  Doctor Name
                </IonLabel>
                <IonInput
                  required
                  type="text"
                  id="name"
                  value={name}
                  className="data"
                  onIonChange={(e) => setName(formatDoctorName(e.detail.value!))}
                />
              </IonItem>
              <IonItem style={{ width: "100%" }}>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  required
                  type="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  value={email}
                  id="email"
                  onIonChange={(e) => setEmail(e.detail.value!)}
                />
              </IonItem>
              <IonItem style={{ width: "100%" }}>
                <IonLabel position="floating">Mobile Number</IonLabel>
                <IonInput
                  required
                  type="text"
                  value={mobile}
                  id="mobileNumber"
                  itemID="mobileNumber"
                  placeholder="3331234567"
                  onIonChange={handleMobileNumberChange}
                />
              </IonItem>
            
              
               
              <IonItem style={{ width: "100%" }}>
                <IonLabel position="floating">Password</IonLabel>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <IonInput
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                    id="password"
                    placeholder=" Password must 4 character long and should contain only number"
                    // readonly
                    onIonChange={(e) => setPassword(e.detail.value!)}
                  />
                  <IonButton
                    style={{ marginTop: "-.5rem" }}
                    fill="clear"
                    size="small"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <IonIcon
                      // slot="icon-only"
                      icon={showPassword ? eyeOff : eye}
                    />
                  </IonButton>
                </div>
              </IonItem>
              <IonText
                color={"danger"}
                style={{
                  fontSize: "8px",
                  marginBottom: "11px",
                  display:
      password.trim() !== "" &&
      (!/\d/.test(password) ||  password.trim().length !== 4)
        ? "block"
        : "none",
                }}
              >
                Password must 4 character long and should contain only number
              </IonText>
              <IonItem style={{ width: "100%", borderBottom: "red" }}>
                <IonLabel position="floating">PMDC</IonLabel>
                <IonInput
                  type="text"
                  required
                  value={pmdc}
                  id="pmdc"
                  onIonChange={(e) => setPMDC(e.detail.value!)}
                  // onIonBlur={handleInputBlur}
                />
              </IonItem>
              {/* <IonItem>
                <IonLabel>Doctor Type</IonLabel>
                <IonSelect
                
                  value={doctorType}
                  onIonChange={(e) => setDoctorType(e.detail.value)}
                >
                  <IonSelectOption value="GP">
                    General Practitioner
                  </IonSelectOption>
                  <IonSelectOption value="Specialist">
                    Specialist
                  </IonSelectOption>
                  <IonSelectOption value="Surgeon">Surgeon</IonSelectOption>
                </IonSelect>
              </IonItem> */}
              <IonButton id="signup" expand="full" type="submit">
                Submit
                {/* <IonIcon slot="end" icon={arrowForward} /> */}
              </IonButton>
            </form>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DoctorSignUp;
