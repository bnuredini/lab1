import { Formik, Form } from "formik";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { Vaccine } from "../../../app/models/vaccine";

export default observer(function VaccineForm() {
  const { vaccineStore } = useStore();
  const { selectedVaccine, closeForm, createVaccine, updateVaccine, loading } =
    vaccineStore;

  const initialState = selectedVaccine ?? {
    id: "",
    name: "",
    efficacy: "",
    creator: "",
    type: "",
  };

  const validationSchema = Yup.object({
    // patientId: Yup.number().required(),
    // date: Yup.string().required("Ju lutem vendosni nje date").nullable(),
    name: Yup.string().required(),
    efficacy: Yup.string().required(),
    creator: Yup.string().required(),
    type: Yup.string().required(),
  });
  const [test] = useState(initialState);

  function handleFormSubmit(vaccine: Vaccine) {
    test.id ? updateVaccine(vaccine) : createVaccine(vaccine);
  }

  return (
    <Segment clearing>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={test}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit}>
            <MyTextInput name="name" placeholder="Emri i vaksines" />
            <MyTextInput name="efficacy" placeholder="Efikasiteti i vaksines" />
            <MyTextInput name="creator" placeholder="Krijuesi i vaksines" />
            <MyTextInput name="type" placeholder="Lloji i vaksines" />
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
