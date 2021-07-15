import axios from "axios";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import agent from "../../../app/api/agent";
import { Test } from "../../../app/models/test";
import { useStore } from "../../../app/stores/store";

export default observer(function TestList() {
  const { userStore, testStore } = useStore();
  const { deleteTest, loading, testsByDate, testsByPatient } = testStore;
  const [target, setTarget] = useState("");
  const [testPatientID, setTestPatientID] = useState(null);

  function handleTestDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteTest(id);
  }

  // axios
  //   .get(`/tests/${test.id}`)
  //   .then((res) => {
  //     // if (res.data.appUser.id === userStore.user!.id) {}
  //     // console.log(res.data.id + "\t" + res.data.appUser.id);
  //     setTestPatientID(res.data.appUser.id);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // console.log(test.id + "\t" + test.appUser.id);
  {
    /* {testPatientID === userStore.user!.id ?? ( */
  }

  return (
    <Segment>
      <Item.Group divided>
        {testsByPatient.map((test: any) => {
          return (
            <Item key={test.id}>
              <Item.Content>
                <Item.Header as="a">{test.description}</Item.Header>
                <Item.Meta>
                  {format(test.date!, "dd.MM.yyyy, (h:mm aa)")}
                </Item.Meta>
                <Item.Extra>
                  <Button
                    onClick={() => testStore.selectTest(test.id)}
                    floated="right"
                    content="Shiko"
                    color="blue"
                  />
                  <Button
                    name={test.id}
                    loading={loading && target === test.id}
                    onClick={(e) => handleTestDelete(e, test.id)}
                    floated="right"
                    content="Fshij"
                    color="red"
                  />
                </Item.Extra>
              </Item.Content>
            </Item>
          );
        })}
      </Item.Group>
    </Segment>
  );
});
