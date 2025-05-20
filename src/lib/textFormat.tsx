import React, { type JSX } from 'react';

// Helper to format inline markdown-like syntax
const formatInline = (text: string): React.ReactNode[] => {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/);
  return parts.map((part, i) => {
    if (/^\*\*(.*)\*\*$/.test(part)) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (/^\*(.*)\*$/.test(part)) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    if (/^`(.*)`$/.test(part)) {
      return <code key={i} className="bg-gray-100 px-1 rounded">{part.slice(1, -1)}</code>;
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
};

const formatAITextToJSX = (input: string): JSX.Element[] => {
  const lines = input.split('\n').filter(Boolean);
  const output: JSX.Element[] = [];
  let listItems: string[] = [];

  lines.forEach((line, idx) => {
    if (/^(\*|\-|\d+\.)\s/.test(line)) {
      listItems.push(line);
    } else {
      // If we have list items pending, flush them
      if (listItems.length) {
        output.push(
          <ul key={`ul-${idx}`} className="list-disc pl-5 space-y-1">
            {listItems.map((item, i) => {
              const text = item.replace(/^(\*|\-|\d+\.)\s/, '');
              return <li key={i}>{formatInline(text)}</li>;
            })}
          </ul>
        );
        listItems = [];
      }
      output.push(
        <p key={`p-${idx}`} className="mb-2">
          {formatInline(line.trim())}
        </p>
      );
    }
  });

  // Flush remaining list items at the end
  if (listItems.length) {
    output.push(
      <ul key={`ul-final`} className="list-disc pl-5 space-y-1">
        {listItems.map((item, i) => {
          const text = item.replace(/^(\*|\-|\d+\.)\s/, '');
          return <li key={i}>{formatInline(text)}</li>;
        })}
      </ul>
    );
  }

  return output;
};

export const formattedResponse = (rawText: string) => {
  const content = formatAITextToJSX(rawText);
  return <div className="text-sm leading-relaxed space-y-2">{content}</div>;
};