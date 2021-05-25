import { Formik, Form, ErrorMessage, validateYupSchema } from "formik";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import * as Yup from  'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { variationOptions } from "../../../app/common/options/variationOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Test } from "../../../app/models/test";

export default observer(function TestForm() {
  const { testStore } = useStore();
  const { selectedTest, closeForm, createTest, updateTest, loading } =
    testStore;

  const initialState = selectedTest ?? {
    id: "",
    patientId: 0,
    date: null,
    description: "",
    hospitalId: 0,
    vaccineId: 0,
    variation: "",
  };

  const validationSchema=Yup.object({
  
    patientId: Yup.number().required(),
    date: Yup.string().required('Ju lutem vendosni nje date').nullable(),
    description: Yup.string().required(),
    hospitalId: Yup.number().required(),
    vaccineId: Yup.number().required(),
    variation: Yup.string().required()
  })
  const [test] = useState(initialState);

  function handleFormSubmit(test: Test) {
     test.id ? updateTest(test) : createTest(test);
   }

  

  return (
    <Segment clearing>
      <Formik 
      validationSchema={validationSchema}
      enableReinitialize 
      initialValues={test} 
      onSubmit={values =>  handleFormSubmit(values)}>        
      {({handleSubmit, isValid, isSubmitting, dirty}) => (
          <Form className='ui form' onSubmit={handleSubmit}>
            <MyTextInput name='patientId' placeholder='PatientID'/>
        <MyDateInput
          placeholderText="Date"
          name="date"
          showTimeSelect
          timeCaption='time'
          dateFormat='dd.MM.yyyy, (h:mm aa)'
        />
       
        <MyTextArea rows={3}
          placeholder="Description"
          name="description"
        />
     
          <MyTextInput
            placeholder="Hospital ID"
            name="hospitalId"
          />
          <MyTextInput
            placeholder="Vaccine ID"
            name="vaccineId"
          />
        <MySelectInput options={variationOptions}
          placeholder="Variation"
          name="variation"
        />
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
