import { ISeat } from "../utils/customTypes";

const Seat = (props: {
  seat: ISeat;
  isReservedClass: string;
  handlePickSeat: (seat: ISeat) => void;
}) => {
  const { seat, isReservedClass, handlePickSeat } = props;

  return (
    <div
      key={seat.id}
      className={isReservedClass}
      style={{
        gridColumnStart: seat.cords.y + 1,
        gridRowStart: seat.cords.x + 1,
        cursor: seat.reserved ? "default" : "pointer",
      }}
      onClick={() => seat.reserved || handlePickSeat(seat)}
    ></div>
  );
};

export default Seat;
