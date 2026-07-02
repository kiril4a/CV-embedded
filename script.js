const revealItems = document.querySelectorAll(".reveal");
const modelStage = document.querySelector(".model-stage");
const embeddedDevice = document.querySelector(".embedded-device");
const timeline = document.querySelector(".timeline");
const timelineItems = document.querySelectorAll(".timeline-item");
const timelineClip = document.querySelector(".timeline-progress-clip");
const i18nNodes = document.querySelectorAll("[data-i18n]");
const i18nAltNodes = document.querySelectorAll("[data-i18n-alt]");
const i18nAriaNodes = document.querySelectorAll("[data-i18n-aria]");
const i18nContentNodes = document.querySelectorAll("[data-i18n-content]");
const langButtons = document.querySelectorAll("[data-lang]");
const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const topNav = document.querySelector(".top-nav");
const contactForm = document.querySelector("[data-contact-form]");
const contactStatus = document.querySelector("[data-contact-status]");

const SUPABASE_URL = "https://zvzpuynjkxajzajkjcjx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2enB1eW5qa3hhanphamtqY2p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwMjE4NzEsImV4cCI6MjA5ODU5Nzg3MX0.5q011I_yP_m2LvBBgb9KPunhujozkXdeDkmWXiHPU7o";
const CONTACT_TABLE = "contact_messages";

if (window.location.pathname.endsWith("/index.html")) {
  const cleanPath = window.location.pathname.replace(/index\.html$/, "");
  window.history.replaceState(null, "", `${cleanPath}${window.location.search}${window.location.hash}`);
}

