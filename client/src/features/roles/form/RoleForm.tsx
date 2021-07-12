import { Formik, Form } from "formik";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { Role } from "../../../app/models/role";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { isAdminOptions } from "../../../app/common/options/isAdminOptions";

export default observer(function RoleForm() {
  const { roleStore } = useStore();
  const { selectedRole, closeForm, createRole, updateRole, loading } =
    roleStore;

  const initialState = selectedRole ?? {
    id: "",
    roleName: "",
    responsibility: "",
    isAdmin: false,
  };

  const validationSchema = Yup.object({
    roleName: Yup.string().required(),
    responsibility: Yup.string().required(),
    isAdmin: Yup.string().required(),
  });
  const [role] = useState(initialState);

  function handleFormSubmit(role: Role) {
    role.id ? updateRole(role) : createRole(role);
  }

  return (
    <Segment clearing>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={role}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit}>
            <MyTextInput name="roleName" placeholder="Emri i rolit" />
            <MyTextInput name="responsibility" placeholder="Pergjegjsija e rolit" />
            <MySelectInput
              options={isAdminOptions}
              placeholder="A eshte admin"
              name="isAdmin"
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
