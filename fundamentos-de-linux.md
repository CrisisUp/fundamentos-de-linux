# Fundamentos de Linux

Curso guiado — do conceito à infraestrutura, com prática em cada módulo.

> **Como usar:** navegue pelo índice, marque as lições conforme avança e use a busca para achar comandos. Nos blocos de código, `$` é o prompt de usuário comum e `#` o de *root* — digite só o comando.

## Módulo 1 — Introdução

### O que é o Linux

**Linux** é um **sistema operacional** — o software que gerencia o hardware e
              fornece serviços para os programas. Tecnicamente, *Linux* é o nome do **kernel** (o
              núcleo); o sistema completo é a combinação do kernel com as ferramentas (grande parte delas do projeto
              GNU) e os aplicativos.
- **Open source:** o código-fonte é aberto — dá para ler, estudar, modificar e
                redistribuir.
- **Gratuito:** a maioria das distribuições é baixada e usada sem custo.
- **Multiusuário:** várias pessoas usam a mesma máquina, cada uma com sua conta.
- **Multitarefa:** executa vários programas ao mesmo tempo.
- **Estável e seguro:** padrão em servidores por confiabilidade.
- **Onipresente:** servidores, celulares (Android usa o kernel Linux), TVs, roteadores,
                carros e sistemas embarcados.
> 💡 **Nota:** "Linux" vs "GNU/Linux" é uma discussão técnica válida: o Linux é
              o kernel; o sistema que você usa combina o kernel Linux com as ferramentas GNU (como `ls`,
              `grep`, `bash`).

### Instalando: máquina virtual ou WSL

Antes de tudo, você precisa de um ambiente para praticar. As duas formas mais simples:
#### Opção A — Máquina virtual (recomendada para aprender)
Uma **VM** roda o Linux como um "computador dentro do computador", sem tocar no seu sistema.
              Ótima para testar sem riscos.
1. Baixe o **VirtualBox** (gratuito) em virtualbox.org e instale.
2. Baixe a ISO do **Ubuntu Desktop** em ubuntu.com/download.
3. No VirtualBox: **Novo →** nome "Linux", tipo Linux, versão Ubuntu (64-bit).
4. Dê **4 GB de RAM** e **25 GB de disco** (valores mínimos razoáveis).
5. Em **Configurações → Armazenamento**, anexe o arquivo ISO ao drive de CD.
6. Inicie a máquina e siga o instalador. Depois da instalação, **remova a ISO** do drive.
#### Opção B — WSL no Windows (mais leve)
O **WSL** (Windows Subsystem for Linux) roda o Linux nativamente dentro do Windows, sem
              interface gráfica — perfeito para o terminal.
```bash
# No PowerShell como Administrador:
wsl --install
# Reinicie o computador. Depois, o Ubuntu será instalado automaticamente.
# Para abrir o terminal Linux, procure por "Ubuntu" no Menu Iniciar.
```
Comandos úteis do WSL:
```bash
wsl --list           # distribuições instaladas
wsl --set-version Ubuntu 2  # usa o WSL 2 (recomendado)
wsl                  # abre o terminal Linux a partir do Windows
```
> 💡 **Na dúvida:** comece com uma VM se quer ver o Linux com ambiente gráfico;
              use o WSL se quer velocidade e já trabalha com o terminal.

### História em poucas palavras

- **1969–70:** Ken Thompson e Dennis Ritchie criam o **UNIX** nos laboratórios
                Bell (AT&T).
- **1973:** UNIX é reescrito em **C**, tornando-se portável para vários
                hardwares.
- **1983:** Richard Stallman inicia o **Projeto GNU**, com ferramentas livres
                que replicavam o UNIX.
- **1991:** **Linus Torvalds**, estudante na Finlândia, lança o kernel Linux
                como um hobby.
- **1993:** surgem as primeiras distribuições (Debian, Slackware), facilitando a
                instalação.
- **Anos 2000+:** Linux domina servidores e supercomputadores e, via Android, os
                dispositivos móveis.
Por que isso importa? Porque explica o *padrão UNIX* dos comandos: ferramentas pequenas, que fazem
              uma coisa bem, combinadas por *pipes*.

### Distribuições

Uma **distribuição** (distro) é um pacote completo — kernel + ferramentas + gerenciador de
              pacotes + ambiente gráfico + aplicativos — mantido por uma comunidade ou empresa.
| Distribuição | Base | Melhor para |
| --- | --- | --- |
| **Ubuntu** | Debian | Iniciantes, desktop, servidor simples |
| **Debian** | — | Estabilidade; base de muitas distros |
| **Fedora** | RHEL | Tecnologias recentes, desenvolvimento |
| **Rocky / Alma** | RHEL | Servidores empresariais (sucessores do CentOS) |
| **Linux Mint** | Ubuntu/Debian | Desktop amigável para iniciantes |
| **Arch** | — | Usuários avançados, aprendizado profundo |
| **Kali** | Debian | Segurança e testes de penetração |
Há duas grandes famílias de gerenciamento de pacotes:
- **Debian** (Ubuntu, Mint, Kali): usa `apt` e pacotes `.deb`.
- **Red Hat** (Fedora, Rocky, Alma): usa `dnf`/`yum` e pacotes
                `.rpm`.
> 💡 **Não existe "melhor distro".** Existe a certa para o seu objetivo. Para
              começar a estudar, Ubuntu ou Linux Mint são os caminhos mais suaves.

