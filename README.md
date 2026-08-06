# 🐧 Fundamentos de Linux

Um curso interativo e gratuito de Fundamentos de Linux — do primeiro comando à infraestrutura. São **8 módulos e 32 lições**, com blocos de código comentados, exercícios práticos e um glossário.

## ✨ Destaques

- **8 módulos progressivos** — do conceito (o que é Linux) até automação e observabilidade
- **32 lições** com blocos de código comentados e dicas de boas práticas
- **Interativo** — progresso de estudo persistido no navegador, busca por tópicos, tema claro/escuro, lições colapsáveis e barra lateral de navegação
- **Acessível** — navegação por teclado, `aria`, contraste adequado e `prefers-reduced-motion`
- **Design system em CSS** — tema baseado em tokens (variáveis) e suporte a modo escuro
- **Portável** — os três arquivos (HTML/CSS/JS) são autocontidos; basta abrir o HTML no navegador

## 📚 Conteúdo

| Módulo | Tema | Lições |
| --- | --- | --- |
| 1 | Introdução | O que é Linux, instalação (VM/WSL), história, distribuições, arquitetura e kernel |
| 2 | Terminal e fundamentos | Shell e comandos, sistema de arquivos, navegação, texto com pipes |
| 3 | Usuários, permissões e processos | Permissões, usuários/sudo, processos, systemd, cron |
| 4 | Sistema, pacotes e rede | apt/dnf, discos e backups, rede, SSH |
| 5 | Serviços e infraestrutura | DNS, firewall (ufw/nftables), nginx/Apache, Docker |
| 6 | Automação e observabilidade | Ansible, Prometheus/Grafana, containers (volumes e redes) |
| 7 | Trabalhando como um profissional | Editores (nano/vim), shell scripting, logs, segurança |
| 8 | Prática | Exercícios, glossário, referências |

## 🚀 Como usar

1. **Abra a versão interativa** — dê dois cliques em `fundamentos-de-linux.html` (os arquivos `.css` e `.js` precisam estar na mesma pasta).
2. **Ou leia a versão em texto** — `fundamentos-de-linux.md` funciona em qualquer editor/visualizador de Markdown.
3. **Pratique** — o melhor jeito de aprender Linux é digitar os comandos em uma VM (VirtualBox) ou no WSL.

> Nos blocos de código, `$` é o prompt de usuário comum e `#` o de *root* — digite apenas o comando.

## 📁 Estrutura

```
fundamentos-de-linux/
├── fundamentos-de-linux.html   # estrutura e conteúdo do curso
├── fundamentos-de-linux.css    # estilos (design system em variáveis CSS)
├── fundamentos-de-linux.js     # interatividade (progresso, busca, tema)
├── fundamentos-de-linux.md     # versão texto do curso
└── README.md
```

## 📖 Referências

Os comandos foram verificados contra a documentação oficial (Grafana, Prometheus, nftables, pacotes Ubuntu, entre outras). A lista completa está na lição **8.3 — Referências e documentação** do curso.

## 📄 Licença

Este material é livre para estudo e uso pessoal. Sinta-se à vontade para usar, adaptar e compartilhar.
