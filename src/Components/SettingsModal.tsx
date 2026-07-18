import { useContext, useState, FormEvent } from "react";
import { ChallengesContext, SECTORS } from "../contexts/ChallengesContext";
import styles from "../styles/components/SettingsModal.module.css";

export function SettingsModal() {
  const { 
    userName, 
    userCompany, 
    userSector, 
    userAvatar, 
    closeSettingsModal, 
    updateProfile, 
    updatePassword,
    getUsersDatabase
  } = useContext(ChallengesContext);

  const db = getUsersDatabase ? getUsersDatabase() : [];
  
  // Case-insensitive deduplication for companies
  const uniqueCompaniesMap = new Map<string, string>();
  db.forEach(u => {
    if (u.company) {
      const trimmed = u.company.trim();
      const lower = trimmed.toLowerCase();
      if (!uniqueCompaniesMap.has(lower)) {
        uniqueCompaniesMap.set(lower, trimmed);
      }
    }
  });
  const registeredCompanies = Array.from(uniqueCompaniesMap.values());
  
  const defaultSectorNames = [
    'TI & Engenharia',
    'Vendas & Growth',
    'Recursos Humanos',
    'Financeiro',
    'Marketing',
    'Operações',
    'Administrativo'
  ];
  
  // Case-insensitive deduplication for sectors
  const uniqueSectorsMap = new Map<string, string>();
  defaultSectorNames.forEach(s => uniqueSectorsMap.set(s.toLowerCase(), s));
  db.forEach(u => {
    if (u.sector) {
      const trimmed = u.sector.trim();
      const lower = trimmed.toLowerCase();
      if (!uniqueSectorsMap.has(lower)) {
        uniqueSectorsMap.set(lower, trimmed);
      }
    }
  });
  const registeredSectors = Array.from(uniqueSectorsMap.values());

  // Profile fields
  const [name, setName] = useState(userName);
  const [company, setCompany] = useState(userCompany);
  const [sector, setSector] = useState(userSector);
  const [avatar, setAvatar] = useState(userAvatar);

  // Password fields
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [statusMsg, setStatusMsg] = useState("");
  const [isError, setIsError] = useState(false);

  function handleSave(e: FormEvent) {
    e.preventDefault();
    setStatusMsg("");
    setIsError(false);

    if (newPassword.trim()) {
      if (newPassword !== confirmPassword) {
        setIsError(true);
        setStatusMsg("As senhas não coincidem.");
        return;
      }
      updatePassword(newPassword);
    }

    updateProfile(name, company, sector, avatar);
    
    setIsError(false);
    setStatusMsg("Alterações salvas com sucesso! ✨");
    setTimeout(() => {
      closeSettingsModal();
    }, 1500);
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>Configurações da Conta</header>
        
        <form onSubmit={handleSave} className={styles.settingsForm}>
          {statusMsg && (
            <div className={isError ? styles.errorMsg : styles.successMsg}>
              {statusMsg}
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="modal-name">Nome de Usuário</label>
            <input 
              id="modal-name" 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="modal-company">Empresa</label>
            <input 
              id="modal-company" 
              type="text" 
              value={company} 
              onChange={e => setCompany(e.target.value)} 
              list="modal-companies-list"
              required 
            />
            <datalist id="modal-companies-list">
              {registeredCompanies.map(c => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="modal-sector">Setor / Departamento</label>
            <input 
              id="modal-sector" 
              type="text" 
              value={sector} 
              onChange={e => setSector(e.target.value)} 
              list="modal-sectors-list"
              required 
            />
            <datalist id="modal-sectors-list">
              {registeredSectors.map(sec => (
                <option key={sec} value={sec} />
              ))}
            </datalist>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="modal-avatar">URL do Avatar</label>
            <input 
              id="modal-avatar" 
              type="text" 
              value={avatar} 
              onChange={e => setAvatar(e.target.value)} 
            />
          </div>

          <hr className={styles.divider} />
          
          <h3>Alterar Senha</h3>
          
          <div className={styles.inputGroup}>
            <label htmlFor="modal-new-password">Nova Senha</label>
            <input 
              id="modal-new-password" 
              type="password" 
              placeholder="Deixe em branco para não alterar" 
              value={newPassword} 
              onChange={e => setNewPassword(e.target.value)} 
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="modal-confirm-password">Confirmar Nova Senha</label>
            <input 
              id="modal-confirm-password" 
              type="password" 
              placeholder="Confirme sua nova senha" 
              value={confirmPassword} 
              onChange={e => setConfirmPassword(e.target.value)} 
            />
          </div>

          <div className={styles.actions}>
            <button type="button" onClick={closeSettingsModal} className={styles.cancelBtn}>
              Cancelar
            </button>
            <button type="submit" className={styles.saveBtn}>
              Salvar Alterações
            </button>
          </div>
        </form>

        <button type="button" onClick={closeSettingsModal} className={styles.closeBtn}>
          <img src="/icons/close.svg" alt="Fechar" />
        </button>
      </div>
    </div>
  );
}
