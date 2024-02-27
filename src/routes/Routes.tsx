import { IonRouterOutlet } from "@ionic/react";
import React from "react";
import { Redirect, Route } from "react-router";
import Dashboard from "../pages/dashboard/Dashboard";
import Alert from "../pages/alert/Alert";
import Test from "../pages/test/TestList";
import AddPatient from "../pages/patient/AddPatient";
import PatientCardList from "../pages/patient/PatientCardList";
import EditProfile from "../pages/doctor/EditProfile";
import UpdatePatient from "../pages/patient/update/UpdatePatient";
import VaccinationCard from "../pages/patient/vaccination/VaccinationCard";
import ClinicCardList from "../pages/clinic/ClinicCardList";
import AddClinic from "../pages/clinic/AddClinic";
import DoctorScheduleCardList from "../pages/doctor-schedule/DoctorScheduleCardList";
import Vacation from "../pages/Vacation/Vacation";
import BrandInventory from "../pages/brand_inventory/BrandInventory";
import BrandAmount from "../pages/brand_amount/BrandAmount";
import AddBrandInventory from "../pages/brand_inventory/AddBrandInventory";
import AddBrandAmount from "../pages/brand_amount/AddBrandAmount";
import SignUp from "../pages/doctor-signup/signup/DoctorSignUp";
import VaccinationCardList from "../pages/patient/vaccination/VaccinationCardList";
import BulkDone from "../pages/patient/vaccination/bulk-done-update/BulkDone";

import ChangePassword from "../pages/changepassword/ChangePassword";
import SingleDone from "../pages/patient/vaccination/single-done-update/SingleDone";
import UpdateClinic from "../pages/clinic/UpdateClinic";
import SpecialVaccine from "../pages/patient/SpecialVaccine";
import AddNewDosesList from "../pages/patient/AddNewDosesList";
import DosesSelection from "../pages/doctor-signup/doc_schedule/DosesSelection";
import DosesSelection1 from "../pages/doctor-schedule/DosesSelection1";

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
        <Route exact path="/members/doctor/clinic/add" component={AddClinic} />
        <Route
          exact
          path="/members/doctor/clinic/update/:clinicId"
          component={UpdateClinic}
        />
        <Route exact path="/members/doctor/vacation" component={Vacation} />
        <Route
          exact
          path="/members/doctor/Schedule"
          component={DoctorScheduleCardList}
        />
        <Route
          exact
          path="/members/doctor/brandinventory"
          component={BrandInventory}
        />
        <Route
          exact
          path="/members/doctor/brandinventory/add"
          component={AddBrandInventory}
        />
        <Route
          exact
          path="/members/doctor/brandamount"
          component={BrandAmount}
        />
        <Route
          exact
          path="/members/doctor/brandamount/add"
          component={AddBrandAmount}
        />
        <Route
          exact
          path="/members/doctor/changepassword"
          component={ChangePassword}
        />

        <Route
          exact
          path="/members/child/vaccine/:Id"
          component={VaccinationCardList}
        />
        <Route
          exact
          path="/members/child/special-vaccine/:childId"
          component={SpecialVaccine}
        />
         <Route
          exact
          path="/members/alldosesforDoctor"
          component={DosesSelection1}
        />
         <Route
          exact
          path="/alldosesforDoctor"
          component={DosesSelection}
        />
        <Route
          exact
          path="/members/child/AddNewDosesList/:childId"
          component={AddNewDosesList}
        />

        <Route
          exact
          path="/members/child/vaccine/:Id/bulk/:doseId"
          component={BulkDone}
        />
        <Route
          exact
          path="/members/child/vaccine/:childId/fill/:doseId"
          component={SingleDone}
        />

        <Route
          exact
          path="/members/doctor/edit-profile"
          component={EditProfile}
        />

        <Route
          exact
          path=""
          // component={}
        />

        <Route exact path={"/members/dashboard"} component={Dashboard} />
        <Route exact path="/members">
          <Redirect to="/members/dashboard" />
        </Route>

        <Route exact path={"/auth/signup"} component={SignUp} />
      </IonRouterOutlet>
    </>
  );
};

export default Routes;
