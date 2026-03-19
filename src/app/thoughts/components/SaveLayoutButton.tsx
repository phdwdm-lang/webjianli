"use client";

import { Copy, PencilRuler } from "lucide-react";

interface SaveLayoutButtonProps {
  editMode: boolean;
  status?: string;
  onToggleEditMode: () => void;
  onCopyLayout: () => void;
}

export function SaveLayoutButton({
  editMode,
  status,
  onToggleEditMode,
  onCopyLayout,
}: SaveLayoutButtonProps) {
  return (
    <div className="fixed bottom-20 right-4 z-[90] flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      {status ? (
        <p className="max-w-[240px] rounded-full border border-black/10 bg-white/90 px-4 py-2 text-right text-xs text-gray-600 shadow-sm backdrop-blur">
          {status}
        </p>
      ) : null}

      <div className="flex items-center gap-2 rounded-2xl border border-black/10 bg-white/90 p-2 shadow-lg backdrop-blur">
        <button
          type="button"
          className={`inline-flex h-11 items-center gap-2 rounded-xl px-4 text-sm transition ${
            editMode
              ? "bg-[var(--section-color)] text-white"
              : "bg-transparent text-gray-700 hover:bg-black/5"
          }`}
          onClick={onToggleEditMode}
        >
          <PencilRuler size={16} />
          {editMode ? "完成编辑" : "布局编辑"}
        </button>

        <button
          type="button"
          className="inline-flex h-11 items-center gap-2 rounded-xl border border-black/10 bg-white px-4 text-sm text-gray-700 transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={onCopyLayout}
          disabled={!editMode}
        >
          <Copy size={16} />
          保存布局
        </button>
      </div>
    </div>
  );
}
