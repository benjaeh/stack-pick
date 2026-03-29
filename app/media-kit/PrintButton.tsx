"use client";

export function PrintButtonTop() {
  return (
    <div className="no-print bg-gray-50 border-b border-gray-100 py-3 px-6 flex items-center justify-between">
      <span className="text-sm text-gray-500">
        Press{" "}
        <kbd className="bg-white border border-gray-200 rounded px-1.5 py-0.5 text-xs font-mono">
          Cmd+P
        </kbd>{" "}
        → Save as PDF to export
      </span>
      <button
        onClick={() => window.print()}
        className="bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
      >
        Download PDF →
      </button>
    </div>
  );
}

export function PrintButtonBottom() {
  return (
    <div className="no-print py-8 text-center">
      <button
        onClick={() => window.print()}
        className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
      >
        Save as PDF →
      </button>
    </div>
  );
}
