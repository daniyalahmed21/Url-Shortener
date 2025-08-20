import UrlShortenerService from "@/services/urlShortenerService";
import { NextResponse } from "next/server";
import { cache } from "react";

const fetchUrls = cache(
  (async () => {
    const ShortenerService = new UrlShortenerService();
    const Urls = await ShortenerService.getUrlsList();
    return Urls;
  })
);

export async function GET() {
  const Urls = await fetchUrls() ;
  return NextResponse.json({ Urls }, { status: 200 });
}
