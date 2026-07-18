import { useState, useContext, FormEvent } from "react";
import { ChallengesContext, SECTORS } from "../contexts/ChallengesContext";
import styles from "../styles/components/Login.module.css";

export function Login() {
  const { signUp, signIn, getUsersDatabase } = useContext(ChallengesContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  
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
  
  // Input fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [sector, setSector] = useState("ti");
  const [avatar, setAvatar] = useState("");
  const [presetAvatar, setPresetAvatar] = useState("bottts");
  
  const [errorMsg, setErrorMsg] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (isLoginMode) {
      const success = signIn(email, password);
      if (!success) {
        setErrorMsg("E-mail ou senha incorretos.");
      }
    } else {
      if (!name.trim() || !email.trim() || !password.trim() || !company.trim()) {
        setErrorMsg("Por favor, preencha todos os campos obrigatórios.");
        return;
      }
      const finalAvatar = avatar || `https://api.dicebear.com/7.x/${presetAvatar}/svg?seed=${name || 'user'}`;
      signUp(name, email, password, company, sector, finalAvatar);
    }
  }

  return (
    <div className={styles.loginOverlay}>
      <div className={styles.loginContainer}>
        <div className={styles.loginLogo}>
          <img src="/icons/level-up.svg" alt="OfficeFit logo" className={styles.logoIcon} />
          <span>OfficeFit</span>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <h2>{isLoginMode ? "Entre na sua Conta" : "Crie seu Perfil"}</h2>
          <p>
            {isLoginMode 
              ? "Bem-vindo de volta! Gamifique sua rotina e compita saudavelmente." 
              : "Cadastre-se para competir com empresas e colegas de trabalho."}
          </p>

          {errorMsg && <div className={styles.errorAlert}>{errorMsg}</div>}

          {!isLoginMode && (
            <div className={styles.inputGroup}>
              <label htmlFor="name">Nome de Usuário</label>
              <input 
                id="name"
                type="text" 
                placeholder="Ex: Allan Pablo" 
                value={name} 
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="email">E-mail Corporativo</label>
            <input 
              id="email"
              type="email" 
              placeholder="seuemail@empresa.com" 
              value={email} 
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Senha</label>
            <input 
              id="password"
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {!isLoginMode && (
            <>
              <div className={styles.inputGroup}>
                <label htmlFor="company">Nome da Empresa</label>
                <input 
                  id="company"
                  type="text" 
                  placeholder="Selecione ou digite sua empresa" 
                  value={company} 
                  onChange={e => setCompany(e.target.value)}
                  list="companies-list"
                  required
                />
                <datalist id="companies-list">
                  {registeredCompanies.map(c => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="sector">Setor / Departamento</label>
                <input 
                  id="sector"
                  type="text" 
                  placeholder="Selecione ou digite seu setor" 
                  value={sector} 
                  onChange={e => setSector(e.target.value)}
                  list="sectors-list"
                  required
                />
                <datalist id="sectors-list">
                  {registeredSectors.map(sec => (
                    <option key={sec} value={sec} />
                  ))}
                </datalist>
              </div>

              <div className={styles.avatarSelection}>
                <label>Estilo do Avatar:</label>
                <div className={styles.presetOptions}>
                  <button 
                    type="button" 
                    className={presetAvatar === 'bottts' ? styles.activePreset : ''}
                    onClick={() => { setPresetAvatar('bottts'); setAvatar(''); }}
                  >
                    🤖 Robô
                  </button>
                  <button 
                    type="button" 
                    className={presetAvatar === 'avataaars' ? styles.activePreset : ''}
                    onClick={() => { setPresetAvatar('avataaars'); setAvatar(''); }}
                  >
                    👤 Humano
                  </button>
                  <button 
                    type="button" 
                    className={presetAvatar === 'lorelei' ? styles.activePreset : ''}
                    onClick={() => { setPresetAvatar('lorelei'); setAvatar(''); }}
                  >
                    🎨 Ilustração
                  </button>
                </div>
                
                <div className={styles.customAvatarUrl}>
                  <span className={styles.divider}>ou URL da Foto</span>
                  <input 
                    type="text" 
                    placeholder="https://github.com/usuario.png" 
                    value={avatar}
                    onChange={e => setAvatar(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          <button 
            type="submit" 
            className={styles.submitBtn} 
          >
            {isLoginMode ? "Entrar no Workspace" : "Concluir Cadastro"}
          </button>

          <div className={styles.modeToggleRow}>
            <span>
              {isLoginMode ? "Não tem uma conta?" : "Já é cadastrado?"}
            </span>
            <button 
              type="button" 
              onClick={() => { setIsLoginMode(!isLoginMode); setErrorMsg(""); }}
              className={styles.toggleModeBtn}
            >
              {isLoginMode ? "Criar Perfil" : "Fazer Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
