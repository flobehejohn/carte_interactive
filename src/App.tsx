import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { Sidebar } from './components/layout';
import { CalendarPage } from './pages/CalendarPage';
import { PartnersPage } from './pages/PartnersPage';
import { GalleryPage } from './pages/GalleryPage';
import { TestSentry } from './components/test/TestSentry';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'grey.100' }}>
        <Sidebar />
        <Container component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={<CalendarPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/test-sentry" element={<TestSentry />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;