import { IUrl } from "@/models/url";
import UrlRepository from "@/repositories/urlRepository";
import { nanoid } from "nanoid";

class UrlShortenerService {
  private urlRepository;
  constructor() {
    this.urlRepository = new UrlRepository();
  }

  async ShortenUrl(originalUrl: string): Promise<string> {
    const url = await this.urlRepository.getUrlByOriginalUrl(originalUrl);
    if (url) {
      return url.shortUrl;
    } else {
      let shortUrl = nanoid(10);
      let existingUrl = await this.urlRepository.getUrlByShortUrl(shortUrl);
      while (existingUrl) {
        shortUrl = nanoid(10);
        existingUrl = await this.urlRepository.getUrlByShortUrl(shortUrl);
      }

      await this.urlRepository.createUrl(shortUrl, originalUrl);
      return shortUrl;
    }
  }
  async getOriginalUrl(shortUrl: string): Promise<string | null> {
    const url = await this.urlRepository.getUrlByShortUrl(shortUrl);
    return url ? url.originalUrl : null;
  }

  async getUrlsList(): Promise<IUrl[] | null> {
    const urls = await this.urlRepository.getAllUrls();
    return urls;
  }

  async removeUrl(id: string): Promise<boolean> {
    const deletedUrl = await this.urlRepository.deleteUrl(id);
    return deletedUrl !== null;
  }
}

export default UrlShortenerService;
