interface OutputCardProps {
  toolName: string;
  model: string;
  output: string;
  generatedAt: string;
  websiteUrl: string;
  affiliateUrl: string;
}

export default function OutputCard({
  toolName,
  model,
  output,
  generatedAt,
  websiteUrl,
  affiliateUrl,
}: OutputCardProps) {
  const href = affiliateUrl || websiteUrl;
  const rel = affiliateUrl ? "noopener noreferrer sponsored" : "noopener noreferrer";

  return (
    <div className="bg-white border border-gray-200 rounded-xl flex flex-col">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <p className="font-bold text-gray-900">{toolName}</p>
          <p className="text-xs text-gray-400 mt-0.5">{model}</p>
        </div>
        <span className="text-xs text-gray-300">{generatedAt}</span>
      </div>

      {/* Output */}
      <div className="px-5 py-4 flex-1">
        <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{output}</p>
      </div>

      {/* CTA */}
      <div className="px-5 py-4 border-t border-gray-100">
        <a
          href={href}
          target="_blank"
          rel={rel}
          className="block text-center bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-2.5 rounded-lg transition-colors text-sm"
        >
          Try {toolName} free →
        </a>
      </div>
    </div>
  );
}