### Arquitetura e o kernel

O sistema é organizado em camadas, do hardware ao usuário:
1. **Hardware** — CPU, memória RAM, disco, rede.
2. **Kernel** — núcleo; gerencia processos, memória, drivers e acesso ao hardware.
3. **Shell + utilitários** — interface entre você e o kernel (`bash`,
                `ls`, `cp`…).
4. **Aplicativos** — programas do usuário (navegador, editor, servidor web).
**Funções principais do kernel:** gerenciar processos (quem roda e por quanto tempo na CPU),
              gerenciar memória (alocar e proteger a RAM), organizar o sistema de arquivos, conversar com o hardware
              (drivers) e isolar/segurar os processos.
```bash
uname -a            # nome e versão do kernel
cat /etc/os-release   # qual distribuição você está usando
free -h               # memória RAM (em formato legível)
df -h                 # espaço em disco das partições
```

## Módulo 2 — Terminal e fundamentos

### Terminal, shell e comandos

O **terminal** é o programa que abre a janela de texto. A **shell** é o
              interpretador que lê e executa os comandos. A mais comum é o **Bash**.
#### Estrutura de um comando
```bash
comando [opções] [argumentos]
ls -l /home
  │     │      └─ argumento: o que o comando opera
  │     └─ opção: modifica o comportamento (começa com "-")
  └─ comando: o programa a executar
```
#### Primeiros comandos
```bash
pwd            # diretório atual (print working directory)
whoami         # qual usuário você é
date           # data e hora
echo "olá"     # imprime texto na tela
clear          # limpa a tela (ou Ctrl+L)
```
#### Dicas de ouro
- **Tab** completa nomes de arquivos e comandos.
- **↑/↓** navegam pelo histórico.
- **Ctrl+C** interrompe o comando em execução; **Ctrl+Z** suspende.
- `comando --help` ou `man comando` mostram a documentação.
> 💡 **`man` é seu melhor amigo.** `man ls` abre o manual.
              Saia com `q`.

### Sistema de arquivos

No Linux não existem letras de unidade como `C:`. Tudo parte da raiz `/`, e outros
              discos são **montados** em pastas dentro dela.
| Diretório | Para que serve |
| --- | --- |
| `/` | Raiz do sistema — ponto de partida de tudo |
| `/home` | Pastas pessoais dos usuários (ex.: `/home/ana`) |
| `/etc` | Arquivos de configuração do sistema |
| `/bin`, `/usr/bin` | Programas/executáveis essenciais |
| `/var` | Dados variáveis: logs, filas, caches |
| `/tmp` | Arquivos temporários (apagados ao reiniciar) |
| `/dev` | Dispositivos de hardware representados como arquivos |
| `/proc`, `/sys` | Informações virtuais do kernel/hardware em tempo real |
| `/root` | Pasta pessoal do usuário *root* |
| `/opt` | Softwares opcionais/terceiros |
> 💡 **Caminhos:** *absoluto* começa em `/` (ex.:
              `/home/ana/doc`); *relativo* parte do diretório atual. `.` = atual,
              `..` = pai, `~` = sua pasta pessoal.

### Navegação e gerenciamento de arquivos

```bash
ls                # lista arquivos do diretório atual
ls -l             # lista com detalhes (permissões, tamanho, data)
ls -a             # inclui arquivos ocultos (começam com .)
ls -lh            # tamanhos legíveis (KB, MB)
cd documentos     # entra na pasta "documentos"
cd ..             # sobe um nível
cd                # volta para sua pasta pessoal
mkdir projetos    # cria pasta
touch notas.txt   # cria arquivo vazio
cp origem.txt destino.txt  # copia arquivo
cp -r pasta1 pasta2        # copia pasta recursivamente
mv a.txt b.txt    # renomeia ou move
rm arquivo.txt   # apaga arquivo
rm -r pasta      # apaga pasta recursivamente
find . -name "*.txt"  # procura arquivos por nome
```
> ⚠️ **Cuidado com `rm -rf`.** `-f` força sem perguntar.
              Um `rm -rf /` (ou um erro de digitação) pode apagar o sistema. Confira o caminho antes de
              apagar.

### Trabalhando com texto

```bash
cat arquivo.txt      # mostra o conteúdo
less arquivo.txt     # página o conteúdo (q para sair)
head -20 arquivo.txt # primeiras 20 linhas
tail -20 arquivo.txt # últimas 20 linhas
tail -f log.txt      # acompanha em tempo real (muito usado em logs)
grep "erro" arquivo.txt  # procura "erro" no arquivo
wc -l arquivo.txt    # conta linhas
sort nomes.txt       # ordena linhas
uniq nomes.txt       # remove repetidas consecutivas
```
#### Pipes: a "cola" do Linux
O **pipe** `|` pega a saída de um comando e a entrega como entrada do próximo:
```bash
cat log.txt | grep "erro" | head -5
# pega o log, filtra linhas com "erro" e mostra as 5 primeiras

ps aux | grep nginx
# lista processos e filtra os que contêm "nginx"
```
#### Redirecionamento
```bash
echo "olá" > arquivo.txt   # escreve no arquivo (sobrescreve)
echo "mais" >> arquivo.txt  # adiciona ao final
comando 2> erros.txt       # redireciona os erros para um arquivo
```
> 💡 **Edite arquivos** com `nano` (simples) ou `vim`
              (poderoso). Ver a lição sobre editores.

