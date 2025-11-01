"use client";

import { Button } from "@/components/ui/button";
import { TimeSlot } from "./schedule-content";
import { cn } from "@/lib/utils";
import { isSlotInThePast, isToday } from "./schedule-utils";

interface ScheduleTimeListProps {
  selectedDate: Date;
  selectedTime: string;
  requireSlots: number;
  blockedTimes: string[];
  availableTimeSlot: TimeSlot[];
  clinicTimes: string[];
  onSelectTime: (time: string) => void;
}
export function ScheduleTimeList({
  availableTimeSlot,
  blockedTimes,
  clinicTimes,
  requireSlots,
  selectedDate,
  selectedTime,
  onSelectTime,
}: ScheduleTimeListProps) {
  const dateIsToday = isToday(selectedDate);
  return (
    <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
      {availableTimeSlot.map((slot) => {
        const slotIsPast = dateIsToday && isSlotInThePast(slot.time);

        return (
          <Button
            onClick={() => onSelectTime(slot.time)}
            className={cn(
              '"h-10 select-none"',
              selectedTime === slot.time &&
                "border-2 border-emerald-500 text-primary"
            )}
            variant={"outline"}
            type="button"
            disabled={slotIsPast}
          >
            {slot.time}
          </Button>
        );
      })}
    </div>
  );
}
