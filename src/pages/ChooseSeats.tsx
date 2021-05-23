import { withRouter } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";

import { MyContext } from "../utils/myContext";
import "../scss/chooseSeats.scss";
import { ISeat } from "../utils/customTypes";
import { findMatchedSeats } from "../utils/utils";

const ChooseSeats = () => {
  const [seatsToRender, setSeatsToRender] =
    useState<JSX.Element[] | undefined>();

  const { state, dispatch } = useContext(MyContext);
  const { apiResponse, seatsNum, isNextTo } = state;

  const [seats, setSeats] = useState<ISeat[]>(apiResponse!);
  const [pickedSeats, setPickedSeats] = useState<string[]>([]);

  const handlePickSeat = (seat: ISeat) => {
    const tempSeats = seats.map((s) => {
      if (s.id === seat.id) {
        if (s.picked !== undefined) {
          s.picked = !s.picked;
        } else s.picked = true;
      }
      return s;
    });
    setSeats(tempSeats);
  };

  useEffect(() => {
    if (typeof seatsNum === "number") {
      findMatchedSeats(seatsNum, seats, isNextTo);
    }
  }, []);

  useEffect(() => {
    setSeatsToRender(
      seats?.map((step) => {
        const isReservedClass = `gridItem ${
          step.reserved ? "reservedSeat" : ""
        } ${step.picked ? "pickedSeat" : ""}`;
        return (
          <div
            key={step.id}
            className={isReservedClass}
            style={{
              gridColumnStart: step.cords.y + 1,
              gridRowStart: step.cords.x + 1,
              cursor: step.reserved ? "default" : "pointer",
            }}
            onClick={() => step.reserved || handlePickSeat(step)}
          ></div>
        );
      })
    );
  }, [seats]);

  return (
    <div className="gridContainer">
      {seatsToRender}
      <div className="gridLegend gridItem">
        <div className="legendItem">
          {" "}
          <div className="square"></div>Miejsca dostępne
        </div>
        <div className="legendItem">
          {" "}
          <div className="square"></div>Miejsca zarezerwowane
        </div>
        <div className="legendItem">
          {" "}
          <div className="square"></div>Twój wybór
        </div>
      </div>
      <div className="reserveBtn gridItem">Rezerwuj</div>
    </div>
  );
};

export default withRouter(ChooseSeats);