## Módulo 3 — Usuários, permissões e processos

### Permissões e proprietários

Cada arquivo tem um **dono**, um **grupo** e três permissões:
              **r** (ler), **w** (escrever), **x** (executar). A saída de
              `ls -l` mostra 10 caracteres:
```bash
-rwxr-xr--  1 ana desenvolvedores 2048 ago  6 10:00 script.sh
│││ │││ │││
│││ │││ └└└── outros usuários (r--)
│││ └└└────── grupo (r-x)
└└└────────── dono/usuário (rwx)
└──────────── tipo (d = diretório, - = arquivo, l = link)
```
```bash
chmod +x script.sh     # dá permissão de executar para todos
chmod 755 script.sh    # rwxr-xr-x
chmod 644 arquivo.txt  # rw-r--r-- (padrão seguro para arquivos)
sudo chown ana script.sh  # muda o dono (requer root)
sudo chgrp dev arquivo.txt # muda o grupo
```
| Número | Permissão | Significado |
| --- | --- | --- |
| 7 | rwx | ler + escrever + executar |
| 6 | rw- | ler + escrever |
| 5 | r-x | ler + executar |
| 4 | r-- | só leitura |
| 0 | --- | nenhuma |
O modo numérico tem três dígitos: **dono · grupo · outros**. Ex.: `755` = dono
              tudo (7), grupo ler+executar (5), outros ler+executar (5).

### Usuários, grupos e sudo

- **Usuário comum** — você no dia a dia; não mexe em arquivos do sistema.
- **root** — superusuário com controle total; perigoso para uso diário.
- **sudo** — executa *um comando* com privilégios de root, de forma controlada.
- **Grupos** — conjuntos de usuários que compartilham permissões (`sudo`,
                `docker`, `www-data`…).
```bash
sudo apt update        # roda "apt update" como root
whoami                # quem sou eu
id                   # meu UID, GID e grupos
groups               # grupos dos quais faço parte
sudo useradd -m -s /bin/bash carlos  # cria usuário com pasta pessoal
sudo passwd carlos    # define a senha do usuário
sudo userdel -r carlos  # remove usuário e sua pasta pessoal
sudo usermod -aG sudo carlos  # adiciona "carlos" ao grupo sudo
```
> ⚠️ **Regra de ouro:** nunca trabalhe como root no dia a dia. Use
              `sudo` só para o comando que precisa.

### Processos

Um **processo** é um programa em execução, identificado por um **PID** (Process
              ID).
```bash
ps                   # processos do meu terminal
ps aux              # todos os processos, com detalhes
top                 # monitor em tempo real (q para sair)
htop                # versão amigável do top (pode exigir instalação)
kill 1234           # encerra o processo de PID 1234
kill -9 1234        # encerra à força (último recurso)
pkill nginx         # encerra processos pelo nome
jobs / fg / bg     # controla processos em primeiro/segundo plano
```
> 💡 **Combine com pipes:** `ps aux | grep firefox` mostra só os
              processos do Firefox.

### Serviços e systemd

**Serviços** (daemons) são programas que rodam em segundo plano — servidor web, banco de
              dados, rede. Na maioria das distros, eles são gerenciados pelo **systemd**.
```bash
systemctl status nginx     # estado do serviço (ativo, falhou, em execução)
sudo systemctl start nginx   # inicia
sudo systemctl stop nginx    # para
sudo systemctl restart nginx # reinicia
sudo systemctl enable nginx  # inicia automaticamente no boot
sudo systemctl disable nginx # remove do boot
sudo systemctl enable --now nginx  # habilita E inicia de uma vez
systemctl list-units --type=service  # lista serviços ativos
```
> 💡 **Vendo os logs de um serviço:** `journalctl -u nginx` mostra os
              logs do serviço (e `-f` acompanha em tempo real). Ver a lição de logs.

### Agendando tarefas com cron

O **cron** executa comandos automaticamente em horários agendados. Cada usuário tem sua
              tabela de tarefas.
```bash
crontab -e   # edita sua tabela (abre no editor padrão)
crontab -l   # lista suas tarefas
crontab -r   # remove todas as suas tarefas
```
Cada linha tem 5 campos de tempo + o comando: **minuto · hora · dia-do-mês · mês · dia-da-semana ·
                comando**.
```bash
#  minuto hora dia mês sem  comando
  30       2    *   *    *    /usr/bin/backup.sh      # 02:30 todo dia
   0       9    *   *    1    /usr/bin/relatorio.sh   # segundas às 09:00
  15       0    1   *    *    /usr/bin/mensal.sh      # dia 1 de cada mês às 00:15

# Atalhos comuns:
@reboot   /usr/bin/servico.sh   # ao iniciar a máquina
@daily    /usr/bin/diario.sh    # equivalente a "0 0 * * *"
```
> 💡 **Na dúvida:** confira se a tarefa rodou em
              `journalctl | grep CRON` ou `/var/log/syslog`. E teste o script manualmente antes de
              agendar.

## Módulo 4 — Sistema, pacotes e rede

### Gerenciamento de pacotes

Programas no Linux são instalados por **gerenciadores de pacotes**, que resolvem as
              dependências automaticamente.
