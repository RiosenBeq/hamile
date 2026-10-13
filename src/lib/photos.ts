// Journal photo storage.
//
// iOS moves the app's container (…/Application/<UUID>/Documents) on every
// app update and on restore from backup, so absolute file:// paths saved in
// state go stale and photos would appear "lost". We therefore store photos
// RELATIVE to the documents directory ("journal/<id>.jpg") and resolve them
// at render time. Older absolute paths are re-rooted transparently.

import * as FileSystem from 'expo-file-system';

export const PHOTO_DIR = 'journal';

const docDir = () => FileSystem.documentDirectory ?? '';

/** Turn whatever we stored into a usable file:// URI for <Image>. */
export function photoSrc(stored: string | undefined | null): string | undefined {
  if (!stored) return undefined;
  if (/^(https?:|data:)/.test(stored)) return stored;
  if (stored.startsWith('file://') || stored.startsWith('/')) {
    // Legacy absolute path — keep only the part after /Documents/.
    const i = stored.indexOf('/Documents/');
    if (i >= 0) return docDir() + stored.slice(i + '/Documents/'.length);
    return stored;
  }
  return docDir() + stored.replace(/^\/+/, '');
}

/** Normalise a URI to the relative form we persist. */
export function toStoredPhoto(uri: string): string {
  const dir = docDir();
  if (dir && uri.startsWith(dir)) return uri.slice(dir.length);
  const i = uri.indexOf('/Documents/');
  if (i >= 0) return uri.slice(i + '/Documents/'.length);
  return uri;
}

export async function ensurePhotoDir(): Promise<void> {
  const dir = docDir() + PHOTO_DIR;
  const info = await FileSystem.getInfoAsync(dir);
  if (!info.exists) await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
}

/** Copy a picked/captured image into the journal folder; returns the relative path to persist. */
export async function savePhoto(sourceUri: string, id: string): Promise<string> {
  await ensurePhotoDir();
  const rel = `${PHOTO_DIR}/${id}-${Date.now().toString(36)}.jpg`;
  await FileSystem.copyAsync({ from: sourceUri, to: docDir() + rel });
  return rel;
}

export async function deletePhoto(stored: string | undefined | null): Promise<void> {
  const src = photoSrc(stored);
  if (!src || !src.startsWith('file://')) return;
  await FileSystem.deleteAsync(src, { idempotent: true }).catch(() => {});
}
