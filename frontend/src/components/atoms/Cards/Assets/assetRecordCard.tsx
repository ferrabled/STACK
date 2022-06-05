import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button, Card, CircularProgress, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  CallDeleteAsset,
  CallGetIsAssetEdited,
} from "components/wallet/contractCall";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AssetsInList, GridTableElement } from "types";
import { formatDate } from "utils";

const AssetRecordCard = ({ assets }: { assets: AssetsInList[] }) => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<GridTableElement<AssetsInList>[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const onClickDelete = () => {
    console.log("Eliminamos el activo: ");
    try {
      const id = window.sessionStorage.getItem("detailId");
      console.log("delete original asset:" + id);
      CallDeleteAsset(Number(id));
      //TODO NAVIGATE AFTER DELETING
      //navigate("/assets");
    } catch {
      console.log("User reverted transaction");
    }
  };

  const onClickEdit = () => {
    const originalId = Number(window.sessionStorage.getItem("detailId"));
    CallGetIsAssetEdited(originalId).then((response) => {
      if (response) {
        sessionStorage.setItem("isEdited", String(true));
        sessionStorage.setItem("editId", String(originalId));
      } else {
        sessionStorage.setItem("isEdited", String(false));
        sessionStorage.setItem("editId", String(originalId));
      }
      navigate("/asset/edit");
    });
  };

  useEffect(() => {
    const FormatData = () => {
      console.log("Recibimos los datos");
      console.log(assets);
      const assetsList = assets.map((x, i) => ({ ...x, id: i }));
      setRows(assetsList);
      setIsLoading(false);
    };
    FormatData();
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "First name", width: 130 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 100,
      renderCell: (params) => {
        const onClickDetails: MouseEventHandler = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          console.log(params.row.originalId);
          const originalId = params.row.originalId;
          if (params.row.id == 0) {
            window.sessionStorage.setItem("record", "o");
            sessionStorage.setItem("detailId", String(originalId));
          } else {
            console.log(params.row.index);
            window.sessionStorage.setItem(
              "record",
              "y" + String(params.row.index)
            );
            //sessionStorage.setItem('detailId', String(params.row.index));
          }
          navigate("/asset/");
        };

        return (
          <>
            <div className="w-1/2">
              <IconButton color="primary" onClick={onClickDetails}>
                <VisibilityIcon />
              </IconButton>
            </div>
          </>
        );
      },
    },
    {
      field: "adquireDate",
      headerName: "Fecha",
      width: 130,
      renderCell: (params) => {
        const adquireDate = new Date(params.row.adquireDate);
        const adquireDateF = formatDate(adquireDate);
        return <>{adquireDateF}</>;
      },
    },
    {
      field: "assetTS",
      headerName: "Tipo",
      type: "string",
      width: 90,
    },
  ];

  console.log(rows);

  if (isLoading) return <CircularProgress />;
  else
    return (
      <Card className="gap-7 p-10 flex flex-col items-center h-full">
        <DataGrid
          className="w-full h-full"
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          autoHeight
        ></DataGrid>
        <div className="w-full flex flex-row justify-evenly">
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
            onClick={() => onClickEdit()}
          >
            {" "}
            Editar Activo{" "}
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => onClickDelete()}
          >
            {" "}
            Eliminar Activo{" "}
          </Button>
        </div>
      </Card>
    );
};

export default AssetRecordCard;
