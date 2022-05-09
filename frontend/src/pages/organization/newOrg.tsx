import Page from "../page";
import { OrganizationForm } from "components/organisms";
import { Card } from "@mui/material";

const NewOrganizationPage = () => {
  return (
    <Page>
      <Card className="my-3">
        <OrganizationForm />
      </Card>
    </Page>
  );
};

export default NewOrganizationPage;