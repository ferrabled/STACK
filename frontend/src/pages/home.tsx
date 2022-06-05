import { CircularProgress } from "@mui/material";
import { HomeCard } from "components/atoms";
import { CallGetAdminData } from "components/wallet/contractCall";
import { CallGetUserFromAddr } from "components/wallet/userCall";
import React, { useEffect, useState } from "react";
import PageLoged from "./pageCheckLogin";

const HomePage = () => {
  const [userData, setUserData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isAdmin = window.localStorage.getItem("isAdmin");
    if (isAdmin == "false") {
      const addr = window.localStorage.getItem("userAddress");
      CallGetUserFromAddr(addr).then((r) => {
        setUserData(r);
        setIsLoading(false);
      });
    } else {
      const orgId = window.localStorage.getItem("orgId");
      CallGetAdminData(orgId).then((r) => {
        setUserData(r);
        setIsLoading(false);
      });
    }
  }, []);

  if (isLoading)
    return (
      <PageLoged>
        <CircularProgress />
      </PageLoged>
    );
  else
    return (
      <div>
        <PageLoged>
          <HomeCard data={userData}></HomeCard>
        </PageLoged>
      </div>
    );
};

export default HomePage;
