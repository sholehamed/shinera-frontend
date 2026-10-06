export interface BookingService {
  id: string;
  name: string;
  description?: string;
  duration: number;
  price: number;
  image?: string;
  category?: string;
}