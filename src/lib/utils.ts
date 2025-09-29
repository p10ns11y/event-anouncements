
export function getImageSource(relativePath: string): string {
  if (process.env.NODE_ENV === 'development') {
    return relativePath;
  }

  return '/memes/meme.jpeg';
}