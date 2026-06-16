import { Star } from "lucide-react";

interface ReviewProps {
  quote: string;
  author: string;
  role: string;
  hotel: string; // location / case label
}

const Review = ({ quote, author, role, hotel }: ReviewProps) => (
  <article className="flex h-full flex-col justify-between bg-card p-8 shadow-card transition-luxe hover:shadow-luxe">
    <div>
      <div className="flex gap-1 text-gold">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-gold" strokeWidth={0} />
        ))}
      </div>
      <blockquote className="mt-6 text-lg leading-snug text-primary text-balance">
        “{quote}”
      </blockquote>
    </div>
    <footer className="mt-8 border-t border-border pt-5">
      <p className="font-semibold text-primary">{author}</p>
      <p className="text-sm text-muted-foreground">{role}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gold">{hotel}</p>
    </footer>
  </article>
);

export default Review;
