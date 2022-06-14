import React, { useEffect } from "react";
import { Button, Card, Typography } from "@mui/material";

import Page from "./page";

import Asset from "assets/asset.png";
import Blockchain2 from "assets/blockchainn.png";

import Security from "assets/cybersecurity.png";
import Control from "assets/control.png";
import Confidencial from "assets/confidencial.png";
import Blockchain from "assets/blockchain.png";

const LandingSection = () => {
  const onContactClick = () => {
    window.location.href = 'login';
  };

  return (
    <section className="relative mb-20 grid grid-cols-2 items-center md:grid-cols-2 content-between justify-between">
      <div className="h-11/12 flex flex-col gap-5 xl:pl-24">
        <Typography variant="h3">Gestor de activos sobre Blockchain</Typography>
        <Typography variant="body1" className="mb-8">
          Un gestor para los activos de tu organización sobre blockchain que
          permite mantener la trazabilidad y seguridad que necesitas en tu
          empresa
        </Typography>
        <Button variant="outlined" color="primary" onClick={onContactClick}>
          ¡Comienza!
        </Button>
      </div>
      <div className="ml-48  flex flex-row items-center gap-10">
        <img className="h-28" src={Asset} alt=""/>
        <img className="h-28" src={Blockchain2} alt=""/>
      </div>
    </section>
  );
};

const LandingCard = (props: { img: string; title: string; text: string }) => {
  return (
    <Card className="m-2 flex flex-col gap-5 p-2 items-center">
      <img src={props.img} alt="img" className="h-16 w-16 p-2" />
      <div className="px-2 pb-4">
        <Typography variant="h6">{props.title}</Typography>
        <Typography variant="body2">{props.text}</Typography>
      </div>
    </Card>
  );
};

const LandingPage = () => {
  const [showCards, setShowCards] = React.useState(false);

  const cards = [
    {
      title: "Seguridad",
      img: Security,
      text: "La cadena de bloques permite que no sea posible cambiar los datos de manera fraudulenta",
    },
    {
      title: "Trazabilidad",
      img: Blockchain,
      text: "Conocer los cambios realizados en cada momento y mantén el control",
    },
    {
      title: "Confidencialidad",
      img: Confidencial,
      text: "Solo los miembros que indiques de tu organización pueden acceder a la información de tales activos ",
    },
    {
      title: "Control",
      img: Control,
      text: "Todos los activos de tu empresa disponibles en una única página",
    },
  ];

  useEffect(() => {
    let cancelled = false;

    const timeout = setTimeout(() => {
      if (!cancelled) {
        setShowCards(true);
      }
    }, 10);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Page title="">
      <div className="overflow-hidden">
        <LandingSection />
        <section className="grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-8 xl:grid-cols-4 xl:gap-12">
          {showCards
            ? cards.map((card) => <LandingCard {...card} key={card.title} />)
            : null}
        </section>
      </div>
    </Page>
  );
};

export default LandingPage;
