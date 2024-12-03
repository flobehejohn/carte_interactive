import { Grid, Typography } from '@mui/material';

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

export function CalendarHeader() {
  return (
    <Grid container>
      {DAYS.map((day) => (
        <Grid 
          key={day} 
          item 
          xs
          sx={{
            textAlign: 'center',
            py: 1,
            borderBottom: 1,
            borderColor: 'grey.200'
          }}
        >
          <Typography 
            variant="subtitle2"
            sx={{ fontWeight: 500 }}
          >
            {day}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
}