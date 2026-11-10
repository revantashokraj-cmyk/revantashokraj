import { Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function BlueprintPreview({ src, title }: { src: string; title: string }) {
  return <Dialog>
    <DialogTrigger asChild>
      <Button variant="ghost" className="blueprint-preview group relative block h-auto w-full overflow-hidden p-0" aria-label={`Enlarge ${title} drawing`}>
        <img src={src} alt={`Illustrative blueprint drawing of ${title}`} width={1024} height={768} className="aspect-[4/3] w-full object-contain" />
        <span className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center border border-border bg-background text-foreground"><Maximize2 /></span>
      </Button>
    </DialogTrigger>
    <DialogContent className="max-h-[90dvh] max-w-5xl overflow-auto border-border bg-background p-6">
      <DialogTitle className="pr-6 font-display">{title}</DialogTitle>
      <img src={src} alt={`Enlarged illustrative blueprint of ${title}`} className="max-h-[72dvh] w-full object-contain" />
    </DialogContent>
  </Dialog>;
}