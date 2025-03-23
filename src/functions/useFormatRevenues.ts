export default function useFormatRevenues(r: any) {
    const result = parseFloat(r).toFixed(2);
    return `$ ${result}`;
}
  