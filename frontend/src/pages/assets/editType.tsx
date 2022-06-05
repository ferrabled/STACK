import { Button, Card } from "@mui/material";
import
  {
    CloudForm,
    DataForm,
    DocumentForm,
    HardwareForm,
    NetworkForm,
    OtherForm,
    SoftwareForm
  } from "components/Forms/formTypes";
import
  {
    CallGetCloudAsset,
    CallGetDataAsset,
    CallGetDocAsset,
    CallGetHardwareAsset,
    CallGetNetworkAsset,
    CallGetOtherAsset,
    CallGetSoftwareAsset
  } from "components/wallet/dataStructsCall";
import PageLoged from "pages/pageCheckLogin";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CloudAssetProps, DataAssetProps, DocAssetProps, HardwareAssetProps, NetworkAssetProps, OtherAssetProps, SoftwareAssetProps } from "types";

type AssetType = 
  (SoftwareAssetProps | HardwareAssetProps
    | DocAssetProps | DataAssetProps
    | NetworkAssetProps | CloudAssetProps | OtherAssetProps);

const EditTypePage = () =>
{
  const [data, setData] = useState<AssetType|null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const typeNumber = Number(useParams().id);
  const assetId = Number(window.sessionStorage.getItem("detailId"));

  useEffect(() =>
  {
    switch (typeNumber)
    {
      case 0:
        CallGetSoftwareAsset(assetId).then((r) =>
        {
          setData(r);
          console.log(r);
          setIsLoading(false);
        });
        break;
      case 1:
        CallGetHardwareAsset(assetId).then((r) =>
        {
          setData(r);
          setIsLoading(false);
        });
        break;
      case 2:
        CallGetDocAsset(assetId).then((r) =>
        {
          setData(r);
          setIsLoading(false);
        });
        break;
      case 3:
        CallGetDataAsset(assetId).then((r) =>
        {
          setData(r);
          setIsLoading(false);
        });
        break;
      case 4:
        CallGetNetworkAsset(assetId).then((r) =>
        {
          setData(r);
          setIsLoading(false);
        });
        break;
      case 5:
        CallGetCloudAsset(assetId).then((r) =>
        {
          setData(r);
          setIsLoading(false);
        });
        break;
      case 6:
        CallGetOtherAsset(assetId).then((r) =>
        {
          setData(r);
          setIsLoading(false);
        });
        break;
    }
  }, []);

  return (
    <PageLoged>
      {!isLoading && data && (
        <Card className="my-3">
          <div className="flex flex-col m-6">
            {typeNumber === 0 && <SoftwareForm asset={data as SoftwareAssetProps} edit />}
            {typeNumber === 1 && <HardwareForm asset={data as HardwareAssetProps} edit />}
            {typeNumber === 2 && <DocumentForm asset={data as DocAssetProps } edit />}
            {typeNumber === 3 && <DataForm asset={data} edit />}
            {typeNumber === 4 && <NetworkForm asset={data} edit />}
            {typeNumber === 5 && <CloudForm asset={data} edit />}
            {typeNumber === 6 && <OtherForm asset={data} edit />}
            <div className="lg:mx-56 xl:mx-64 2xl:mx-80 2xl:gap-40 flex flex-row gap-24 items-center justify-center">
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() =>
                {
                  window.history.back();
                }}
              >
                Atrás
              </Button>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                form="form1"
              >
                Guardar
              </Button>
            </div>
          </div>
        </Card>
      )}
    </PageLoged>
  );
};

export default EditTypePage;
