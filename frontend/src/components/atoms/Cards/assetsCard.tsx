import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
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

const AssetsCard = (props: {
  assets: AssetsInList[];
  departNames: string[];
  numComments: number[];
}) => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<GridTableElement<AssetsInList>[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const FormatData = () => {
      const assetsList = props.assets.map((x, i) => ({
        ...x,
        id: i,
      }));
      setRows(assetsList);
    };
    FormatData();
    setIsLoading(false);
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nombre", width: 130 },
    {
      field: "action",
      headerName: "Acción",
      sortable: false,
      width: 150,
      renderCell: (params) => {
        const onClickDetails: MouseEventHandler = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          console.log(params.row.originalId);
          const originalId = params.row.originalId;
          CallGetIsAssetEdited(originalId).then((response) => {
            console.log("True or false");
            console.log(response);
            if (response) {
              console.log("True");
              sessionStorage.setItem("isEdited", String(true));
            } else {
              console.log("false");
              sessionStorage.setItem("isEdited", String(false));
            }
            sessionStorage.setItem("aType", params.row.assetType);
            sessionStorage.setItem("record", "n");
            sessionStorage.setItem("detailId", String(originalId));
            navigate("/asset/");
          });
          //const api: GridApi = params.api;
          //sessionStorage.removeItem("editId");
        };

        const onClickEdit: MouseEventHandler = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          console.log("orignianl");
          console.log(params.row);
          const originalId = params.row.originalId;
          CallGetIsAssetEdited(originalId).then((response) => {
            console.log("True or false");
            console.log(response);
            if (response) {
              console.log("True");
              sessionStorage.setItem("isEdited", String(true));
              sessionStorage.setItem("editId", String(originalId));
            } else {
              console.log("false");
              sessionStorage.setItem("isEdited", String(false));
              sessionStorage.setItem("editId", String(originalId));
            }
            sessionStorage.setItem("aType", params.row.assetType);
            navigate("/asset/edit");
          });

          //const api: GridApi = params.api;
          //sessionStorage.removeItem("editId");
        };

        const onClickDelete: MouseEventHandler = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          console.log("Eliminamos el activo: ");
          try {
            console.log("delete original asset:" + params.row.originalId);
            CallDeleteAsset(params.row.originalId);
            navigate("/assets");
          } catch {
            console.log("User reverted transaction");
          }
        };
        return (
          <>
            <div className="w-1/3">
              <IconButton color="primary" onClick={onClickDetails}>
                <VisibilityIcon />
              </IconButton>
            </div>
            <div className="w-1/3 items-center">
              <IconButton color="primary" onClick={onClickEdit}>
                <EditIcon />
              </IconButton>
            </div>
            <div className="w-1/3">
              <IconButton color="primary" onClick={onClickDelete}>
                <DeleteForeverIcon />
              </IconButton>
            </div>
          </>
        );
      },
    },
    {
      field: "adquireDate",
      headerName: "Fecha ad.",
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
    {
      field: "assetDepart",
      headerName: "Departamento",
      type: "string",
      width: 150,
      renderCell: (params) => {
        return <>{props.departNames[params.row.assetDepart]}</>;
      },
    },
    {
      field: "numComments",
      headerName: "Comentarios",
      type: "string",
      width: 150,
      renderCell: (params) => {
        return <>{props.numComments[params.row.id]}</>;
      },
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
            onClick={() => navigate("/assets/new")}
          >
            {" "}
            Nuevo Activo{" "}
          </Button>
        </div>
      </Card>
    );
};

export default AssetsCard;
