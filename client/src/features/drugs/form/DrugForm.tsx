import { Formik, Form } from "formik";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { Drug } from "../../../app/models/drug";

export default observer(function DrugForm() {
  const { drugStore } = useStore();
  const { selectedDrug, closeForm, createDrug, updateDrug, loading } =
    drugStore;

  const initialState = selectedDrug ?? {
    id: "",
    name: "",
    type: "",
    sideEffects: "",
    description: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    type: Yup.string().required(),
    sideEffects: Yup.string().required(),
    description: Yup.string().required(),
  });
  const [test] = useState(initialState);

  function handleFormSubmit(drug: Drug) {
    test.id ? updateDrug(drug) : createDrug(drug);
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
            <MyTextInput name="name" placeholder="Emri i medikamentit" />
            <MyTextInput name="type" placeholder="Lloji i medikamentit " />
            <MyTextInput name="sideEffects" placeholder="Efektet anesore" />
            <MyTextInput name="description" placeholder="Pershkrimi" />
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