#### Família Debian/Ubuntu (`apt`)
```bash
sudo apt update          # atualiza a lista de pacotes disponíveis
sudo apt upgrade         # atualiza os pacotes instalados
sudo apt install htop    # instala um programa
sudo apt remove htop     # remove um programa
apt search firefox       # pesquisa por pacotes
apt show htop           # informações de um pacote
```
#### Família Red Hat/Fedora (`dnf`)
```bash
sudo dnf install htop
sudo dnf remove htop
sudo dnf search firefox
```
#### Outros gerenciadores
- **Snap** (`sudo snap install nome`) e **Flatpak**
                (`flatpak install`) — pacotes universais entre distros.
- **pip** (Python), **npm** (Node.js), **gem** (Ruby) — por
                linguagem.
> 💡 Rode `sudo apt update` antes de instalar algo — instalações falham com lista
              desatualizada.

### Discos e backups

#### Ver espaço e discos
```bash
df -h            # espaço livre por partição
du -sh /var      # tamanho total de uma pasta
du -sh * | sort -h  # tamanhos das pastas, do menor ao maior
lsblk            # lista discos e partições
sudo fdisk -l    # detalhes dos discos
```
#### Compactar e fazer backup
```bash
tar -czf backup.tar.gz projetos  # compacta a pasta em .tar.gz
tar -xzf backup.tar.gz           # extrai
tar -tzf backup.tar.gz           # lista o conteúdo sem extrair

rsync -av projetos/ /backup/projetos/  # sincroniza pastas
rsync -av --delete projetos/ /backup/projetos/  # espelha (apaga o que sumiu na origem)
rsync -av -e ssh projetos/ usuario@servidor:/backup/  # backup remoto via SSH
```
> 💡 **Boa prática:** faça backup antes de mexer em arquivos de configuração
              importantes. Um backup barato evita catástrofes caras.

### Noções de rede

```bash
ip a                # endereços IP das interfaces
ip route            # rota padrão / gateway
ping google.com     # testa conectividade (Ctrl+C para parar)
curl https://exemplo.com   # baixa conteúdo de uma URL
wget https://exemplo.com/arq.zip  # baixa um arquivo
ss -tulpn           # portas abertas e serviços escutando
```
> 💡 **Contexto:** o **IP** é o endereço da máquina na rede; a
              **porta** é a "porta de entrada" de um serviço (HTTP usa 80/443, SSH usa 22).

### Acesso remoto com SSH

O **SSH** (Secure Shell) permite acessar outro computador com segurança, com conexão
              criptografada.
#### Convertendo
```bash
ssh usuario@192.168.1.10    # entra no servidor
ssh -p 2222 usuario@servidor # porta diferente da padrão (22)
scp arquivo.txt usuario@servidor:/home/usuario/  # copia via SSH
sftp usuario@servidor   # sessão de transferência de arquivos
```
#### Chaves SSH (login sem senha — recomendado)
```bash
ssh-keygen -t ed25519            # cria um par de chaves (pública + privada)
ssh-copy-id usuario@servidor     # instala sua chave pública no servidor
ssh usuario@servidor             # agora entra sem digitar senha
```
A chave pública fica em `~/.ssh/id_ed25519.pub` e é copiada para
              `~/.ssh/authorized_keys` do servidor. A chave privada (`~/.ssh/id_ed25519`)
              **nunca** deve sair da sua máquina.
#### Arquivo de configuração (~/.ssh/config)
```bash
Host meuservidor
    HostName 192.168.1.10
    User ana
    Port 2222
```
Depois disso, basta `ssh meuservidor`.
> 💡 **Túnel simples (port forwarding):**
              `ssh -L 8080:localhost:80 usuario@servidor` encaminha a porta local 8080 para o servidor — útil
              para testar serviços com segurança.

## Módulo 5 — Serviços e infraestrutura

### DNS e resolução de nomes

O **DNS** (Domain Name System) traduz nomes de domínio (`exemplo.com`) em
              endereços IP. É o "catálogo telefônico" da internet.
#### Como o Linux resolve um nome
1. Verifica o **cache** local (systemd-resolved / nscd).
2. Lê `/etc/hosts` — exceções locais.
3. Consulta os servidores DNS definidos em `/etc/resolv.conf`.
```bash
host exemplo.com          # resolve nome → IP
dig exemplo.com          # detalhado (consulta DNS completa)
dig +short exemplo.com   # só o IP, sem rudy
nslookup exemplo.com     # consulta simples (mais antigo)
cat /etc/resolv.conf     # quais servidores DNS o sistema usa
cat /etc/hosts           # mapeamentos manuais locais
dig exemplo.com MX      # registros de e-mail do domínio
dig exemplo.com NS      # servidores de nomes autoritativos
```
#### Ver registros de outro tipo (A, AAAA, CNAME, TXT)
```bash
dig exemplo.com A    # IPv4
dig exemplo.com AAAA # IPv6
dig exemplo.com CNAME # apelido
dig exemplo.com TXT  # texto (verificação de domínio, SPF…)
```
> 💡 **Cache de DNS local:** se o systemd-resolved estiver ativo,
              `resolvectl flush-caches` limpa o cache — útil quando um site muda de IP.

### Firewall: ufw e nftables

Um **firewall** controla o tráfego de rede: quais portas aceitam conexões e de onde. No
              Linux, o **nftables** (sucessor do iptables) faz o trabalho pesado; o **ufw** é
              uma camada simples por cima dele, padrão no Ubuntu.
