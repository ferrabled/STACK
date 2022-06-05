import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommentInTable } from "types";

const CommentsTable = (comments: CommentInTable[]) => {
  const [rows, setRows] = useState<CommentInTable[]>([]);

  useEffect(() => {
    const departmentList = [];
    const cont = Object.keys(comments).length;
    console.log("Número de comentarios total: " + cont);
    for (let i = 0; i < cont; i++) {
      comments[i].id = i + 1;
      departmentList.push(comments[i]);
    }
    setRows(departmentList);
  }, [comments]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "description", headerName: "Descripción", width: 150 },
    {
      field: "date",
      headerName: "Fecha",
      width: 180,
      renderCell: (params) => {
        const date = new Date(params.row.date);
        const dateString = date.toLocaleString();
        return <>{dateString}</>;
      },
    },

    { field: "fullName", headerName: "Usuario", width: 130 },
    { field: "email", headerName: "Correo", width: 130 },
    { field: "telephone", headerName: "Correo", width: 130 },
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

export default CommentsTable;
