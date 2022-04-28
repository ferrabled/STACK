import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { Loader } from "components/atoms";
import {
  HomePage,
  LandingPage, LogInPage, NewOrganizationPage,
  MyOrganizationPage,
  AssetsPage, NewAssetPage, AssetDetailPage
} from "pages";

import { AssetHistoryPage, AssetsDeletedPage, EditAssetPage } from "pages/assets";
const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <Loader />
        </div>
      }
    >
      <main className="my-[60px] min-h-[calc(100vh-120px)]">
        <Router>
          <Routes>
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/organization/new" element={<NewOrganizationPage />} />
            <Route path="/organization" element={<MyOrganizationPage/>} />
            <Route path="/home" element={<HomePage></HomePage>} /> 
            <Route path="*" element={<Navigate to="/home" />} />
            <Route path="/assets" element={<AssetsPage/>}/>
            <Route path="/assets/new" element={<NewAssetPage />} />
            <Route path="/assets/deleted" element={<AssetsDeletedPage/>}/>
            <Route path="/asset/" element={<AssetDetailPage />} />
            <Route path="/asset/edit" element={<EditAssetPage />} />
            <Route path="/asset/record" element={<AssetHistoryPage/>} />

          </Routes>
        </Router>
      </main>
    </Suspense>
  );
};

export default AppRoutes;