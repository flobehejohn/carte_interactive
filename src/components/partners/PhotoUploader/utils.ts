import type { CropArea } from './types';

export async function createCroppedImage(
  image: string,
  croppedAreaPixels: CropArea
): Promise<string | null> {
  try {
    const canvas = document.createElement('canvas');
    const img = new Image();
    img.src = image;

    await new Promise(resolve => {
      img.onload = resolve;
    });

    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.drawImage(
      img,
      croppedAreaPixels.x * scaleX,
      croppedAreaPixels.y * scaleY,
      croppedAreaPixels.width * scaleX,
      croppedAreaPixels.height * scaleY,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    return canvas.toDataURL('image/jpeg');
  } catch (error) {
    console.error('Erreur lors de la création de l\'image recadrée:', error);
    return null;
  }
}