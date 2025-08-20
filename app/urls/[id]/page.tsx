import { redirect } from 'next/navigation';
import UrlShortenerService from '@/services/urlShortenerService';
import { notFound } from 'next/navigation';

export default async function RedirectPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
console.log(id)
  const shortenerService = new UrlShortenerService();
  const originalUrl = await shortenerService.getOriginalUrl(id);

  if (originalUrl) {
    redirect(originalUrl);
  } else {
    notFound();
  }
}