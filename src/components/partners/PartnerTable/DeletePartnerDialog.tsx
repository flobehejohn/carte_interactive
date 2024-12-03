import { Alert } from '@mui/material';
import { ConfirmDialog } from '@/components/ui';
import type { Partner } from '@/types';

interface DeletePartnerDialogProps {
  partner: Partner | null;
  isDeleting: boolean;
  error: string | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export function DeletePartnerDialog({
  partner,
  isDeleting,
  error,
  onClose,
  onConfirm
}: DeletePartnerDialogProps) {
  if (!partner) return null;

  return (
    <ConfirmDialog
      isOpen={true}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Supprimer le partenaire"
      message={
        <>
          Êtes-vous sûr de vouloir supprimer le partenaire "{partner.name}" ?
          {partner.company && ` (${partner.company})`}
          <br />
          <br />
          Cette action est irréversible et supprimera également toutes les données associées.
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </>
      }
      confirmLabel={isDeleting ? "Suppression..." : "Supprimer"}
      confirmColor="error"
      disabled={isDeleting}
    />
  );
}
