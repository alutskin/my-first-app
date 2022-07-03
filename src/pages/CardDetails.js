import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import SpecifiedCard from "../components/SpecifiedCard/SpecifiedCard";
import NotFound from "./NotFound";

const CardDetails = () => {
  const cardsData = useSelector((store) => store.root.cardsData);
  const { id } = useParams();
  const currentCard = cardsData.find((card) => card.id === id);

  return (
    <Fragment>
      {!currentCard && <NotFound />}
      {currentCard && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Header text="Great card" />
          <SpecifiedCard cardData={currentCard} />
        </div>
      )}
    </Fragment>
  );
};

export default CardDetails;
