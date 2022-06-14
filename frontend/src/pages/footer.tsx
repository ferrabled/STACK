import React, {ReactElement} from "react";


import {
    LocationCity,
    Mail,
  } from "@mui/icons-material";
import { Divider, Typography } from "@mui/material";
  
  const FooterSection = (props: {
    title: string;
    children: ReactElement | ReactElement[];
  }) => {
    return (
      <section className="col-span-1">
        <Typography variant="h5">{props.title}</Typography>
        <Divider />
        <div className="mt-4 flex flex-col gap-4">{props.children}</div>
      </section>
    );
  };
  
  const AppFooter = () => {
    return (
      <footer className="absolute bottom-0 grid w-full grid-cols-2 gap-10 bg-brand-lighter bg-opacity-50 px-4 py-8 md:grid-cols-3 md:px-8 lg:px-24 xl:gap-16 xl:px-48 mt-20">
        <FooterSection title="Ubicación">
          <Typography variant="body2">
            Escuela Técnica Superior de Ingeniería Informática, Universidad de
            Sevilla, 41012 Sevilla
          </Typography>
          <a
            href="https://goo.gl/maps/S4zvin8BscVjHyRW6"
            className="flex items-center justify-center gap-2"
          >
            <LocationCity />
            <Typography variant="body2">Avenida Reina Mercedes S/N</Typography>
          </a>
          <Typography variant="body2">41012, Sevilla</Typography>
        </FooterSection>
  
        <FooterSection title="Contacto">
          <a href="mailto:ferrabled@alum.us.es">
            <Mail /> ferrabled@alum.us.es
          </a>
        </FooterSection>
      </footer>
    );
  };
  
export default AppFooter;
