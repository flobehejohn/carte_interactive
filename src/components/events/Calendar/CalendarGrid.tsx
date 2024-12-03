import { Grid, Box } from '@mui/material';
import { 
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay
} from 'date-fns';

interface CalendarGridProps {
  currentDate: Date;
  selectedDate: Date | null;
  onDateClick: (date: Date) => void;
  renderDay: (date: Date) => React.ReactNode;
}

export function CalendarGrid({ 
  currentDate,
  selectedDate,
  onDateClick,
  renderDay
}: CalendarGridProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd
  });

  return (
    <Grid container>
      {days.map((day, index) => (
        <Grid 
          key={day.toISOString()} 
          item 
          xs
          sx={{
            aspectRatio: '1',
            borderRight: (index + 1) % 7 === 0 ? 0 : 1,
            borderBottom: index < days.length - 7 ? 1 : 0,
            borderColor: 'grey.200'
          }}
        >
          <Box
            onClick={() => onDateClick(day)}
            sx={{
              height: '100%',
              p: 1,
              cursor: 'pointer',
              bgcolor: selectedDate && isSameDay(day, selectedDate) ? 
                'action.selected' : 'transparent',
              '&:hover': {
                bgcolor: 'action.hover'
              }
            }}
          >
            {renderDay(day)}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}