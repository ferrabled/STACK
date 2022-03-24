import React, { useEffect } from "react";
import { Button, Card, Typography } from "@mui/material";

import Page from "./page";

import LImg from "assets/logo.svg";

const LandingSection = () => {
  const onContactClick = () => {
    window.scrollTo({
      behavior: "smooth",
      top: document.body.scrollHeight,
    });
  };

  return (
    <section className="relative mb-6 grid animate-fade-in grid-cols-1 items-center md:grid-cols-2">
      <div className="h-11/12 flex flex-col gap-5 xl:pl-24">
        <Typography variant="h3">Gestor de activos sobre Blockchain</Typography>
        <Typography variant="body1" className="mb-8">
          Un gestor para los activos de tu organización sobre blockchain que permite mantener
          la trazabilidad y seguridad que necesitas en tu empresa
        </Typography>
        <Button variant="outlined" color="primary" onClick={onContactClick}>
          ¡Comienza!
        </Button>
      </div>
      <img className="h-11/12" src={LImg} alt="" />
    </section>
  );
};

const LandingCard = (props: { img: string; title: string; text: string }) => {
  return (
    <Card className="m-2 flex animate-fade-in-top flex-col gap-5 p-2">
      <img src={props.img} alt="img" className="h-20 animate-fade-in p-2" />
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
      img: LImg,
      text: "La cadena de bloques permite que no sea posible cambiar los datos de manera fraudulenta",
    },
    {
      title: "Trazabilidad",
      img: LImg,
      text: "Conocer los cambios realizados en cada momento y mantén el control",
    },
    {
      title: "Confidencialidad",
      img: LImg,
      text: "Solo los miembros que indiques de tu organización pueden acceder a la información de tales activos ",
    },
    {
      title: "Control",
      img: LImg,
      text: "Todos los activos de tu empresa disponibles en una única página",
    },
  ];

  useEffect(() => {
    let cancelled = false;

    let timeout = setTimeout(() => {
      if (!cancelled) {
        setShowCards(true);
      }
    }, 1000);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Page title="">
      <div className="overflow-hidden">
        <LandingSection />
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 xl:grid-cols-4 xl:gap-12">
          {showCards
            ? cards.map((card) => <LandingCard {...card} key={card.title} />)
            : null}
        </section>
      </div>
    </Page>
  );
};

export default LandingPage;
