import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TerminalPreLoader = ({ onComplete }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [scrambledTexts, setScrambledTexts] = useState({});

    const terminalTexts = [
        { text: "Dimensional Coordinates: Alpha/Omega/Prime", highlight: true, top: 0 },
        { text: "Coordinates Locked", highlight: true, top: 0, delay: 0.3 },
        { text: "Quantum Fluctuation Nominal", highlight: false, top: 15 },
        { text: "Initiate Quantum Calibration", highlight: false, top: 30 },
        { text: "Singularity Detected", highlight: true, top: 30, delay: 0.3 },
        { text: "Initiating Spacetime Fold", highlight: false, top: 45 },
        { text: "Beginning Tesseract Unfolding", highlight: true, top: 60 },
        { text: "Scanning Parallel Realities", highlight: false, top: 75 },
        { text: "Hyperdimensional Matrices Aligned", highlight: true, top: 90 },
        { text: "Analyzing Dark Matter Density", highlight: false, top: 105 },
        { text: "Quantum Entanglement Stabilized", highlight: true, top: 165 },
        { text: "Processing Gravitational Waves", highlight: false, top: 180 },
        { text: "Cosmic Strings Vibrating in Harmony", highlight: true, top: 195 },
        { text: "Calibrating Temporal Displacement", highlight: false, top: 210 },
        { text: "Wormhole Aperture Expanding", highlight: true, top: 225 },
        { text: "Evaluating Dimensional Resonance", highlight: false, top: 240 },
        { text: "Dimensional Gateway Stabilizing", highlight: true, top: 255 },
        { text: "Stabilizing Quantum Foam", highlight: false, top: 270 },
        { text: "Reality Parameters Reconfigured", highlight: true, top: 285 }
    ];

    // Scramble effect
    const scrambleText = (text, progress) => {
        const chars = "▪■□▫";
        const length = Math.floor(text.length * progress);
        let result = "";

        for (let i = 0; i < text.length; i++) {
            if (i < length) result += text[i];
            else if (i < length + 3) result += chars[Math.floor(Math.random() * chars.length)];
            else result += " ";
        }
        return result;
    };

    // Preloader logic
    useEffect(() => {
        if (!isLoading) return;

        const duration = 6000;
        const interval = 50;
        let elapsed = 0;

        const timer = setInterval(() => {
            elapsed += interval;
            const progressPercent = Math.min((elapsed / duration) * 100, 100);
            setProgress(progressPercent);

            terminalTexts.forEach((item, index) => {
                const textProgress = Math.min(Math.max((elapsed - index * 100) / 800, 0), 1);
                setScrambledTexts(prev => ({
                    ...prev,
                    [index]: scrambleText(item.text, textProgress)
                }));
            });

            if (elapsed >= duration) {
                clearInterval(timer);
                setTimeout(() => {
                    setIsLoading(false);
                    if (onComplete) onComplete();
                }, 500)
            }
        }, interval);

        return () => clearInterval(timer);
    }, [isLoading, onComplete]);

    return (
        <>
            <style>{`
        @import url("https://fonts.cdnfonts.com/css/thegoodmonolith");
        @import url("https://fonts.cdnfonts.com/css/pp-neue-montreal");

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: "PP Neue Montreal", sans-serif;
          overflow: hidden;
          background: black;
        }

        .terminal-container {
          position: relative;
          height: 350px;
          padding: 10px;
          overflow: hidden;
        }

        .terminal-line {
          position: absolute;
          font-size: 0.9rem;
          line-height: 1.2;
          letter-spacing: 0.05em;
          white-space: nowrap;
          font-family: "PP Neue Montreal", sans-serif;
          font-weight: 300;
        }

        .highlight {
          color: #fff;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .faded {
          opacity: 0.5;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .terminal-border {
          font-family: "TheGoodMonolith", monospace;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.75rem;
          color: white;
        }
      `}</style>

            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.64 }}
                        className="fixed inset-0 bg-black flex items-center justify-center"
                    >
                        <div className="w-[90%] max-w-3xl">
                            {/* Top Border */}
                            <div className="flex justify-between items-center h-8 px-2 terminal-border">
                                <span>Dimensional Gateway</span>
                                <span>Traversal Initiated</span>
                            </div>

                            {/* Terminal Texts */}
                            <div className="terminal-container mt-8">
                                {terminalTexts.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="terminal-line"
                                        style={{ top: `${item.top}px` }}
                                        animate={{ opacity: item.highlight ? 1 : 0.7 }}
                                    >
                                        <span className={item.highlight ? "highlight" : "faded"}>
                                            {scrambledTexts[index] || ""}
                                        </span>
                                    </motion.div>
                                ))}

                                {/* Progress Bar */}
                                <div className="absolute left-0 top-[135px] flex items-center px-2 w-full">
                                    <span className="text-white uppercase text-sm mr-3 tracking-wider">Traversing</span>
                                    <div className="w-48 h-[1px] bg-white/20 relative overflow-hidden">
                                        <motion.div
                                            className="h-full bg-white"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <span className="text-white uppercase text-sm ml-3 tracking-wider">Dimensional Shift</span>
                                </div>
                            </div>

                            {/* Bottom Border */}
                            <div className="flex justify-between items-center h-8 px-2 terminal-border mt-8">
                                <span>Traversal Sequence Complete</span>
                                <span>Dimensional Gateway Open</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default TerminalPreLoader;
