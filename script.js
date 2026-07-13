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
const VISIT_FUNCTION = "site-ping";

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
    "contact.status.error": "Could not send the message. Try writing directly by email.",
    "contact.status.validation": "Use a name with 2+ characters, a valid email, and a message with at least 10 characters.",
    "contact.chip.storage": "Private storage",
    "contact.chip.access": "Insert-only access",
    "contact.chip.reply": "Direct follow-up"
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
    "meta.esp.description": "Embedded vision systems на STM32, ESP32, NanoPi, OV2640 та ESP8266 by Kyrylo Matiushenko.",
    "meta.ev.description": "Electric vehicle conversion та embedded control system by Kyrylo Matiushenko.",
    "meta.ai.description": "AI-assisted embedded navigation system by Kyrylo Matiushenko.",
    "meta.contact.description": "Зв'язок з Kyrylo Matiushenko для embedded, IoT та computer vision проєктів.",
    "nav.about": "Про мене",
    "nav.esp": "Vision Systems",
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
    "home.projects.stm32.text": "Розподілені capture, transport, NPU inference та інтерактивний tracking на кількох embedded-платформах.",
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
    "contact.status.validation": "Ім'я має бути від 2 символів, email валідним, а повідомлення не коротшим за 10 символів.",
    "contact.supabase.title": "Як обробляються повідомлення",
    "contact.supabase.text": "Повідомлення зберігається у приватній черзі заявок з публічним доступом тільки на додавання. Я використовую її для пропозицій, ідей співпраці та технічних питань, на які варто відповісти уважно.",
    "contact.chip.storage": "Приватне зберігання",
    "contact.chip.access": "Тільки додавання",
    "contact.chip.reply": "Пряма відповідь",
    "project.vision.eyebrow": "Еволюція вбудованих систем комп'ютерного зору",
    "project.vision.title": "Одна гілка, два покоління.",
    "project.vision.lead": "Ця гілка показує, як початковий експеримент на одній платі ESP8266 перетворився на розподілену систему периферійного комп'ютерного зору. Перемикайся між двома поколіннями, щоб порівняти їхню архітектуру, обчислювальні обмеження та розподіл відповідальності.",
    "project.vision.note": "Покоління STM32 показане першим, оскільки це актуальна інженерна версія. ESP8266 залишається доступним як прототип, у якому були закладені принципи захоплення кадрів, виявлення руху та супроводу об'єктів.",
    "project.vision.selector": "Вибір проєкту комп'ютерного зору",
    "project.vision.current": "Актуальна система",
    "project.vision.prototype": "Перший прототип",
    "project.stm32.eyebrow": "Проєкт 01 · Актуальне покоління",
    "project.stm32.title": "Система комп'ютерного зору STM32–ESP32–NanoPi",
    "project.stm32.lead": "Розподілена система периферійного комп'ютерного зору перетворює потік з OV2640 на готову для оператора панель MJPEG із аналізом руху, нейромережевим розпізнаванням та інтерактивним супроводом об'єктів. Архітектура розділяє детерміноване захоплення кадрів, бездротове передавання та обробку на NPU, тому кожна платформа виконує роботу відповідно до своїх ресурсів.",
    "project.stm32.context": "STM32H503 керує ArduCAM і передає кадри через SPI. ESP32 приймає та буферизує їх, виконує полегшене виявлення руху в алгоритмічному режимі та пересилає потік через Wi-Fi/TCP. NanoPi R5S виконує сегментацію руху й інференс YOLOv5s INT8 на NPU RK3568, підтримує маски та ідентифікатори траєкторій і обслуговує єдиний вебінтерфейс системи.",
    "project.stm32.performance": "Контур нейромережевого інференсу може обробляти до 60 кадрів за секунду за продуктивності 0,8 TOPS. Цей показник характеризує обчислювальну швидкість моделі; фактична частота всього відеоконвеєра також залежить від роздільності, розміру JPEG, SPI, Wi-Fi та вибраного режиму роботи.",
    "project.stm32.architecture.eyebrow": "Шлях даних",
    "project.stm32.architecture.title": "Обробка розподілена між платформами, які найкраще відповідають кожній задачі.",
    "project.stm32.node1": "Захоплення кадру",
    "project.stm32.node2": "Передавання даних камери під керуванням ThreadX",
    "project.stm32.node3": "Приймання через SPI · аналіз руху",
    "project.stm32.node4": "Інференс RKNN · супровід · вебінтерфейс",
    "project.stm32.proves": "Проєкт розвиває перший прототип камери до повноцінної багатоплатної архітектури. Робота в реальному часі розподілена між прошивкою мікроконтролера, бездротовим транспортним вузлом та службою NPU під керуванням вбудованого Linux, тому одна обмежена платформа не повинна виконувати всі задачі одночасно.",
    "project.stm32.proves2": "STM32 захоплює та передає кадри OV2640, ESP32 приймає їх через SPI й виявляє рух в алгоритмічному режимі, а NanoPi є єдиним вебсервером і виконує нейронну сегментацію руху, інференс YOLOv5s INT8 через RKNN, побудову масок та підтримку сталих ідентифікаторів траєкторій.",
    "project.stm32.layers.title": "Рівні системи",
    "project.stm32.layer1.title": "Детерміноване захоплення",
    "project.stm32.layer1.text": "Прошивка STM32H503 використовує STM32 HAL і ThreadX для керування ArduCAM та передавання кадрів через SPI.",
    "project.stm32.layer2.title": "Передавання й аналіз руху",
    "project.stm32.layer2.text": "ESP32 зберігає отримані кадри, виконує полегшений аналіз руху та передає потік через Wi-Fi/TCP.",
    "project.stm32.layer3.title": "Обробка на NPU",
    "project.stm32.layer3.text": "NanoPi R5S обслуговує панель керування та виконує інференс RKNN, сегментацію руху, побудову масок й інтерактивний супровід.",
    "project.stm32.hub.title": "STM32 як розширюваний апаратний хаб",
    "project.stm32.hub.text": "STM32H503 не обмежується передаванням даних камери. Це детермінований апаратний хаб системи: він відповідає за ініціалізацію сенсорів, захоплення даних у реальному часі, часові параметри периферії, діагностику та шлюз до ESP32. У поточній версії під'єднано OV2640 через ArduCAM, але архітектуру можна розширювати додатковими сенсорами й виконавчими пристроями, не переносячи критичне за часом введення-виведення до мережевого рівня.",
    "project.stm32.hub1.title": "Розширення периферії",
    "project.stm32.hub1.text": "Через доступні SPI, I²C, UART, GPIO, ADC і PWM можна додати IMU, датчики середовища, енкодери, далекоміри, реле або приводи.",
    "project.stm32.hub2.title": "Ізоляція реального часу",
    "project.stm32.hub2.text": "Потоки ThreadX відокремлюють захоплення даних і роботу з апаратними інтерфейсами від якості Wi-Fi, навантаження Linux та затримки нейромережі.",
    "project.stm32.hub3.title": "Єдиний вихідний інтерфейс",
    "project.stm32.hub3.text": "Нові пристрої можна привести до спільного формату на прикладному рівні STM32 і передавати далі без реалізації мережевого стека в кожному сенсорі.",
    "project.stm32.motion.title": "Як ESP32 виявляє рух",
    "project.stm32.motion.text": "Детектор працює окремим завданням FreeRTOS на другому ядрі й активується лише в алгоритмічному режимі. Частота обробки обмежена навмисно, щоб декодування JPEG та аналіз зображення не заважали прийманню через SPI і передаванню через Wi-Fi.",
    "project.stm32.motion1": "Найновіший JPEG-кадр декодується та зменшується до напівтонового зображення 80×60.",
    "project.stm32.motion2": "Гаусове згладжування пригнічує артефакти JPEG, а середня зміна яскравості компенсує загальні зміни експозиції.",
    "project.stm32.motion3": "Поточний і попередній кадри порівнюються з абсолютним порогом 18, унаслідок чого утворюється двійкова маска руху.",
    "project.stm32.motion4": "Ізольовані пікселі видаляються, а однопіксельні розриви з'єднуються без виділення пам'яті під ще одну повнорозмірну маску.",
    "project.stm32.motion5": "Заливка за вісьмома сусідами виділяє компоненти щонайменше з восьми пікселів і відкидає майже повнокадрове тремтіння камери або зміну експозиції.",
    "project.stm32.motion6": "Сусідні області об'єднуються, сортуються за кількістю змінених пікселів і перераховуються в координати початкового зображення; зберігається до чотирьох рамок.",
    "project.stm32.motion7": "Для супроводу кандидати оцінюються за прогнозованим центром, яскравістю, площею та співвідношенням сторін; прогноз швидкості утримує ціль під час коротких пропусків детектора.",
    "project.stm32.protocols.title": "Протоколи передавання даних",
    "project.stm32.protocol1.title": "Камера → STM32",
    "project.stm32.protocol1.text": "I²C1 налаштовує регістри OV2640, а SPI1 читає JPEG-дані з буфера FIFO модуля ArduCAM.",
    "project.stm32.protocol2.title": "STM32 → ESP32",
    "project.stm32.protocol2.text": "SPI2 у режимі 0 разом із лінією READY використовує двійковий протокол CAM1: заголовок 20 байтів, пакети START/DATA/END, частини до 1536 байтів, зміщення, номери кадрів і повідомлення запиту/відповіді керування.",
    "project.stm32.protocol3.title": "ESP32 → NanoPi",
    "project.stm32.protocol3.text": "Постійне з'єднання Wi-Fi/TCP з портом 5000 передає кадри NPI1: двійковий заголовок 20 байтів, JPEG, необов'язкові метадані JSON у UTF-8 та компактну відповідь керування режимом, роздільністю і супроводом.",
    "project.stm32.protocol4.title": "NanoPi → браузер",
    "project.stm32.protocol4.text": "HTTP на порту 8080 надає панель керування, кінцеві точки REST, стан у JSON, окремі знімки та потік multipart MJPEG з профілями початкової якості або шириною 800, 640 чи 320 пікселів.",
    "project.stm32.features.title": "Можливості програми та рішення для надійності",
    "project.stm32.feature1.title": "Фіксована пам'ять на мікроконтролерах",
    "project.stm32.feature1.text": "STM32 обертає два фіксовані об'єкти частин кадру й не зберігає JPEG цілком. ESP32 використовує три захищені комірки по 32 КіБ, тому опублікований кадр не перезаписується, доки його читає TCP-завдання або детектор.",
    "project.stm32.feature2.title": "Обробка найновішого кадру",
    "project.stm32.feature2.text": "NanoPi одразу публікує кожен коректний кадр, а працівник NPU замінює застаріле очікуване завдання замість накопичення черги. Це зменшує затримку, навіть якщо обробляється не кожен кадр.",
    "project.stm32.feature3.title": "Три режими обробки",
    "project.stm32.feature3.text": "Режим Raw лише передає відео, Algorithm додає рамки руху з ESP32, а Neural додає сегментацію NanoPi, розпізнавання YOLO, маски, класи, оцінки впевненості та ідентифікатори траєкторій.",
    "project.stm32.feature4.title": "Перевірка й автоматичне відновлення",
    "project.stm32.feature4.text": "Перевіряються сигнатури, довжини, зміщення, межі та маркери JPEG. Завеликий кадр спричиняє перехід на нижчу роздільність; Wi-Fi і TCP автоматично перепідключаються, а systemd перезапускає службу NanoPi.",
    "project.stm32.li1": "Створив прошивку STM32Cube/ThreadX для ініціалізації камери, захоплення кадрів, діагностики та передавання через SPI.",
    "project.stm32.li2": "Реалізував робочу прошивку PlatformIO для приймання кадрів на ESP32, керування станами, виявлення руху та передавання до NanoPi.",
    "project.stm32.li3": "Розробив службу Linux для NanoPi з панеллю HTTP/MJPEG, абстракцією детектора, сегментацією руху та супроводом об'єктів.",
    "project.stm32.li4": "Підготував конвеєр YOLOv5s ReLU INT8 RKNN для NPU RK3568 із вхідним зображенням 320×320.",
    "project.stm32.li5": "Підготував українську й англійську документацію архітектури, інтерфейсів, розгортання, експлуатації, перевірки, безпеки та відповідності вимогам.",
    "project.stm32.fact1": "успішних тестів NanoPi",
    "project.stm32.fact2": "вхід моделі INT8",
    "project.stm32.fact3": "статичної пам'яті ESP",
    "project.stm32.fact4": "флешпам'яті програми ESP",
    "project.stm32.fact5": "нейромережевий інференс за 0,8 TOPS",
    "project.esp.eyebrow": "Проєкт 01 · Перший прототип",
    "project.esp.title": "Передавання відео й супровід об'єктів на ESP8266",
    "project.esp.lead": "Компактна система відеоспостереження та супроводу на базі ESP8266 і ArduCAM OV2640. Виявлення руху й супровід цілі обчислюються безпосередньо на мікроконтролері, а браузер лише відображає результат.",
    "project.esp.photo": "Демонстрація вебінтерфейсу супроводу ESP8266",
    "project.esp.proves": "Проєкт показує, що корисні алгоритми комп'ютерного зору можна запускати навіть на дуже обмеженому обладнанні, якщо спроєктувати їх під конкретний пристрій. Замість нейромереж система використовує різницю напівтонових кадрів, виділення обмежувальних рамок і супровід у локальній області інтересу.",
    "project.esp.proves2": "Для перегляду камера передає JPEG, а режими виявлення та супроводу перемикають її на захоплення YUV422. Прошивка використовує лише канал яскравості Y, порівнює поточний і попередній кадри, фільтрує шум та зміни освітлення і надсилає компактну двійкову відповідь до вебінтерфейсу.",
    "project.esp.modes.title": "Режими роботи",
    "project.esp.mode1.title": "Потік JPEG",
    "project.esp.mode1.text": "Потік multipart із можливістю вибрати роздільність 160×120, 320×240 або 640×480.",
    "project.esp.mode2.title": "Виявлення руху",
    "project.esp.mode2.text": "ESP8266 переглядає напівтоновий кадр, знаходить змінені пікселі та повертає обмежувальну рамку навколо руху.",
    "project.esp.mode3.title": "Супровід цілі",
    "project.esp.mode3.text": "Користувач вибирає ціль у браузері, після чого ESP8266 аналізує лише локальну область навколо цього об'єкта.",
    "project.esp.algorithm.title": "Будова алгоритму",
    "project.esp.algorithm.text": "Прошивка захоплює кадр YUV422 розміром 160×120 і залишає лише значення яскравості, тому один кадр для аналізу займає 19 200 байтів. Два статичні буфери запобігають фрагментації динамічної пам'яті під час безперервної роботи.",
    "project.esp.algorithm.text2": "Щоб зменшити кількість хибних спрацювань, алгоритм ігнорує рух нижче порога кількості пікселів та відкидає загальні зміни освітлення, коли змінюється завелика частина кадру. Режим супроводу звужує пошук до області навколо попереднього положення цілі.",
    "project.esp.protocol.title": "Протокол передавання",
    "project.esp.protocol.text": "Замість повільного JSON для кожного кадру ESP повертає власний двійковий пакет: заголовок 8 байтів зі станом руху, кількістю змінених пікселів, ознакою коректності рамки та координатами, а потім 19 200 байтів напівтонового зображення. Браузер декодує Uint8Array і малює кадр та рамки на HTML5 Canvas.",
    "project.esp.li1": "Реалізував вебсервер ESP8266 у режимі SoftAP із кінцевими точками потоку, режиму, виявлення та вибору цілі.",
    "project.esp.li2": "Під'єднав ArduCAM OV2640 через SPI/I²C і реалізував перемикання між шляхами захоплення JPEG та YUV.",
    "project.esp.li3": "Побудував виявлення руху на різниці кадрів, порогах, обмежувальних рамках і фільтрації змін освітлення.",
    "project.esp.li4": "Реалізував супровід у локальній області, якою користувач керує натисканням на HTML5 Canvas у браузері.",
    "project.esp.li5": "Запакував результати виявлення та напівтонові пікселі у компактну двійкову відповідь для швидшого відображення.",
    "project.esp.fact1": "кадр для аналізу",
    "project.esp.fact2": "буфер каналу Y",
    "project.esp.fact3": "двійковий заголовок",
    "project.esp.fact4": "лінія CS камери",
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
    esp: "Vision Systems | Kyrylo Matiushenko",
    ev: "EV Control | Kyrylo Matiushenko",
    ai: "AI Navigation | Kyrylo Matiushenko",
    contact: "Contact | Kyrylo Matiushenko"
  },
  uk: {
    home: "Kyrylo Matiushenko | Embedded Developer",
    esp: "Vision Systems | Kyrylo Matiushenko",
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

const projectVariantButtons = [...document.querySelectorAll("[data-project-variant]")];
const projectVariantPanels = [...document.querySelectorAll("[data-project-panel]")];
const projectVariantSwitch = document.querySelector(".vision-switch");
let activeProjectVariant = "stm32";

const showProjectVariant = (variant) => {
  if (!projectVariantPanels.length || variant === activeProjectVariant) {
    return;
  }

  const previousIndex = projectVariantPanels.findIndex((panel) => panel.dataset.projectPanel === activeProjectVariant);
  const nextIndex = projectVariantPanels.findIndex((panel) => panel.dataset.projectPanel === variant);
  const nextPanel = projectVariantPanels[nextIndex];

  if (!nextPanel) {
    return;
  }

  projectVariantPanels.forEach((panel) => {
    const isActive = panel === nextPanel;
    panel.hidden = !isActive;
    panel.classList.toggle("is-active", isActive);
    panel.classList.remove("is-entering-next", "is-entering-prev");
  });

  nextPanel.classList.add(nextIndex > previousIndex ? "is-entering-next" : "is-entering-prev");
  nextPanel.addEventListener("animationend", () => {
    nextPanel.classList.remove("is-entering-next", "is-entering-prev");
  }, { once: true });

  projectVariantButtons.forEach((button) => {
    const isActive = button.dataset.projectVariant === variant;
    button.setAttribute("aria-selected", String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });

  activeProjectVariant = variant;
  if (projectVariantSwitch) {
    projectVariantSwitch.dataset.active = variant;
  }
};

projectVariantButtons.forEach((button, index) => {
  button.addEventListener("click", () => showProjectVariant(button.dataset.projectVariant));
  button.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }

    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextButton = projectVariantButtons[(index + direction + projectVariantButtons.length) % projectVariantButtons.length];
    nextButton.focus();
    showProjectVariant(nextButton.dataset.projectVariant);
  });
});

