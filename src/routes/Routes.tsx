import { IonRouterOutlet } from "@ionic/react";
import React from "react";
import { Redirect, Route } from "react-router";
import Dashboard from "../pages/dashboard/Dashboard";
import Alert from "../pages/alert/Alert";
import Test from "../pages/test/Test";
import AddPatient from "../pages/patient/AddPatient";
import PatientCardList from "../pages/patient/PatientCardList";
import EditProfile from "../pages/doctor/EditProfile";
import UpdatePatient from "../pages/patient/update/UpdatePatient";
import VaccinationCard from "../pages/patient/vaccination/VaccinationCard";
import ClinicCardList from "../pages/clinic/ClinicCardList";

const Routes: React.FC = () => {
  return (
    <>
      <IonRouterOutlet id="main-content" style={{ width: "100%" }}>
        <Route exact path="/members/dashboard" component={Dashboard} />
        <Route exact path="/members/alert/vaccine-alert" component={Alert} />
        <Route exact path="/members/child/add" component={AddPatient} />
        <Route exact path="/members/child" component={PatientCardList} />
        <Route exact path="/members/child/edit/:Id" component={UpdatePatient} />

        <Route exact path="/members/doctor/clinic" component={ClinicCardList} />

        <Route
          exact
          path="/members/child/vaccine/:Id"
          component={VaccinationCard}
        />
        <Route
          exact
          path="/members/doctor/edit-profile"
          component={EditProfile}
        />

        <Route exact path={"/members/test"} component={Test} />
        <Route exact path="/members">
          <Redirect to="/members/dashboard" />
        </Route>
      </IonRouterOutlet>
    </>
  );
};

export default Routes;
