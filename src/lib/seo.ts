export function normalizeSeoTitle(value: string) {
  const title = value.replace(/\s+/g, " ").trim();
  if (title.length <= 65) return title;
  const suffixMatch = title.match(/\s\|\sRapidAct(?:\sblog)?$/i);
  const suffix = suffixMatch?.[0] ?? " | RapidAct";
  const base = suffixMatch ? title.slice(0, -suffix.length) : title;
  const limit = 64 - suffix.length;
  const candidate = base.slice(0, limit + 1);
  const wordBoundary = candidate.lastIndexOf(" ");
  const shortened = candidate.slice(
    0,
    wordBoundary >= Math.floor(limit * 0.65) ? wordBoundary : limit
  );
  return `${shortened.trimEnd()}…${suffix}`;
}

export function normalizeSeoDescription(value: string) {
  const description = value.replace(/\s+/g, " ").trim();
  if (description.length <= 165) return description;
  const candidate = description.slice(0, 165);
  const wordBoundary = candidate.lastIndexOf(" ");
  return `${candidate.slice(0, wordBoundary >= 120 ? wordBoundary : 164).trimEnd()}…`;
}
