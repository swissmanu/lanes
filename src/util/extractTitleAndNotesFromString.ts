export default function extractTitleAndNotesFromString(
  s: string
): [title: string | undefined, notes: string | undefined] {
  const [title, ...notes] = s.split("\n");

  return [title, notes.length > 0 ? notes.join("\n") : undefined];
}
