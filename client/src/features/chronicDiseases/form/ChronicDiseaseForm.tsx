import { Formik, Form } from "formik";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { ChronicDisease } from "../../../app/models/chronicDisease";

export default observer(function ChronicDiseaseForm() {
  const { chronicDiseaseStore } = useStore();
  const { selectedChronicDisease, closeForm, createChronicDisease, updateChronicDisease, loading } =
  chronicDiseaseStore;

  const initialState = selectedChronicDisease ?? {
    id: "",
    name: ""
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(),
  });
  const [chronicDisease] = useState(initialState);

  function handleFormSubmit(chronicDisease: ChronicDisease) {
    chronicDisease.id ? updateChronicDisease(chronicDisease) : createChronicDisease(chronicDisease);
  }

  return (
    <Segment clearing>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={chronicDisease}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit}>
            <MyTextInput placeholder="Emri i variacionit" name="name" />
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
