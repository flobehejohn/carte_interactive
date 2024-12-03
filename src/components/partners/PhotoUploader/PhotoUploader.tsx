import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { createCroppedImage } from './utils';
import { CropDialog } from './CropDialog';
import { DropZone } from './DropZone';
import type { PhotoUploaderProps, CropArea } from './types';

export function PhotoUploader({ onPhotoChange, currentPhoto }: PhotoUploaderProps) {
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setCropDialogOpen(true);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1
  });

  const handleCropComplete = useCallback((croppedArea: any, croppedAreaPixels: CropArea) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropConfirm = async () => {
    if (!image || !croppedAreaPixels) return;
    const croppedImage = await createCroppedImage(image, croppedAreaPixels);
    if (croppedImage) {
      onPhotoChange(croppedImage);
      setCropDialogOpen(false);
    }
  };

  return (
    <>
      <DropZone
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        isDragActive={isDragActive}
        currentPhoto={currentPhoto}
      />

      <CropDialog
        open={cropDialogOpen}
        onClose={() => setCropDialogOpen(false)}
        image={image}
        crop={crop}
        zoom={zoom}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={handleCropComplete}
        onConfirm={handleCropConfirm}
      />
    </>
  );
}