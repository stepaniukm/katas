import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { theLift, getIsSmart, getVectors } from "./main.ts";

describe.only("lift", () => {
  it("should work for very basic example", () => {
    const result = theLift([[1], [], []], 1);

    assertEquals(result, [0, 1, 0]);
  });

  it("should work for a slightly more complex example", () => {
    const result = theLift([[3], [2], [1], []], 5);

    assertEquals(result, [0, 1, 2, 3, 1, 0]);
  });
});

describe("getIsSmart", () => {
  it("should be smart when empty", () => {
    const peopleInLift: number[] = [];
    const result = getIsSmart(peopleInLift);

    assertEquals(result, true);
  });

  it("shouldn't be smart when non empty", () => {
    const peopleInLift = [1];
    const result = getIsSmart(peopleInLift);

    assertEquals(result, false);
  });
});

describe("getVectors", () => {
  it("should return correct vectors of floor preferred direction", () => {
    const floors = [[5, 3, 0], [1, 1, 4], [0, 0, 1], [], [5, 5, 5]];
    const vectors = getVectors(floors);

    assertEquals(vectors, ["UP", "UP", "DOWN", "STAY", "STAY"]);
  });
});
