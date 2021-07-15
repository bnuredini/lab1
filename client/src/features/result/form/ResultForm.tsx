import { Formik, Form } from "formik";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { Result } from "../../../app/models/results";
import MyDateInput from "../../../app/common/form/MyDateInput";

export default observer(function ResultForm() {
  const { resultStore } = useStore();
  const { selectedResult, closeForm, createResult, updateResult, loading } =
    resultStore;

  const initialState = selectedResult ?? {
    id: "",
    result: "",
    testName: "",
    date: null,
  };

  const validationSchema = Yup.object({
    result: Yup.string().required(),
    testName: Yup.string().required(),
    date: Yup.string().required("Ju lutem vendosni nje date").nullable(),
  });
  const [result] = useState(initialState);

  function handleFormSubmit(result: Result) {
    result.id ? updateResult(result) : createResult(result);
  }

  return (
    <Segment clearing>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={result}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit}>
            <MyTextInput name="result" placeholder="Rezultati" />
            <MyTextInput name="testName" placeholder="Emri Testit" />
            <MyDateInput
              placeholderText="Data"
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