#### UFW (o mais simples)
```bash
sudo ufw status           # regras ativas
sudo ufw enable           # liga o firewall
sudo ufw allow ssh        # libera a porta 22
sudo ufw allow 8080/tcp   # libera uma porta específica
sudo ufw deny 23          # bloqueia a porta 23
sudo ufw delete allow ssh # remove uma regra
```
> ⚠️ **Antes de habilitar:** libere primeiro o SSH
              (`sudo ufw allow ssh`) e só então rode `sudo ufw enable`. Regra de bloqueio por
              padrão pode derrubar a sua própria conexão remota.
#### nftables (mais controle)
O `nft` usa **tabelas**, **chains** (cadeias) e
              **regras**. Um exemplo mínimo:
```bash
sudo nft list ruleset    # mostra todas as regras atuais

# Criar uma tabela "filtro" com chain "entrada" de prioridade 0
sudo nft add table inet filtro
sudo nft add chain inet filtro entrada { type filter hook input priority 0; }

# Regras: aceitar SSH (22) e HTTP (80), bloquear o resto
sudo nft add rule inet filtro entrada tcp dport 22 accept
sudo nft add rule inet filtro entrada tcp dport 80 accept
sudo nft add rule inet filtro entrada drop
```
> 💡 **Importante:** as regras do `nft` criadas na linha de comando
              **não sobrevivem ao reboot**. Para persistir, salve com
              `sudo nft list ruleset > /etc/nftables.conf` e habilite o serviço
              `systemctl enable nftables`.

### Servidores web: nginx e Apache

Os dois servidores web mais usados no Linux. Ambos entregam páginas estáticas e conteúdo dinâmico; o
              **nginx** costuma ser mais leve e eficiente, o **Apache** tem suporte nativo a
              `.htaccess`.
#### Instalar e servir um site (Ubuntu)
```bash
sudo apt update
sudo apt install nginx   # ou: sudo apt install apache2
sudo systemctl status nginx
```
O site padrão fica em `/var/www/html`. Crie o seu:
```bash
sudo mkdir -p /var/www/meusite
sudo nano /var/www/meusite/index.html
sudo chown -R $USER:$USER /var/www/meusite
```
#### Configurando um host virtual no nginx
```bash
sudo nano /etc/nginx/sites-available/meusite
```
```bash
server {
    listen 80;
    server_name meusite.local;

    root /var/www/meusite;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```
```bash
sudo ln -s /etc/nginx/sites-available/meusite /etc/nginx/sites-enabled/
sudo nginx -t            # testa a sintaxe ANTES de aplicar
sudo systemctl reload nginx  # aplica sem derrubar conexões
```
> 💡 **Boas práticas:** use `nginx -t` (ou
              `apache2ctl -t`) antes de recarregar; no Apache os arquivos de site ficam em
              `/etc/apache2/sites-available/` e a habilitação usa `sudo a2ensite meusite`.

### Containers com Docker

**Containers** empacotam um aplicativo e suas dependências para rodar de forma isolada e
              portável. O **Docker** é a ferramenta mais popular para isso.
#### Instalar (Ubuntu)
```bash
sudo apt install docker.io
sudo systemctl enable --now docker
sudo usermod -aG docker $USER  # permite rodar docker sem sudo
# ⚠️ faça logout e login para o grupo valer
docker --version
```
#### Comandos essenciais
```bash
docker run -d -p 8080:80 --name meu-site nginx
# -d  roda em segundo plano          -p 8080:80  porta local → porta do container
# --name nomeia o container          nginx é a imagem base

docker ps               # containers rodando
docker ps -a           # todos (inclusive parados)
docker logs meu-site   # logs do container
docker exec -it meu-site bash  # abre um terminal DENTRO do container
docker stop meu-site   # para
docker start meu-site  # reinicia
docker rm meu-site     # remove (após parar)
docker images          # imagens baixadas
docker pull ubuntu     # baixa uma imagem sem criar container
docker run -it ubuntu bash  # roda Ubuntu interativo e entra no shell
```
#### Docker Compose (múltiplos serviços)
Crie um arquivo `compose.yaml`:
```bash
services:
  web:
    image: nginx
    ports:
      - "8080:80"
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: senha_forte
```
```bash
docker compose up -d   # sobe todos os serviços
docker compose down     # derruba tudo
docker compose ps       # estado dos serviços
```
> 💡 **Dica:** nunca rode containers como root desnecessariamente, e lembre-se:
              dados dentro de um container somem quando ele é removido — use *volumes* para persistir.

## Módulo 6 — Automação e observabilidade

### Automação com Ansible

O **Ansible** automatiza configurações em várias máquinas de uma vez. Você escreve o estado
              desejado em arquivos YAML (playbooks) e o Ansible aplica via SSH — sem precisar instalar agente nas
              máquinas.
#### Instalar (na máquina de controle)
```bash
sudo apt update
sudo apt install ansible
ansible --version
```
#### Inventário: quais máquinas gerenciar
```bash
nano hosts.ini   # inventário simples
```
```bash
[servidores]
web1 ansible_host=192.168.1.20
web2 ansible_host=192.168.1.21

[servidores:vars]
ansible_user=ana
ansible_ssh_private_key_file=~/.ssh/id_ed25519
```
#### Testar a conexão
```bash
ansible -i hosts.ini servidores -m ping
# deve responder "pong" em cada máquina
```
#### Playbook: garantir que o nginx está instalado e ativo
```bash
nano playbook.yml
```
```bash
---
- name: Configurar servidores web
  hosts: servidores
  become: true
  tasks:
    - name: Instalar nginx
      ansible.builtin.apt:
        name: nginx
        state: present
      when: ansible_os_family == "Debian"

    - name: Garantir que o serviço está ativo
      ansible.builtin.systemd:
        name: nginx
        state: started
        enabled: true
```
```bash
ansible-playbook -i hosts.ini playbook.yml
```
#### Conceitos essenciais
- **Playbook** — o "script" YAML com as tarefas.
- **Task** — uma ação (instalar, copiar, reiniciar…).
- **Módulo** — a unidade que executa a ação (`apt`, `systemd`,
                `copy`, `service`…).
