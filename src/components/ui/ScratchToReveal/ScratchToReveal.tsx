import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import "./ScratchToReveal.css";

interface ScratchToRevealProps {
  children: React.ReactNode;
  width: number;
  height: number;
  minScratchPercentage?: number;
  className?: string;
  onComplete?: () => void;
  gradientColors?: [string];
  maskImage?: string;
}

const ScratchToReveal: React.FC<ScratchToRevealProps> = ({
  width,
  height,
  minScratchPercentage = 50,
  onComplete,
  children,
  className,
  gradientColors = ["#a3775f"],
  maskImage,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const controls = useAnimation();

  const scratch = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left + 16;
      const y = clientY - rect.top + 16;
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  const startAnimation = useCallback(async () => {
    await controls.start({
      scale: [1, 1.5, 1],
      rotate: [0, 10, -10, 10, -10, 0],
      transition: { duration: 0.5 },
    });

    if (onComplete) {
      onComplete();
    }
  }, [controls, onComplete]);

  const checkCompletion = useCallback(() => {
    if (isComplete) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      const totalPixels = pixels.length / 4;
      let clearPixels = 0;

      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) clearPixels++;
      }

      const percentage = (clearPixels / totalPixels) * 100;

      if (percentage >= minScratchPercentage) {
        setIsComplete(true);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        startAnimation();
      }
    }
  }, [isComplete, minScratchPercentage, startAnimation]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    
    if (!canvas || !ctx) return;

    if (maskImage) {
      // Utiliser l'image comme masque pour la forme
      const img = new Image();
      img.onload = () => {
        // Effacer le canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Dessiner l'image comme masque
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Créer le gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, gradientColors[0]);
        
        // Appliquer le gradient uniquement sur la forme de l'image
        ctx.globalCompositeOperation = "source-in";
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Réinitialiser le mode de composition
        ctx.globalCompositeOperation = "source-over";
      };
      img.src = maskImage;
    } else {
      // Mode rectangle simple (par défaut)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, gradientColors[0]);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, [gradientColors, maskImage, width, height]);

  useEffect(() => {
    const handleDocumentMouseMove = (event: MouseEvent) => {
      if (!isScratching) return;
      scratch(event.clientX, event.clientY);
    };

    const handleDocumentTouchMove = (event: TouchEvent) => {
      if (!isScratching) return;
      const touch = event.touches[0];
      scratch(touch.clientX, touch.clientY);
    };

    const handleDocumentMouseUp = () => {
      setIsScratching(false);
      checkCompletion();
    };

    const handleDocumentTouchEnd = () => {
      setIsScratching(false);
      checkCompletion();
    };

    document.addEventListener("mousedown", handleDocumentMouseMove);
    document.addEventListener("mousemove", handleDocumentMouseMove);
    document.addEventListener("touchstart", handleDocumentTouchMove);
    document.addEventListener("touchmove", handleDocumentTouchMove);
    document.addEventListener("mouseup", handleDocumentMouseUp);
    document.addEventListener("touchend", handleDocumentTouchEnd);
    document.addEventListener("touchcancel", handleDocumentTouchEnd);

    return () => {
      document.removeEventListener("mousedown", handleDocumentMouseMove);
      document.removeEventListener("mousemove", handleDocumentMouseMove);
      document.removeEventListener("touchstart", handleDocumentTouchMove);
      document.removeEventListener("touchmove", handleDocumentTouchMove);
      document.removeEventListener("mouseup", handleDocumentMouseUp);
      document.removeEventListener("touchend", handleDocumentTouchEnd);
      document.removeEventListener("touchcancel", handleDocumentTouchEnd);
    };
  }, [isScratching, scratch, checkCompletion]);

  const handleMouseDown = () => setIsScratching(true);

  const handleTouchStart = () => setIsScratching(true);

  return (
    <motion.div
      className={`scratch-to-reveal ${className || ''}`}
      style={{
        width,
        height,
        cursor:
          "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj4KICA8Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNSIgc3R5bGU9ImZpbGw6I2ZmZjtzdHJva2U6IzAwMDtzdHJva2Utd2lkdGg6MXB4OyIgLz4KPC9zdmc+'), auto",
      }}
      animate={controls}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="scratch-to-reveal__canvas"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      ></canvas>
      {children}
    </motion.div>
  );
};

export { ScratchToReveal };