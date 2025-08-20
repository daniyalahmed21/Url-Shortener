import connectDb from "@/config/db";
import Url, { IUrl } from "@/models/url";

class UrlRepository {
  private urlModel;
  constructor() {
    connectDb();
    this.urlModel = Url;
  }

  async getUrlById(id: string): Promise<IUrl | null> {
    return await this.urlModel.findById(id)
  }

  async getUrlByShortUrl(shortUrl: string): Promise<IUrl | null> {
    return await this.urlModel.findOne({ shortUrl })
  }

  async getUrlByOriginalUrl(originalUrl: string): Promise<IUrl | null> {
    return await this.urlModel.findOne({ originalUrl })
  }

  async getAllUrls(): Promise<IUrl[] | null> {
    return await this.urlModel.find();
  }

  async deleteUrl(id: string): Promise<IUrl | null> {
    return await this.urlModel.findByIdAndDelete(id);
  }

  async createUrl(shortUrl: string, originalUrl: string): Promise<IUrl | null> {
    return await this.urlModel.create({ shortUrl, originalUrl });
  }
}

export default UrlRepository;
