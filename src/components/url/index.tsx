import { SquareArrowOutUpRight } from 'lucide-react';

interface ProductProps {
  id: string;
  longUrl: string;
  shortUrl: string;
  clicks: number;
}

export function Url(props: ProductProps) {
  const { id, longUrl, shortUrl, clicks } = props;
  const isPlural = clicks > 1;
  const clicksText = isPlural ? 'clicks' : 'click';

  return (
    <div className="flex rounded-lg border p-4 border-border justify-between">
      <div className="flex gap-4 flex-grow items-center">
        <div className="">
          <p className="text-sm font-bold">{shortUrl}</p>
          <small>
            {clicks} {clicksText}
          </small>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <a href={longUrl} target="_blank" rel="noopener noreferrer">
          <SquareArrowOutUpRight className="text-primary" />
        </a>

        {/* <EllipsisVertical className="text-primary" /> */}
      </div>
    </div>
  );
}
