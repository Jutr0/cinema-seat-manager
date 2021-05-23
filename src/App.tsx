import { useEffect, useReducer } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import axios from 'axios';

import FormPage from "./pages/FormPage";
import { IApiResponse, IMyState } from './utils/customTypes';
import { MyContext } from './utils/myContext';
import ChooseSeats from './pages/ChooseSeats';
import Summary from './pages/Summary';


function App() {

  function reducer(state:IMyState, action:IMyState)
  {
    console.log({...state || {}, ...action})
    return {...state || {}, ...action}
  }
  const [state,dispatch] = useReducer(reducer,{})
  


  useEffect(()=>{
    axios.get('http://localhost:3000/seats')
    .then((response:{data:IApiResponse})=>{
      dispatch({apiResponse:response.data});
    })
    .catch((error:Error)=>{
      console.error(error);
    })
  },[])

  return (
    <MyContext.Provider value={{state,dispatch}}>
    <Router>
      <Switch>
        {state.seatsPicked !== undefined?(
          <Route path="/summary">
            <Summary />
          </Route>
        ):null}
        {state.seatsNum!==undefined?(
        <Route path="/choose">
          <ChooseSeats />
        </Route>
        )
        :null}

        <Route path="/">
          <FormPage/>
        </Route>
        </Switch>
    </Router>
    </MyContext.Provider>
  );
}

export default App;
