import { observer } from "mobx-react-lite";
import React, {useState } from "react";
import { Button,Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import * as Yup from  'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Formik, Form, ErrorMessage} from "formik";
import { genderOptions } from "../../../app/common/options/genderOptions";
import { Patient } from "../../../app/models/patient";

export default observer(function PatientForm() {
  const { patientStore } = useStore();
  const { createPatient, selectedPatient, closeForm, updatePatient, loading} = patientStore;
   
  
  const initialState = selectedPatient ?? {
    id: "",
    full_Name: "",
    birthday: null,
    gender: "",
    phone_Number:0,
    email: "",
    address:"",
    
  };

  const validationSchema=Yup.object({
  
    full_Name: Yup.string().required(),
    birthday: Yup.string().required('Ju lutem vendosni ditelindjen').nullable(),
    gender: Yup.string().required(),
    phone_Number: Yup.number().required(),
    email: Yup.string().required(),
    address: Yup.string().required()
    
  })
  const [patient] = useState(initialState);

  function handleFormSubmit(patient: Patient) {
     patient.id ? updatePatient(patient) : createPatient(patient);
   }


  return (
    <Segment clearing>
      <Formik 
      validationSchema={validationSchema}
      enableReinitialize
      initialValues={patient}
      onSubmit={values => handleFormSubmit(values)}>
        {({handleSubmit, isValid, isSubmitting, dirty}) =>(
    <Form  className='ui form' onSubmit={handleSubmit} >
<MyTextInput  name="Emri dhe Mbiemri" placeholder="Full_Name"/>
<MyDateInput
          placeholderText="Ditelindja"
          name="date"
          showTimeSelect
          timeCaption='time'
          dateFormat='dd.MM.yyyy, (h:mm aa)'
        />
<MySelectInput options={genderOptions} placeholder="Gjinia" name="gender"/>
<MyTextInput placeholder="Numri i telefonit" name="phone_Number"/>
<MyTextInput placeholder="Email-i" name="email"/>
<MyTextInput
  placeholder="Adresa" name="address"/>
<Button
disabled={isSubmitting || !dirty || !isValid}
  loading={loading}
  floated="right"
  positive
  type="submit"
  content="Submit"
/>
<Button
 onClick={closeForm}
  to="/patients"
  floated="right"
  type="button"
  content="Cancel"
/>
</Form>
        )}
      </Formik>
      
    </Segment>
  );
});