const trackVisit = () => {
  if (!SUPABASE_URL) {
    return;
  }

  const storageKey = "site-visitor-session";
  let sessionId = localStorage.getItem(storageKey);
  if (!sessionId) {
    sessionId = window.crypto?.randomUUID
      ? window.crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(storageKey, sessionId);
  }

  const payload = {
    page_path: window.location.pathname,
    page_url: window.location.href,
    referrer: document.referrer || null,
    language: navigator.language || null,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
    screen_width: window.screen?.width ?? null,
    screen_height: window.screen?.height ?? null,
    session_id: sessionId
  };

  const body = JSON.stringify(payload);
  const url = `${SUPABASE_URL.replace(/\/$/, "")}/functions/v1/${VISIT_FUNCTION}`;

  fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body,
    keepalive: true
  })
    .then((response) => {
      if (!response.ok) {
        console.warn("Visit tracking failed", response.status);
      }
    })
    .catch((error) => {
      console.warn("Visit tracking failed", error);
    });
};

trackVisit();

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

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email);
    if (
      payload.name.length < 2 ||
      payload.name.length > 120 ||
      !isValidEmail ||
      payload.message.length < 10 ||
      payload.message.length > 4000
    ) {
      setContactStatus("contact.status.validation", "error");
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
        const errorText = await response.text();
        throw new Error(`Supabase insert failed: ${response.status} ${errorText}`);
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
