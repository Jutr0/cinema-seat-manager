import { withRouter, useHistory } from "react-router-dom";
import React, { useContext, useEffect, useState, useRef } from "react";

import { MyContext } from "../utils/myContext";
import "../scss/chooseSeats.scss";
import { IDims, ISeat } from "../utils/customTypes";
import { findMatchedSeats, calculateSeats } from "../utils/utils";
import Seat from "../components/Seat";
import Legend from "../components/Legend";
import variables from "../scss/_export.module.scss";

const ChooseSeats = () => {
  let history = useHistory();

  const [seatsToRender, setSeatsToRender] =
    useState<JSX.Element[] | undefined>();

  const { state, dispatch } = useContext(MyContext);
  const { apiResponse, seatsNum, isNextTo } = state;
  const [seats, setSeats] = useState<ISeat[]>(apiResponse!);
  const pickedSeats = useRef<ISeat[]>([]);
  const dims = useRef<IDims>({ gridX: 0, gridY: 0 });

  const handlePickSeat = (seat: ISeat) => {
    const tempSeats = seats.filter((s) => {
      if (s.id === seat.id) {
        if (s.picked !== undefined) {
          s.picked = !s.picked;
        } else {
          s.picked = true;
        }
      }
      return s;
    });
    setSeats(tempSeats);
  };

  const handleReservation = () => {
    pickedSeats.current = seats.filter((s) => s.picked);
    if (pickedSeats.current.length > 0) {
      dispatch({ seatsPicked: pickedSeats.current, apiResponse: seats });
      history.replace("/summary");
    }
  };

  useEffect(() => {
    dims.current = calculateSeats(seats);

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
          <Seat
            seat={step}
            isReservedClass={isReservedClass}
            handlePickSeat={(seat: ISeat) => handlePickSeat(seat)}
          />
        );
      })
    );
  }, [seats]);

  return (
    <div
      className="gridContainer"
      style={{
        gridTemplateColumns: `repeat(${dims.current.gridY}, ${variables.gridWidth})`,
        gridTemplateRows: `repeat(${dims.current.gridX + 2}, ${
          variables.gridHeight
        })`,
      }}
    >
      {seatsToRender}
      <Legend dims={dims.current}/>
      <button
        className="reserveBtn gridItem"
        style={{
          gridColumn:`${dims.current.gridY - 3}/ ${dims.current.gridY+1}`,
          gridRowStart:`${dims.current.gridX+3}`,
        }}
        onClick={(e) => {
          e.preventDefault();
          handleReservation();
        }}
      >
        Rezerwuj
      </button>
    </div>
  );
};

export default withRouter(ChooseSeats);
