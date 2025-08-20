import UrlShortenerService from "@/services/urlShortenerService";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { originalUrl } = await request.json();
  const ShortenerService = new UrlShortenerService();
  const shortUrl = await ShortenerService.ShortenUrl(originalUrl);
  return NextResponse.json(
    {
      shortUrl,
    },
    { status: 201 }
  );
}

export async function GET () {
  const ShortenerService = new UrlShortenerService();
  const Urls = await ShortenerService.getUrlsList();
  return NextResponse.json({Urls},{status:200})
}
