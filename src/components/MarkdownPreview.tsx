"use client";
import { memo } from 'react';

interface MarkdownPreviewProps {
  html: string;
}

const MarkdownPreview = memo(function MarkdownPreview({ html }: MarkdownPreviewProps) {
  return (
    <div
      id="preview"
      className="p-4 prose prose-invert max-w-none overflow-y-auto bg-neutral-900"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
})

export default MarkdownPreview;