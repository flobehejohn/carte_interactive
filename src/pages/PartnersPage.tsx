import { useState } from 'react';
import { Box, Typography, Button, Grid, Tabs, Tab } from '@mui/material';
import { Plus } from 'lucide-react';
import { 
  PartnerDialog, 
  PartnerStats, 
  PartnerTable,
  PartnerHistory 
} from '../components/partners';
import { usePartners } from '../hooks/usePartners';
import { useLogger } from '../hooks/useLogger';
import type { Partner } from '../types';

export function PartnersPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('partners');
  const { partners, addPartner } = usePartners();
  const { logAction, logError } = useLogger('PartnersPage');

  const handleOpenDialog = () => {
    logAction('open_add_partner_dialog');
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    logAction('close_add_partner_dialog');
    setIsDialogOpen(false);
  };

  const handleSavePartner = async (partnerData: Omit<Partner, 'id'>) => {
    try {
      logAction('save_partner', { partner: partnerData });
      await addPartner(partnerData);
      setIsDialogOpen(false);
    } catch (error) {
      logError(error as Error);
      throw error;
    }
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    logAction('change_tab', { tab: newValue });
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3
          }}>
            <Typography component="h1" variant="h4">
              Partenaires
            </Typography>
            <Button
              variant="contained"
              startIcon={<Plus />}
              onClick={handleOpenDialog}
            >
              Ajouter un partenaire
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
          >
            <Tab label="Liste des partenaires" value="partners" />
            <Tab label="Historique" value="history" />
            <Tab label="Statistiques" value="statistics" />
          </Tabs>

          {activeTab === 'partners' && (
            <PartnerTable partners={partners} />
          )}

          {activeTab === 'history' && (
            <PartnerHistory partners={partners} />
          )}

          {activeTab === 'statistics' && (
            <PartnerStats partners={partners} />
          )}
        </Grid>
      </Grid>

      <PartnerDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSavePartner}
      />
    </Box>
  );
}