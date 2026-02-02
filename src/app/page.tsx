import { ExtractorTool } from "@/components/extractor-tool"
import { Layers, Github } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen pb-20 bg-background text-foreground font-body">
      {/* Navigation / Header */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-default">
            <div className="bg-primary p-1.5 rounded-lg shadow-sm group-hover:rotate-12 transition-transform">
              <Layers className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-headline font-bold text-xl tracking-tight uppercase">CodeSplitter</span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <a 
              href="https://github.com" 
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Simplified Hero Section */}
      <section className="container mx-auto px-4 pt-12 pb-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-headline font-extrabold tracking-tighter text-slate-900 uppercase">
            CodeSplitter
          </h1>
        </div>
      </section>

      {/* Main Tool */}
      <section className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <ExtractorTool />
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-24 border-t py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              <span className="font-headline font-bold text-lg uppercase">CodeSplitter</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              @2026 BEST TEAM BUILDING THIS PROJECT
            </p>
            <div className="flex gap-4">
              <a href="https://github.com" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