const translations = {
  en: {
    "nav.contact": "Contact",
    "contact.status.idle": "Supabase connection is not configured yet.",
    "contact.status.sending": "Sending message...",
    "contact.status.success": "Message saved. I will get back with a response.",
    "contact.status.config": "Add Supabase URL and anon key in script.js first.",
    "contact.status.error": "Could not send the message. Try writing directly by email."
  },
  uk: {
    "loader.booting": "Завантаження embedded profile",
    "aria.loading": "Завантаження сторінки",
    "aria.home": "Головна сторінка Kyrylo Matiushenko",
    "aria.nav": "Головна навігація",
    "aria.language": "Вибір мови",
    "aria.menu": "Відкрити меню",
    "aria.modelStage": "Інтерактивна модель embedded controller",
    "aria.model": "Стилізована 3D-модель embedded controller board",
    "aria.profile": "Ключові факти профілю",
    "meta.home.description": "Kyrylo Matiushenko - embedded developer, який працює з IoT, robotics, computer vision та autonomous systems.",
    "meta.esp.description": "ESP8266 camera streaming та object tracking project by Kyrylo Matiushenko.",
    "meta.ev.description": "Electric vehicle conversion та embedded control system by Kyrylo Matiushenko.",
    "meta.ai.description": "AI-assisted embedded navigation system by Kyrylo Matiushenko.",
    "meta.contact.description": "Зв'язок з Kyrylo Matiushenko для embedded, IoT та computer vision проєктів.",
    "nav.about": "Про мене",
    "nav.esp": "ESP8266 Vision",
    "nav.ev": "EV Control",
    "nav.ai": "AI Navigation",
    "nav.contact": "Зв'язок",
    "nav.cv": "Відкрити CV",
    "home.hero.eyebrow": "Embedded software / IoT / robotics",
    "home.hero.title": "Поєдную software, hardware та автономні системи.",
    "home.hero.lead": "Я embedded developer з Києва, працюю з мікроконтролерами, Linux-платами, computer vision, автоматизацією та реальною інтеграцією заліза.",
    "home.stats.kpi": "КПІ, ФІОТ",
    "home.stats.firmware": "Firmware та control",
    "home.stats.vision": "Vision та automation",
    "home.stats.english": "Англійська комунікація",
    "home.path.eyebrow": "Мій шлях",
    "home.path.title": "Шлях через схеми, код і системи комп'ютерного зору.",
    "home.path.2016.title": "Перші embedded-експерименти",
    "home.path.2016.text": "Почав вивчати embedded systems через практику з платами, проводами й firmware. Саме тоді сформувався підхід: дебажити реальний пристрій, а не тільки код, який мав би працювати.",
    "home.path.2022.title": "Автоматизація квест-кімнат у Києві",
    "home.path.2022.text": "Створював електроніку для квест-кімнат: Arduino-контролери, сенсори, реле, RFID, світло, звук і ланцюги автоматизації. Це був перший досвід, де надійність була важливіша за красивий прототип.",
    "home.path.2023.title": "Університет, переїзд, нейромережі та computer vision",
    "home.path.2023.text": "Вступив до КПІ, переїхав і почав рухатися від класичного embedded до нейромереж та computer vision. GoIT дав перший структурований поштовх, а університетські проєкти перетворили це на глибшу практику.",
    "home.path.2024.title": "Малі замовні проєкти та чіткіша спеціалізація",
    "home.path.2024.text": "Брався за невеликі замовні проєкти, де кожна задача змішувала firmware, поведінку заліза, інтерфейси, тестування й практичну доставку результату.",
    "home.path.now.date": "Зараз",
    "home.path.now.title": "Embedded vision та автономні системи",
    "home.path.now.text": "Фокусуюсь на embedded software, Linux-платах, computer vision, UAV-related технологіях і навігації без GPS. Найцікавіша зона для мене там, де perception, firmware і фізичні обмеження сходяться в одну систему.",
    "home.projects.eyebrow": "Вибрані проєкти",
    "home.projects.title": "Три технічні історії з CV.",
    "home.projects.esp.text": "Real-time video streaming та object tracking на обмеженому embedded hardware.",
    "home.projects.ev.text": "Honda Tact 24 EV conversion з RFID, RF communication, UART, PWM та motor control.",
    "home.projects.ai.text": "Embedded Linux і computer vision для навігації в середовищах без GPS.",
    "home.projects.open": "Відкрити проєкт",
    "home.stack.eyebrow": "Tech stack",
    "home.stack.title": "Технології, якими я перетворюю сигнали на робочі системи.",
    "footer.role": "Embedded Developer, Київ, Україна",
    "contact.eyebrow": "Зв'язок",
    "contact.title": "Обговоримо проєкт, пропозицію або співпрацю.",
    "contact.lead": "Напиши коротко, що потрібно зробити, яке залізо або software вже є, і на якому етапі зараз задача.",
    "contact.direct": "Прямі контакти",
    "contact.name": "Ім'я",
    "contact.email": "Email",
    "contact.message": "Повідомлення",
    "contact.submit": "Надіслати",
    "contact.status.idle": "Supabase ще не налаштований.",
    "contact.status.sending": "Надсилаю повідомлення...",
    "contact.status.success": "Повідомлення збережено. Я повернусь із відповіддю.",
    "contact.status.config": "Потрібно додати Supabase URL і anon key у script.js.",
    "contact.status.error": "Не вдалось надіслати повідомлення. Спробуй написати напряму на email.",
    "contact.supabase.title": "Supabase setup",
    "contact.supabase.text": "Форма вже підготовлена для Supabase. Додай project URL і anon key у script.js, створи таблицю contact_messages, і заявки будуть зберігатися там.",
    "project.esp.eyebrow": "Проєкт 01",
    "project.esp.title": "ESP8266 Camera Streaming & Object Tracking",
    "project.esp.lead": "Компактна система відеоспостереження й tracking на базі ESP8266 та ArduCAM OV2640. Головна ідея: motion detection і target tracking рахуються прямо на мікроконтролері, а браузер лише візуалізує результат.",
    "project.esp.photo": "Демо web interface для ESP8266 tracking",
    "project.esp.proves": "Цей проєкт показує, що корисну computer-vision логіку можна запускати навіть на дуже обмеженому hardware, якщо алгоритм спроєктований під конкретний пристрій. ESP8266 не має ресурсу для нейромереж чи важких CV pipeline, тому система використовує grayscale frame differencing, bounding-box extraction і ROI-based tracking.",
    "project.esp.proves2": "Камера може працювати у звичайному JPEG streaming mode, але detection і tracking перемикають її в YUV422 capture. Firmware витягує тільки Y channel, порівнює поточний і попередній кадри, фільтрує noise та lighting changes, а потім відправляє compact binary response у web interface.",
    "project.esp.modes.title": "Режими роботи",
    "project.esp.mode1.title": "JPEG stream",
    "project.esp.mode1.text": "Multipart camera stream з вибором 160x120, 320x240 та 640x480 resolution.",
    "project.esp.mode2.title": "Motion detection",
    "project.esp.mode2.text": "ESP8266 сканує grayscale frame, знаходить changed pixels і повертає bounding box навколо руху.",
    "project.esp.mode3.title": "Target tracking",
    "project.esp.mode3.text": "Користувач клікає по цілі в браузері, а ESP8266 відстежує тільки локальний ROI навколо цього об'єкта.",
    "project.esp.algorithm.title": "Дизайн алгоритму",
    "project.esp.algorithm.text": "Firmware захоплює 160x120 YUV422 frame і залишає тільки brightness values, тому кожен analysis frame займає 19,200 bytes. Два статичні frame buffers допомагають уникати heap fragmentation під час безперервної роботи.",
    "project.esp.algorithm.text2": "Щоб зменшити false positives, алгоритм ігнорує малий рух нижче pixel threshold і відкидає глобальні lighting changes, коли змінюється надто велика частина кадру. Tracking mode звужує пошук до padded region навколо попередньої позиції цілі.",
    "project.esp.protocol.title": "Протокол передачі",
    "project.esp.protocol.text": "Замість повільного JSON для кожного кадру ESP повертає custom binary packet: 8-byte header зі станом руху, кількістю змінених пікселів, валідністю bounding box і координатами, а далі 19,200 bytes grayscale pixels. Browser декодує Uint8Array і малює frame та boxes на HTML5 Canvas.",
    "project.esp.li1": "Реалізував ESP8266 SoftAP web server з endpoints для stream, mode, detection і target.",
    "project.esp.li2": "Інтегрував ArduCAM OV2640 через SPI/I2C і перемикання між JPEG та YUV capture paths.",
    "project.esp.li3": "Побудував motion detection на frame differencing, thresholds, bounding boxes і lighting-change filtering.",
    "project.esp.li4": "Реалізував ROI tracking, який керується кліком користувача в browser Canvas interface.",
    "project.esp.li5": "Запакував detection results і grayscale pixels у compact binary response для швидшого rendering.",
    "project.esp.fact1": "analysis frame",
    "project.esp.fact2": "Y-channel buffer",
    "project.esp.fact3": "binary header",
    "project.esp.fact4": "camera CS pin",
    "project.github": "Відкрити GitHub",
    "project.ev.eyebrow": "Проєкт 02",
    "project.ev.title": "Electric Vehicle Conversion & Embedded Control System",
    "project.ev.title.short": "Electric Vehicle Conversion & Embedded Control",
    "project.ev.lead": "Система керування для електроконверсії Honda Tact 24: безключовий доступ, RFID-авторизація, UART, PWM та інтеграція з контролером двигуна.",
    "project.ev.photo": "Тестовий виїзд Honda Tact 24 electric conversion",
    "project.ev.proves": "Це не лабораторний макет, а робота з реальною технікою: електронікою, прошивкою, силовою частиною та поведінкою мопеда під навантаженням. Тут важливо було не просто зібрати схему, а зробити систему, яку можна вмикати, тестувати й налагоджувати без сюрпризів.",
    "project.ev.proves2": "Переробка не зводилась до заміни бензинового двигуна на електропривід. Окремо потрібно було продумати логіку доступу, запуску, обміну сигналами з контролером двигуна та реакцію системи на різні стани живлення. Саме ця частина перетворює набір компонентів на керований транспортний засіб.",
    "project.ev.system.title": "Архітектура системи",
    "project.ev.system1.title": "Доступ до транспортного засобу",
    "project.ev.system1.text": "Безключовий RF-доступ і RFID використовувались для авторизації та безпечного увімкнення електроніки мопеда.",
    "project.ev.system2.title": "Прошивка керування",
    "project.ev.system2.text": "Прошивка на Arduino Nano координувала стани системи, вхідні сигнали, PWM-керування та обмін даними з іншими вузлами.",
    "project.ev.system3.title": "Інтеграція силової частини",
    "project.ev.system3.text": "Керуюча електроніка працювала поруч із тяговою системою, тому довелось враховувати завади, проводку, заземлення та поведінку при помилках.",
    "project.ev.firmware.title": "Логіка прошивки",
    "project.ev.firmware.text": "Прошивка розглядала мопед як систему зі станами, а не як набір окремих перемикачів. Потрібно було розділити вимкнений, авторизований, готовий до руху та активний режими, реагувати на RF/RFID-сигнали й не передавати на контролер двигуна випадкові комбінації команд.",
    "project.ev.firmware.text2": "UART і PWM використовувались як робочі інтерфейси, а не як демонстраційні приклади: UART для обміну даними та діагностики, PWM для керуючих сигналів, а дискретні входи й виходи для поведінки, яку можна перевірити на стенді перед тестовими виїздами.",
    "project.ev.testing.title": "Тестування на реальному залізі",
    "project.ev.testing.text": "Головний виклик був у тому, що кожне рішення в прошивці впливало на фізичний транспорт. Налагодження включало не лише код, а й проводку, рівні напруги, надійність з'єднань та фактичну реакцію контролера двигуна.",
    "project.ev.li1": "Реалізував прошивку Arduino Nano для логіки керування електромопедом.",
    "project.ev.li2": "Інтегрував безключовий RF-доступ та RFID-авторизацію.",
    "project.ev.li3": "Працював з UART, PWM, сигналами керування двигуном та обмеженнями силової електроніки.",
    "project.ev.li4": "Тестував і налагоджував прошивку на реальному залізі, а не тільки на схемі.",
    "project.ev.li5": "Описав поведінку системи через зрозумілі стани замість набору незалежних перемикачів.",
    "project.ev.li6": "Перевіряв керуючу електроніку на стенді та під час практичних тестових виїздів.",
    "project.ev.fact1": "головний контролер",
    "project.ev.fact2": "логіка доступу",
    "project.ev.fact3": "інтерфейси керування",
    "project.ev.fact4": "платформа мопеда",
    "project.ai.eyebrow": "Проєкт 03",
    "project.ai.title": "AI-Assisted Navigation System",
    "project.ai.lead": "AI-assisted embedded navigation для GPS-denied environments на embedded Linux board з computer vision та Python/C++ development.",
    "project.ai.proves": "Цей проєкт показує напрям, у якому я хочу рухатися далі: autonomous systems, UAV-adjacent navigation і надійне embedded software, де perception має працювати навіть без GPS.",
    "project.ai.li1": "Долучився до AI-assisted navigation prototype для constrained environments.",
    "project.ai.li2": "Працював з Linux, OpenCV, Python, C++ та Git на embedded platform.",
    "project.ai.li3": "Пов'язував computer vision concepts із практичною navigation behavior.",
    "project.ai.li4": "Досліджував software architecture для perception-driven embedded systems.",
    "project.photo.slot": "Місце для фото",
    "project.what": "Що це показує",
    "project.responsibilities": "Основні задачі",
    "project.stack": "Стек"
  }
};

