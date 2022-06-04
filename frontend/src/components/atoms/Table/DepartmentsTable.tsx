import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Department } from "types";

const DepartmentTable = (departments: Department[]) => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  //TODO add number of users
  useEffect(() => {
    const departmentList: any[] = [];
    const cont = Object.keys(departments).length;

    for (let i = 0; i < cont; i++) {
      departments[i].id = i + 1;
      departmentList.push(departments[i]);
    }
    setRows(departmentList);
    setIsLoading(false);
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "name", headerName: "Nombre", width: 150 },
    {
      field: "action",
      headerName: "Ver más",
      sortable: false,
      width: 80,
      renderCell: (params) => {
        const onClickDetails = (e: any) => {
          e.stopPropagation(); // don't select this row after clicking
          console.log(params.row.index);
          const departId = params.row.index;
          window.sessionStorage.setItem("departId", departId);
          navigate("/department");
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
    { field: "description", headerName: "Descripción", width: 180 },
    { field: "telephone", headerName: "Teléfono", width: 130 },
  ];

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        autoHeight
      />
    </>
  );
};

export default DepartmentTable;
