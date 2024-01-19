import React, { FormEvent, useState } from "react";
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  useIonRouter,
  IonCard,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonText,
} from "@ionic/react";
import { mail, lockClosed, logIn } from "ionicons/icons";
import "./Login.css";
import Toast from "../../components/custom-toast/Toast";
import { useHistory } from "react-router";

const Login: React.FC = () => {
  const history = useHistory();
  const router = useIonRouter();
  const navigation = useIonRouter();
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [mobileNumber, setmobileNumber] = useState<string>("");
  const [password, setpassword] = useState<string>("");
 
  const [errMsg, setErrMsg] = useState("");
  
  const isNumber = (value: string) => /^\d+$/.test(value);

  const handleMobileNumberChange = (e: CustomEvent) => {
    const inputValue = e.detail.value;
    if (!isNumber(inputValue)) {
      setErrMsg("Mobile Number Must be In 3331234567 Format");
      setError(true);
      setmobileNumber("")
    }else if(inputValue.length > 10){
      setErrMsg("Mobile Number Must contain 10 digit");
      setError(true);
      setmobileNumber("")
    }else if(!inputValue.startsWith('3')){
      setErrMsg("Mobile Number Must Start wth 3");
      setError(true);
      setmobileNumber("")
    } else {
      setmobileNumber(inputValue);
      setError(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      fetch(
        `${
          import.meta.env.VITE_API_URL
        }api/Doctor/login?MobileNumber=${mobileNumber}&Password=${password}`,
        {
          method: "GET",
        }
      )
        .then((res) => {
          if (res.status === 200) {
            setSuccess(true);
            return res.json(); // This returns a promise
            
          }else if (res.status === 401) {
            // console.log(res);
            setErrMsg("Invalid credentials");
            setError(true);
          }  else if (res.status === 400) {
            console.log(res);
            setErrMsg("Your account has expired. Please contact the admin");
            setError(true);
          }else {
            throw new Error("Internal server error.");
          }
          
        })
        .then((data) => {
            
            
            const doctorId=data.Id;
            console.log('doctorId :',doctorId)
            sessionStorage.clear();
            sessionStorage.setItem("docData", JSON.stringify(data));
            
            fetch(`${import.meta.env.VITE_API_URL}api/Clinic/clinicByDoctor?doctorId=${doctorId}`,{method:"GET"})
            .then( (res)=>{
             
              if (data.Clinics.length === 0) {
                localStorage.setItem("docData", JSON.stringify(data));
                // If the result is an empty array, navigate to "/auth/reg_clinic"
                router.push("/auth/reg_clinic");
              } else {
                // If there is data, navigate to "/members/Dashboard"
                localStorage.setItem("docData", JSON.stringify(data));
                history.push("/members/Dashboard", "root");
              }
            })
            
           
            
          
          console.log(data);
          
        })
        .catch((err: any) => {
          setError(true);
          console.error(err);
        })
        .finally(() => {
          setmobileNumber("");
          setpassword("");
        });
    } catch (err: any) {
      setError(true);
      setErrMsg(err.message);
    }
  };

  const canSubmit = password.length >= 4 && mobileNumber.length > 0;
  const isInvalid =
    mobileNumber.startsWith("0") || mobileNumber.startsWith("+");
  return (
    <>
      <Toast
        isOpen={success}
        setOpen={setSuccess}
        color="success"
        errMsg="Doctor Login successful"
      />
      <Toast isOpen={error} setOpen={setError} color="danger" errMsg={errMsg} />
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>&nbsp;&nbsp;Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="wrapper">
            <IonCard className="login-card">
              <div className="form-container">
                <form className="login-form" onSubmit={handleSubmit}>
                  <div className="input-container">
                    <IonIcon icon={mail} id="myicon" />
                    <IonInput
                      type="text"
                      placeholder=" "
                      className="animated-input"
                      label="&nbsp;&nbsp;&nbsp; Mobile Number"
                      labelPlacement="floating"
                      color="light"
                      value={mobileNumber}
                      style={{ color: isInvalid ? "red" : "" }}
                      onIonChange={handleMobileNumberChange}
                      required
                      id="mobilenumber"
                    />
                    <IonText
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginBottom: "11px",
                        display:
                          mobileNumber.startsWith("0") ||
                          mobileNumber.startsWith("+")
                            ? "block"
                            : "none",
                      }}
                    >
                      Mobile Number Must be In 3331234567 Format
                    </IonText>
                  </div>
                  <div className="input-container">
                    <IonIcon icon={lockClosed} id="myicon" />
                    <IonInput
                      type="password"
                      placeholder=" "
                      className="animated-input"
                      label="&nbsp;&nbsp;&nbsp;&nbsp;Password"
                      labelPlacement="floating"
                      color="light"
                      value={password}
                      onIonChange={(e) => setpassword(e.detail.value!)}
                      required
                      id="pass"
                    />
                   
                  </div>
                  <IonButton
                    type="submit"
                    expand="full"
                    strong
                    className="custom-button"
                    disabled={!canSubmit}
                    id="login"
                  >
                    <IonIcon icon={logIn} color="light" />
                    &nbsp; Login
                  </IonButton>
                  <IonText
                    style={{
                      color: "#fff",
                      marginTop: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => navigation.push("/auth/reg_doc")}
                    id="sign"
                  >
                    Don't have an account? &nbsp; Sign Up
                  </IonText>
                </form>
              </div>
            </IonCard>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Login;
