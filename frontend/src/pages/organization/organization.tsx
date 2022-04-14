import { Card, Typography } from "@mui/material";
import Page from "pages/page";
import React, { useState } from "react";
import { CallGetOrganizationData } from "components/wallet/contractCall"; 
import { OrganizationCard, AdministratorCard } from "components/atoms/Cards/Organization";
import { Loader } from "components/atoms";

const MyOrganizationPage = () => {
    type Organization = {
        name: string,
        address: string,
        telephone: Number
    }

    type Admin = {
        name: string,
        address: string,
        email: string,
        telephone: Number
    }

    const [isLoading, setIsLoading] = useState(true);
    const [org, setOrg] = useState({});
    const [admin, setAdmin] = useState({});


    const GetOrgAndAdminData = () => {
        //TODO CONNECT WITH BLOCKCHAIN
        const orgId = 0;

        CallGetOrganizationData(orgId).then((response)=> {
            console.log(response);

            const organization: Organization = {
                name: response["name"],
                address: response["addressO"],
                telephone: response["telephone"]
            }
            setOrg(organization);

        })




    }

    if (isLoading === true){
        GetOrgAndAdminData()
        setIsLoading(false);
        
    }

    
    return (
        <Page>
            {!isLoading && (<OrganizationCard data={org} />)}
            {isLoading && (<Card className="mb-5"><Loader/></Card>)}
            
            {!isLoading && (<AdministratorCard data={admin} />)}
            {isLoading && (<Card className="mb-5"><Loader/></Card>)}
             
        </Page>     
        
    )

};



export default MyOrganizationPage;


