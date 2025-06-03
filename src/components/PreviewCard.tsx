import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";

const reviews = [
  {
    id: 1,
    body: "Apple Unveils AI-Powered Siri Overhaul at WWDC 2025"
  },
  {
    id: 2,
    body: "React 19 Officially Released: What\’s New and What It Means for Developers",
  },
  {
    id: 3,
    body: "OpenAI Launches GPT-5 Turbo with Real-Time Web Access and Custom Agents",
  },
  {
    id: 4,
    body: "NVIDIA Announces Next-Gen Blackwell GPUs for AI Training at Scale",
  },
  {
    id: 5,
    body: "Google DeepMind Introduces AlphaCode 2, Surpassing Human Coders in Benchmarks",
  },
  {
    id: 6,
    body: "Rust Gains First-Class Support in Linux Kernel: What This Means for Systems Programming",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  id,
  body,
}: {
  id: number;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function PreviewCard() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </Marquee>
      <Marquee reverse className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </Marquee>
      <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
