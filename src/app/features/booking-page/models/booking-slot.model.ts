export interface BookingSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
}
export interface BookingDate {
  value: string;
  dayName: string;
  dayNumber: number;
  monthName: string;
}