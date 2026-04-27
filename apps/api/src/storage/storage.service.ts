import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageService {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor(private readonly configService: ConfigService) {
    const endpoint = this.configService.get<string>('S3_ENDPOINT');
    const region = this.configService.get<string>('S3_REGION') ?? 'us-east-1';
    const accessKeyId = this.configService.get<string>('S3_ACCESS_KEY') ?? '';
    const secretAccessKey =
      this.configService.get<string>('S3_SECRET_KEY') ?? '';
    this.bucketName =
      this.configService.get<string>('S3_BUCKET') ?? 'auracv-resumes';

    this.s3Client = new S3Client({
      region,
      endpoint: endpoint || undefined,
      forcePathStyle: Boolean(endpoint),
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  async uploadResume(buffer: Buffer, key: string, contentType: string) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: buffer,
        ContentType: contentType,
      }),
    );
    const endpoint = this.configService.get<string>('S3_ENDPOINT');
    if (endpoint) {
      return `${endpoint}/${this.bucketName}/${key}`;
    }
    const region = this.configService.get<string>('S3_REGION') ?? 'us-east-1';
    return `https://${this.bucketName}.s3.${region}.amazonaws.com/${key}`;
  }
}
