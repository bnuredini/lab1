import { observer } from 'mobx-react-lite';
import React from 'react';
import { Tab } from 'semantic-ui-react';
import PatientListx from '../patients/dashboard/PatientListx';

export default observer(function ProfileContent() {

    const panes = [
        {menuItem: 'Te dhenat personale', render: () => <Tab.Pane><PatientListx/></Tab.Pane>},
        // {menuItem: 'Photos', render: () => <ProfilePhotos profile={profile} />},
        {menuItem: 'Testet', render: () => <Tab.Pane>Testet</Tab.Pane>},
        {menuItem: 'Vaksinat', render: () => <Tab.Pane>Vaksinat</Tab.Pane>},
        {menuItem: 'Semundjet kronike', render: () => <Tab.Pane>Semundjet kronike</Tab.Pane>},
    ];
  

    return (
        <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
    )
})