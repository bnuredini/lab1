import { Formik, Form } from "formik";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";
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
    date: null,
    description: "",
    result: "",
    patient: null,
  };

  const validationSchema = Yup.object({
    // patientId: Yup.number().required(),
    date: Yup.string().required("Ju lutem vendosni nje date").nullable(),
    description: Yup.string().required(),
  });

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
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit}>
            {/* <MyTextInput name="patientId" placeholder="ID e Pacientit" /> */}
            <MyDateInput
              placeholderText="Data"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat="dd.MM.yyyy, (h:mm aa)"
            />
            <MyTextArea rows={3} placeholder="Pershkrimi" name="description" />
            <MyTextArea rows={3} placeholder="Rezultati" name="result" />
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