const pageTitles = {
  en: {
    home: "Kyrylo Matiushenko | Embedded Developer",
    esp: "ESP8266 Vision | Kyrylo Matiushenko",
    ev: "EV Control | Kyrylo Matiushenko",
    ai: "AI Navigation | Kyrylo Matiushenko",
    contact: "Contact | Kyrylo Matiushenko"
  },
  uk: {
    home: "Kyrylo Matiushenko | Embedded Developer",
    esp: "ESP8266 Vision | Kyrylo Matiushenko",
    ev: "EV Control | Kyrylo Matiushenko",
    ai: "AI Navigation | Kyrylo Matiushenko",
    contact: "Зв'язок | Kyrylo Matiushenko"
  }
};

const getStoredLanguage = () => {
  const saved = localStorage.getItem("site-language");
  return saved === "uk" || saved === "en" ? saved : "en";
};

const applyLanguage = (language) => {
  document.documentElement.lang = language === "uk" ? "uk" : "en";

  i18nNodes.forEach((node) => {
    if (!node.dataset.defaultText) {
      node.dataset.defaultText = node.textContent.trim();
    }

    const key = node.dataset.i18n;
    node.textContent = translations[language]?.[key] ?? node.dataset.defaultText;
  });

  i18nAltNodes.forEach((node) => {
    if (!node.dataset.defaultAlt) {
      node.dataset.defaultAlt = node.getAttribute("alt") ?? "";
    }

    const key = node.dataset.i18nAlt;
    node.setAttribute("alt", translations[language]?.[key] ?? node.dataset.defaultAlt);
  });

  i18nAriaNodes.forEach((node) => {
    if (!node.dataset.defaultAriaLabel) {
      node.dataset.defaultAriaLabel = node.getAttribute("aria-label") ?? "";
    }

    const key = node.dataset.i18nAria;
    node.setAttribute("aria-label", translations[language]?.[key] ?? node.dataset.defaultAriaLabel);
  });

  i18nContentNodes.forEach((node) => {
    if (!node.dataset.defaultContent) {
      node.dataset.defaultContent = node.getAttribute("content") ?? "";
    }

    const key = node.dataset.i18nContent;
    node.setAttribute("content", translations[language]?.[key] ?? node.dataset.defaultContent);
  });

  langButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.lang === language));
  });

  const page = document.body.dataset.page;
  if (pageTitles[language]?.[page]) {
    document.title = pageTitles[language][page];
  }

  localStorage.setItem("site-language", language);
};

