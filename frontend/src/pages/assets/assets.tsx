import AssetsCard from "components/atoms/Cards/assetsCard";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { Button, Card, CircularProgress, Typography } from "@mui/material";
import {
  CallGetAsset,
  CallGetOrganizationAssets,
} from "components/wallet/contractCall";
import { AssetsInList, AssetTypes } from "types";
import PageLoged from "pages/pageCheckLogin";
import {
  CallGetAllDepartmentsFromOrg,
  CallGetNumberOfCommentsByAsset,
} from "components/wallet/userCall";

const AssetsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [assets, setAssets] = useState<AssetsInList[]>([]);
  const navigate = useNavigate();
  const [departNames, setDepartNames] = useState<string[]>();
  const [numComments, setNumComments] = useState<number[]>();

  useEffect(() => {
    const idOrg = Number(localStorage.getItem("idOrg"));

    const getDepartmentNames = () => {
      CallGetAllDepartmentsFromOrg(idOrg).then((r) => {
        const cont = r.length;
        const container: string[] = ["Sin departamento"];
        for (let i = 0; i < cont; i++) {
          container.push(r[i].name);
        }
        setDepartNames(container);
      });
    };

    const GetAssets = () => {
      CallGetOrganizationAssets(idOrg).then(async (response) => {
        const [assets, assetsEdited] = response;
        const cont = assets.length;
        const contEdit = assetsEdited.length;
        const container: AssetsInList[] = [];
        //let object = new container;
        console.log(assets,assetsEdited);
        for (let i = 0; i < cont; i++) {
          const asset: AssetsInList = {
            name: assets[i].name,
            assetType: assets[i].assetType,
            assetDepart: Number(assets[i].assetDepart),
            assetTS: AssetTypes[assets[i].assetType],
            creationDate: Number(assets[i].creationDate),
            adquireDate: Number(assets[i].adquireDate),
            originalId: Number(assets[i].index),
            index: Number(assets[i].index),
          };
          if (asset.creationDate === 0 && asset.adquireDate === 0) continue;
          else {
            container.push(asset);
          }
        }
        for (let o = 0; o < contEdit; o++) {
          const originalAsset = await CallGetAsset(
            assetsEdited[o].originalAssetId
          );
          console.log("depart" + Number(originalAsset.assetDepart));
          const asset: AssetsInList = {
            name: assetsEdited[o].name,
            assetType: assetsEdited[o].assetType,
            assetTS: AssetTypes[assetsEdited[o].assetType],
            assetDepart: Number(originalAsset.assetDepart),
            creationDate: Number(assetsEdited[o].creationDate),
            adquireDate: Number(assetsEdited[o].adquireDate),
            originalId: Number(assetsEdited[o].originalAssetId),
            index: Number(assetsEdited[o].index),
          };
          if (asset.creationDate === 0 && asset.adquireDate === 0) continue;
          else {
            console.log("Añadido");
            console.log(asset);
            container.push(asset);
          }
        }
        const commentCont: number[] = [];
        Promise.all(
          container.map((e) => {
            return CallGetNumberOfCommentsByAsset(e.originalId).then((r) => {
              commentCont.push(Number(r));
            });
          })
        ).then(() => {
          setIsLoading(false);
          setNumComments(commentCont);
          setAssets(container);
        });
      });
    };

    // Ethers login
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    signer
      .getAddress()
      .then((addr) => {
        console.log(addr);
        if (!addr) {
          //navigate("/login");
        } else {
          // hacer request a contrato
          getDepartmentNames();
          GetAssets();
        }
      })
      .catch(() => {
        //navigate("/login");
      });
  }, []);

  if (isLoading === true)
    return (
      <PageLoged>
        <CircularProgress />
      </PageLoged>
    );
  else
    return (
      <PageLoged>
        <div className="my-5">
          <Typography variant="h5">Todos los activos</Typography>
        </div>
        {assets.length !== 0 && (
          <div className="min-h-full h-full">
            <AssetsCard
              props={assets}
              departNames={departNames}
              numComments={numComments}
            />
          </div>
        )}
        {assets.length == 0 && (
          <Card>
            <div className="mx-5 mt-5 mb-10 min-h-full h-full">
              <div className="my-8 mx-48">
                <Typography>
                  Aún no hay activos creados en esta organización. Pulsa en el
                  botón &quot;Nuevo Activo&quot; para crear tu primer activo.
                </Typography>
                <div className="m-2"></div>
                <Typography align="center">
                  Añadir nuevos activos a una organización permite llevar un
                  control sobre ellos.
                </Typography>
              </div>
              <div className="w-full flex flex-row justify-evenly mb-5">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => window.history.back()}
                >
                  {" "}
                  Atrás{" "}
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => navigate("/assets/new")}
                >
                  Nuevo Activo
                </Button>
              </div>
            </div>
          </Card>
        )}
      </PageLoged>
    );
};

export default AssetsPage;
