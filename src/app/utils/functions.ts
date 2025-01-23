import { ImageLoaderProps } from "next/dist/shared/lib/image-config";
import { Photos, Photo } from "pexels";

/**
 * Key generator - create unique keys while iterating over the array
 * @example
 * const itemKeyGenerator = keyMaker("ANY_PREFIX");
 * {items.map((item) =>
 *           <ItemCard key={itemKeyGenerator.next().value} {...item} />
 *       )}
 * @returns {void}
 */
export function* keyMaker(prefix: string): Generator<string, string, void> {
  let index = 0;
  while (true) {
    yield `${prefix}_${(index += 1)}`;
  }
}

/**
 * Custom Image loader. Pexel already provides full url with w and h query params.
 * @params {ImageLoaderProps} props - Image loader props
 * @returns {string}
 */
export function imageLoader({ src }: ImageLoaderProps) {
  return src;
}

export function isPhotosType(value: unknown): value is Photos {
  return typeof value === "object" && value !== null && "photos" in value;
}

export function isPhotoType(value: unknown): value is Photo {
  return (
    typeof value === "object" &&
    value !== null &&
    "photographer" in value &&
    "id" in value
  );
}
