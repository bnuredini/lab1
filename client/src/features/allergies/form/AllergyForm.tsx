import { Formik, Form } from "formik";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { Allergy } from "../../../app/models/allergy";

export default observer(function AllergyForm() {
  const { allergyStore } = useStore();
  const { selectedAllergy, closeForm, createAllergy, updateAllergy, loading } =
    allergyStore;

  const initialState = selectedAllergy ?? {
    id: "",
    type: "",
    causes: "",
  };

  const validationSchema = Yup.object({
    type: Yup.string().required(),
    causes: Yup.string().required(),
  });
  const [allergy] = useState(initialState);

  function handleFormSubmit(allergy: Allergy) {
    allergy.id ? updateAllergy(allergy) : createAllergy(allergy);
  }

  return (
    <Segment clearing>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={allergy}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit}>
            <MyTextInput name="type" placeholder="Lloji i alergjise" />
            <MyTextInput name="causes" placeholder="Shkaktari i alergjise" />
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
