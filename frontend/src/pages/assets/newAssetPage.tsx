import Page from "../page";
import { Card } from "@mui/material";
import { AssetForm } from "components/Forms";

const NewAssetPage = () => {
  return (
    <Page title="">
      <Card className="my-3">
        <AssetForm/>
      </Card>
    </Page>
  );
};

export default NewAssetPage;