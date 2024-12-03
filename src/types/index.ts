export interface Partner {
  id: string;
  name: string;
  firstName?: string;
  email: string;
  phone?: string;
  company?: string;
  categoryPath: string[];
  photo?: string;
  website?: string;
  description?: string;
  gallery?: string[];
}

export interface TimeSlot {
  setup: string;
  intervention: string;
  teardown: string;
}

export interface EventPartner {
  partnerId: string;
  partner?: Partner;
  timeSlots: TimeSlot;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  importance: 'low' | 'medium' | 'high';
  partners: EventPartner[];
  address?: string;
}

export interface MediaItem {
  id: string;
  url: string;
  title: string;
  type: 'image' | 'video';
  uploadDate: Date;
}