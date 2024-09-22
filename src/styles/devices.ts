const breakpoints = {
  small: "1000px",
  medium: "1200px",
  large: "1700px",
}
/**
 * md 900px 이상
 * large 1600px 이상
 */
export const devices = {
  sm: `(min-width: ${breakpoints.small})`,
  md: `(min-width: ${breakpoints.medium})`,
  lg: `(min-width: ${breakpoints.large})`,
}