- **Handler** — roda quando notificado (ex.: reiniciar serviço só se a config mudou).
- **Idempotência** — rodar o playbook várias vezes dá o mesmo resultado; o Ansible só muda
                o que precisa.
> 💡 **Por que Ansible?** Você escreve a configuração *uma vez* e aplica
              em 1 ou 1000 servidores — e o estado fica documentado no repositório.

### Monitoramento com Prometheus e Grafana

**Prometheus** coleta métricas (CPU, memória, HTTP…); **Grafana** exibe essas
              métricas em dashboards bonitos. É o par padrão do ecossistema Linux/Kubernetes.
#### Instalar Prometheus (Ubuntu)
```bash
sudo apt update
sudo apt install prometheus
sudo systemctl status prometheus
sudo systemctl enable --now prometheus
```
A interface web fica em `http://localhost:9090`. A configuração fica em
              `/etc/prometheus/prometheus.yml`.
#### Configuração mínima
```bash
sudo nano /etc/prometheus/prometheus.yml
```
```bash
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: "node"
    static_configs:
      - targets: ["localhost:9100"]
```
```bash
sudo systemctl restart prometheus
```
#### Exporter do sistema (métricas da máquina)
```bash
sudo apt install prometheus-node-exporter
sudo systemctl enable --now prometheus-node-exporter
# agora o Prometheus coleta métricas em localhost:9100
```
#### Instalar Grafana e conectar
```bash
sudo apt install -y wget gnupg
sudo mkdir -p /etc/apt/keyrings
sudo wget -O /etc/apt/keyrings/grafana.asc https://apt.grafana.com/gpg-full.key
echo "deb [signed-by=/etc/apt/keyrings/grafana.asc] https://apt.grafana.com stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana   # edição OSS (a Enterprise é 'grafana-enterprise')
sudo systemctl enable --now grafana-server
```
Abra `http://localhost:3000`, entre com **admin / admin**, adicione um
              **data source** do tipo Prometheus apontando para `http://localhost:9090` e
              importe um dashboard (ID popular: `1860`).
#### Comandos de consulta úteis (PromQL)
```bash
node_cpu_seconds_total        # uso de CPU
node_memory_MemAvailable_bytes # memória disponível
rate(node_cpu_seconds_total[5m]) # taxa média de CPU nos últimos 5 min
```
> 💡 **Arquitetura:** o Prometheus *puxa* as métricas (scrape) dos
              exporters; o Grafana *consulta* o Prometheus. Métricas são guardadas como séries temporais.

### Containers na prática: volumes e redes

Na lição 5.4 vimos o básico do Docker. Aqui entram os dois conceitos que fazem a diferença no dia a dia:
              **volumes** (persistência) e **redes** (comunicação entre containers).
#### Volumes: dados que sobrevivem
Arquivos criados dentro de um container somem quando ele é removido. **Volumes** guardam os
              dados fora do container.
```bash
docker volume create meus-dados   # cria um volume

docker run -d --name db -v meus-dados:/var/lib/postgresql/data postgres:16
# monta o volume em /var/lib/postgresql/data dentro do container

# alternativas: montar uma pasta local (-v ./dados:/caminho) ou anônimo (auto-criado)
docker volume ls          # lista volumes
docker volume inspect meus-dados  # detalhes (montagem no host)
docker volume rm meus-dados  # remove (cuidado: apaga os dados)
```
#### Redes: containers conversando
Por padrão, containers em uma mesma **rede personalizada** se encontram pelo nome — sem
              precisar de IP fixo.
```bash
docker network create minha-rede

docker run -d --name api --network minha-rede minha-imagem
docker run -d --name banco --network minha-rede postgres:16

# dentro de "api", o banco é acessível por "banco:5432"

docker network ls          # lista redes (bridge, host, none, e as suas)
docker network inspect minha-rede  # containers conectados
```
#### Um fluxo completo (volume + rede + compose)
```bash
nano compose.yaml
```
```bash
services:
  web:
    image: nginx
    ports:
      - "8080:80"
    volumes:
      - ./site:/usr/share/nginx/html
    depends_on:
      - api

  api:
    build: ./api
    environment:
      DATABASE_URL: postgres://app:senha@db:5432/app

  db:
    image: postgres:16
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: senha_forte

volumes:
  pgdata:
```
```bash
docker compose up -d   # sobe tudo: web + api + banco
docker compose ps       # estado dos serviços
docker compose logs -f api  # logs da api em tempo real
```
> 💡 **Conferindo o que está rodando:** `docker stats` mostra
              CPU/memória de cada container, e `docker inspect <nome>` revela a configuração completa.

## Módulo 7 — Trabalhando como um profissional

### Editores de texto no terminal