langButtons.forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang));
});

applyLanguage(getStoredLanguage());

const getTranslation = (key) => {
  const language = document.documentElement.lang === "uk" ? "uk" : "en";
  return translations[language]?.[key] ?? translations.uk[key] ?? key;
};

const setContactStatus = (key, type = "") => {
  if (!contactStatus) {
    return;
  }

  contactStatus.dataset.i18n = key;
  contactStatus.textContent = getTranslation(key);
  contactStatus.classList.toggle("is-success", type === "success");
  contactStatus.classList.toggle("is-error", type === "error");
};

if (contactForm && contactStatus) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    setContactStatus("contact.status.config", "error");
  }

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    if (formData.get("company")) {
      contactForm.reset();
      return;
    }

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      setContactStatus("contact.status.config", "error");
      return;
    }

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim()
    };

    if (!payload.name || !payload.email || !payload.message) {
      setContactStatus("contact.status.error", "error");
      return;
    }

    const submitButton = contactForm.querySelector("button[type='submit']");
    submitButton.disabled = true;
    setContactStatus("contact.status.sending");

    try {
      const response = await fetch(`${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/${CONTACT_TABLE}`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Supabase insert failed: ${response.status}`);
      }

      contactForm.reset();
      setContactStatus("contact.status.success", "success");
    } catch (error) {
      console.error(error);
      setContactStatus("contact.status.error", "error");
    } finally {
      submitButton.disabled = false;
    }
  });
}

if (siteHeader && menuToggle && topNav) {
  const menuMedia = window.matchMedia("(max-width: 980px)");

  const setMenuOpen = (isOpen) => {
    siteHeader.classList.toggle("is-menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    const shouldHideNav = menuMedia.matches && !isOpen;
    topNav.inert = shouldHideNav;
    topNav.setAttribute("aria-hidden", String(shouldHideNav));
  };

  const syncMenuMode = () => {
    if (!menuMedia.matches) {
      siteHeader.classList.remove("is-menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
      topNav.inert = false;
      topNav.removeAttribute("aria-hidden");
      return;
    }

    setMenuOpen(siteHeader.classList.contains("is-menu-open"));
  };

  menuToggle.addEventListener("click", () => {
    setMenuOpen(!siteHeader.classList.contains("is-menu-open"));
  });

  topNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setMenuOpen(false);
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  });

  menuMedia.addEventListener("change", syncMenuMode);
  syncMenuMode();
}

document.body.classList.add("is-loading");

window.addEventListener("load", () => {
  window.setTimeout(() => {
    document.body.classList.remove("is-loading");
    document.body.classList.add("is-loaded");
  }, 520);
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (modelStage && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let rafId = null;

  const animateTilt = () => {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;
    modelStage.style.setProperty("--tilt-x", `${currentX.toFixed(3)}deg`);
    modelStage.style.setProperty("--tilt-y", `${currentY.toFixed(3)}deg`);

    if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
      rafId = requestAnimationFrame(animateTilt);
    } else {
      rafId = null;
    }
  };

  const queueTilt = () => {
    if (!rafId) {
      rafId = requestAnimationFrame(animateTilt);
    }
  };

  window.addEventListener("pointermove", (event) => {
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;
    targetX = y * -5;
    targetY = x * 6;
    queueTilt();
  });

  window.addEventListener("pointerleave", () => {
    targetX = 0;
    targetY = 0;
    queueTilt();
  });
}

if (embeddedDevice && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let baseY = 0;
  let baseZ = -14;
  let rotateY = 0;
  let rotateZ = -14;

  const applyDeviceRotation = () => {
    embeddedDevice.style.setProperty("--device-y", `${rotateY.toFixed(2)}deg`);
    embeddedDevice.style.setProperty("--device-z", `${rotateZ.toFixed(2)}deg`);
  };

  embeddedDevice.addEventListener("pointerdown", (event) => {
    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;
    baseY = rotateY;
    baseZ = rotateZ;
    embeddedDevice.setPointerCapture(event.pointerId);
  });

  embeddedDevice.addEventListener("pointermove", (event) => {
    if (!isDragging) {
      return;
    }

    rotateY = baseY + (event.clientX - startX) * 0.18;
    rotateZ = baseZ + (event.clientY - startY) * 0.08;
    rotateZ = Math.max(-30, Math.min(4, rotateZ));
    applyDeviceRotation();
  });

  const stopDragging = (event) => {
    if (!isDragging) {
      return;
    }

    isDragging = false;
    if (embeddedDevice.hasPointerCapture(event.pointerId)) {
      embeddedDevice.releasePointerCapture(event.pointerId);
    }
  };

  embeddedDevice.addEventListener("pointerup", stopDragging);
  embeddedDevice.addEventListener("pointercancel", stopDragging);
}

if (timeline && timelineItems.length) {
  const updateTimeline = () => {
    const rect = timeline.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const isMobileTimeline = window.matchMedia("(max-width: 980px)").matches;
    const viewportAnchor = viewportHeight * (isMobileTimeline ? 0.72 : 0.52);
    const progress = Math.min(1, Math.max(0, (viewportAnchor - rect.top) / Math.max(rect.height, 1)));
    const hue = 190 + progress * 34;
    timeline.style.setProperty("--timeline-progress", (progress * 100).toFixed(2));
    timeline.style.setProperty("--path-hue", hue.toFixed(1));
    if (timelineClip) {
      timelineClip.setAttribute("height", (progress * 500).toFixed(2));
    }

    let activeItem = null;
    let closestDistance = Number.POSITIVE_INFINITY;

    timelineItems.forEach((item) => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.top + itemRect.height / 2;
      const distance = Math.abs(itemCenter - viewportAnchor);
      const isCandidate = isMobileTimeline
        ? itemRect.top < viewportHeight * 0.82 && itemRect.bottom > viewportHeight * 0.16
        : itemCenter > viewportHeight * 0.24 && itemCenter < viewportHeight * 0.78;

      if (isCandidate && distance < closestDistance) {
        closestDistance = distance;
        activeItem = item;
      }
    });

    timelineItems.forEach((item) => {
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.top + itemRect.height / 2;
      const isActive = activeItem !== null && item === activeItem;
      const isBefore = !isActive && itemCenter < viewportAnchor;
      const isAfter = !isActive && itemCenter >= viewportAnchor;

      item.classList.toggle("is-before", isBefore);
      item.classList.toggle("is-after", isAfter);
      item.classList.toggle("is-onstage", isActive);
      item.classList.toggle("is-active", activeItem !== null && item === activeItem);
    });
  };

  updateTimeline();
  window.addEventListener("scroll", updateTimeline, { passive: true });
  window.addEventListener("resize", updateTimeline);
}
