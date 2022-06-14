import PageLoged from "pages/pageCheckLogin";
import DepartmentForm from "components/Forms/departmentForm";
import { Card } from "@mui/material";

const NewDepartmentPage = () => {
  return (
    <PageLoged>
        <Card className="my-3">
          <DepartmentForm />
        </Card>
    </PageLoged>
  );
};

export default NewDepartmentPage;