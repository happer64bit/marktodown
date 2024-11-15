"use client";
import { useState, useEffect, useCallback } from "react";
import markdownProcessor from "@/lib/markdown";
import { Button } from "@/components/ui/button";
import {
  BookOpenIcon,
  Code2Icon,
  CopyIcon,
  FileOutputIcon,
  ShareIcon,
  SplitSquareHorizontal,
} from "lucide-react";
import Link from "next/link";
import { useDebounce } from "@/hooks/useDebounce";
import MarkdownEditor from "@/components/MarkdownEditor";
import MarkdownPreview from "@/components/MarkdownPreview";
import ViewModeButton from "@/components/ViewModeButton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const DEBOUNCE_DELAY = 300;

export default function Home() {
  const [text, setText] = useState("# Hello World");
  const [html, setHtml] = useState("");
  const [viewMode, setViewMode] = useState("split");
  const [isExporting, setIsExporting] = useState(false);
  const [id, setId] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const debouncedText = useDebounce(text, DEBOUNCE_DELAY);

  // Process markdown text
  useEffect(() => {
    let isMounted = true;

    const processMarkdown = async () => {
      try {
        const processedHtml = await markdownProcessor.process(debouncedText);
        if (isMounted) {
          setHtml(processedHtml.toString());
        }
      } catch (error) {
        console.error("Error processing markdown:", error);
      }
    };

    processMarkdown();
    return () => {
      isMounted = false;
    };
  }, [debouncedText]);

  // Share function
  const shareContent = async () => {
    try {
      const res = await fetch("/api/share", {
        method: "POST",
        body: JSON.stringify({ content: text }),
      });
      const json = await res.json();
      setId(json.id);
      setDialogOpen(true);
    } catch (error) {
      console.error("Error sharing content:", error);
    }
  };

  // Export markdown as .md file
  const exportMarkdown = () => {
    setIsExporting(true);
    try {
      const blob = new Blob([text], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `document_${new Date().toISOString().split("T")[0]}.md`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting markdown:", error);
    } finally {
      setIsExporting(false);
    }
  };

  // Copy shareable link to clipboard
  const copyLink = async () => {
    "use client"
    try {
      if (typeof window != "undefined") {
        await navigator.clipboard.writeText(`${origin ?? "http://localhost:3000"}/${id}`);
        toast({
          title: "Link copied to clipboard!"
        });
      }
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  // View mode handlers
  const showEditorOnly = useCallback(() => setViewMode("editor"), []);
  const showPreviewOnly = useCallback(() => setViewMode("preview"), []);
  const showSplitView = useCallback(() => setViewMode("split"), []);

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Link</DialogTitle>
            <DialogDescription>Share this link with others.</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                id="link"
                defaultValue={`${process.env.NEXT_PUBLIC_BASE_URL}/${id}`}
                readOnly
              />
            </div>
            <Button onClick={copyLink} size="sm" className="px-3">
              <span className="sr-only">Copy</span>
              <CopyIcon />
            </Button>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="h-screen bg-neutral-900 text-white flex flex-col">
        <nav className="flex items-center gap-4 border-b border-b-white/10 py-2 px-4">
          <Link href="/" prefetch={false}>
            <h1 className="text-lg font-bold">MarkToDown</h1>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <Button onClick={shareContent} variant="outline" className="flex items-center gap-2">
              <ShareIcon />
            </Button>
            <Button onClick={exportMarkdown} variant="default" disabled={isExporting} className="flex items-center gap-2">
              <FileOutputIcon className={isExporting ? "animate-spin" : ""} />
              {isExporting ? "Exporting..." : "Export Markdown"}
            </Button>
          </div>
        </nav>

        <div className={`flex-1 grid ${viewMode === "split" ? "lg:grid-cols-2" : "grid-cols-1"} divide-x divide-white/10`}>
          {(viewMode === "split" || viewMode === "editor") && <MarkdownEditor value={text} onChange={setText} />}
          {(viewMode === "split" || viewMode === "preview") && <MarkdownPreview html={html} />}
        </div>

        <div className="fixed right-10 top-16 flex items-center gap-4 bg-neutral-800 p-2 rounded shadow-lg">
          <ViewModeButton icon={Code2Icon} onClick={showEditorOnly} isActive={viewMode === "editor"} title="Editor View" />
          <ViewModeButton icon={SplitSquareHorizontal} onClick={showSplitView} isActive={viewMode === "split"} title="Split View" />
          <ViewModeButton icon={BookOpenIcon} onClick={showPreviewOnly} isActive={viewMode === "preview"} title="Preview View" />
        </div>
      </div>
    </>
  );
}
