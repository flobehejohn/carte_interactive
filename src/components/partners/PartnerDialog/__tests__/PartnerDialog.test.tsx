import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { PartnerDialog } from '../PartnerDialog';
import { useLogger } from '@/hooks/useLogger';

vi.mock('@/hooks/useLogger', () => ({
  useLogger: () => ({
    logAction: vi.fn(),
    logError: vi.fn()
  })
}));

describe('PartnerDialog', () => {
  const mockOnSave = vi.fn();
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderDialog = (props = {}) => {
    return render(
      <PartnerDialog
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        {...props}
      />
    );
  };

  test('affiche correctement le formulaire vide', () => {
    renderDialog();
    
    expect(screen.getByLabelText(/nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/prénom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/ajouter un partenaire/i)).toBeInTheDocument();
  });

  test('valide les champs requis', async () => {
    renderDialog();
    
    const submitButton = screen.getByRole('button', { name: /ajouter/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/le nom est requis/i)).toBeInTheDocument();
      expect(screen.getByText(/l'email est requis/i)).toBeInTheDocument();
    });
  });

  test('permet d\'ajouter et supprimer des catégories', async () => {
    renderDialog();
    
    // Ajouter une catégorie
    const addButton = screen.getByText(/ajouter une catégorie/i);
    fireEvent.click(addButton);

    const input = screen.getByPlaceholderText(/nouvelle catégorie/i);
    fireEvent.change(input, { target: { value: 'Test Catégorie' } });
    
    const confirmButton = screen.getByRole('button', { name: /plus/i });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(screen.getByText(/catégorie ajoutée avec succès/i)).toBeInTheDocument();
    });

    // Supprimer la catégorie
    const deleteButton = screen.getByRole('button', { name: /trash/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByText(/catégorie supprimée/i)).toBeInTheDocument();
    });
  });

  test('soumet le formulaire avec succès', async () => {
    renderDialog();
    
    // Remplir les champs requis
    fireEvent.change(screen.getByLabelText(/nom/i), { target: { value: 'Test Nom' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });

    // Ajouter une catégorie
    const addButton = screen.getByText(/ajouter une catégorie/i);
    fireEvent.click(addButton);
    
    const input = screen.getByPlaceholderText(/nouvelle catégorie/i);
    fireEvent.change(input, { target: { value: 'Test Catégorie' } });
    
    const confirmButton = screen.getByRole('button', { name: /plus/i });
    fireEvent.click(confirmButton);

    // Soumettre le formulaire
    const submitButton = screen.getByRole('button', { name: /ajouter/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith(expect.objectContaining({
        name: 'Test Nom',
        email: 'test@example.com',
        categoryPath: expect.arrayContaining(['Test Catégorie'])
      }));
    });
  });
});