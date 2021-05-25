import { ISeat } from "./customTypes";

export function findMatchedSeats(
  seatsNum: number,
  seats: ISeat[],
  isNextTo: boolean = false
): ISeat[] | undefined | null {
  let bestRun: { value: number; index: number[] } = { value: 0, index: [] };
  let lastY: number = -1;
  let lastX: number = -1;
  let isMatchedSeatsFound: boolean = false;
  for (let i = seats.length - 1; i >= 0; i--) {
    const reserved = seats[i].reserved;
    const currY = seats[i].cords.y;
    const currX = seats[i].cords.x;
    if (lastX === -1) lastX = currX;
    const query = !(lastY - currY === 1 && currX === lastX) || lastY === -1;

    if (!reserved) {
      if (isNextTo) {
        if (bestRun.value === 0) {
          addSeat(bestRun, i);
        } else if (!query) {
          bestRun.value++;
          addSeat(bestRun, i, query);
        } else {
          addSeat(bestRun, i);
        }
      } else {
        bestRun.value++;
        addSeat(bestRun, i, false);
      }
    } else if (isNextTo) {
      bestRun.value = 0;
      bestRun.index = [];
    }
    console.log(bestRun);
    lastY = currY;
    lastX = currX;

    if (bestRun.value === seatsNum) {
      markPickedSeats(bestRun.index, seats);
      isMatchedSeatsFound = true;
      break;
    }
  }
  if (!isMatchedSeatsFound && isNextTo) return null;
  else {
    markPickedSeats(bestRun.index, seats);
  }
  return seats;
}

//Set matched seats' picked state to true
//
//seatsIndex = indexes of matched seats
//seats = all seats
//
const markPickedSeats = (seatsIndex: number[], seats: ISeat[]) => {
  for (const index of seatsIndex) {
    if (seats[index] !== undefined) seats[index].picked = true;
  }
};

//Add seat
//
// bestRun = current picked seats' numbers and indexes
// i = current seat index
// query = should bestRun start from 1?
//
const addSeat = (
  bestRun: { value: number; index: number[] },
  i: number,
  query: boolean = true
) => {
  if (query || bestRun.value === 0) {
    bestRun.value = 1;
    bestRun.index.length = 1;
  }
  bestRun.index.push(i);
};

export const calculateSeats = (
  seats: ISeat[]
): { gridX: number; gridY: number } => {
  let { gridX, gridY }: { gridX: number; gridY: number } = seats.reduce<{
    gridX: number;
    gridY: number;
  }>(
    (dims: { gridX: number; gridY: number }, current: ISeat) => {
      if (current.cords.x > dims.gridX) {
        dims.gridX = current.cords.x;
      }
      if (current.cords.y > dims.gridY) {
        dims.gridY = current.cords.y;
      }
      return dims;
    },
    { gridX: 0, gridY: 0 }
  );
  gridX++;
  gridY++;

  return { gridX, gridY };
};
