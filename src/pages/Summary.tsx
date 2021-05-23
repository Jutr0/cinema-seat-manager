import { withRouter } from "react-router-dom"

import { MyContext } from "../utils/myContext";
import { Fragment, useContext } from "react";
const Summary = () =>{

    const { state } = useContext(MyContext);
    const { seatsPicked } = state;

    const seatsPickedList = seatsPicked!.map((step) => {
        return <li>rząd {step.cords.x +1}, miejsce {step.cords.y +1} ({step.id}) </li>
    })

    return(
        <Fragment>
        <h1>Twoja rezerwacja przebiegła pomyślnie!</h1>
        <ul className="pickedSeatsContainer">
        Wybrałeś miejsca:
            {seatsPickedList}
        </ul>
        <h2>Dziękujemy! W razie problemów prosimy o kontakt z działem administracji</h2>
        </Fragment>
    )
}

export default withRouter(Summary)