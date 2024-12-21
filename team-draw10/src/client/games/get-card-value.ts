export const getCardValue = (value: number): string => {
    if (value === 0) {
      return "error";
    } else {
      return value.toString();
    }
  };