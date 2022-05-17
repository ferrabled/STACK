import { EditAssetForm, SearchForm } from "components/Forms";
import { useEffect, useState } from "react";
import Page from "../page";
import { useNavigate } from "react-router-dom";
import { CallGetAsset, CallGetLastAssetEdited } from "components/wallet/contractCall";
import { ethers } from "ethers";
import { AssetEdited } from "types";
import PageLoged from "pages/pageCheckLogin";
import { Card } from "@mui/material";

const SearchAssetPage = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  }, []);

  return (
    <PageLoged>
        <Card className="my-3">
          <SearchForm />
        </Card>
    </PageLoged>
  );
};

export default SearchAssetPage;
