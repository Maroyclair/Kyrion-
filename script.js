/*
  ==========================================================
  KYRION — CONFIGURAÇÃO
  ==========================================================
  Links oficiais da comunidade Kyrion.
*/

const LINKS = {
  discord: "https://discord.gg/HcjMGHrzP",
  instagram: "https://www.instagram.com/",
  tiktok: "https://www.tiktok.com/",
  youtube: "https://www.youtube.com/",
  tutorial: "https://youtu.be/JEfunP_hof4?feature=shared",
  email: "mailto:contato@kyrion.com"
};


/* ==========================================================
   ELEMENTOS
   ========================================================== */

const body = document.body;

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

const modal = document.getElementById("tutorialModal");
const tutorialFrame = document.getElementById("tutorialFrame");
const videoEmpty = document.getElementById("videoEmpty");

const toast = document.getElementById("toast");


/* ==========================================================
   ANO DO COPYRIGHT
   ========================================================== */

document.getElementById("year").textContent = new Date().getFullYear();


/* ==========================================================
   MODO CLARO / ESCURO
   ==========================================================
   A preferência fica salva no navegador.
   ========================================================== */

function applyTheme(theme) {

  const light = theme === "light";

  body.classList.toggle("light", light);

  themeIcon.textContent = light ? "☀" : "☾";

  themeText.textContent = light
    ? "Modo claro"
    : "Modo escuro";

  themeToggle.setAttribute(
    "aria-pressed",
    String(light)
  );

  themeToggle.setAttribute(
    "aria-label",
    light
      ? "Mudar para modo escuro"
      : "Mudar para modo claro"
  );

  localStorage.setItem(
    "kyrion-theme",
    theme
  );
}


const savedTheme =
  localStorage.getItem("kyrion-theme");


if (
  savedTheme === "light" ||
  savedTheme === "dark"
) {

  applyTheme(savedTheme);

} else {

  const systemWantsLight =
    window.matchMedia &&
    window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;

  applyTheme(
    systemWantsLight
      ? "light"
      : "dark"
  );
}


themeToggle.addEventListener(
  "click",
  () => {

    applyTheme(
      body.classList.contains("light")
        ? "dark"
        : "light"
    );

  }
);


/* ==========================================================
   MENU MOBILE
   ========================================================== */

function closeMobileMenu() {

  mainNav.classList.remove("open");

  menuToggle.setAttribute(
    "aria-expanded",
    "false"
  );
}


menuToggle.addEventListener(
  "click",
  () => {

    const opened =
      mainNav.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(opened)
    );

  }
);


document
  .querySelectorAll(".nav-link")
  .forEach(link => {

    link.addEventListener(
      "click",
      closeMobileMenu
    );

  });


/* ==========================================================
   LINKS DAS REDES
   ==========================================================
   Procura todos os elementos que possuem
   data-url="discord", data-url="tutorial", etc.
   e coloca automaticamente o link correto.
   ========================================================== */

document
  .querySelectorAll("[data-url]")
  .forEach(element => {

    const key = element.dataset.url;

    if (LINKS[key]) {

      element.href = LINKS[key];

    }

  });


/* ==========================================================
   TUTORIAL DO YOUTUBE
   ========================================================== */

function getYoutubeEmbed(url) {

  try {

    const parsed = new URL(url);


    /* ------------------------------------------------------
       Formato:
       https://youtu.be/VIDEO
       ------------------------------------------------------ */

    if (
      parsed.hostname.includes("youtu.be")
    ) {

      const id =
        parsed.pathname
          .replace("/", "")
          .trim();

      return id
        ? `https://www.youtube.com/embed/${id}?rel=0`
        : "";

    }


    /* ------------------------------------------------------
       Formato:
       https://www.youtube.com/watch?v=VIDEO
       ------------------------------------------------------ */

    if (
      parsed.hostname.includes("youtube.com")
    ) {

      const id =
        parsed.searchParams.get("v");


      if (id) {

        return `https://www.youtube.com/embed/${id}?rel=0`;

      }


      /* ----------------------------------------------------
         Caso o link já seja /embed/
         ---------------------------------------------------- */

      if (
        parsed.pathname.startsWith("/embed/")
      ) {

        return url;

      }

    }

  } catch (error) {

    return "";

  }

  return "";
}


/* ==========================================================
   ABRIR TUTORIAL
   ========================================================== */

