import { Card } from "@mui/material";
import { SearchForm } from "components/Forms";
import PageLoged from "pages/pageCheckLogin";

const SearchAssetPage = () => {

  return (
    <PageLoged>
      <Card className="my-3">
        <SearchForm />
      </Card>
    </PageLoged>
  );
};

export default SearchAssetPage;
