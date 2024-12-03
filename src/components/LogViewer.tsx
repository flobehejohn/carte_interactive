import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  TextField,
  Box,
  Typography
} from '@mui/material';
import { LogCategory, getLogs } from '../utils/logger';

interface Log {
  timestamp: string;
  level: string;
  message: string;
  metadata: {
    category: LogCategory;
    [key: string]: any;
  };
}

export function LogViewer() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [filter, setFilter] = useState({
    level: 'all',
    category: 'all',
    search: ''
  });

  useEffect(() => {
    // Mise à jour initiale
    setLogs(getLogs());

    // Mise à jour périodique
    const interval = setInterval(() => {
      setLogs(getLogs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const filteredLogs = logs.filter(log => {
    const levelMatch = filter.level === 'all' || log.level === filter.level;
    const categoryMatch = filter.category === 'all' || log.metadata.category === filter.category;
    const searchMatch = !filter.search || 
      log.message.toLowerCase().includes(filter.search.toLowerCase()) ||
      JSON.stringify(log.metadata).toLowerCase().includes(filter.search.toLowerCase());

    return levelMatch && categoryMatch && searchMatch;
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Journal d'événements
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <Select
          value={filter.level}
          onChange={(e) => setFilter({ ...filter, level: e.target.value })}
          size="small"
        >
          <MenuItem value="all">Tous les niveaux</MenuItem>
          <MenuItem value="info">Info</MenuItem>
          <MenuItem value="warn">Avertissement</MenuItem>
          <MenuItem value="error">Erreur</MenuItem>
          <MenuItem value="debug">Debug</MenuItem>
        </Select>

        <Select
          value={filter.category}
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
          size="small"
        >
          <MenuItem value="all">Toutes les catégories</MenuItem>
          {Object.values(LogCategory).map(category => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>

        <TextField
          placeholder="Rechercher..."
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          size="small"
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Horodatage</TableCell>
              <TableCell>Niveau</TableCell>
              <TableCell>Catégorie</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Métadonnées</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLogs.map((log, index) => (
              <TableRow key={index}>
                <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                <TableCell>{log.level}</TableCell>
                <TableCell>{log.metadata.category}</TableCell>
                <TableCell>{log.message}</TableCell>
                <TableCell>
                  <pre style={{ margin: 0 }}>
                    {JSON.stringify(log.metadata, null, 2)}
                  </pre>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}