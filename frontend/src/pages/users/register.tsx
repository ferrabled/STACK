import { UserForm } from "components/Forms"
import Page from "pages/page";
import { useParams } from "react-router-dom";

const RegisterPage = () => {
    const orgId = Number(useParams().id);
    

    return (
        <Page>
            {orgId}
        <UserForm props={orgId}></UserForm>
        </Page>
       
    )
}

export default RegisterPage