import React from "react";
import { Box, Typography } from "@mui/material";
import AppFooter from "./footer";
import AppHeader from "./header";

const Page = (props: {
  title?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}) => {
  return (
    <>
      <AppHeader hideDrawer />
      <section className="block w-full py-5 px-16 md:px-8 lg:px-24 xl:px-48 absolute flex flex-col items-center bg-[#f6f6f6]">
        <Box className="flex items-center justify-between md:flex-row">
          {props.title && <Typography variant="h1">{props.title}</Typography>}
          {props.actions && (
            <div className="flex flex-col gap-2 md:flex-row md:justify-end">
              {props.actions}
            </div>
          )}
        </Box>
        <Box className="w-full max-w-7xl mt-10 pb-[350px] min-h-[calc(100vh-100px)]">{props.children}</Box>
        <AppFooter />
      </section>
    </>
  );
};

export default Page;
