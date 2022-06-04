import { Button, CircularProgress, IconButton } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridSelectionModel,
} from "@mui/x-data-grid";
import { CallGetIsAssetEdited } from "components/wallet/contractCall";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "utils";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { AssetsInList, Notify } from "types";
import {
  CallDeleteAssetFromDepartment,
  CallInsertAssetToDepartment,
} from "components/wallet/userCall";

const SimpleSelectAssetsTable = ({
  assets,
  deleteB,
  departNames,
  setNotifyParent,
}: {
  assets: AssetsInList[];
  deleteB: boolean;
  departNames: string[];
  setNotifyParent: any;
}) => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  useEffect(() => {
    const FormatData = () => {
      const listAssets = assets;
      const cont = Object.keys(listAssets).length;
      const tempRow: any[] = [];
      for (let i = 0; i < cont; i++) {
        listAssets[i].id = i;
        tempRow.push(listAssets[i]);
      }
      setRows(tempRow);
      setIsLoading(false);
    };
    FormatData();
  }, []);

  const handleSubmit = () => {
    const departId = window.sessionStorage.getItem("departId");
    console.log(selectionModel);
    const cont = Object.keys(selectionModel).length;
    const ids: number[] = [];
    for (let i = 0; i < cont; i++) {
      const item: any = selectionModel[i];
      console.log("Tabla");
      console.log(item.index);
      ids.push(item.index);
    }
    if (deleteB) {
      console.log("delete assets from department");
      CallDeleteAssetFromDepartment(Number(departId), ids).then((r) => {
        const notify: Notify = r!;
        setNotifyParent(notify);
      });
    } else {
      console.log("add assets to department");
      CallInsertAssetToDepartment(Number(departId), ids).then((r) => {
        const notify: Notify = r!;
        setNotifyParent(notify);
      });
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "name", headerName: "Nombre", width: 130 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 70,
      renderCell: (params) => {
        const onClickDetails = (e: any) => {
          e.stopPropagation(); // don't select this row after clicking
          console.log(params.row.originalId);
          const originalId = params.row.originalId;
          CallGetIsAssetEdited(originalId).then((response) => {
            if (response) {
              sessionStorage.setItem("isEdited", String(true));
            } else {
              sessionStorage.setItem("isEdited", String(false));
            }
            sessionStorage.setItem("record", "n");
            sessionStorage.setItem("detailId", String(originalId));
            navigate("/asset/");
          });
        };
        return (
          <>
            <div className="w-1/3">
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
    {
      field: "assetDepart",
      headerName: "Departamento",
      type: "string",
      width: 150,
      renderCell: (params) => {
        return <>{departNames[params.row.assetDepart]}</>;
      },
    },
    /* {
        field: "fullName",
        headerName: "Departamento",
        description: "This column has a value getter and is not sortable.",
        sortable: false,
        width: 160,
        valueGetter: (params: GridValueGetterParams) =>
          `${params.row.firstName || ""} ${params.row.lastName || ""}`,
      }, */
  ];

  if (isLoading) return <CircularProgress />;
  else
    return (
      <>
        <DataGrid
          className="w-full h-full"
          rows={rows}
          columns={columns}
          isRowSelectable={
            deleteB
              ? (params: GridRowParams) => true
              : (params: GridRowParams) => params.row.assetDepart == 0
          }
          checkboxSelection
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectionModel = rows.filter((row: any) =>
              selectedIDs.has(row.id)
            );

            setSelectionModel(selectionModel);
          }}
          pageSize={5}
          rowsPerPageOptions={[5]}
          autoHeight
        ></DataGrid>
        {deleteB && (
          <Button
            color="primary"
            variant="contained"
            onClick={() => handleSubmit()}
          >
            Eliminar
          </Button>
        )}
        {!deleteB && (
          <Button
            color="primary"
            variant="contained"
            onClick={() => handleSubmit()}
          >
            Añadir
          </Button>
        )}
      </>
    );
};

export default SimpleSelectAssetsTable;
