import React, { useState } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel } from '@ionic/react';
import { IDoctorSchedule } from './DoctorScheduleCardList';
import { format } from 'date-fns';
import MyDatePicker from '../../components/datepicker/MyDatePicker';
interface ScheduleCardProps {
  date: string;
  data: IDoctorSchedule[];
}

const DoctorScheduleCard: React.FC<ScheduleCardProps> = ({ date, data }) => {
    
  const [selectedDate, setSelectedDate] = useState<string>("");
  return (
      <IonCard>
        <IonCardHeader>
                <IonItem>
                    <IonCardTitle style={{marginRight: '20px'}}>
                      {format(new Date(date), "dd MMMM yyyy")}
                    </IonCardTitle>
                    <MyDatePicker
                      selectedDate={selectedDate}
                      onDateSelected={setSelectedDate}
                    />
                </IonItem>
              </IonCardHeader>
          <IonCardContent>
            {data.map((item : IDoctorSchedule) => (
              <div key={item.Id}>
                <IonItem>
                    <p>Doctor Id :{item.DoctorId}</p> &nbsp; &nbsp;
                    <p>Dose Id : {item.DoseId}</p> &nbsp; &nbsp;
                    <p>Date : {format(new Date(item.Date), "dd MMMM yyyy")}</p>
                </IonItem>
                {/* Render other data fields here */}
              </div>
            ))}
          </IonCardContent>
      </IonCard>
  );
};

export default DoctorScheduleCard;
