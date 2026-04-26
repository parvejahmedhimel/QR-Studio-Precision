"use client" 

import * as React from "react"
import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Type, 
  Palette, 
  Maximize, 
  ShieldCheck, 
  Download, 
  FileCode, 
  FileJson,
  RotateCcw,
  RefreshCw,
  Sparkles,
  Share2
} from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Slider } from "@/src/components/ui/slider";
import { cn } from "@/src/lib/utils";

export function QRCodeGenerator() {
  const [url, setUrl] = useState("https://google.com");
  const [qrCode, setQRCode] = useState("https://google.com");
  const [color, setColor] = useState("#4f46e5");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [size, setSize] = useState(240);
  const [errorCorrection, setErrorCorrection] = useState("M");
  const [isGenerating, setIsGenerating] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setCanShare(!!navigator.share);
  }, []);

  const generateQRCode = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    // Simulate a brief generation "processing" state for tactile feel
    setTimeout(() => {
      setQRCode(url);
      setIsGenerating(false);
    }, 400);
  };

  const handleReset = () => {
    setUrl("");
    setQRCode("");
    setColor("#4f46e5");
    setBackgroundColor("#ffffff");
    setSize(240);
    setErrorCorrection("M");
  };

  const handleShare = async () => {
    if (!navigator.share) return;
    
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = size;
      canvas.height = size;
      
      const svgElement = qrRef.current?.querySelector("svg");
      if (!svgElement) return;

      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const blobUrl = URL.createObjectURL(svgBlob);
      
      const img = new Image();
      img.src = blobUrl;
      img.onload = async () => {
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(blobUrl);
        
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          const file = new File([blob], "qrcode.png", { type: "image/png" });
          
          try {
            await navigator.share({
              files: [file],
              title: 'QR Code',
              text: `Generated via QR Studio Precision: ${qrCode}`
            });
          } catch (e) {
            console.log("Sharing cancelled or failed");
          }
        }, "image/png");
      };
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const downloadSVG = () => {
    const svgElement = qrRef.current?.querySelector("svg");
    if (svgElement) {
      const serializer = new XMLSerializer();
      const svgBlob = new Blob([serializer.serializeToString(svgElement)], {
        type: "image/svg+xml",
      });
      const url = URL.createObjectURL(svgBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "qrcode-design.svg";
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const downloadPNG = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;
    
    const svgElement = qrRef.current?.querySelector("svg");
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "qrcode-design.png";
      link.click();
      URL.revokeObjectURL(url);
    };
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
    >
      {/* Configuration Sidebar */}
      <div className="lg:col-span-5 space-y-4 sm:space-y-6">
        <Card className="border-slate-200/60 shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50/50 p-4 sm:p-6 border-bottom border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm sm:text-lg font-bold flex items-center gap-2">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600" />
                  Configuration
                </CardTitle>
                <CardDescription className="text-[10px] sm:text-sm">Adjust your QR code parameters</CardDescription>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleReset}
                className="h-8 w-8 text-slate-400 hover:text-slate-600"
                title="Reset to defaults"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-6 sm:space-y-8">
            {/* Section: Content */}
            <motion.div variants={itemVariants} className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                <Type className="w-2.5 h-2.5" />
                <span>Content Source</span>
              </div>
              <form onSubmit={generateQRCode} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://yourlink.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    className="flex-1 font-mono text-xs sm:text-sm border-slate-200 focus:ring-indigo-500 h-11 sm:h-10"
                  />
                  <Button type="submit" disabled={isGenerating} className="shadow-sm h-11 sm:h-10 w-full sm:w-auto">
                    {isGenerating ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      "Apply"
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>

            {/* Section: Appearance */}
            <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                <Palette className="w-2.5 h-2.5" />
                <span>Visual Identity</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="color" className="text-[10px] text-slate-500 uppercase tracking-tight flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                    Forecolor
                  </Label>
                  <div className="relative group/color">
                    <label className="flex items-center gap-3 p-3 sm:p-2 border border-slate-200 rounded-lg sm:rounded-md bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer">
                      <div 
                        className="w-8 h-8 sm:w-6 sm:h-6 rounded-full border shadow-sm ring-2 ring-offset-2 ring-transparent group-hover/color:ring-slate-200 transition-all duration-200"
                        style={{ backgroundColor: color }}
                      />
                      <input
                        type="color"
                        id="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="opacity-0 absolute inset-0 cursor-pointer w-full h-full"
                      />
                      <div className="flex flex-col">
                        <span className="text-[9px] font-mono uppercase text-slate-400 font-bold leading-none mb-1 sm:block hidden">HEX</span>
                        <span className="text-xs font-mono uppercase text-slate-800 font-bold leading-none">{color}</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="backgroundColor" className="text-[10px] text-slate-500 uppercase tracking-tight flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full border" style={{ backgroundColor: backgroundColor }} />
                    Background
                  </Label>
                  <div className="relative group/color">
                    <label className="flex items-center gap-3 p-3 sm:p-2 border border-slate-200 rounded-lg sm:rounded-md bg-white hover:bg-slate-50 transition-colors cursor-pointer">
                      <div 
                        className="w-8 h-8 sm:w-6 sm:h-6 rounded-full border shadow-sm ring-2 ring-offset-2 ring-transparent group-hover/color:ring-slate-200 transition-all duration-200"
                        style={{ backgroundColor: backgroundColor }}
                      />
                      <input
                        type="color"
                        id="backgroundColor"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="opacity-0 absolute inset-0 cursor-pointer w-full h-full"
                      />
                      <div className="flex flex-col">
                        <span className="text-[9px] font-mono uppercase text-slate-400 font-bold leading-none mb-1 sm:block hidden">HEX</span>
                        <span className="text-xs font-mono uppercase text-slate-800 font-bold leading-none">{backgroundColor}</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Section: Advanced */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                <Maximize className="w-2.5 h-2.5" />
                <span>Precision & Scale</span>
              </div>

              <div className="space-y-6 sm:space-y-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="size" className="text-[10px] text-slate-500 uppercase tracking-wide">Dimension</Label>
                    <span className="text-[10px] font-mono font-bold bg-slate-100 px-2 py-0.5 rounded text-indigo-600">{size}px</span>
                  </div>
                  <Slider
                    id="size"
                    min={120}
                    max={600}
                    step={10}
                    value={[size]}
                    onValueChange={(v) => v[0] && setSize(v[0])}
                    className="py-2"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="w-2.5 h-2.5 text-slate-400" />
                    <Label htmlFor="errorCorrection" className="text-[10px] text-slate-500 uppercase tracking-wide">Error Correction</Label>
                  </div>
                  <Select value={errorCorrection} onValueChange={setErrorCorrection}>
                    <SelectTrigger id="errorCorrection" className="w-full border-slate-200 bg-slate-50/30 text-xs h-11 sm:h-10">
                      <SelectValue placeholder="Precision" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L" className="text-xs">Level L (Standard - 7%)</SelectItem>
                      <SelectItem value="M" className="text-xs">Level M (Optimized - 15%)</SelectItem>
                      <SelectItem value="Q" className="text-xs">Level Q (Enhanced - 25%)</SelectItem>
                      <SelectItem value="H" className="text-xs">Level H (Maximum - 30%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </div>

      {/* Preview Stage */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="relative group perspective-1000">
          <motion.div
            layout
            className="w-full aspect-square flex items-center justify-center p-4 sm:p-8 rounded-2xl border-2 border-dashed border-slate-200 bg-white/50 backdrop-blur-sm relative overflow-hidden h-[300px] sm:h-[400px] lg:h-[500px]"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            
            <AnimatePresence mode="wait">
              {qrCode ? (
                <motion.div
                  key={qrCode + color + backgroundColor + size}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="relative z-10 max-w-full"
                  ref={qrRef}
                >
                  <div className="relative p-4 sm:p-6 bg-white rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] transition-transform duration-500 sm:hover:scale-[1.02]">
                    <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-3xl blur-xl opacity-0 sm:group-hover:opacity-100 transition-opacity duration-700" />
                    <QRCodeSVG
                      value={qrCode}
                      size={Math.min(size, 260, 400)} // Responsive size limit
                      fgColor={color}
                      bgColor={backgroundColor}
                      level={errorCorrection as "L" | "M" | "Q" | "H"}
                      includeMargin={true}
                      className="rounded-lg relative z-10 w-full h-auto max-w-[240px] sm:max-w-none"
                    />
                  </div>
                  
                  {/* Technical Meta under the QR */}
                  <div className="mt-6 sm:mt-8 flex justify-center items-center gap-3 sm:gap-6 text-[9px] sm:text-xs font-mono text-slate-400 bg-slate-100/50 py-2 px-3 sm:px-4 rounded-full border border-slate-200/60 transition-all duration-300">
                    <span className="flex items-center gap-1.5 font-bold text-indigo-500">
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-indigo-500" />
                      {size}px
                    </span>
                    <span className="opacity-30">|</span>
                    <span className="tracking-tight uppercase">{errorCorrection}-TYPE</span>
                    <span className="opacity-30 sm:block hidden">|</span>
                    <span className="font-semibold text-slate-600 sm:block hidden">{color}</span>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-300">
                    <FileCode className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm font-medium">No configuration applied</p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <Button 
              disabled={!qrCode}
              onClick={downloadPNG} 
              variant="outline"
              className={cn(
                "h-12 sm:h-14 text-xs sm:text-sm font-bold border-2 border-slate-200/80 bg-white hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-2",
                !qrCode && "opacity-50"
              )}
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>PNG IMAGE</span>
            </Button>
            <Button 
              disabled={!qrCode}
              onClick={downloadSVG}
              variant="outline"
              className={cn(
                "h-12 sm:h-14 text-xs sm:text-sm font-bold border-2 border-slate-200/80 bg-white hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-2",
                !qrCode && "opacity-50"
              )}
            >
              <FileCode className="w-4 h-4 text-slate-500" />
              <span>SVG VECTOR</span>
            </Button>
          </div>
          
          <AnimatePresence>
            {canShare && qrCode && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <Button 
                  onClick={handleShare}
                  className="w-full h-12 sm:h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 rounded-xl"
                >
                  <Share2 className="w-4 h-4" />
                  <span>SHARE QR CODE</span>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="px-1 py-1 sm:block hidden">
          <p className="text-[10px] text-slate-400 text-center uppercase tracking-[0.2em] font-bold">
            Precision Generated • Production Ready • Vector Compatible
          </p>
        </div>
      </div>
    </motion.div>
  );
}

