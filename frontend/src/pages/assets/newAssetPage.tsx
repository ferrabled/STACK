import { Card } from "@mui/material";
import { AssetForm } from "components/Forms";
import PageLoged from "pages/pageCheckLogin";

const NewAssetPage = () => {
  return (
    <PageLoged>
      <Card className="my-3">
        <AssetForm/>
      </Card>
    </PageLoged>
  );
};

export default NewAssetPage;