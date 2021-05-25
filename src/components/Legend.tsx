import LegendItem from "./LegendItem";

const Legend = () => {
  return (
    <div className="gridLegend gridItem">
      <LegendItem text="Miejsca dostępne" />
      <LegendItem text="Miejsca zarezerwowane" />
      <LegendItem text="Twój wybór" />
    </div>
  );
};

export default Legend;
