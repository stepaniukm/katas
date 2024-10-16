export function expand(input: string) {
  const [base, exponent] = input.split("^");
  if (exponent === "0") return "1";
  if (exponent === "1") return removeBraces(base);
  const exponentNumber = parseInt(exponent);

  const baseRegex = /\((?<a>\-?\d*[a-z]{1})(?<b>[\+\-]\d+)\)/;
  const match = base.match(baseRegex);

  if (!match) {
    throw new Error("Invalid input");
  }

  const { a, b } = match.groups as { a: string; b: string };
  const aParsed = parseA(a);
  const bNumber = parseInt(b);

  if (bNumber === 0) {
    const expandedCoefficient = aParsed.coefficient ** exponentNumber;
    const expandedCoefficientString =
      expandedCoefficient === 1
        ? ""
        : expandedCoefficient === -1
        ? "-"
        : `${expandedCoefficient}`;
    return `${expandedCoefficientString}${aParsed.variable}^${exponent}`;
  }

  let resultString = "";

  for (let i = 0; i <= exponentNumber; i++) {
    const binominalCoeff = binomialCoeff(exponentNumber, i);

    const result =
      binominalCoeff *
      aParsed.coefficient ** (exponentNumber - i) *
      bNumber ** i;

    const termExponent = exponentNumber - i;
    const termExponentString = termExponent > 1 ? `^${termExponent}` : "";

    if (result === 1 && i === 0) {
      resultString += `${aParsed.variable}${termExponentString}`;
    } else if (result === -1 && i === 0) {
      resultString += `-${aParsed.variable}${termExponentString}`;
    } else if (result === 1 && i !== 0 && termExponent !== 0) {
      resultString += `+${aParsed.variable}${termExponentString}`;
    } else if (result === 1 && i !== 0 && termExponent === 0) {
      resultString += `+${result}`;
    } else {
      if (result > 0 && termExponent === 0) {
        resultString += `+${result}`;
      } else if (result > 0 && termExponent !== 0 && i !== 0) {
        resultString += `+${result}${aParsed.variable}${termExponentString}`;
      } else if (result < 0 && termExponent === 0) {
        resultString += `${result}`;
      } else {
        resultString += `${result}${aParsed.variable}${termExponentString}`;
      }
    }
  }

  return resultString;
}

export function parseA(a: string) {
  const aRegex = /(?<coefficient>\-?\d*)(?<variable>[a-z])/;
  const match = a.match(aRegex);

  if (!match) {
    throw new Error("Invalid input");
  }

  const { coefficient, variable } = match.groups as {
    coefficient: string;
    variable: string;
  };

  if (coefficient === "") {
    return { coefficient: 1, variable };
  }

  if (coefficient === "-") {
    return { coefficient: -1, variable };
  }

  const coefficientNumber = parseInt(coefficient);

  return { coefficient: coefficientNumber, variable };
}

export function removeBraces(input: string) {
  if (input[0] === "(" && input[input.length - 1] === ")") {
    return input.slice(1, -1);
  }
  return input;
}

export function binomialCoeff(n: number, k: number) {
  let res = 1;
  if (k > n - k) k = n - k;
  for (let i = 0; i < k; ++i) {
    res *= n - i;
    res /= i + 1;
  }

  return res;
}
