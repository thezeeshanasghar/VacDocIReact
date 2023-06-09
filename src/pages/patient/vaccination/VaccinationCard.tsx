import React from "react";
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
  IonPage,
  IonContent,
} from "@ionic/react";
import { calendarOutline, documentTextOutline } from "ionicons/icons";
import syringImage from "../../../assets/injectionFilled.png";
import Header from "../../../components/header/Header";
const VaccinationCard: React.FC = () => {
  return (
    <IonPage>
        <IonContent>
          <Header pageName="Vaccination" />
          <div className="ng-star-inserted">
            <IonGrid className="md hydrated">
              <IonRow className="md hydrated">
                <IonCol style={{ textAlign: "center" }} className="md hydrated">
                  Aug 26, 2022
                  <IonImg
                    src={syringImage}
                    style={{ height: "15px", display: "inline-block",margin: "0px 10px"  }}
                    className="ng-star-inserted md hydrated"
                  />
                  <IonIcon
                    color="primary"
                    icon={documentTextOutline}
                    size="small"
                    style={{ marginRight: "10px" }}
                    className="ng-star-inserted md ion-color ion-color-primary icon-small hydrated"
                  />
                  <IonIcon
                    color="primary"
                    icon={calendarOutline}
                    className="md ion-color ion-color-primary hydrated"
                    aria-label="calendar"
                  />
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonCard className="md hydrated">
              <IonCardContent className="md card-content-md hydrated">
                <div className="ng-star-inserted">
                  <IonItem
                    lines="none"
                    className="item md item-lines-none ion-focusable item-label hydrated"
                  >
                    <IonLabel className="sc-ion-label-md-h sc-ion-label-md-s md hydrated">
                      BCG
                    </IonLabel>
                    <p
                      style={{ color: "rgb(55, 231, 10)" }}
                      className="ng-star-inserted"
                    >
                      Aug 26, 2022
                    </p>
                    <IonImg
                      src={syringImage}
                      style={{ height: "30px" }}
                      className="ng-star-inserted md hydrated"
                    />
                  </IonItem>
                </div>
                <div className="ng-star-inserted">
                  <IonItem
                    lines="none"
                    className="item md item-lines-none ion-focusable item-label hydrated"
                  >
                    <IonLabel className="sc-ion-label-md-h sc-ion-label-md-s md hydrated">
                      Hepatitis B #1
                    </IonLabel>
                    <p
                      style={{ color: "rgb(55, 231, 10)" }}
                      className="ng-star-inserted"
                    >
                      Aug 26, 2022
                    </p>
                    <IonImg
                      src={syringImage}
                      style={{ height: "30px" }}
                      className="ng-star-inserted md hydrated"
                    />
                  </IonItem>
                </div>
                <div className="ng-star-inserted">
                  <IonItem
                    lines="none"
                    className="item md item-lines-none ion-focusable item-label hydrated"
                  >
                    <IonLabel className="sc-ion-label-md-h sc-ion-label-md-s md hydrated">
                      OPV #1
                    </IonLabel>
                    <p
                      style={{ color: "rgb(55, 231, 10)" }}
                      className="ng-star-inserted"
                    >
                      Aug 26, 2022
                    </p>
                    <IonImg
                      src={syringImage}
                      style={{ height: "30px" }}
                      className="ng-star-inserted md hydrated"
                    />
                  </IonItem>
                </div>
              </IonCardContent>
            </IonCard>
          </div>
        </IonContent>
    </IonPage>
  );
};

export default VaccinationCard;
