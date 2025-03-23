import useFormatRevenues from "./useFormatRevenues";

export default function useGetBestCountry(i: any) {
  const itemCopy = { ...i };
  delete itemCopy.data;
  delete itemCopy.app;
  delete itemCopy.totalRevenues;
  delete itemCopy.totalViews;
  delete itemCopy.totalConversions;
  let bestCountryValue = 0;
  let bestCountryName = "";

  for (const property in itemCopy) {
    if (itemCopy[property] > bestCountryValue) {
      bestCountryValue = itemCopy[property];
      bestCountryName = property;
    }
  }

  return `${bestCountryName.slice(-2)} with a total of ${useFormatRevenues(
    bestCountryValue
  )}.`;
}

