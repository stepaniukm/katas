type Direction = "UP" | "DOWN" | "STAY";

export function theLift(_floors: number[][], capacity: number) {
  const floors = structuredClone(_floors);
  let direction: Direction = "UP";
  const visitedFloors = [0];
  let currentFloor = 0;
  const peopleInside = floors[currentFloor];
  floors[0] = [];
  let isSmart = getIsSmart(peopleInside);

  const condition = () => {
    return direction !== "STAY";
    // return !floors.every((floor, floorIndex) => {
    //   return floor.every((person) => person === floorIndex);
    // }) && peopleInside.length === 0;
  };

  while (condition()) {
    const vectors = getVectors(floors);

    direction = "STAY";

    console.log(vectors);
  }

  return visitedFloors;
}

export function getIsSmart(peopleInLift: number[]) {
  return peopleInLift.length === 0;
}

export function getVectors(floors: number[][]): Direction[] {
  return floors.map((floor, floorIndex) => {
    const isFloorHappy = floor.every((person) => person === floorIndex);
    if (isFloorHappy) {
      return "STAY";
    }

    const wantsUp = floor.filter((person) => person > floorIndex);
    const wantsDown = floor.filter((person) => person < floorIndex);

    if (wantsUp.length > wantsDown.length) {
      return "UP";
    } else {
      return "DOWN";
    }
  });
}
