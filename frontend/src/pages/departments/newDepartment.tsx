import PageLoged from "../page";
import DepartmentForm from "components/Forms/departmentForm";
import { Card } from "@mui/material";

const NewDepartmentPage = () => {
  return (
    <PageLoged title="">
        <Card className="p-5 m-5">
      <DepartmentForm />
        </Card>
    </PageLoged>
  );
};

export default NewDepartmentPage;