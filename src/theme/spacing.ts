const spacing = (...values: number[]) =>
  values
    .map((i) => i > 0 ? `${i/2}rem` : 0)
    .join(',')
export default spacing
