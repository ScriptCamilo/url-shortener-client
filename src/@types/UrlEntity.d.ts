interface UrlEntity {
  id: string;
  longUrl: string;
  shortUrl: string;
  clicks: number;
  userId: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
