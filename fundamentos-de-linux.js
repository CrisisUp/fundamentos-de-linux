/*
  fundamentos-de-linux.js — interatividade do curso
  Fonte: extraído de fundamentos-de-linux.html (seção <script>)
  Gerenciar este arquivo, não o JS dentro do HTML.
*/

(function () {
  "use strict";

  /* ==========================================================================
           CONSTANTES
           ========================================================================== */
        const STORAGE_KEYS = {
          done: "linux-curso-done",
          theme: "linux-curso-theme"
        };

        const THEMES = { LIGHT: "light", DARK: "dark" };

        /* ==========================================================================
           UTILITÁRIOS
           ========================================================================== */
        const readJSON = (key) => {
          try { return JSON.parse(localStorage.getItem(key) || "[]"); }
          catch (_) { return []; }
        };

        const writeJSON = (key, value) => {
          try { localStorage.setItem(key, JSON.stringify(value)); }
          catch (_) { /* armazenamento indisponível — ignora */ }
        };

        const readItem = (key) => {
          try { return localStorage.getItem(key); }
          catch (_) { return null; }
        };

        const writeItem = (key, value) => {
          try { localStorage.setItem(key, value); }
          catch (_) { /* armazenamento indisponível — ignora */ }
        };

        /* ==========================================================================
           ESTADO DA APLICAÇÃO (independente do DOM)
           ========================================================================== */
        const store = {
          done: new Set(readJSON(STORAGE_KEYS.done)),
          theme: readItem(STORAGE_KEYS.theme) || THEMES.LIGHT,

          isDone(id) { return this.done.has(id); },
          toggleDone(id) {
            if (this.done.has(id)) { this.done.delete(id); }
            else { this.done.add(id); }
            writeJSON(STORAGE_KEYS.done, Array.from(this.done));
          },
          setTheme(theme) {
            this.theme = theme;
            writeItem(STORAGE_KEYS.theme, theme);
          }
        };

        /* ==========================================================================
           SELEÇÃO DO DOM
           ========================================================================== */
        const dom = {
          lessons: Array.from(document.querySelectorAll(".lesson")),
          modules: Array.from(document.querySelectorAll(".module")),
          toc: document.getElementById("toc"),
          tocLinks: () => Array.from(document.querySelectorAll(".toc a")),
          overallBar: document.getElementById("overallBar"),
          overallText: document.getElementById("overallText"),
          heroDone: document.getElementById("heroDone"),
          search: document.getElementById("search"),
          sidebar: document.getElementById("sidebar"),
          menuToggle: document.getElementById("menuToggle"),
          themeToggle: document.getElementById("themeToggle"),
          printBtn: document.getElementById("printBtn")
        };

        /* ==========================================================================
           ÍNDICE LATERAL
           ========================================================================== */
        function buildToc() {
          dom.modules.forEach((module) => {
            const group = document.createElement("div");
            group.className = "toc-group";

            const label = document.createElement("div");
            label.className = "toc-module";
            label.textContent = module.getAttribute("data-title");

            const list = document.createElement("ul");
            module.querySelectorAll(".lesson").forEach((lesson) => {
              const item = document.createElement("li");
              const link = document.createElement("a");
              link.href = "#" + lesson.id;
              link.textContent = lesson.querySelector(".lesson-title").textContent;
              item.appendChild(link);
              list.appendChild(item);
            });

            group.appendChild(label);
            group.appendChild(list);
            dom.toc.appendChild(group);
          });
        }

        /* ==========================================================================
           PROGRESSO
           ========================================================================== */
        function renderProgress() {
          const total = dom.lessons.length;
          const completed = dom.lessons.filter((l) => store.isDone(l.id)).length;
          const percent = total ? Math.round((completed / total) * 100) : 0;

          dom.overallBar.style.width = percent + "%";
          dom.overallBar.setAttribute("aria-valuenow", String(percent));
          dom.overallText.textContent = `${completed}/${total} (${percent}%)`;
          dom.heroDone.textContent = (completed === total && total > 0)
            ? "🏆 Curso concluído! Parabéns."
            : `✔ ${completed} de ${total} tópicos concluídos`;

          dom.modules.forEach((module) => {
            const lessonCount = module.querySelectorAll(".lesson").length;
            const doneCount = Array.from(module.querySelectorAll(".lesson"))
              .filter((l) => store.isDone(l.id)).length;

            module.querySelector("[data-module-progress]").innerHTML =
              `<span class="fill">${doneCount}/${lessonCount}</span> desta seção concluídos`;
            module.querySelector("[data-badge]").textContent = `${doneCount}/${lessonCount}`;
          });

          dom.tocLinks().forEach((link) => {
            const lessonId = link.getAttribute("href").slice(1);
            link.setAttribute("data-done", store.isDone(lessonId) ? "true" : "false");
          });
        }

        /* ==========================================================================
           LIÇÕES — ESTADO VISUAL
           ========================================================================== */
        function syncLessonState(lesson) {
          const isDone = store.isDone(lesson.id);
          const isCollapsed = lesson.dataset.collapsed === "true";

          lesson.dataset.done = isDone ? "true" : "false";

          const doneBtn = lesson.querySelector(".done-btn");
          doneBtn.textContent = isDone ? "✓ Concluído" : "Marcar como concluído";
          doneBtn.setAttribute("aria-pressed", isDone ? "true" : "false");

          const head = lesson.querySelector(".lesson-head");
          head.setAttribute("aria-expanded", isCollapsed ? "false" : "true");
        }

        function toggleLesson(lesson) {
          const isCollapsed = lesson.dataset.collapsed === "true";
          lesson.dataset.collapsed = isCollapsed ? "false" : "true";
          syncLessonState(lesson);
        }

        /* ==========================================================================
           EVENTOS — delegação em um único listener
           ========================================================================== */
        document.addEventListener("click", (event) => {
          const doneBtn = event.target.closest(".done-btn");
          if (doneBtn) {
            event.stopPropagation();
            const lesson = doneBtn.closest(".lesson");
            store.toggleDone(lesson.id);
            syncLessonState(lesson);
            renderProgress();
            return;
          }

          const head = event.target.closest(".lesson-head");
          if (head) {
            toggleLesson(head.closest(".lesson"));
          }
        });

        /* ==========================================================================
           BUSCA
           ========================================================================== */
        dom.search.addEventListener("input", () => {
          const query = dom.search.value.trim().toLowerCase();

          dom.lessons.forEach((lesson) => {
            const matches = !query || lesson.textContent.toLowerCase().includes(query);
            lesson.hidden = !matches;
          });

          dom.modules.forEach((module) => {
            const hasVisibleLesson = Array.from(module.querySelectorAll(".lesson"))
              .some((lesson) => !lesson.hidden);
            module.hidden = !hasVisibleLesson;
          });
        });

        /* ==========================================================================
           SCROLLSPY
           ========================================================================== */
        function setActiveLesson(lessonId) {
          dom.tocLinks().forEach((link) => {
            const isActive = link.getAttribute("href") === "#" + lessonId;
            link.setAttribute("aria-current", isActive ? "true" : "false");
          });
        }

        const spy = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveLesson(entry.target.id);
          });
        }, { rootMargin: "-35% 0px -60% 0px" });

        dom.lessons.forEach((lesson) => spy.observe(lesson));

        /* ==========================================================================
           TEMA
           ========================================================================== */
        function applyTheme(theme) {
          document.documentElement.setAttribute("data-theme", theme);
          const isDark = theme === THEMES.DARK;
          dom.themeToggle.textContent = isDark ? "☀️" : "🌙";
          dom.themeToggle.setAttribute("aria-pressed", isDark ? "true" : "false");
        }

        function initTheme() {
          applyTheme(store.theme);
          dom.themeToggle.addEventListener("click", () => {
            const next = store.theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
            store.setTheme(next);
            applyTheme(next);
          });
        }

        /* ==========================================================================
           MENU MÓVEL
           ========================================================================== */
        function initMenu() {
          dom.menuToggle.addEventListener("click", () => {
            const isOpen = dom.sidebar.dataset.open === "true";
            dom.sidebar.dataset.open = isOpen ? "false" : "true";
            dom.menuToggle.setAttribute("aria-expanded", isOpen ? "false" : "true");
          });

          dom.toc.addEventListener("click", (event) => {
            if (event.target.tagName === "A") {
              dom.sidebar.dataset.open = "false";
              dom.menuToggle.setAttribute("aria-expanded", "false");
            }
          });
        }

        /* ==========================================================================
           IMPRESSÃO
           ========================================================================== */
        function initPrint() {
          dom.printBtn.addEventListener("click", () => window.print());
        }

        /* ==========================================================================
           INICIALIZAÇÃO
           ========================================================================== */
        function init() {
          buildToc();
          dom.lessons.forEach(syncLessonState);
          renderProgress();
          initTheme();
          initMenu();
          initPrint();
        }

        init();
})();
