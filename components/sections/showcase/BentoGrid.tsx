import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BentoGridProps {
    children: ReactNode;
    className?: string;
}

interface BentoCardProps {
    children: ReactNode;
    className?: string;
    colSpan?: number;
    rowSpan?: number;
}

export const BentoGrid = ({ children, className }: BentoGridProps) => {
    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoCard = ({
    children,
    className,
    colSpan = 1,
    rowSpan = 1,
}: BentoCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className={cn(
                "glass-panel rounded-[var(--radius-apple)] p-8 flex flex-col justify-between overflow-hidden relative group",
                colSpan === 2 && "md:col-span-2",
                colSpan === 3 && "md:col-span-2 lg:col-span-3", // Adjust for 2-col grid on md
                colSpan === 4 && "md:col-span-2 lg:col-span-4",
                rowSpan === 2 && "row-span-2",
                className
            )}
        >
            {/* Hover Effect Layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {children}
        </motion.div>
    );
};
