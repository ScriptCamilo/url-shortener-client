import { envConfig } from '@/configs/env-config';
import { Tables } from '@/types/database.types';
import { SquareArrowOutUpRight } from 'lucide-react';

type UrlProps = {
  data: Tables<'urls'>;
};

export function Url({ data }: UrlProps) {
  const { long_url: longUrl, short_code: shortCode, clicks } = data;
  const redirectUrl = `${envConfig.supabaseUrl}${shortCode}`;
  const isPlural = clicks > 1;
  const clicksText = isPlural ? 'clicks' : 'click';

  return (
    <div className="flex rounded-lg border p-4 border-border justify-between">
      <div className="flex gap-4 flex-grow items-center">
        <div className="">
          <p className="text-sm font-bold">{redirectUrl}</p>
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
