
"use client"

import * as React from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FileCard } from "@/components/ui/file-card"
import { FileCode, Palette, Terminal, Zap, Trash2, Scissors } from "lucide-react"

export function ExtractorTool() {
  const [inputCode, setInputCode] = React.useState("")
  const [extracted, setExtracted] = React.useState({
    html: "",
    css: "",
    js: ""
  })

  const handleExtract = () => {
    if (!inputCode.trim()) return

    const parser = new DOMParser()
    const doc = parser.parseFromString(inputCode, "text/html")

    // Extract Styles
    const styles: string[] = []
    const styleTags = doc.querySelectorAll("style")
    styleTags.forEach((tag) => {
      if (tag.textContent) styles.push(tag.textContent)
      tag.remove()
    })

    // Extract Scripts
    const scripts: string[] = []
    const scriptTags = doc.querySelectorAll("script")
    scriptTags.forEach((tag) => {
      // Only extract internal scripts
      if (!tag.src && tag.textContent) {
        scripts.push(tag.textContent)
        tag.remove()
      }
    })

    // Prepare modified HTML
    // We add a link to the new external files if they exist
    if (styles.length > 0) {
      const link = doc.createElement("link")
      link.rel = "stylesheet"
      link.href = "style.css"
      doc.head.appendChild(link)
    }

    if (scripts.length > 0) {
      const script = doc.createElement("script")
      script.src = "script.js"
      doc.body.appendChild(script)
    }

    setExtracted({
      html: doc.documentElement.outerHTML,
      css: styles.join("\n\n"),
      js: scripts.join("\n\n")
    })
  }

  const handleClear = () => {
    setInputCode("")
    setExtracted({ html: "", css: "", js: "" })
  }

  return (
    <div className="space-y-8 w-full">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-card rounded-xl shadow-lg p-6">
          <label className="block text-sm font-medium mb-3 text-muted-foreground flex items-center gap-2">
            <Zap className="w-4 h-4 text-accent" />
            Paste your HTML code here
          </label>
          <Textarea
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="<html>..."
            className="min-h-[300px] font-code text-sm bg-slate-50 border-primary/20 focus-visible:ring-primary"
          />
          <div className="flex gap-3 mt-6">
            <Button 
              size="lg" 
              onClick={handleExtract}
              className="bg-accent hover:bg-accent/90 text-accent-foreground flex-1 sm:flex-none font-bold shadow-lg transition-all active:scale-95"
            >
              <Scissors className="mr-2 h-5 w-5" />
              Split Code
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={handleClear}
              className="flex-1 sm:flex-none"
            >
              <Trash2 className="mr-2 h-5 w-5" />
              Clear
            </Button>
          </div>
        </div>
      </div>

      {extracted.html && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <FileCard
            title="HTML"
            fileName="index.html"
            content={extracted.html}
            language="html"
            icon={<FileCode className="w-5 h-5 text-blue-500" />}
          />
          <FileCard
            title="CSS"
            fileName="style.css"
            content={extracted.css}
            language="css"
            icon={<Palette className="w-5 h-5 text-pink-500" />}
          />
          <FileCard
            title="JavaScript"
            fileName="script.js"
            content={extracted.js}
            language="javascript"
            icon={<Terminal className="w-5 h-5 text-yellow-500" />}
          />
        </div>
      )}
    </div>
  )
}
