/**
 * MarkdownContent — lightweight markdown-like renderer for article content.
 *
 * Supported syntax:
 *   ## H2 heading       → <h2> with anchor ID
 *   ### H3 heading      → <h3>
 *   **bold**            → <strong>
 *   *italic*            → <em>
 *   - item / * item     → <ul><li>
 *   1. item             → <ol><li>
 *   > blockquote        → <blockquote>
 *   [text](url)         → <a>
 *   ---                 → <hr>
 *   regular text        → <p>
 */

function toAnchorId(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9äöüàéèêïôùûç]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Render inline formatting: bold, italic, links */
function renderInline(text, idx) {
  // Process links, bold, and italic
  // Order: links first, then bold, then italic
  const parts = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Find the earliest match of any pattern
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    const italicMatch = remaining.match(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/);

    const matches = [
      linkMatch && { type: 'link', index: linkMatch.index, length: linkMatch[0].length, match: linkMatch },
      boldMatch && { type: 'bold', index: boldMatch.index, length: boldMatch[0].length, match: boldMatch },
      italicMatch && { type: 'italic', index: italicMatch.index, length: italicMatch[0].length, match: italicMatch },
    ].filter(Boolean);

    if (matches.length === 0) {
      parts.push(remaining);
      break;
    }

    // Pick earliest match
    matches.sort((a, b) => a.index - b.index);
    const earliest = matches[0];

    // Add text before match
    if (earliest.index > 0) {
      parts.push(remaining.substring(0, earliest.index));
    }

    if (earliest.type === 'link') {
      parts.push(
        <a
          key={`${idx}-${key++}`}
          href={earliest.match[2]}
          className="text-forest underline decoration-sage/40 hover:text-sage hover:decoration-sage transition-colors"
        >
          {earliest.match[1]}
        </a>
      );
    } else if (earliest.type === 'bold') {
      parts.push(
        <strong key={`${idx}-${key++}`} className="font-semibold">
          {earliest.match[1]}
        </strong>
      );
    } else if (earliest.type === 'italic') {
      parts.push(
        <em key={`${idx}-${key++}`}>{earliest.match[1]}</em>
      );
    }

    remaining = remaining.substring(earliest.index + earliest.length);
  }

  return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : parts;
}

/** Parse content string into typed blocks */
function parseBlocks(content) {
  const lines = content.split('\n');
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines
    if (trimmed === '') {
      i++;
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(trimmed)) {
      blocks.push({ type: 'hr' });
      i++;
      continue;
    }

    // H2 heading
    if (trimmed.startsWith('## ') && !trimmed.startsWith('### ')) {
      const text = trimmed.replace(/^## /, '');
      blocks.push({ type: 'h2', text, id: toAnchorId(text) });
      i++;
      continue;
    }

    // H3 heading
    if (trimmed.startsWith('### ')) {
      const text = trimmed.replace(/^### /, '');
      blocks.push({ type: 'h3', text });
      i++;
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      const quoteLines = [];
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        quoteLines.push(lines[i].trim().replace(/^> /, ''));
        i++;
      }
      blocks.push({ type: 'blockquote', text: quoteLines.join(' ') });
      continue;
    }

    // Unordered list
    if (/^[-*] /.test(trimmed)) {
      const items = [];
      while (i < lines.length && /^[-*] /.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*] /, ''));
        i++;
      }
      blocks.push({ type: 'ul', items });
      continue;
    }

    // Ordered list
    if (/^\d+\. /.test(trimmed)) {
      const items = [];
      while (i < lines.length && /^\d+\. /.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\. /, ''));
        i++;
      }
      blocks.push({ type: 'ol', items });
      continue;
    }

    // Paragraph — collect consecutive non-empty, non-special lines
    const paraLines = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].trim().startsWith('## ') &&
      !lines[i].trim().startsWith('### ') &&
      !lines[i].trim().startsWith('> ') &&
      !/^[-*] /.test(lines[i].trim()) &&
      !/^\d+\. /.test(lines[i].trim()) &&
      !/^---+$/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }

    if (paraLines.length > 0) {
      blocks.push({ type: 'p', text: paraLines.join(' ') });
    }
  }

  return blocks;
}

export default function MarkdownContent({ content, isFirstLead = true }) {
  if (!content) return null;

  const blocks = parseBlocks(content);
  let paragraphIndex = 0;

  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'hr':
            return <hr key={i} className="border-t border-sage/20 my-10" />;

          case 'h2':
            return (
              <h2
                key={i}
                id={block.id}
                className="font-serif font-bold text-forest text-2xl mt-10 mb-5 scroll-mt-24"
              >
                {block.text}
              </h2>
            );

          case 'h3':
            return (
              <h3
                key={i}
                className="font-serif font-semibold text-forest text-xl mt-8 mb-4"
              >
                {block.text}
              </h3>
            );

          case 'blockquote':
            return (
              <blockquote
                key={i}
                className="border-l-2 border-sage pl-6 italic font-sans text-lg text-charcoal-light leading-relaxed mb-6"
              >
                {renderInline(block.text, i)}
              </blockquote>
            );

          case 'ul':
            return (
              <ul key={i} className="list-disc pl-6 mb-6 space-y-2 font-sans text-lg leading-relaxed text-charcoal">
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item, `${i}-${j}`)}</li>
                ))}
              </ul>
            );

          case 'ol':
            return (
              <ol key={i} className="list-decimal pl-6 mb-6 space-y-2 font-sans text-lg leading-relaxed text-charcoal">
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item, `${i}-${j}`)}</li>
                ))}
              </ol>
            );

          case 'p': {
            const isLead = isFirstLead && paragraphIndex === 0;
            paragraphIndex++;
            return (
              <p
                key={i}
                className={
                  isLead
                    ? 'font-sans text-xl leading-relaxed text-charcoal mb-7'
                    : 'font-sans text-lg leading-relaxed text-charcoal mb-6'
                }
              >
                {renderInline(block.text, i)}
              </p>
            );
          }

          default:
            return null;
        }
      })}
    </>
  );
}
