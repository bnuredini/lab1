import { Formik, Form } from "formik";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { PrivateCenter } from "../../../app/models/privateCenter";

export default observer(function PrivateCenterForm() {
  const { privateCenterStore } = useStore();
  const { selectedPrivateCenter, closeForm, createPrivateCenter, updatePrivateCenter, loading } =
  privateCenterStore;

  const initialState = selectedPrivateCenter ?? {
    id: "",
    name: "",
    location: ""
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    location: Yup.string().required() 
  });
  const [privateCenter] = useState(initialState);

  function handleFormSubmit(privateCenter: PrivateCenter) {
    privateCenter.id ? updatePrivateCenter(privateCenter) : createPrivateCenter(privateCenter);
  }

  return (
    <Segment clearing>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={privateCenter}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit}>
            <MyTextInput placeholder="Emri i qendres" name="name" />
            <MyTextInput placeholder="Lokacioni i qendres" name="location" />
            
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
