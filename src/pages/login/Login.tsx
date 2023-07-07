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
// import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";

const Login: React.FC = () => {
  const [showLoading, setShowLoading] = useState(false);
  const navigation = useIonRouter();
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [mobileNumber, setmobileNumber] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // setShowLoading(true);
    event.preventDefault();
    fetch(`${import.meta.env.VITE_API_URL}api/Doctor/login?MobileNumber=${mobileNumber}&Password=${password}`, {
      method: "GET",
    })
      .then((res) => {
        if(res.status === 200) {
        setSuccess(true)
        navigation.push("/members", "root");
        console.log(res)
        // sessionStorage.setItem('myValue', res);
        return res.json(); 
       }
       else {
        setError(false);
       }
      })
      .then((data) => {
        // if (Object.keys(data).length !== 0) {
          
        // }
        console.log(data);
        sessionStorage.setItem('docData', JSON.stringify(data));
      })
      .catch((err) => {
        setError(true)
      })
      .finally(() => {
        setmobileNumber("")
        setpassword("")
      });
   
  };
  const canSubmit =
  password.length > 0 &&
  mobileNumber.length > 0;
 

  return (
    <>
      {/* <LoadingSpinner
        isOpen={showLoading}
        setOpen={setShowLoading}
        time={1000}
      /> */}
      <Toast
        isOpen={error}
        setOpen={setError}
        color="danger"
        errMsg="an error occurred while login, try again"
      />
      <Toast
        isOpen={success}
        setOpen={setSuccess}
        color="success"
        errMsg="Docter Login successfully"
      />
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
                      type="number"
                      placeholder=" "
                      className="animated-input"
                      label="&nbsp;&nbsp;&nbsp; Mobile Number"
                      labelPlacement="floating"
                      color="light"
                      value={mobileNumber}
                      onIonChange={(e) => setmobileNumber(e.detail.value!)}
                      required
                    />
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
                    />
                  </div>
                  <IonButton
                    type="submit"
                    expand="full"
                    strong
                    className="custom-button"
                    disabled={!canSubmit}
                  >
                    <IonIcon icon={logIn} color="light"  />
                    &nbsp; Login
                  </IonButton>
                  <IonText
                    style={{ color: "#fff", marginTop: "10px", cursor: 'pointer'}}
                    onClick={() => navigation.push("/auth/reg_doc")}
                  >
                    don't have Account? &nbsp; Sign Up
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
