import { assertEquals } from "@std/assert";
import { expand, parseA, removeBraces, binomialCoeff } from "./main.ts";

const testCases = [
  {
    given: "(x+1)^0",
    expected: "1",
  },
  {
    given: "(x+1)^1",
    expected: "x+1",
  },
  {
    given: "(x+1)^2",
    expected: "x^2+2x+1",
  },
  {
    given: "(x-1)^0",
    expected: "1",
  },
  {
    given: "(x-1)^1",
    expected: "x-1",
  },
  {
    given: "(x-1)^2",
    expected: "x^2-2x+1",
  },
  {
    given: "(5m+3)^4",
    expected: "625m^4+1500m^3+1350m^2+540m+81",
  },
  {
    given: "(2x-3)^3",
    expected: "8x^3-36x^2+54x-27",
  },
  {
    given: "(7x-7)^0",
    expected: "1",
  },
  {
    given: "(-5m+3)^4",
    expected: "625m^4-1500m^3+1350m^2-540m+81",
  },
  {
    given: "(-2k-3)^3",
    expected: "-8k^3-36k^2-54k-27",
  },
  {
    given: "(-7x-7)^0",
    expected: "1",
  },
  {
    given: "(-x+0)^3",
    expected: "-x^3",
  },
  {
    given: "(-x+0)^4",
    expected: "x^4",
  },
  {
    given: "(x+0)^3",
    expected: "x^3",
  },
  {
    given: "(2x+0)^4",
    expected: "16x^4",
  },
  {
    given: "(-n-12)^5",
    expected: "-n^5-60n^4-1440n^3-17280n^2-103680n-248832",
  },
  {
    given: "(-e-16)^5",
    expected: "-e^5-80e^4-2560e^3-40960e^2-327680e-1048576",
  },
];

testCases.forEach((example) => {
  Deno.test(`${example.given} should equal ${example.expected}`, () => {
    const result = expand(example.given);
    assertEquals(result, example.expected);
  });
});

const aParsingTestCases = [
  { given: "x", expected: { number: 1, letter: "x" } },
  { given: "-x", expected: { number: -1, letter: "x" } },
  { given: "2x", expected: { number: 2, letter: "x" } },
  { given: "-2x", expected: { number: -2, letter: "x" } },
  { given: "2y", expected: { number: 2, letter: "y" } },
  { given: "-2y", expected: { number: -2, letter: "y" } },
  { given: "y", expected: { number: 1, letter: "y" } },
  { given: "-y", expected: { number: -1, letter: "y" } },
];

aParsingTestCases.forEach((example) => {
  Deno.test(
    `parsing ${example.given} should equal ${JSON.stringify(example.expected)}`,
    () => {
      const result = parseA(example.given);
      assertEquals(result.coefficient, example.expected.number);
      assertEquals(result.variable, example.expected.letter);
    }
  );
});

Deno.test("removeBraces should correctly remove outside braces", () => {
  const given = "(x+1)";
  const expected = "x+1";

  const result = removeBraces(given);

  assertEquals(result, expected);
});

Deno.test(
  "removeBraces shouldn't modify string if outside characters aren't braces",
  () => {
    const given = "x+1";
    const expected = "x+1";

    const result = removeBraces(given);

    assertEquals(result, expected);
  }
);

const binominalCoeffTestCases = [
  { given: { n: 1, k: 1 }, expected: 1 },
  { given: { n: 2, k: 1 }, expected: 2 },
  { given: { n: 2, k: 2 }, expected: 1 },
  { given: { n: 3, k: 1 }, expected: 3 },
  { given: { n: 3, k: 2 }, expected: 3 },
  { given: { n: 3, k: 3 }, expected: 1 },
  { given: { n: 4, k: 0 }, expected: 1 },
  { given: { n: 4, k: 1 }, expected: 4 },
  { given: { n: 4, k: 2 }, expected: 6 },
  { given: { n: 4, k: 3 }, expected: 4 },
  { given: { n: 4, k: 4 }, expected: 1 },
];

binominalCoeffTestCases.forEach((example) => {
  Deno.test(
    `binomialCoeff(${example.given.n}, ${example.given.k}) should equal ${example.expected}`,
    () => {
      const result = binomialCoeff(example.given.n, example.given.k);
      assertEquals(result, example.expected);
    }
  );
});
