import { Button, Card, Skeleton, Typography } from "@mui/material";
import { LicencesModal } from "components/atoms/Modals";
import AddLicenceModal from "components/atoms/Modals/addLicenceModal";
import {
  CallGetCloudAsset,
  CallGetDataAsset,
  CallGetDocAsset,
  CallGetHardwareAsset,
  CallGetNetworkAsset,
  CallGetOtherAsset,
  CallGetSoftwareAsset,
} from "components/wallet/dataStructsCall";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HardwareTypes,
  SoftwareTypes,
  DocTypes,
  SoftwareAssetProps,
  HardwareAssetProps,
  DocAssetProps,
  DataAssetProps,
  NetworkAssetProps,
  CloudAssetProps,
  OtherAssetProps,
} from "types";

const AssetTypeCard = (props: { assetId: number; assetType: number }) => {
  const [data, setData] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const assetId = props.assetId;
    console.log("ASSett types " + props.assetType);
    switch (props.assetType) {
      case 0:
        CallGetSoftwareAsset(assetId).then((r) => {
          setData(r);
          setIsLoading(false);
        });
        break;
      case 1:
        CallGetHardwareAsset(assetId).then((r) => {
          setData(r);
          setIsLoading(false);
        });
        break;
      case 2:
        CallGetDocAsset(assetId).then((r) => {
          setData(r);
          setIsLoading(false);
        });
        break;
      case 3:
        CallGetDataAsset(assetId).then((r) => {
          console.log(r);
          setData(r);
          setIsLoading(false);
        });
        break;
      case 4:
        CallGetNetworkAsset(assetId).then((r) => {
          setData(r);
          setIsLoading(false);
        });
        break;
      case 5:
        CallGetCloudAsset(assetId).then((r) => {
          setData(r);
          setIsLoading(false);
        });
        break;
      case 6:
        CallGetOtherAsset(assetId).then((r) => {
          setData(r);
          setIsLoading(false);
          console.log("cargado");
        });
        break;
    }
    console.log(data);
  }, []);

  const SoftwareCard = () => {
    const asset = data as SoftwareAssetProps;
    const [showLicenceModal, setShowLicenceModal] = useState(false);
    const [showAddLicenceModal, setShowAddLicenceModal] = useState(false);

    return (
      <div className="flex flex-col mb-5">
        <div className="flex flex-row justify-between content-evenly">
          <Typography variant="h6">Versión</Typography>
          <Typography variant="h6">{asset.version}</Typography>
        </div>
        <div className="flex flex-row justify-between content-evenly">
          <Typography variant="h6">Proveedor</Typography>
          <Typography variant="h6">{asset.provider}</Typography>
        </div>
        <div className="flex flex-row justify-between content-evenly">
          <Typography variant="h6">Tipo</Typography>
          <Typography variant="h6">{SoftwareTypes[asset.stype]}</Typography>
        </div>
        <div>
          <div className="flex flex-row justify-between content-evenly mt-3">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setShowLicenceModal(true)}
            >
              licencias
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setShowAddLicenceModal(true)}
            >
              Añadir
            </Button>
          </div>

          <LicencesModal
            show={showLicenceModal}
            close={() => setShowLicenceModal(false)}
            assetId={props.assetId}
          />
          <AddLicenceModal
            show={showAddLicenceModal}
            close={() => setShowAddLicenceModal(false)}
            assetId={props.assetId}
          />
        </div>
      </div>
    );
  };

  const HardwareCard = () => {
    const asset = data as HardwareAssetProps;
    return (
      <div className="flex flex-col mb-5">
        <div className="flex flex-row justify-between content-evenly">
          <Typography variant="h6">Modelo</Typography>
          <Typography variant="h6">{asset.model}</Typography>
        </div>
        <div className="flex flex-row justify-between content-evenly">
          <Typography variant="h6">Proveedor</Typography>
          <Typography variant="h6">{asset.provider}</Typography>
        </div>
        <div className="flex flex-row justify-between content-evenly">
          <Typography variant="h6">Número de serie</Typography>
          <Typography variant="h6">{asset.serialNumber}</Typography>
        </div>
        <div className="flex flex-row justify-between content-evenly">
          <Typography variant="h6">Tipo</Typography>
          <Typography variant="h6">{HardwareTypes[asset.htype]}</Typography>
        </div>
      </div>
    );
  };

  const DocumentCard = () => {
    const asset = data as DocAssetProps;
    return (
      <div className="flex flex-col mb-5">
        <div className="flex flex-row justify-between content-evenly">
          <Typography variant="h6">Descripción</Typography>
          <Typography variant="h6">{asset.name}</Typography>
        </div>
        <div className="flex flex-row justify-between content-evenly">
          <Typography variant="h6">Localización</Typography>
          <Typography variant="h6">{asset.location}</Typography>
        </div>
        <div className="flex flex-row justify-between content-evenly">
          <Typography variant="h6">Tipo</Typography>
          <Typography variant="h6">{DocTypes[asset.doctype]}</Typography>
        </div>
      </div>
    );
  };

  const DataCard = () => {
    const asset = data as DataAssetProps;
    return (
      <div className="flex flex-col mb-5">
        <div className="flex flex-row justify-between content-evenly">
          <Typography variant="h6">Localización</Typography>
          <Typography variant="h6">{asset.location}</Typography>
        </div>
        <div className="flex flex-row justify-between content-evenly">
          <Typography variant="h6">Datos Locales</Typography>
          <Typography variant="h6">{asset.local ? "Sí" : "No"}</Typography>
        </div>
      </div>
    );
  };

  const NetworkCard = () => {
    const asset = data as NetworkAssetProps;
    return (
      <div className="flex flex-col mb-5">
        <div className="flex flex-row justify-between content-evenly">
          <Typography variant="h6">Bloque CIDR</Typography>
          <Typography variant="h6">{asset.cidrblock}</Typography>
        </div>
        <div className="flex flex-row justify-between content-evenly">
          <Typography variant="h6">NAT</Typography>
          <Typography variant="h6">{asset.nat ? "Sí" : "No"}</Typography>
        </div>
      </div>
    );
  };

  const CloudCard = () => {
    const asset = data as CloudAssetProps;
    return (
      <div className="flex flex-col mb-5">
        <div className="flex flex-row justify-between content-evenly">
          <Typography variant="h6">URL</Typography>
          <Typography variant="h6">{asset.url}</Typography>
        </div>
        <div className="flex flex-row justify-between content-evenly">
          <Typography variant="h6">Dominio</Typography>
          <Typography variant="h6">{asset.domain}</Typography>
        </div>
      </div>
    );
  };

  const OtherCard = () => {
    const asset = data as OtherAssetProps;
    return (
      <div className="flex flex-col mb-5">
        <div className="flex flex-row justify-between content-evenly">
          <Typography variant="h6">description</Typography>
          <Typography variant="h6">{asset.description}</Typography>
        </div>
      </div>
    );
  };

  return (
    <>
      {!isLoading && (
        <Card className="p-5 m-5 w-1/2">
          {
            {
              0: <SoftwareCard />,
              1: <HardwareCard />,
              2: <DocumentCard />,
              3: <DataCard />,
              4: <NetworkCard />,
              5: <CloudCard />,
              6: <OtherCard />,
            }[Number(props.assetType)]
          }
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate("/asset/type/" + Number(props.assetType) + "/edit");
            }}
          >
            Editar tipo
          </Button>
        </Card>
      )}
      {isLoading && (
        <Card className="p-5 m-5 w-1/2">
          <div className="w-full">
            <div className="my-2">
              <Skeleton height={30} />
            </div>
            <div className="my-2">
              <Skeleton height={30} />
            </div>
            <div className="my-2">
              <Skeleton height={30} />
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default AssetTypeCard;
