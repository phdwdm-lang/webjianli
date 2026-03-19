import { ReactNode } from "react";

const DATA_PATTERN =
  /(\d[\d,]*\.?\d*\+?(?:\s*(?:种|家|次|份|个|项|分钟|万|场|位|步|类|款)))|(\d[\d,]*\.?\d*\+?%?)|(?:第\d+)/g;

export function highlightData(text: string): ReactNode {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  const regex = new RegExp(DATA_PATTERN.source, "g");

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <span
        key={match.index}
        className="font-semibold text-inherit whitespace-nowrap"
      >
        {match[0]}
      </span>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}
