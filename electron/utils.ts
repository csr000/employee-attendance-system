export const writelog = (...args: any[]) => {
  const isProduction: Boolean = false
  if (!isProduction) {
    console.log(...args)
  }
}