import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Test } from "../../../app/models/test";
import { useStore } from "../../../app/stores/store";

export default observer(function TestForm() {
  const { testStore } = useStore();
  const {
    selectedTest,
    closeForm,
    createTest,
    updateTest,
    loading,
  } = testStore;

  const initialState = selectedTest ?? {
    id: "",
    patientId: 0,
    date: "",
    description: "",
    hospitalId: 0,
    vaccineId: 0,
    variation: "",
  };

  const [test, setTest] = useState(initialState);

  function handleSubmit() {
    test.id ? updateTest(test) : createTest(test);
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setTest({ ...test, [name]: value });
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          placeholder="Patient ID"
          value={test.patientId}
          name="title"
          onChange={handleInputChange}
        />
        <Form.Input
          type="date"
          placeholder="Date"
          value={test.date}
          name="date"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Description"
          value={test.description}
          name="description"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Hospital ID"
          value={test.hospitalId}
          name="hospitalId"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Vaccine ID"
          value={test.vaccineId}
          name="vaccineId"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Variation"
          value={test.variation}
          name="variation"
          onChange={handleInputChange}
        />
        <Button
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
    </Segment>
  );
});
