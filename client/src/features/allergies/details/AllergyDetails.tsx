import React from "react";
import { Button, Card} from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import AllergyListItemPatient from "./AllergyListItemPatient";

export default function AllergyDetails() {
  const { allergyStore } = useStore();
  const {
    selectedAllergy: allergy,
    openForm,
    cancelSelectedAllergy,
  } = allergyStore;

  if (!allergy) return <LoadingComponent />;

  return (
    <Card fluid>
      <AllergyListItemPatient patients={allergy.patients!} />
      <Card.Content>
        <Card.Header>{allergy.type}</Card.Header>
        <Card.Description>{allergy.causes}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            onClick={() => openForm(allergy.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={cancelSelectedAllergy}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
