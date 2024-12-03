export interface PhotoUploaderProps {
  onPhotoChange: (photo: string) => void;
  currentPhoto?: string;
}

export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface CropDialogProps {
  open: boolean;
  onClose: () => void;
  image: string | null;
  crop: Point;
  zoom: number;
  onCropChange: (crop: Point) => void;
  onZoomChange: (zoom: number) => void;
  onCropComplete: (croppedArea: any, croppedAreaPixels: CropArea) => void;
  onConfirm: () => void;
}

export interface DropZoneProps {
  getRootProps: () => any;
  getInputProps: () => any;
  isDragActive: boolean;
  currentPhoto?: string;
}