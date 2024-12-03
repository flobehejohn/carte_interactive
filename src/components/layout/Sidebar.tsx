import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, IconButton, List, ListItem, ListItemIcon, ListItemText, Drawer } from '@mui/material';
import { Menu, CalendarDays, Users2, Image } from 'lucide-react';

const drawerWidth = 240;

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const links = [
    { to: '/', icon: CalendarDays, label: 'Calendrier' },
    { to: '/partners', icon: Users2, label: 'Partenaires' },
    { to: '/gallery', icon: Image, label: 'Galerie' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isOpen ? drawerWidth : 72,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isOpen ? drawerWidth : 72,
          boxSizing: 'border-box',
          backgroundColor: 'primary.main',
          color: 'white',
          transition: 'width 0.3s',
          overflowX: 'hidden',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <IconButton
          onClick={() => setIsOpen(!isOpen)}
          sx={{ color: 'white' }}
        >
          <Menu />
        </IconButton>
      </Box>
      <List>
        {links.map(({ to, icon: Icon, label }) => (
          <ListItem
            key={to}
            component={Link}
            to={to}
            sx={{
              bgcolor: location.pathname === to ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
              <Icon size={24} />
            </ListItemIcon>
            {isOpen && <ListItemText primary={label} />}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}