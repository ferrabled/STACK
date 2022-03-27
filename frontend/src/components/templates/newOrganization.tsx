import React from "react";

import { AdminFormValues, OrganizationFormValues } from "types";
/* import utils from "utils";
 */
import { Error } from "components/atoms";
import { OrganizationForm, OrganizationForm2, OrganizationForm3 } from "components/organisms";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Card } from "@mui/material";
import ButtonSOrganization from "components/atoms/Buttons/submitOrgButton";

const NewOrganization = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string>("");
  const handleSubmit = (values: AdminFormValues ) => {
    console.log("Obtenemos estos valores")
    console.log(values)
    /* const eventBody = utils.parsers.eventusFormValuesToEventus(values);
    eventApi
      .createEvent(eventBody)
      .then(() => {
        navigate("/events");
      })
      .catch((e) => {
        setError(e?.response?.data?.error ?? "");
      }); */
  };

  const handleSubmit2 = (values: OrganizationFormValues ) => {
    /* const eventBody = utils.parsers.eventusFormValuesToEventus(values);
    eventApi
      .createEvent(eventBody)
      .then(() => {
        navigate("/events");
      })
      .catch((e) => {
        setError(e?.response?.data?.error ?? "");
      }); */
  };

  return (
    <div >
      <Card className="my-3">
      <OrganizationForm onSubmit={handleSubmit} />
      {error && <Error error={error} />}
      </Card>
      <Card>
      <OrganizationForm2 onSubmit={handleSubmit2} />
      {error && <Error error={error} />}
      </Card>
      <Card className="my-3">
        <OrganizationForm3></OrganizationForm3>
      </Card>
      <ButtonSOrganization></ButtonSOrganization>
      
    </div>
  );
};

export default NewOrganization;
