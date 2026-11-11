interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Serialize JSON-LD safely. Escaping `<` prevents a `</script>` sequence in
 * data from terminating the script tag.
 */
export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
