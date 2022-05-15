import { Button, Card, Skeleton, Typography } from "@mui/material";
import Page from "pages/page";
import React, { useEffect, useState } from "react";
import { CallGetAdminData, CallGetOrganizationData, CallRetrieveOrgData } from "components/wallet/contractCall"; 
import { OrganizationCard, AdministratorCard } from "components/atoms/Cards/Organization";
import { Loader } from "components/atoms";
import { Admin, Organization } from "types";
import { useNavigate } from "react-router-dom";
import DashboardData from "components/organisms/dashboardData";
import { CallGetAllDepartmentsFromOrg, CallGetNumUsersFromOrg } from "components/wallet/userCall";
import PageLoged from "pages/pageCheckLogin";

const MyOrganizationPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [org, setOrg] = useState<Organization>();
    const [admin, setAdmin] = useState<Admin>();
    const [dashboardValues, setDashboardValues] = useState<number[]>();


    useEffect(() => {
        const orgId = Number(window.localStorage.getItem('orgId')!);
        
        const GetOrgAndAdminData = () => {
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
                        GetDashboardData(); 
                    }) 
            })
        }


        const GetDashboardData = () => {
            let cont: number[];
            CallRetrieveOrgData(orgId).then(r => {
                cont = [Number(r[0]), Number(r[1]), Number(r[2])];
                CallGetNumUsersFromOrg(orgId).then(res => {
                    cont.push(Number(res));
                    
                    CallGetAllDepartmentsFromOrg(orgId).then(res=> {
                        cont.push(Number(res.length));
                        setDashboardValues(cont);
                        setIsLoading(false);
                    })
                    
                    
                    
                })
            })
        }

        GetOrgAndAdminData();    
    },[]);

    
    return (
        <PageLoged>
            <div className="flex flex-col gap-6">
            {isLoading && (
            <div className="flex flex-row w-full justify-center gap-5">
                <div className="w-full"><Skeleton variant="rectangular" height={200}/></div>
                <div className="w-full"><Skeleton variant="rectangular" height={200}/></div>
            </div>)}
            <>
            {!isLoading && (<>
            <div className="flex flex-row w-full items-center justify-center gap-5">
                <OrganizationCard data={org} />
                <AdministratorCard {...admin!} />
                </div>
                <DashboardData {...dashboardValues!}></DashboardData>
                </>
                )}</>
           </div>
             
        </PageLoged>     
        
    )

};



export default MyOrganizationPage;


