interface initialsNameProps {
  name?: string;
}

export function initialsName({ name }: initialsNameProps) {
  if (!name) return "";
  const names = name.split(" ");
  const initials = names
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("");
  return initials.toUpperCase();
}