function openTutorial() {

  const embedUrl =
    getYoutubeEmbed(LINKS.tutorial);


  modal.classList.add("open");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

  body.classList.add("no-scroll");


  if (embedUrl) {

    tutorialFrame.src = embedUrl;

    tutorialFrame.style.display =
      "block";

    videoEmpty.style.display =
      "none";

  } else {

    tutorialFrame.src =
      "about:blank";

    tutorialFrame.style.display =
      "none";

    videoEmpty.style.display =
      "grid";

  }

}


/* ==========================================================
   FECHAR TUTORIAL
   ========================================================== */

function closeTutorial() {

  modal.classList.remove("open");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

  tutorialFrame.src =
    "about:blank";

  body.classList.remove(
    "no-scroll"
  );

}


/* ==========================================================
   BOTÕES QUE ABREM O TUTORIAL
   ========================================================== */

const openTutorialHero =
  document.getElementById(
    "openTutorialHero"
  );

const openTutorialPanel =
  document.getElementById(
    "openTutorialPanel"
  );


if (openTutorialHero) {

  openTutorialHero.addEventListener(
    "click",
    openTutorial
  );

}


if (openTutorialPanel) {

  openTutorialPanel.addEventListener(
    "click",
    openTutorial
  );

}


/* ==========================================================
   BOTÕES QUE FECHAM O MODAL
   ========================================================== */

document
  .querySelectorAll("[data-close-modal]")
  .forEach(element => {

    element.addEventListener(
      "click",
      closeTutorial
    );

  });


/* ==========================================================
   FECHAR COM ESC
   ========================================================== */

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {

      closeTutorial();

    }

  }
);


/* ==========================================================
   VOLTAR AO TOPO
   ========================================================== */

document
  .querySelectorAll(".js-scroll-top")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        window.scrollTo({

          top: 0,

          behavior: "smooth"

        });

      }
    );

  });


/* ==========================================================
   NAVEGAÇÃO ATIVA
   ========================================================== */

const navLinks =
  [
    ...document.querySelectorAll(
      ".nav-link"
    )
  ];


const observedSections = [

  document.getElementById(
    "inicio"
  ),

  document.getElementById(
    "sobre"
  ),

  document.getElementById(
    "tutoriais"
  ),

  document.getElementById(
    "redes"
  ),

  document.getElementById(
    "contato"
  )

].filter(Boolean);


const sectionObserver =
  new IntersectionObserver(

    entries => {

      const visible =
        entries

          .filter(
            entry =>
              entry.isIntersecting
          )

          .sort(
            (a, b) =>
              b.intersectionRatio -
              a.intersectionRatio
          )[0];


      if (!visible) return;


      navLinks.forEach(link => {

        link.classList.toggle(

          "active",

          link.getAttribute("href") ===
            `#${visible.target.id}`

        );

      });

    },

    {

      threshold: [
        0.2,
        0.45,
        0.7
      ],

      rootMargin:
        "-80px 0px -25% 0px"

    }

  );


observedSections.forEach(
  section =>
    sectionObserver.observe(section)
);


/* ==========================================================
   TOAST — FEEDBACK VISUAL
   ========================================================== */

let toastTimer;


function showToast(message) {

  clearTimeout(toastTimer);

  toast.textContent =
    message;

  toast.classList.add(
    "show"
  );


  toastTimer =
    setTimeout(
      () => {

        toast.classList.remove(
          "show"
        );

      },
      2600
    );

}


/* ==========================================================
   AVISO PARA LINKS QUE AINDA SÃO EXEMPLOS
   ==========================================================
   Discord e tutorial NÃO são mais considerados exemplos.
   ========================================================== */

document
  .querySelectorAll("[data-url]")
  .forEach(element => {

    element.addEventListener(
      "click",
      () => {

        const key =
          element.dataset.url;

        const target =
          LINKS[key];


        const exampleLinks = [

          "https://www.instagram.com/",

          "https://www.tiktok.com/",

          "https://www.youtube.com/",

          "mailto:contato@kyrion.com"

        ];


        if (
          exampleLinks.includes(target)
        ) {

          showToast(
            `Edite o link "${key}" no arquivo script.js.`
          );

        }

      }
    );

  });


/* ==========================================================
   GARANTE QUE O MENU FECHE AO REDIMENSIONAR
   ========================================================== */

window.addEventListener(
  "resize",
  () => {

    if (
      window.innerWidth > 760
    ) {

      closeMobileMenu();

    }

  }
);