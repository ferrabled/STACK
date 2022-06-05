import { Card } from "@mui/material";
import { UserForm } from "components/Forms"
import Page from "pages/page";
import { useParams } from "react-router-dom";

const RegisterPage = () => {
    const orgId = Number(useParams().id);
    

    return (
        <Page>
            <Card className="my-3">
                <UserForm orgId={orgId}></UserForm>
            </Card>
        </Page>
       
    )
}

export default RegisterPage