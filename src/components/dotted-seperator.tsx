import { cn } from "@/lib/utils";

interface DottedSeparatorProps {
    className?: string;
    color?: string;
    height?: string;
    dotSize?: string;
    gapSize?: string;
    direction?: "horizontal" | "vertical";
}

export const DottedSeparator = ({
    className,
    color = "#D1D5DB",
    height = "2px",
    dotSize = "4px",
    gapSize = "6px",
    direction = "horizontal",
}: DottedSeparatorProps) => {
    const isHorizontal = direction === "horizontal";
    const dotSizeNum = parseInt(dotSize, 10);
    const gapSizeNum = parseInt(gapSize, 10);
    const spacing = dotSizeNum + gapSizeNum;

    return (
        <div
            className={cn(
                isHorizontal ? "w-full flex items-center" : "h-full flex flex-col items-center",
                className
            )}
        >
            <div
                className="flex-grow"
                style={{
                    width: isHorizontal ? "100%" : height,
                    height: isHorizontal ? height : "100%",
                    backgroundImage: `radial-gradient(circle, ${color} ${dotSize}, transparent ${dotSize})`,
                    backgroundSize: isHorizontal
                        ? `${spacing}px ${height}`
                        : `${height} ${spacing}px`,
                    backgroundRepeat: "repeat",
                    backgroundPosition: "center",
                }}
            />
        </div>
    );
};
