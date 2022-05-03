import { Button, Card, Skeleton, Typography } from "@mui/material";
import Page from "pages/page";
import React, { useEffect, useState } from "react";
import { CallGetAdminData, CallGetOrganizationData } from "components/wallet/contractCall"; 
import { OrganizationCard, AdministratorCard } from "components/atoms/Cards/Organization";
import { Loader } from "components/atoms";
import { Admin, Organization } from "types";
import { useNavigate } from "react-router-dom";
import DashboardData from "components/organisms/dashboardData";

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
            <div className="flex flex-col gap-6">
            {isLoading && (
            <div className="flex flex-row w-full justify-center gap-5">
                <div className="w-full"><Skeleton variant="rectangular" height={200}/></div>
                <div className="w-full"><Skeleton variant="rectangular" height={200}/></div>
            </div>)}
            <>
            {!isLoading && (<div className="flex flex-row w-full items-center justify-center gap-5">
                <OrganizationCard data={org} />
                <AdministratorCard {...admin!} />
                </div>)}</>
            
            
            {/* {!isLoading && (<AdministratorCard {...admin!} />)}
            {isLoading && (<Card className="mb-5"><Loader/></Card>)} */}
            <DashboardData></DashboardData></div>
             
        </Page>     
        
    )

};



export default MyOrganizationPage;


