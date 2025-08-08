import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function DatePicker() {
  const [dateFrom, setDateFrom] = React.useState<Date>();
  const [dateTo, setDateTo] = React.useState<Date>();

  return (
    <div className="flex flex-wrap gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className={cn("w-[240px] justify-start text-left font-normal", !dateFrom && "text-muted-foreground")}> 
            <CalendarIcon />
            {dateFrom ? format(dateFrom, "dd/MM/y") : <span>Início</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus className={cn("p-3 pointer-events-auto")} />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className={cn("w-[240px] justify-start text-left font-normal", !dateTo && "text-muted-foreground")}> 
            <CalendarIcon />
            {dateTo ? format(dateTo, "dd/MM/y") : <span>Fim</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus className={cn("p-3 pointer-events-auto")} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
