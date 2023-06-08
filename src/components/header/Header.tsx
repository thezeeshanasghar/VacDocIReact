import {
  IonButtons,
  IonHeader,
  IonIcon,
  IonItem,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { add, alert, medkit, personAdd } from "ionicons/icons";
import { useLocation } from "react-router";
type IHeaderProps = { pageName: string };
const Header: React.FC<IHeaderProps> = ({ pageName }) => {
  const location = useLocation();
  const router = useIonRouter();
  return (
    <>
      <IonHeader
        role="banner"
        className="md header-md header-collapse-none hydrated"
      >
        <IonToolbar
          color="primary"
          className="in-toolbar md toolbar-title-default ion-color ion-color-primary hydrated"
        >
          <IonButtons
            slot="start"
            className="buttons-first-slot sc-IonButtons-md-h sc-IonButtons-md-s md hydrated"
          ></IonButtons>
          <IonTitle slot="start" className="md title-default hydrated">
            {pageName}
          </IonTitle>
          <IonTitle
            slot="end"
            className="ng-star-inserted md title-default hydrated"
          >
            {" "}
            Baby Medics{" "}
          </IonTitle>
          {location.pathname === "/members/doctor/clinic" && (
            <IonItem
              color="primary"
              routerLink="/members/doctor/clinic/add"
              slot="end"
              tabIndex={0}
              className="ion-color ion-color-primary item md ion-activatable ion-focusable hydrated"
            >
              <IonIcon
                color="light"
                icon={add}
                slot="end"
                role="img"
                className="md ion-color ion-color-light hydrated"
                aria-label="add"
              ></IonIcon>
            </IonItem>
          )}
        </IonToolbar>
        <IonToolbar
          color="primary"
          className="in-toolbar md ion-color ion-color-primary hydrated"
        >
          <IonButtons
            className="ion-justify-content-center sc-IonButtons-md-h sc-IonButtons-md-s md hydrated"
            style={{ borderRadius: "5px" }}
          >
            <IonIcon
              icon={personAdd}
              // routerLink="/members/child/add"
              onClick={() => router.push("/members/child/add")}
              size="large"
              style={{ marginLeft: "10%" }}
              tabIndex={0}
              role="img"
              className="md icon-large hydrated"
              aria-label="person add"
            ></IonIcon>
            <IonIcon
              icon={alert}
              // routerLink="/members/alert"
              size="large"
              style={{ marginLeft: "10%" }}
              tabIndex={0}
              role="img"
              className="md icon-large hydrated"
              aria-label="alert"
              onClick={() =>
                router.push("/members/alert/vaccine-alert", "root")
              }
            ></IonIcon>
            <IonIcon
              icon={medkit}
              // routerLink="/members/doctor/clinic"
              size="large"
              style={{ marginLeft: "10%" }}
              tabIndex={0}
              role="img"
              className="md icon-large hydrated"
              aria-label="medkit"
              onClick={() => router.push("/members/doctor/clinic", "root")}
            ></IonIcon>
            <IonMenuButton
              style={{ marginLeft: "10%" }}
              aria-hidden="true"
              className="md button menu-button-hidden in-toolbar in-toolbar-color ion-activatable ion-focusable hydrated"
            ></IonMenuButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default Header;
