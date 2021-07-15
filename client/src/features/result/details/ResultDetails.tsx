import React from "react";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ResultListItemPatient from "./ResultListItemPatient";

export default function ResultDetails() {
  const { resultStore } = useStore();
  const {
    selectedResult: result,
    openForm,
    cancelSelectedResult,
  } = resultStore;

  if (!result) return <LoadingComponent />;

  return (
    <Card fluid>
      <ResultListItemPatient patients={result.patients!} />
      <Card.Content>
        <Card.Header>{result.result}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            onClick={() => openForm(result.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={cancelSelectedResult}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
