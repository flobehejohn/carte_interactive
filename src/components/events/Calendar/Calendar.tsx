import { useState } from 'react';
import { 
  Box, 
  Paper,
  Typography,
  IconButton,
  Button,
  Select,
  MenuItem,
  FormControlLabel,
  Switch
} from '@mui/material';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { 
  format, 
  addMonths, 
  subMonths, 
  addWeeks,
  subWeeks,
  addDays,
  subDays,
  isSameMonth, 
  isSameDay, 
  isWithinInterval,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfDay,
  endOfDay
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { CalendarEvent } from './CalendarEvent';
import { DayView } from './DayView';
import { WeekView } from './WeekView';
import { YearView } from './YearView';
import { EventDialog } from '../EventDialog';
import { useLogger } from '@/hooks/useLogger';
import type { Event } from '@/types';

interface CalendarProps {
  events: Event[];
  onAddEvent: (event: Omit<Event, 'id'>) => Promise<void>;
}

type ViewScale = 'hour' | 'day' | 'week' | 'month' | 'year';

export function Calendar({ events, onAddEvent }: CalendarProps) {
  const { logAction } = useLogger('Calendar');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [scale, setScale] = useState<ViewScale>('month');
  const [showHourly, setShowHourly] = useState(false);

  const handlePrevious = () => {
    logAction('navigate_previous', { scale });
    switch (scale) {
      case 'year':
        setCurrentDate(prev => new Date(prev.getFullYear() - 1, prev.getMonth()));
        break;
      case 'month':
        setCurrentDate(prev => subMonths(prev, 1));
        break;
      case 'week':
        setCurrentDate(prev => subWeeks(prev, 1));
        break;
      case 'day':
      case 'hour':
        setCurrentDate(prev => subDays(prev, 1));
        break;
    }
  };

  const handleNext = () => {
    logAction('navigate_next', { scale });
    switch (scale) {
      case 'year':
        setCurrentDate(prev => new Date(prev.getFullYear() + 1, prev.getMonth()));
        break;
      case 'month':
        setCurrentDate(prev => addMonths(prev, 1));
        break;
      case 'week':
        setCurrentDate(prev => addWeeks(prev, 1));
        break;
      case 'day':
      case 'hour':
        setCurrentDate(prev => addDays(prev, 1));
        break;
    }
  };

  const handleScaleChange = (newScale: ViewScale) => {
    logAction('change_scale', { from: scale, to: newScale });
    setScale(newScale);
    if (newScale === 'hour') {
      setShowHourly(true);
    }
  };

  const handleDateClick = (date: Date) => {
    logAction('select_date', { date: date.toISOString() });
    setSelectedDate(date);
  };

  const handleAddEvent = () => {
    logAction('open_add_event_dialog');
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    logAction('close_add_event_dialog');
    setIsDialogOpen(false);
  };

  const getEventsForPeriod = (start: Date, end: Date) => {
    return events.filter(event => 
      isWithinInterval(event.startDate, { start, end }) ||
      isWithinInterval(event.endDate, { start, end })
    );
  };

  const getViewTitle = () => {
    switch (scale) {
      case 'year':
        return format(currentDate, 'yyyy');
      case 'month':
        return format(currentDate, 'MMMM yyyy', { locale: fr });
      case 'week':
        const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
        const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
        return `${format(weekStart, 'd', { locale: fr })} - ${format(weekEnd, 'd MMMM yyyy', { locale: fr })}`;
      case 'day':
      case 'hour':
        return format(currentDate, 'EEEE d MMMM yyyy', { locale: fr });
      default:
        return '';
    }
  };

  const renderCalendarView = () => {
    const periodStart = scale === 'year' ? new Date(currentDate.getFullYear(), 0) :
                       scale === 'month' ? startOfMonth(currentDate) :
                       scale === 'week' ? startOfWeek(currentDate, { weekStartsOn: 1 }) :
                       startOfDay(currentDate);

    const periodEnd = scale === 'year' ? new Date(currentDate.getFullYear(), 11, 31) :
                     scale === 'month' ? endOfMonth(currentDate) :
                     scale === 'week' ? endOfWeek(currentDate, { weekStartsOn: 1 }) :
                     endOfDay(currentDate);

    const periodEvents = getEventsForPeriod(periodStart, periodEnd);

    switch (scale) {
      case 'year':
        return (
          <YearView
            currentDate={currentDate}
            events={periodEvents}
            onDateClick={handleDateClick}
          />
        );
      case 'month':
        return (
          <CalendarGrid
            currentDate={currentDate}
            selectedDate={selectedDate}
            onDateClick={handleDateClick}
            renderDay={(date) => (
              <>
                <Typography 
                  variant="body2"
                  sx={{ 
                    color: !isSameMonth(date, currentDate) ? 'text.disabled' : 
                           isSameDay(date, new Date()) ? 'primary.main' : 
                           'text.primary'
                  }}
                >
                  {format(date, 'd')}
                </Typography>
                {getEventsForPeriod(startOfDay(date), endOfDay(date)).map((event, index) => (
                  <CalendarEvent 
                    key={event.id || index}
                    event={event}
                  />
                ))}
              </>
            )}
          />
        );
      case 'week':
        return (
          <WeekView
            currentDate={currentDate}
            events={periodEvents}
            onDateClick={handleDateClick}
            showHourly={showHourly}
          />
        );
      case 'day':
      case 'hour':
        return (
          <DayView
            currentDate={currentDate}
            events={periodEvents}
            onDateClick={handleDateClick}
            showHourly={scale === 'hour' || showHourly}
          />
        );
    }
  };

  return (
    <Paper 
      elevation={0}
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'grey.50',
        borderRadius: 0
      }}
    >
      <Box sx={{ 
        p: 2,
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: 1,
        borderColor: 'divider'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={handlePrevious}>
            <ChevronLeft />
          </IconButton>
          <Typography variant="h6">
            {getViewTitle()}
          </Typography>
          <IconButton onClick={handleNext}>
            <ChevronRight />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Select
            size="small"
            value={scale}
            onChange={(e) => handleScaleChange(e.target.value as ViewScale)}
          >
            <MenuItem value="hour">Heure</MenuItem>
            <MenuItem value="day">Jour</MenuItem>
            <MenuItem value="week">Semaine</MenuItem>
            <MenuItem value="month">Mois</MenuItem>
            <MenuItem value="year">Année</MenuItem>
          </Select>
          {(scale === 'day' || scale === 'week') && (
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={showHourly}
                  onChange={(e) => setShowHourly(e.target.checked)}
                />
              }
              label="Vue horaire"
            />
          )}
          <Button
            variant="contained"
            startIcon={<Plus />}
            onClick={handleAddEvent}
          >
            Ajouter un événement
          </Button>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        {(scale === 'month' || scale === 'week') && <CalendarHeader />}
        {renderCalendarView()}
      </Box>

      <EventDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={onAddEvent}
        initialData={selectedDate ? {
          startDate: selectedDate,
          endDate: selectedDate
        } : undefined}
      />
    </Paper>
  );
}