#### nano (simples, para começar)
```bash
nano arquivo.txt   # abre o editor
Ctrl+O   # salvar
Ctrl+X   # sair
Ctrl+W   # buscar texto
Ctrl+G   # ajuda
```
#### vim (poderoso, vale a pena aprender)
O vim tem **modos**: *normal* (navegação/comandos), *inserção* (digitar) e
              *linha de comando* (`:`).
```bash
vim arquivo.txt   # abre
i        # entra em modo de inserção (digitar)
Esc      # volta ao modo normal
:q       # sair (sem salvar se nada mudou)
:q!      # sair descartando mudanças
:w       # salvar
:wq      # salvar e sair
dd       # apagar a linha atual
yy       # copiar a linha
p        # colar
u        # desfazer
/servidor # buscar "servidor"
:set nu  # mostrar números de linha
```
> 💡 Pratique com `vimtutor` — um tutorial interativo que já vem com o vim. Vale o
              investimento: o vim está em quase todo servidor.

### Variáveis de ambiente e shell scripting

#### Variáveis de ambiente
```bash
echo $PATH          # pastas onde o shell procura comandos
echo $HOME          # sua pasta pessoal
echo $USER          # seu usuário
env                 # lista todas as variáveis de ambiente
export EDITOR=nano  # define uma variável para esta sessão
```
#### Um primeiro script
```bash
nano saudacao.sh   # crie o arquivo e digite:
```
```bash
#!/bin/bash
# isso é um comentário
nome="mundo"
echo "Olá, $nome!"
echo "Hoje é $(date +%d/%m/%Y)"
echo "Primeiro argumento: $1"
```
```bash
chmod +x saudacao.sh   # torna o script executável
./saudacao.sh           # executa (o ./ indica o diretório atual)
```
#### Estruturas comuns
```bash
#!/bin/bash
# condicional
if [ -f "/etc/hosts" ]; then
    echo "O arquivo /etc/hosts existe."
else
    echo "Arquivo não encontrado."
fi

# laço for
for arquivo in *.txt; do
    echo "Processando $arquivo"
done

# status de saída: $? é 0 se o último comando deu certo
grep "root" /etc/passwd
echo "Status: $?"
```
#### Depurando
```bash
bash -n script.sh   # só verifica a sintaxe (não executa)
bash -x script.sh   # executa mostrando cada passo (ótimo para debugar)
```
> 💡 **O `#!/bin/bash` é o "shebang"** — diz ao sistema qual
              interpretador usar. Sem ele, `./script.sh` não executa.

### Logs e resolução de problemas

Quando algo falha, os **logs** contam o que aconteceu. Saber onde procurar resolve a maioria
              dos problemas.
#### Onde ficam os logs
| Arquivo | Conteúdo |
| --- | --- |
| `/var/log/syslog` | Mensagens gerais do sistema |
| `/var/log/auth.log` | Logins, sudo, autenticação |
| `/var/log/dmesg` | Mensagens do kernel / hardware |
#### journalctl (logs do systemd)
```bash
journalctl -u nginx        # logs de um serviço
journalctl -u nginx -f     # acompanha em tempo real
journalctl -p err          # só erros
journalctl --since today   # desde hoje
```
#### Fluxo de diagnóstico
1. **O serviço está rodando?** → `systemctl status nginx`
2. **O que ele diz?** → `journalctl -u nginx --since today`
3. **Há espaço/recurso?** → `df -h`, `free -h`, `top`
4. **Confere a config** → valide a sintaxe (`nginx -t`, `sshd -t`) e
                reinicie.
> 💡 **Erros de permissão?** O log aponta o arquivo. Confira o dono e as
              permissões com `ls -l` e ajuste com `chown`/`chmod`.

### Boas práticas de segurança

- 🔑 **Senhas fortes e únicas;** use um gerenciador de senhas.
- 🚫 **Nunca use root no dia a dia** — prefira `sudo`.
- 🔄 **Mantenha o sistema atualizado:**
                `sudo apt update && sudo apt upgrade`.
- 🔐 **Firewall:** no Ubuntu, `sudo ufw enable` e libere só o necessário
                (`sudo ufw allow ssh`).
- 📁 **Permissões mínimas:** evite `chmod 777`.
- 🔎 **Desconfie de `curl ... | sudo bash`:** leia o script antes de executar.
- 🗄️ **Backups:** com `tar` e `rsync` (ver lição
                  4.2).
- 🔑 **Prefira chaves SSH** a senha para acesso remoto.

## Módulo 8 — Prática

### Exercícios práticos

1. Abra o terminal e descubra: *quem você é*, *onde está* e *qual o kernel*.
2. Crie a estrutura `~/projetos/site/assets` de uma só vez.
3. Crie `notas.txt`, escreva 3 linhas, veja o conteúdo e conte as linhas.
4. Copie para `backup.txt`, mova para `~/projetos` e depois apague.
5. Use `ls -l` e explique o que significa `-rw-r--r--`.
6. Dê permissão de execução a um script e rode com `./script.sh`.
7. Use `ps aux | grep <seu-programa>` e encerre com `kill`.
8. Descubra RAM e disco da sua máquina.
9. Consulte o `man` para achar a opção do `ls` que ordena por tamanho.
10. Veja seu IP e o gateway padrão.
11. Crie um serviço systemd simples que rode um script ao iniciar.
12. Agende um script diário com cron e confirme no log.
13. Gere um par de chaves SSH e conecte em uma máquina remota sem senha.
14. Escreva um script que receba um nome como argumento e imprima "Olá, nome".
15. Faça um backup compactado da pasta `~/projetos` com `tar`.

