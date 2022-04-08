export const unit = (unit) => {
  let converted;
  switch (unit) {
    case 0:
      converted = "Kg";
      break;
    case 1:
      converted = "Gr";
      break;
    case 2:
      converted = "L";
      break;
    case 3:
      converted = "Ml";
      break;
    case 4:
      converted = "Kom";
      break;
    default:
      break;
  }
  return converted;
};

export const unitReverse = (unit) => {
  let converted;
  switch (unit) {
    case "kg":
      converted = 0;
      break;
    case "gr":
      converted = 1;
      break;
    case "l":
      converted = 2;
      break;
    case "ml":
      converted = 3;
      break;
    case "kom":
      converted = 4;
      break;
    default:
      break;
  }
  return converted;
};
