import { Formik, Form } from "formik";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { Variation } from "../../../app/models/variation";

export default observer(function VariationForm() {
  const { variationStore } = useStore();
  const { selectedVariation, closeForm, createVariation, updateVariation, loading } =
  variationStore;

  const initialState = selectedVariation ?? {
    id: "",
    name: ""
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(),
  });
  const [variation] = useState(initialState);

  function handleFormSubmit(variation: Variation) {
    variation.id ? updateVariation(variation) : createVariation(variation);
  }

  return (
    <Segment clearing>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={variation}
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
