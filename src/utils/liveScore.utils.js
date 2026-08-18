export function ballStyle(kind) {
  switch (kind) {
    case "wicket":
      return { bg: "var(--color-accent-red)", fg: "#ffffff" };
    case "six":
    case "boundary":
      return { bg: "var(--color-accent-green)", fg: "#ffffff" };
    default:
      return { bg: "var(--color-badge-up-bg)", fg: "var(--color-text-onLight)" };
  }
}