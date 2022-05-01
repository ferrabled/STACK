import { UserForm } from "components/Forms"
import { useParams } from "react-router-dom";

const RegisterPage = () => {
    const orgId = Number(useParams().id);


    return (
        <UserForm {...orgId}></UserForm>
    )
}

export default RegisterPage