"use client";

import { motion } from "framer-motion";

interface HandwritingTextProps {
    text: string;
    className?: string;
    delay?: number;
}

export function HandwritingText({ text, className, delay = 0.5 }: HandwritingTextProps) {
    return (
        <div className={`relative inline-block ${className} font-handwriting`}>
            {/* The actual visible text */}
            <motion.span
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{
                    duration: 2.5,
                    delay: delay,
                    ease: "easeInOut",
                }}
                className="inline-block"
            >
                {text}
            </motion.span>
        </div>
    );
}
