import { Formik, Form } from "formik";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Treatment } from "../../../app/models/treatment";

export default observer(function TreatmentForm() {
  const { treatmentStore } = useStore();
  const { selectedTreatment, closeForm, createTreatment, updateTreatment, loading } =
    treatmentStore;

  const initialState = selectedTreatment ?? {
    id: "",
    description: "",
    patient: "",
    doctor: "",
    date: null,
  };

  const validationSchema = Yup.object({
    description: Yup.string().required(),
    patient: Yup.string().required(),
    doctor: Yup.string().required(),
    date: Yup.string().required("Ju lutem vendosni daten").nullable(),
  });
  const [treatment] = useState(initialState);

  function handleFormSubmit(treatment: Treatment) {
    treatment.id ? updateTreatment(treatment) : createTreatment(treatment);
  }

  return (
    <Segment clearing>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={treatment}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit}>
            <MyTextInput name="description" placeholder="Pershkrimi i tretmanit" />
            <MyTextInput name="patient" placeholder="Pacienti " />
            <MyTextInput name="doctor" placeholder="Doktori " />
            <MyDateInput
              placeholderText="Data e fillimit"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat="dd.MM.yyyy, (h:mm aa)"
            />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Ruaj"
            />
            <Button
              onClick={closeForm}
              floated="right"
              type="button"
              content="Anulo"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
