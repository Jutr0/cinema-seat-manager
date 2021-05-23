import { useState, useContext, FormEvent } from "react";
import { withRouter, useHistory } from "react-router-dom";

import "../scss/formPage.scss";
import { IMyContext } from "../utils/customTypes";
import { MyContext } from "../utils/myContext";

const FormPage = () => {
  const [seatsNum, setSeatsNum] = useState<number | null>(null);
  const [isNextTo, setIsNextTo] = useState<boolean>(false);
  const { state, dispatch } = useContext<IMyContext>(MyContext);
  let history = useHistory();

  const checkSeats = (value: string) => {
    if (+value === 0) {
      setSeatsNum(null);
    } else if (Number.isInteger(+value)) {
      setSeatsNum(+value);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch({ seatsNum, isNextTo });

    history.push("/choose");
  };

  return (
    <section className="reservationForm">
      <form>
        <div className="lMiejscInput">
          <label htmlFor="lMiejsc">Liczba Miejsc:</label>
          <input
            type="text"
            id="lMiejsc"
            value={seatsNum || ""}
            onChange={(e) => checkSeats(e.target.value)}
            onBlur={(e) => checkSeats(e.target.value)}
          />
        </div>
        <div className="checkboxInput">
          <label>
            <input
              type="checkbox"
              onChange={(e) => setIsNextTo(e.target.checked)}
            />
            <span className="checkmark">&#10004;</span>
            Czy miejsca mają być obok siebie?
          </label>
        </div>
        <button onClick={(e) => handleSubmit(e)}>Wybierz miejsca</button>
      </form>
    </section>
  );
};

export default withRouter(FormPage);
