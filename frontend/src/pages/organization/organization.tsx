import { Button, Card, Typography } from "@mui/material";
import Page from "pages/page";
import React, { useEffect, useState } from "react";
import { CallGetAdminData, CallGetOrganizationData } from "components/wallet/contractCall"; 
import { OrganizationCard, AdministratorCard } from "components/atoms/Cards/Organization";
import { Loader } from "components/atoms";
import { Admin, Organization } from "types";
import { useNavigate } from "react-router-dom";

const MyOrganizationPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [org, setOrg] = useState<Organization>();
    const [admin, setAdmin] = useState<Admin>();


    useEffect(() => {
        const GetOrgAndAdminData = () => {
            //TODO CONNECT WITH BLOCKCHAIN
            const orgId = 0;
    
            CallGetOrganizationData(orgId).then((response)=> {  
                const organization: Organization = {
                    name: response["name"],
                    address: response["addressO"],
                    telephone: response["telephone"]
                }
                setOrg(organization);
            
                CallGetAdminData(orgId).then((response)=> {
                        const admin: Admin = {
                            name: response["name"],
                            lastName: response["lastname"],
                            address: response["addressO"],
                            telephone: response["telephone"],
                            email: response["email"]
                        }
                        setAdmin(admin);
                        setIsLoading(false);
                    })
            })
        }
        GetOrgAndAdminData();  
    
    },[]);

    
    return (
        <Page>
            {!isLoading && (<OrganizationCard data={org} />)}
            {isLoading && (<Card className="mb-5"><Loader/></Card>)}
            
            {!isLoading && (<AdministratorCard {...admin!} />)}
            {isLoading && (<Card className="mb-5"><Loader/></Card>)}

            <Button variant="contained" color="primary" onClick={() => navigate("/assets/deleted")}> Activos Eliminados</Button>
             
        </Page>     
        
    )

};



export default MyOrganizationPage;


