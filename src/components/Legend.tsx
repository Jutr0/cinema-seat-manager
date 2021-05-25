import { IDims } from "../utils/customTypes";
import LegendItem from "./LegendItem";

const Legend = (props:{dims:IDims}) => {
  const {gridX, gridY} = props.dims;
  return (
    <div className="gridLegend gridItem" style={{
      gridRowStart:`${gridX+3}`,
      gridColumn:`1/ ${gridY-4}`,
    }} >
      <LegendItem text="Miejsca dostępne" />
      <LegendItem text="Miejsca zarezerwowane" />
      <LegendItem text="Twój wybór" />
    </div>
  );
};

export default Legend;