### Glossário

| Termo | Significado |
| --- | --- |
| **Kernel** | Núcleo do SO; gerencia hardware e processos. |
| **Distribuição (distro)** | Pacote completo: kernel + ferramentas + gerenciador de pacotes. |
| **Shell** | Interpretador de comandos (Bash, Zsh, Fish). |
| **Terminal** | Programa que fornece a janela de texto para a shell. |
| **Comando / Opção / Argumento** | O programa / o modificador (`-l`) / o alvo. |
| **Pipe (`|`)** | Conecta a saída de um comando à entrada de outro. |
| **Diretório** | Pasta que organiza arquivos. |
| **Processo** | Programa em execução, identificado por um PID. |
| **Daemon / Serviço** | Programa que roda em segundo plano (ex.: servidor web). |
| **systemd** | Sistema de inicialização e gerenciador de serviços na maioria das distros. |
| **cron** | Agendador de tarefas em horários pré-definidos. |
| **root / sudo** | Superusuário / executar um comando como root. |
| **Permissões** | Regras de leitura (r), escrita (w) e execução (x) por dono, grupo e outros. |
| **Pacote / Repositório** | Programa pronto para instalar / servidor de onde ele é baixado. |
| **Mount (montar)** | Anexar um disco/partição a um diretório. |
| **SSH** | Protocolo de acesso remoto seguro e criptografado. |
| **Log** | Registro de eventos do sistema ou de um serviço. |

### Referências e documentação

Fontes consultadas para construir e verificar os comandos deste curso. As marcadas com **★** foram conferidas diretamente durante a revisão; as demais são as referências oficiais de cada ferramenta.
| Ferramenta / tópico | Comandos usados | Documentação oficial |
| --- | --- | --- |
| **★ Grafana** (instalação Debian/Ubuntu) | `wget`, `apt`, `systemctl` | grafana.com/docs/grafana → Installation → Debian/Ubuntu |
| **★ Prometheus** (getting started) | `prometheus.yml`, `scrape_interval` | prometheus.io/docs/prometheus/latest/getting_started |
| **★ nftables** (gestão de regras) | `nft add table/chain/rule`, `nft list ruleset` | wiki.nftables.org — Simple rule management |
| **★ Ubuntu packages** (verificação de pacotes) | `apt install prometheus` | packages.ubuntu.com — páginas do pacote `prometheus` |
| **GNU Coreutils** | `ls`, `cp`, `mv`, `rm`, `mkdir`, `touch`, `cat`, `head`, `tail`, `sort`, `uniq`, `wc`, `df`, `du`, `chmod`, `chown`, `chgrp`, `date`, `echo` | gnu.org/software/coreutils/manual |
| **Bash** | `if`, `for`, variáveis, `$?`, `export`, shebang | gnu.org/software/bash/manual |
| **grep / find** | `grep`, `find` | gnu.org/software/grep/manual · man7.org/linux/man-pages/man1/find.1.html |
| **systemd — systemctl** | `systemctl start/stop/restart/enable/disable`, `list-units` | freedesktop.org/software/systemd/man/systemctl.html |
| **systemd — journalctl** | `journalctl -u/-f/-p/--since` | freedesktop.org/software/systemd/man/journalctl.html |
| **cron** | `crontab -e/-l/-r`, campos de tempo | man7.org/linux/man-pages/man5/crontab.5.html |
| **tar** | `tar -czf/-xzf/-tzf` | gnu.org/software/tar/manual |
| **rsync** | `rsync -av`, `--delete`, `-e ssh` | download.samba.org/pub/rsync/rsync.1 |
| **OpenSSH** | `ssh`, `scp`, `sftp`, `ssh-keygen`, `ssh-copy-id` | openssh.com/manual.html |
| **iproute2 (ip / ss)** | `ip a`, `ip route`, `ss` | man7.org/linux/man-pages/man8/ip.8.html |
| **BIND — dig / host / nslookup** | `dig`, `host`, `nslookup`, `resolvectl` | isc.org/docs (BIND 9) · freedesktop.org/software/systemd/man/resolvectl.html |
| **UFW** | `ufw enable/allow/deny/delete` | help.ubuntu.com/community/UFW · manpages (ufw) |
| **nginx** | `nginx -t`, host virtual, `try_files` | nginx.org/en/docs |
| **Apache** | `apache2ctl -t`, `a2ensite` | httpd.apache.org/docs |
| **Docker** | `docker run/ps/logs/exec/stop/rm/volume/network` | docs.docker.com |
| **Docker Compose** | `docker compose up/down/ps/logs`, `compose.yaml` | docs.docker.com/compose |
| **Ansible** | `ansible`, `ansible-playbook`, módulos `apt`/`systemd` | docs.ansible.com |
| **node_exporter** | `prometheus-node-exporter` | github.com/prometheus/node_exporter |
| **vim** | `vim`, `vimtutor` | vim.org/docs.php |
| **nano** | `nano` | nano-editor.org/docs.php |
| **WSL** | `wsl --install`, `wsl --list`, `--set-version` | learn.microsoft.com/windows/wsl |
| **Ubuntu (ISO/instalação)** | — | ubuntu.com/download |
| **VirtualBox** | — | virtualbox.org/manual |
> 💡 **Dica:** em qualquer máquina Linux, o atalho `man comando` abre a referência local da ferramenta — a fonte mais confiável que existe na sua própria máquina.
