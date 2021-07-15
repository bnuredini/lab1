import { observer } from 'mobx-react-lite';
import React from 'react';
import { Tab } from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';
import ProfileAbout from './ProfileAbout';
import ProfileAllergies from './ProfileAllergies';
import ProfileApplications from './ProfileApplications';
import ProfileChronicDiseases from './ProfileChronicDiseases';
import ProfileDoctors from './ProfileDoctors';
import ProfileDrugs from './ProfileDrugs';
import ProfileResults from './ProfileResults';
import ProfileTreatments from './ProfileTreatments';
import ProfileVaccines from './ProfileVaccines';

interface Props {
    profile: Profile;
}

export default observer(function ProfileContent({profile}: Props) {
    const {profileStore} = useStore();

    const panes = [
        {menuItem: 'Me shume', render: () => <ProfileAbout  />},
        {menuItem: 'Alergjite', render: () => <ProfileAllergies />},
        {menuItem: 'Semundjet Kronike', render: () => <ProfileChronicDiseases />},
        {menuItem: 'Vaksinat', render: () => <ProfileVaccines />},
        {menuItem: 'Rezultatet', render: () => <ProfileResults />},
        {menuItem: 'Doktoret', render: () => <ProfileDoctors />},
        {menuItem: 'Ilaqet', render: () => <ProfileDrugs />},
        {menuItem: 'Trajtimi', render: () => <ProfileTreatments />},
        {menuItem: 'Aplikimet per vaksine', render: () => <ProfileApplications />},
        ];

    return (
        <Tab 
            menu={{fluid: true, vertical: true}}
            menuPosition='right'
            panes={panes}
            onTabChange={(e, data) => profileStore.setActiveTab(data.activeIndex)}
        />
    )
})