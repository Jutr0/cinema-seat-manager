const LegendItem = (props: { text: string }) => {
  return (
    <div className="legendItem">
      <div className="square"></div>
      {props.text}
    </div>
  );
};
export default LegendItem;
