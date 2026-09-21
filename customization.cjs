const os = require("os");

// ======================================================================
// EASY EDIT AREA: change only the values in this section.
// You can edit the bot's name, owner, footer, image, emoji, reactions,
// and any standard message without knowing JavaScript.
// ======================================================================
const EASY_EDIT = {
  botName: "xᴘʀᴏᴠᴇʀᴄᴇ",
  ownerName: "MR.RASHMIKA",
  brand: "XPRO BOT",
  cinemaBrand: "🎬 ＦＩＬＭ ＷＯＲＬＤ🎬",
  title: "𝗫𝗣𝗥𝗢 𝗩𝗘𝗥𝗖𝗘",
  headerIcon: "🚀",
  image: "https://i.ibb.co/pBvpkZYt/Rashmika-Ofc.jpg",
  footer: [
    "• © 𝙓𝙋𝙍𝙊 𝙈𝘿 𝙈𝙞𝙣𝙞 𝙑 2",
    "• ᵂᵃᵇᵒᵗ ᴮʸ ˣᴾᴿᴼᵛᵉʳᶜᵉ ᵀᴱᴬᴺ ᴢ",
    "• *⛦* xpro-verce.site",
  ],
  // Example: "✅": "🌟"
  messageEmoji: {},
  // Example: "✅": "🔥"
  reactionEmoji: {},
  // Replace any phrase in any outgoing bot text or caption.
  // Example: "Processing command...": "Please wait..."
  textReplacements: {},
  // Set a message here to replace it everywhere. Use language keys below.
  messages: {
    english: {
      hello: "Welcome",
      done: "Your request completed successfully.",
      choose: "Select a category",
      replyNumber: "Reply with a number",
      sendingMedia: "Sending media...",
    },
  },
};

const BRAND = EASY_EDIT.brand;
const CINEMA_BRAND = EASY_EDIT.cinemaBrand;
const HEADER_ICON = EASY_EDIT.headerIcon;
const BOT_DISPLAY_NAME = EASY_EDIT.botName;
const DESIGN_TITLE = EASY_EDIT.title;
const OWNER_DISPLAY_NAME = EASY_EDIT.ownerName;
const FOOTER_LINES = EASY_EDIT.footer;
const POWERED = FOOTER_LINES.join("\n");

// Active per-bot config so footer / bot name / image follow settings changes
// made with commands, without needing a restart.
let activeConfig = null;
const setActiveConfig = (config) => { activeConfig = config || null; };

const resolveBrandValue = (config, keys, fallback = null) => {
  const sources = [config, activeConfig];
  for (const source of sources) {
    for (const key of keys) {
      const value = source?.[key];
      if (value !== null && value !== undefined && value !== "") return value;
    }
  }
  return fallback;
};

const clean = (value, fallback = "N/A") => {
  if (value === null || value === undefined || value === "") return fallback;
  return String(value).replace(/\s+/g, " ").trim();
};

const cleanBlock = (value, fallback = "N/A") => {
  if (value === null || value === undefined || value === "") return fallback;
  return String(value)
    .replace(/\\n/g, "\n")
    .split("\n")
    .map(line => line.replace(/[\t ]+/g, " ").trimEnd())
    .join("\n")
    .replace(/\n{4,}/g, "\n\n\n")
    .trim();
};

const limit = (value, max = 650) => {
  const text = clean(value, "No description available.");
  return text.length > max ? `${text.slice(0, max - 1).trim()}…` : text;
};

// ----------------------------------------------------------------------
// LANGUAGE DETECTION & DICTIONARY
// ----------------------------------------------------------------------
const normalizeLang = (configOrLang) => {
  const raw = typeof configOrLang === "string" ? configOrLang : configOrLang?.LANG;
  const value = clean(raw, "english").toLowerCase();
  // English
  if (["en", "eng", "english"].includes(value)) return "english";
  // Sinhala
  if (["si", "sin", "sinhala", "සිංහල"].includes(value)) return "sinhala";
  // Urdu (Pakistan)
  if (["ur", "urd", "urdu", "اردو"].includes(value)) return "urdu";
  // Swahili (Tanzania/Kenya)
  if (["sw", "swa", "swahili", "kiswahili"].includes(value)) return "swahili";
  // Hindi (India)
  if (["hi", "hin", "hindi", "हिन्दी"].includes(value)) return "hindi";
  // Hausa (Nigeria)
  if (["ha", "hau", "hausa"].includes(value)) return "hausa";
  // Pashto (Afghanistan)
  if (["ps", "pus", "pashto", "پښتو"].includes(value)) return "pashto";
  // Haitian Creole (Haiti)
  if (["ht", "hat", "haitian", "kreyòl"].includes(value)) return "hatian_creole";
  // Shona (Zimbabwe)
  if (["sn", "sho", "shona", "chishona"].includes(value)) return "shona";
  // Twi (Ghana)
  if (["tw", "twi"].includes(value)) return "twi";
  return "english";
};

const dictionary = {
  english: {
    done: "Your request completed successfully.",
    hello: "Welcome",
    choose: "Select a category",
    replyNumber: "Reply with a number",
    botResponse: "🚀 XPRO BOT",
    success: "✅ SUCCESS",
    error: "❌ ERROR",
    info: "ℹ️ INFORMATION",
    processing: "⏳ PROCESSING",
    search: "🔎 SEARCH RESULTS",
    download: "📥 DOWNLOAD READY",
    ownerPanel: "👑 OWNER PANEL",
    groupStatus: "👥 GROUP STATUS",
    speedTitle: "⚡ SPEED TEST",
    speedMessage: "Your bot is online, responsive, and ready to work.",
    statusOnline: "Online",
    ownerTitle: "👑 OWNER INFORMATION",
    systemTitle: "⚙️ SYSTEM STATUS",
    menuTitle: "🚀 XPRO BOT",
    menuHelp: "Select a category or type a command manually.",
    settingsTitle: "⚙️ BOT SETTINGS",
    settingsHelp: "Tap a setting to update it. ON means enabled and OFF means disabled.",
    languageTitle: "✅ LANGUAGE UPDATED",
    languageMessage: "Language changed successfully. Future bot messages will follow this language.",
    settingChanged: "Setting updated successfully.",
    settingUsage: "Send `on` to enable or `off` to disable this setting.",
    currentLanguage: "Language",
    publicMode: "Public",
    privateMode: "Private",
    mode: "Mode",
    prefix: "Prefix",
    commands: "Commands",
    categories: "Categories",
    owner: "Owner",
    memory: "Memory",
    uptime: "Runtime",
    status: "Status",
    responseTime: "Response Time",
    date: "Date",
    time: "Time",
    title: "Title",
    artist: "Artist",
    duration: "Duration",
    quality: "Quality",
    source: "Source",
    link: "Link",
    description: "Description",
    reason: "Reason",
    example: "Example",
    by: "By",
    query: "Query",
    botInformation: "Bot Information",
    totalSettings: "Total Settings",
    size: "Size",
    fileName: "🎬 𝙵𝙸𝙻𝙼 𝚆𝙾𝚁𝙻𝙳 🎬",
    fileSize: "File Size",
    fileType: "File Type",
    sendingMedia: "Sending media...",
    enterMovieName: "Enter a movie name.",
    invalidRequest: "Invalid request.",
    invalidDownloadPayload: "Invalid download payload.",
    invalidDownloadUrl: "Invalid download URL.",
    telegramDownloadUnavailable: "Telegram download was not created. Try the next link.",
  },
  sinhala: {
    done: "ඔබගේ ඉල්ලීම සාර්ථකව අවසන් කළා.",
    hello: "ආයුබෝවන්",
    choose: "ප්‍රවර්ගයක් තෝරන්න",
    replyNumber: "අංකයකින් පිළිතුරු දෙන්න",
    botResponse: "🚀 XPRO BOT",
    success: "✅ සාර්ථකයි",
    error: "❌ දෝෂයක්",
    info: "ℹ️ තොරතුරු",
    processing: "⏳ සකසමින්",
    search: "🔎 සෙවීම් ප්‍රතිඵල",
    download: "📥 බාගැනීම සූදානම්",
    ownerPanel: "👑 OWNER PANEL",
    groupStatus: "👥 GROUP STATUS",
    speedTitle: "⚡ වේග පරීක්ෂාව",
    speedMessage: "ඔයාගේ bot එක online, responsive, වැඩට සූදානම්.",
    statusOnline: "Online / සක්‍රීයයි",
    ownerTitle: "👑 OWNER තොරතුරු",
    systemTitle: "⚙️ SYSTEM තත්ත්වය",
    menuTitle: "🚀 XPRO BOT",
    menuHelp: "ප්‍රවර්ගයක් තෝරන්න නැත්නම් command එක type කරන්න.",
    settingsTitle: "⚙️ BOT SETTINGS",
    settingsHelp: "වෙනස් කරන්න setting එක tap කරන්න. ON = සක්‍රීයයි, OFF = අක්‍රීයයි.",
    languageTitle: "✅ භාෂාව වෙනස් කළා",
    languageMessage: "Language එක සාර්ථකව වෙනස් කළා. ඉදිරියේදී bot messages ඒ language එකෙන් යයි.",
    settingChanged: "Setting එක සාර්ථකව update කළා.",
    settingUsage: "ON කරන්න `on`, OFF කරන්න `off` යවන්න.",
    currentLanguage: "භාෂාව",
    publicMode: "Public",
    privateMode: "Private",
    mode: "Mode",
    prefix: "Prefix",
    commands: "Commands",
    categories: "Categories",
    owner: "Owner",
    memory: "Memory",
    uptime: "Runtime",
    status: "Status",
    responseTime: "Response Time",
    date: "දිනය",
    time: "වේලාව",
    title: "Title",
    artist: "Artist",
    duration: "Duration",
    quality: "Quality",
    source: "Source",
    link: "Link",
    description: "විස්තරය",
    reason: "හේතුව",
    example: "උදාහරණය",
    by: "By",
    query: "Query",
    botInformation: "Bot Information",
    totalSettings: "Total Settings",
    size: "Size",
    fileName: "File Name",
    fileSize: "File Size",
    fileType: "File Type",
    sendingMedia: "Sending media...",
    enterMovieName: "Enter a movie name.",
    invalidRequest: "Invalid request.",
    invalidDownloadPayload: "Invalid download payload.",
    invalidDownloadUrl: "Invalid download URL.",
    telegramDownloadUnavailable: "Telegram download was not created. Try the next link.",
  },
  urdu: {
    done: "آپ کی درخواست کامیابی سے مکمل ہو گئی۔",
    hello: "خوش آمدید",
    choose: "ایک زمرہ منتخب کریں",
    replyNumber: "نمبر کے ساتھ جواب دیں",
    botResponse: "🚀 XPRO BOT",
    success: "✅ کامیاب",
    error: "❌ خرابی",
    info: "ℹ️ معلومات",
    processing: "⏳ عمل جاری ہے",
    search: "🔎 تلاش کے نتائج",
    download: "📥 ڈاؤن لوڈ تیار ہے",
    ownerPanel: "👑 مالک پینل",
    groupStatus: "👥 گروپ کی حیثیت",
    speedTitle: "⚡ رفتار کی جانچ",
    speedMessage: "آپ کا بوٹ آن لائن، جوابدہ اور کام کرنے کے لیے تیار ہے۔",
    statusOnline: "آن لائن",
    ownerTitle: "👑 مالک کی معلومات",
    systemTitle: "⚙️ سسٹم کی حیثیت",
    menuTitle: "🚀 XPRO BOT",
    menuHelp: "ایک زمرہ منتخب کریں یا دستی طور پر کمانڈ ٹائپ کریں۔",
    settingsTitle: "⚙️ بوٹ کی ترتیبات",
    settingsHelp: "ترتیب کو اپ ڈیٹ کرنے کے لیے تھپتھپائیں۔ ON کا مطلب فعال ہے اور OFF کا مطلب غیر فعال ہے۔",
    languageTitle: "✅ زبان اپ ڈیٹ ہو گئی",
    languageMessage: "زبان کامیابی سے تبدیل کر دی گئی۔ آئندہ بوٹ پیغامات اس زبان میں ہوں گے۔",
    settingChanged: "ترتیب کامیابی سے اپ ڈیٹ ہو گئی۔",
    settingUsage: "اس ترتیب کو فعال کرنے کے لیے `on` یا غیر فعال کرنے کے لیے `off` بھیجیں۔",
    currentLanguage: "زبان",
    publicMode: "عوامی",
    privateMode: "نجی",
    mode: "موڈ",
    prefix: "سابقہ",
    commands: "کمانڈز",
    categories: "زمرہ جات",
    owner: "مالک",
    memory: "میموری",
    uptime: "رن ٹائم",
    status: "حیثیت",
    responseTime: "جوابی وقت",
    date: "تاریخ",
    time: "وقت",
    title: "عنوان",
    artist: "فنکار",
    duration: "دورانیہ",
    quality: "معیار",
    source: "ماخذ",
    link: "ربط",
    description: "تفصیل",
    reason: "وجہ",
    example: "مثال",
    by: "از",
  },
  swahili: {
    done: "Ombi lako limekamilika kwa mafanikio.",
    hello: "Karibu",
    choose: "Chagua kategoria",
    replyNumber: "Jibu kwa nambari",
    botResponse: "🚀 XPRO BOT",
    success: "✅ IMEFANIKIWA",
    error: "❌ KOSA",
    info: "ℹ️ TAARIFA",
    processing: "⏳ INACHUKULIWA",
    search: "🔎 MATOKEO YA UTafutaji",
    download: "📥 PAKUA TAYARI",
    ownerPanel: "👑 PANELI YA MMILIKI",
    groupStatus: "👥 HALI YA KIKUNDI",
    speedTitle: "⚡ JARIBIO LA KASI",
    speedMessage: "Bot yako iko mkondoni, inaitikia, na iko tayari kufanya kazi.",
    statusOnline: "Mkondoni",
    ownerTitle: "👑 TAARIFA ZA MMILIKI",
    systemTitle: "⚙️ HALI YA MFUMO",
    menuTitle: "🚀 XPRO BOT",
    menuHelp: "Chagua kategoria au chapa amri mwenyewe.",
    settingsTitle: "⚙️ MIPANGILIO YA BOT",
    settingsHelp: "Gonga mpangilio ili kuusasisha. ON inamaanisha imewashwa na OFF imezimwa.",
    languageTitle: "✅ LUGHA IMESASISHWA",
    languageMessage: "Lugha imebadilishwa kwa mafanikio. Barua za baadaye za bot zitafuata lugha hii.",
    settingChanged: "Mpangilio umesasishwa kwa mafanikio.",
    settingUsage: "Tuma `on` ili kuwasha au `off` ili kuzima mpangilio huu.",
    currentLanguage: "Lugha",
    publicMode: "Kwa Umma",
    privateMode: "Binafsi",
    mode: "Hali",
    prefix: "Kiambishi",
    commands: "Amri",
    categories: "Kategoria",
    owner: "Mmiliki",
    memory: "Kumbukumbu",
    uptime: "Muda wa kukimbia",
    status: "Hali",
    responseTime: "Muda wa kujibu",
    date: "Tarehe",
    time: "Saa",
    title: "Kichwa",
    artist: "Msanii",
    duration: "Muda",
    quality: "Ubora",
    source: "Chanzo",
    link: "Kiungo",
    description: "Maelezo",
    reason: "Sababu",
    example: "Mfano",
    by: "Na",
  },
  hindi: {
    done: "आपका अनुरोध सफलतापूर्वक पूरा हुआ।",
    hello: "स्वागत है",
    choose: "एक श्रेणी चुनें",
    replyNumber: "एक नंबर से उत्तर दें",
    botResponse: "🚀 XPRO BOT",
    success: "✅ सफल",
    error: "❌ त्रुटि",
    info: "ℹ️ जानकारी",
    processing: "⏳ प्रक्रिया जारी",
    search: "🔎 खोज परिणाम",
    download: "📥 डाउनलोड तैयार",
    ownerPanel: "👑 स्वामी पैनल",
    groupStatus: "👥 समूह स्थिति",
    speedTitle: "⚡ गति परीक्षण",
    speedMessage: "आपका बॉट ऑनलाइन, उत्तरदायी और काम करने के लिए तैयार है।",
    statusOnline: "ऑनलाइन",
    ownerTitle: "👑 स्वामी जानकारी",
    systemTitle: "⚙️ सिस्टम स्थिति",
    menuTitle: "🚀 XPRO BOT",
    menuHelp: "एक श्रेणी चुनें या मैन्युअल रूप से कमांड टाइप करें।",
    settingsTitle: "⚙️ बॉट सेटिंग्स",
    settingsHelp: "सेटिंग अपडेट करने के लिए उसे टैप करें। ON का मतलब सक्षम और OFF का मतलब अक्षम है।",
    languageTitle: "✅ भाषा अपडेट हुई",
    languageMessage: "भाषा सफलतापूर्वक बदल दी गई है। भविष्य के बॉट संदेश इसी भाषा में होंगे।",
    settingChanged: "सेटिंग सफलतापूर्वक अपडेट हुई।",
    settingUsage: "इस सेटिंग को सक्षम करने के लिए `on` या अक्षम करने के लिए `off` भेजें।",
    currentLanguage: "भाषा",
    publicMode: "सार्वजनिक",
    privateMode: "निजी",
    mode: "मोड",
    prefix: "उपसर्ग",
    commands: "कमांड",
    categories: "श्रेणियाँ",
    owner: "स्वामी",
    memory: "मेमोरी",
    uptime: "रनटाइम",
    status: "स्थिति",
    responseTime: "प्रतिक्रिया समय",
    date: "तारीख",
    time: "समय",
    title: "शीर्षक",
    artist: "कलाकार",
    duration: "अवधि",
    quality: "गुणवत्ता",
    source: "स्रोत",
    link: "लिंक",
    description: "विवरण",
    reason: "कारण",
    example: "उदाहरण",
    by: "द्वारा",
  },
  hausa: {
    done: "An buƙatarku ta cika cikin nasara.",
    hello: "Barka da zuwa",
    choose: "Zaɓi rukuni",
    replyNumber: "Amsa da lamba",
    botResponse: "🚀 XPRO BOT",
    success: "✅ NASARA",
    error: "❌ KUSKURI",
    info: "ℹ️ BAYANI",
    processing: "⏳ ANA AIKI",
    search: "🔎 SAKAMAKON BINCIKE",
    download: "📥 ZAZZAGIN YA SHIRYA",
    ownerPanel: "👑 FALOLIN MAI",
    groupStatus: "👥 MATSAYIN RUKUNI",
    speedTitle: "⚡ JARABAWAR GUDU",
    speedMessage: "Bot ɗinku yana kan layi, yana amsawa, kuma a shirye yake ya yi aiki.",
    statusOnline: "Kan layi",
    ownerTitle: "👑 BAYANIN MAI",
    systemTitle: "⚙️ MATSAYIN TSARI",
    menuTitle: "🚀 XPRO BOT",
    menuHelp: "Zaɓi rukuni ko rubuta umarni da kanka.",
    settingsTitle: "⚙️ Saitin Bot",
    settingsHelp: "Matsa saiti don sabunta shi. ON yana nufin kunna, OFF yana nufin kashe.",
    languageTitle: "✅ AN SABUNTA HARSHE",
    languageMessage: "An canza harshe cikin nasara. Saƙonnin bot na gaba zasu bi wannan harshe.",
    settingChanged: "An sabunta saiti cikin nasara.",
    settingUsage: "Aika `on` don kunna ko `off` don kashe wannan saitin.",
    currentLanguage: "Harshe",
    publicMode: "Jama'a",
    privateMode: "Keɓaɓɓe",
    mode: "Yanayi",
    prefix: "Maɗaukaki",
    commands: "Umurnai",
    categories: "Rukunoni",
    owner: "Mai",
    memory: "Ƙwaƙwalwa",
    uptime: "Lokacin gudu",
    status: "Matsayi",
    responseTime: "Lokacin amsawa",
    date: "Kwanan wata",
    time: "Lokaci",
    title: "Take",
    artist: "Mawaƙi",
    duration: "Tsawon lokaci",
    quality: "Inganci",
    source: "Tushe",
    link: "Hanyar haɗi",
    description: "Bayani",
    reason: "Dalili",
    example: "Misali",
    by: "Ta",
  },
  pashto: {
    done: "ستاسو غوښتنه په بریالیتوب سره بشپړه شوه.",
    hello: "ښه راغلاست",
    choose: "یوه کټګوري وټاکئ",
    replyNumber: "په شمېره ځواب ورکړئ",
    botResponse: "🚀 XPRO BOT",
    success: "✅ بریالی",
    error: "❌ تېروتنه",
    info: "ℹ️ مالومات",
    processing: "⏳ پروسس کېږي",
    search: "🔎 د لټون پایلې",
    download: "📥 ډاونلوډ چمتو دی",
    ownerPanel: "👑 د مالک پینل",
    groupStatus: "👥 د ګروپ حالت",
    speedTitle: "⚡ د سرعت ازموینه",
    speedMessage: "ستاسو بوټ آنلاین، ځواب ویونکی او کار کولو ته چمتو دی.",
    statusOnline: "آنلاین",
    ownerTitle: "👑 د مالک مالومات",
    systemTitle: "⚙️ د سیسټم حالت",
    menuTitle: "🚀 XPRO BOT",
    menuHelp: "یوه کټګوري وټاکئ یا په لاسي توګه کمانډ ټایپ کړئ.",
    settingsTitle: "⚙️ د بوټ ترتیبات",
    settingsHelp: "د تړون د تازه کولو لپاره یې ټایپ کړئ. ON معنی فعال او OFF معنی غیر فعال دی.",
    languageTitle: "✅ ژبه تازه شوه",
    languageMessage: "ژبه په بریالیتوب سره بدله شوه. راتلونکي بوټ پیغامونه به په دې ژبه وي.",
    settingChanged: "ترتیب په بریالیتوب سره تازه شو.",
    settingUsage: "د فعالولو لپاره `on` یا د غیر فعالولو لپاره `off` واستوئ.",
    currentLanguage: "ژبه",
    publicMode: "عامه",
    privateMode: "شخصي",
    mode: "حالت",
    prefix: "مخښکی",
    commands: "کمانډونه",
    categories: "کټګورۍ",
    owner: "مالک",
    memory: "حافظه",
    uptime: "د چلولو وخت",
    status: "حالت",
    responseTime: "د ځواب وخت",
    date: "نېټه",
    time: "وخت",
    title: "سرلیک",
    artist: "سندرغاړی",
    duration: "موده",
    quality: "کیفیت",
    source: "سرچینه",
    link: "لینک",
    description: "تشریح",
    reason: "علت",
    example: "بېلګه",
    by: "لخوا",
  },
  hatian_creole: {
    done: "Demann ou an fini avèk siksè.",
    hello: "Byenveni",
    choose: "Chwazi yon kategori",
    replyNumber: "Reponn ak yon nimewo",
    botResponse: "🚀 XPRO BOT",
    success: "✅ SUKSÈ",
    error: "❌ ERÈ",
    info: "ℹ️ ENFÒMASYON",
    processing: "⏳ AP TRATE",
    search: "🔎 REZILTA RECHÈCH",
    download: "📥 DOWNLOAD PARE",
    ownerPanel: "👑 PANO PWPRIYETÈ",
    groupStatus: "👥 ESTATIS GWOUP",
    speedTitle: "⚡ TÈS VITÈS",
    speedMessage: "Bot ou a sou entènèt, reponn, epi pare pou travay.",
    statusOnline: "Sou entènèt",
    ownerTitle: "👑 ENFÒMASYON PWPRIYETÈ",
    systemTitle: "⚙️ ESTATIS SISTÈM",
    menuTitle: "🚀 XPRO BOT",
    menuHelp: "Chwazi yon kategori oswa tape yon kòmandman manyèlman.",
    settingsTitle: "⚙️ ANVIWONNMAN BOT",
    settingsHelp: "Tape yon anviwònman pou mete li ajou. ON vle di aktive ak OFF vle di dezaktive.",
    languageTitle: "✅ LANG AJOU",
    languageMessage: "Lang chanje avèk siksè. Mesaj bot nan lavni pral swiv lang sa a.",
    settingChanged: "Anviwònman mete ajou avèk siksè.",
    settingUsage: "Voye `on` pou aktive oswa `off` pou dezaktive anviwònman sa a.",
    currentLanguage: "Lang",
    publicMode: "Piblik",
    privateMode: "Prive",
    mode: "Mòd",
    prefix: "Prefiks",
    commands: "Kòmandman",
    categories: "Kategori",
    owner: "Pwopriyetè",
    memory: "Memwa",
    uptime: "Tan kouri",
    status: "Estati",
    responseTime: "Tan repons",
    date: "Dat",
    time: "Lè",
    title: "Tit",
    artist: "Atis",
    duration: "Dire",
    quality: "Kalite",
    source: "Sous",
    link: "Lyen",
    description: "Deskripsyon",
    reason: "Rezon",
    example: "Egzanp",
    by: "Pa",
  },
  shona: {
    done: "Chikumbiro chako chakapedzwa zvinobudirira.",
    hello: "Tigashire",
    choose: "Sarudza chikamu",
    replyNumber: "Pindura nenhamba",
    botResponse: "🚀 XPRO BOT",
    success: "✅ BUDIRIRI",
    error: "❌ KUKUNDIKANA",
    info: "ℹ️ RUMHETSI",
    processing: "⏳ KURONGWA",
    search: "🔎 MIBERO YEKUTSVAGA",
    download: "📥 DHIRAUNORODHA YAGADZIRWA",
    ownerPanel: "👑 PANEL YEMURIDZI",
    groupStatus: "👥 CHIMIRO CHEBOKU",
    speedTitle: "⚡ KUVHIYEDZA KUMHANYA",
    speedMessage: "Bot yako iri pamhepo, inopindura, uye yakagadzirira kushanda.",
    statusOnline: "Pamhepo",
    ownerTitle: "👑 RUMHETSI RWEMURIDZI",
    systemTitle: "⚙️ CHIMIRO CHEHURONGWA",
    menuTitle: "🚀 XPRO BOT",
    menuHelp: "Sarudza chikamu kana kunyora rairo nemaoko.",
    settingsTitle: "⚙️ ZVIGADZIRIRO ZVEBOT",
    settingsHelp: "Tinya gadziriro kuti uigadzirise. ON zvinoreva yakabatidzwa uye OFF yakadzimwa.",
    languageTitle: "✅ MUTAURO WAGADZIRISWA",
    languageMessage: "Mutauro wachinjwa zvinobudirira. Mameseji anotevera ebot achatevedzera mutauro uyu.",
    settingChanged: "Gadziriro yakagadziriswa zvinobudirira.",
    settingUsage: "Tuma `on` kuti ubatidze kana `off` kuti udzime gadziriro iyi.",
    currentLanguage: "Mutauro",
    publicMode: "Pachena",
    privateMode: "Pachivande",
    mode: "Maitiro",
    prefix: "Chivakashure",
    commands: "Mirairo",
    categories: "Zvikamu",
    owner: "Muridzi",
    memory: "Ndangariro",
    uptime: "Nguva yekumhanya",
    status: "Chimiro",
    responseTime: "Nguva yekupindura",
    date: "Zuva",
    time: "Nguva",
    title: "Musoro",
    artist: "Muimbi",
    duration: "Nguva",
    quality: "Hunhu",
    source: "Kwakabva",
    link: "Chinongedzo",
    description: "Tsananguro",
    reason: "Chikonzero",
    example: "Muenzaniso",
    by: "Na",
  },
  twi: {
    done: "Wo srɛ no ayɛ yie.",
    hello: "Akwaaba",
    choose: "Yi kuo bi",
    replyNumber: "Fa nɔma bua",
    botResponse: "🚀 XPRO BOT",
    success: "✅ YƐAYƐ",
    error: "❌ Mfomso",
    info: "ℹ️ NSEM",
    processing: "⏳ WOREYƐ",
    search: "🔎 NHWEHWƐ MU AHU",
    download: "📥 ATWETWI ASO",
    ownerPanel: "👑 WURAPANIN PANEL",
    groupStatus: "👥 KUO MU NSEM",
    speedTitle: "⚡ AHOM KA HWE",
    speedMessage: "Wo bot no wɔ online, ɛbua, na ɛyɛ krado sɛ ɛbɛyɛ adwuma.",
    statusOnline: "Online",
    ownerTitle: "👑 WURAPANIN NSEM",
    systemTitle: "⚙️ SISTEM NSEM",
    menuTitle: "🚀 XPRO BOT",
    menuHelp: "Yi kuo bi anaasɛ twerɛ command bi wo nsa mu.",
    settingsTitle: "⚙️ BOT NSIESIE",
    settingsHelp: "Pɛ siesie bi na sesa. ON kyerɛ sɛ ɛda so, OFF kyerɛ sɛ ɛnyɛ.",
    languageTitle: "✅ KASA ASESA",
    languageMessage: "Kasa no asesa yie. Bot nkra a ɛbɛba no bɛdi saa kasa yi.",
    settingChanged: "Siesie no asesa yie.",
    settingUsage: "Fa `on` ma ɛmmɛyɛ adwuma anaasɛ `off` ma ɛngyina.",
    currentLanguage: "Kasa",
    publicMode: "Nnipa nyinaa",
    privateMode: "Awosu",
    mode: "Ɔkwan",
    prefix: "Di kan",
    commands: "Nsɛm",
    categories: "Kuohorow",
    owner: "Wura",
    memory: "Kae",
    uptime: "Adwumayɛ bere",
    status: "Te sɛn",
    responseTime: "Mmuae bere",
    date: "Da",
    time: "Daberɛ",
    title: "Ti",
    artist: "Dwomtuni",
    duration: "Ɛberɛ tenten",
    quality: "Nea ɛte",
    source: "Mfitiase",
    link: "Link",
    description: "Nkyerɛkyerɛmu",
    reason: "Nea ɛde",
    example: "Nhwɛsoɔ",
    by: "Ɛfiri",
    
    // Command Messages
    adminOnly: "This is an admin-only command.",
    ownerOnly: "This is an owner-only command.",
    groupOnly: "This command works only in groups.",
    privateOnly: "This command works only in private chats.",
    notAdmins: "I don't have admin permissions.",
    groupAdminsRequired: "You need to be a group admin to use this.",
    replyRequired: "Please reply to a message.",
    userNotFound: "User not found.",
    invalidInput: "Invalid input.",
    noResults: "No results found.",
    searchFailed: "Search failed. Please try again later.",
    downloadFailed: "Download failed.",
    fetchFailed: "Failed to fetch data.",
    processingWait: "Processing... Please wait.",
    
    // Group commands
    kickSuccess: "User kicked successfully.",
    kickFailed: "Failed to kick user.",
    addSuccess: "User added successfully.",
    addFailed: "Failed to add user.",
    deleteSuccess: "Message deleted successfully.",
    deleteFailed: "Failed to delete message.",
    muteOn: "Group muted successfully.",
    muteOff: "Group unmuted successfully.",
    promoteSuccess: "User promoted to admin.",
    demoteSuccess: "User demoted from admin.",
    setNameSuccess: "Group name updated.",
    setDescSuccess: "Group description updated.",
    tagAllUsed: "Tagging all members...",
    leftGroup: "Left the group.",
    
    // Movie/Download
    selectQuality: "Select a quality:",
    selectEpisode: "Select an episode:",
    selectSeason: "Select a season:",
    noEpisodes: "No episodes found.",
    noSeasons: "No seasons found.",
    noDownloadLinks: "No download links available.",
    sendingMedia: "Sending media...",
    sentSuccessfully: "Sent successfully!",
  },
};

// Add similar messages to all other languages
const addCommandMessagesToLanguages = () => {
  const commandMessages = {
    // English
    english: {
      adminOnly: "This is an admin-only command.",
      ownerOnly: "This is an owner-only command.",
      groupOnly: "This command works only in groups.",
      privateOnly: "This command works only in private chats.",
      notAdmins: "I don't have admin permissions.",
      groupAdminsRequired: "You need to be a group admin to use this.",
      replyRequired: "Please reply to a message.",
      userNotFound: "User not found.",
      invalidInput: "Invalid input.",
      noResults: "No results found.",
      searchFailed: "Search failed. Please try again later.",
      downloadFailed: "Download failed.",
      fetchFailed: "Failed to fetch data.",
      processingWait: "Processing... Please wait.",
      kickSuccess: "User kicked successfully.",
      kickFailed: "Failed to kick user.",
      addSuccess: "User added successfully.",
      addFailed: "Failed to add user.",
      deleteSuccess: "Message deleted successfully.",
      deleteFailed: "Failed to delete message.",
      muteOn: "Group muted successfully.",
      muteOff: "Group unmuted successfully.",
      promoteSuccess: "User promoted to admin.",
      demoteSuccess: "User demoted from admin.",
      setNameSuccess: "Group name updated.",
      setDescSuccess: "Group description updated.",
      tagAllUsed: "Tagging all members...",
      leftGroup: "Left the group.",
      selectQuality: "Select a quality:",
      selectEpisode: "Select an episode:",
      selectSeason: "Select a season:",
      noEpisodes: "No episodes found.",
      noSeasons: "No seasons found.",
      noDownloadLinks: "No download links available.",
      sendingMedia: "Sending media...",
      sentSuccessfully: "Sent successfully!",
    },
    sinhala: {
      adminOnly: "එය admin-only command එකයි.",
      ownerOnly: "එය owner-only command එකයි.",
      groupOnly: "මේ command එක groups තුළ පමණි.",
      privateOnly: "මේ command එක private chats තුළ පමණි.",
      notAdmins: "මට admin permissions නැත.",
      groupAdminsRequired: "ඔබ group admin විය යුතුයි.",
      replyRequired: "Message එකට පිළිතුරු දෙන්න.",
      userNotFound: "User එක හමු නොවිණි.",
      invalidInput: "Invalid input එකයි.",
      noResults: "ප්‍රතිඵල හමු නොවිණි.",
      searchFailed: "සෙවීම අසාර්ථක විය. නැවත උත්සාහ කරන්න.",
      downloadFailed: "බාගැනීම අසාර්ථක විය.",
      fetchFailed: "දත්ත fetch කිරීම අසාර්ථක විය.",
      processingWait: "සකසමින්... එක මිතුරු.",
      kickSuccess: "User එක kick කරන ලදී.",
      kickFailed: "User එක kick කිරීම අසාර්ථක විය.",
      addSuccess: "User එක එකතු කරන ලදී.",
      addFailed: "User එක එකතු කිරීම අසාර්ථක විය.",
      deleteSuccess: "Message එක delete කරන ලදී.",
      deleteFailed: "Message එක delete කිරීම අසාර්ථක විය.",
      muteOn: "Group එක mute කරන ලදී.",
      muteOff: "Group එක unmute කරන ලදී.",
      promoteSuccess: "User එක admin ලෙස උසස්කර කරන ලදී.",
      demoteSuccess: "User එක admin බිම බාර කරන ලදී.",
      setNameSuccess: "Group එක නම සකස් කරන ලදී.",
      setDescSuccess: "Group එක විස්තරය සකස් කරන ලදී.",
      tagAllUsed: "සියලුම members tag කිරීමට...",
      leftGroup: "Group එක පිටුවත් කරන ලදී.",
      selectQuality: "quality එක තෝරන්න:",
      selectEpisode: "episode එක තෝරන්න:",
      selectSeason: "season එක තෝරන්න:",
      noEpisodes: "Episodes හමු නොවිණි.",
      noSeasons: "Seasons හමු නොවිණි.",
      noDownloadLinks: "බාගැනීමේ links නැත.",
      sendingMedia: "media යවමින්...",
      sentSuccessfully: "සාර්ථකව යැවිණි!",
    },
    urdu: {
      adminOnly: "یہ صرف ایڈمن کے لیے کمانڈ ہے۔",
      ownerOnly: "یہ صرف مالک کے لیے کمانڈ ہے۔",
      groupOnly: "یہ کمانڈ صرف گروپس میں کام کرتی ہے۔",
      privateOnly: "یہ کمانڈ صرف نجی چیٹ میں کام کرتی ہے۔",
      notAdmins: "میرے پاس ایڈمن اختیارات نہیں ہیں۔",
      groupAdminsRequired: "آپ کو گروپ ایڈمن ہونا چاہیے۔",
      replyRequired: "براہ کرم پیغام کے جواب میں دیں۔",
      userNotFound: "صارف نہیں ملا۔",
      invalidInput: "غلط ان پٹ۔",
      noResults: "کوئی نتائج نہیں ملے۔",
      searchFailed: "تلاش ناکام ہو گئی۔ براہ کرم دوبارہ کوشش کریں۔",
      downloadFailed: "ڈاؤن لوڈ ناکام ہو گیا۔",
      fetchFailed: "ڈیٹا حاصل کرنا ناکام۔",
      processingWait: "عمل جاری... براہ کرم انتظار کریں۔",
      kickSuccess: "صارف کو نکال دیا گیا۔",
      kickFailed: "صارف کو نکالنا ناکام۔",
      addSuccess: "صارف شامل ہو گیا۔",
      addFailed: "صارف کو شامل کرنا ناکام۔",
      deleteSuccess: "پیغام حذف کر دیا گیا۔",
      deleteFailed: "پیغام حذف کرنا ناکام۔",
      muteOn: "گروپ خاموش کر دیا گیا۔",
      muteOff: "گروپ ام کر دیا گیا۔",
      promoteSuccess: "صارف کو ایڈمن کے طور پر ترقی دی گئی۔",
      demoteSuccess: "صارف کو ایڈمن سے ہٹا دیا گیا۔",
      setNameSuccess: "گروپ کا نام اپ ڈیٹ کیا گیا۔",
      setDescSuccess: "گروپ کی تفصیل اپ ڈیٹ کی گئی۔",
      tagAllUsed: "تمام اراکین کو ٹیگ کر رہے ہیں...",
      leftGroup: "گروپ سے باہر آ گئے۔",
      selectQuality: "کوئی معیار منتخب کریں:",
      selectEpisode: "کوئی قسط منتخب کریں:",
      selectSeason: "کوئی سیزن منتخب کریں:",
      noEpisodes: "کوئی اقساطیں نہیں ملیں۔",
      noSeasons: "کوئی سیزن نہیں ملے۔",
      noDownloadLinks: "کوئی ڈاؤن لوڈ لنکس دستیاب نہیں۔",
      sendingMedia: "میڈیا بھیجا جا رہا ہے...",
      sentSuccessfully: "کامیابی سے بھیجا گیا!",
    },
    swahili: {
      adminOnly: "Hii ni amri ya admin tu.",
      ownerOnly: "Hii ni amri ya mmiliki tu.",
      groupOnly: "Amri hii inafanya kazi tu katika vikundi.",
      privateOnly: "Amri hii inafanya kazi tu katika sehemu ya faragha.",
      notAdmins: "Sina ruhusa za admin.",
      groupAdminsRequired: "Lazima uwe admin wa kikundi.",
      replyRequired: "Tafadhali jibu ujumbe.",
      userNotFound: "Mtumiaji hajapatikana.",
      invalidInput: "Ingizo batili.",
      noResults: "Hakuna matokeo yaliyopatikana.",
      searchFailed: "Utafutaji umeshindwa. Tafadhali jaribu tena.",
      downloadFailed: "Pakua imeshindwa.",
      fetchFailed: "Ukosefu wa data umeshindwa.",
      processingWait: "Inachukuliwa... Tafadhali subiri.",
      kickSuccess: "Mtumiaji amekamatia.",
      kickFailed: "Kukamatia mtumiaji kumeshindwa.",
      addSuccess: "Mtumiaji ameongezwa.",
      addFailed: "Kuongeza mtumiaji kumeshindwa.",
      deleteSuccess: "Ujumbe umefutwa.",
      deleteFailed: "Kufuta ujumbe kumeshindwa.",
      muteOn: "Kikundi kimutwa.",
      muteOff: "Kikundi kimebainika.",
      promoteSuccess: "Mtumiaji alipromoshwa kuwa admin.",
      demoteSuccess: "Mtumiaji aliondolewa kuwa admin.",
      setNameSuccess: "Jina la kikundi limebadilishwa.",
      setDescSuccess: "Maelezo ya kikundi yamebadilishwa.",
      tagAllUsed: "Kuweka alama kwa wanachama wote...",
      leftGroup: "Kushoto kikundi.",
      selectQuality: "Chagua ubora:",
      selectEpisode: "Chagua kipindi:",
      selectSeason: "Chagua msimu:",
      noEpisodes: "Hakuna kielelezo kilichopatikana.",
      noSeasons: "Hakuna msimu uliopatikana.",
      noDownloadLinks: "Hakuna viungo vya pakua vilivyopo.",
      sendingMedia: "Kueneza media...",
      sentSuccessfully: "Ilitumwa kwa mafanikio!",
    },
    hindi: {
      adminOnly: "यह केवल एडमिन कमांड है।",
      ownerOnly: "यह केवल मालिक कमांड है।",
      groupOnly: "यह कमांड केवल समूहों में काम करता है।",
      privateOnly: "यह कमांड केवल निजी चैट में काम करता है।",
      notAdmins: "मेरे पास एडमिन अनुमतियां नहीं हैं।",
      groupAdminsRequired: "आपको समूह एडमिन होना चाहिए।",
      replyRequired: "कृपया किसी संदेश का जवाब दें।",
      userNotFound: "उपयोगकर्ता नहीं मिला।",
      invalidInput: "अमान्य इनपुट।",
      noResults: "कोई परिणाम नहीं मिले।",
      searchFailed: "खोज विफल रही। कृपया दोबारा प्रयास करें।",
      downloadFailed: "डाउनलोड विफल हुआ।",
      fetchFailed: "डेटा प्राप्त करना विफल।",
      processingWait: "प्रसंस्करण जारी है... कृपया प्रतीक्षा करें।",
      kickSuccess: "उपयोगकर्ता को निकाल दिया गया।",
      kickFailed: "उपयोगकर्ता को निकालना विफल रहा।",
      addSuccess: "उपयोगकर्ता जोड़ा गया।",
      addFailed: "उपयोगकर्ता को जोड़ना विफल रहा।",
      deleteSuccess: "संदेश हटा दिया गया।",
      deleteFailed: "संदेश हटाना विफल रहा।",
      muteOn: "समूह को म्यूट किया गया।",
      muteOff: "समूह को अनम्यूट किया गया।",
      promoteSuccess: "उपयोगकर्ता को एडमिन के लिए बढ़ावा दिया गया।",
      demoteSuccess: "उपयोगकर्ता को एडमिन से हटाया गया।",
      setNameSuccess: "समूह का नाम अपडेट किया गया।",
      setDescSuccess: "समूह विवरण अपडेट किया गया।",
      tagAllUsed: "सभी सदस्यों को टैग किया जा रहा है...",
      leftGroup: "समूह को छोड़ दिया गया।",
      selectQuality: "एक गुणवत्ता चुनें:",
      selectEpisode: "एक एपिसोड चुनें:",
      selectSeason: "एक सीजन चुनें:",
      noEpisodes: "कोई एपिसोड नहीं मिले।",
      noSeasons: "कोई सीजन नहीं मिले।",
      noDownloadLinks: "कोई डाउनलोड लिंक उपलब्ध नहीं।",
      sendingMedia: "मीडिया भेजा जा रहा है...",
      sentSuccessfully: "सफलतापूर्वक भेजा गया!",
    },
    hausa: {
      adminOnly: "Wannan shine admin-only command.",
      ownerOnly: "Wannan shine owner-only command.",
      groupOnly: "Wannan command yana aiki a cikin rukuni ne.",
      privateOnly: "Wannan command yana aiki a cikin private chats ne.",
      notAdmins: "Ba ni da izinin admin.",
      groupAdminsRequired: "Dole ne ki kasua admin na rukuni.",
      replyRequired: "Tafiya ji sakonin.",
      userNotFound: "Ba a samu mai amfani.",
      invalidInput: "Shiryawa marasa takaitawa.",
      noResults: "Babu sakamakon da aka samu.",
      searchFailed: "Binciken ya kasa. Tafiya ƙoƙari.",
      downloadFailed: "Zazzagin ya kasa.",
      fetchFailed: "Buƙatar bayani ya kasa.",
      processingWait: "Yana jira... Tafiya jira.",
      kickSuccess: "An kawar da mai amfani.",
      kickFailed: "Kawar da mai amfani ya kasa.",
      addSuccess: "An ƙara mai amfani.",
      addFailed: "Ƙarawa mai amfani ta kasa.",
      deleteSuccess: "An goge sakon.",
      deleteFailed: "Gogen sakon ya kasa.",
      muteOn: "An ƙare rukuni.",
      muteOff: "An buɗe rukuni.",
      promoteSuccess: "An dagita mai amfani zuwa admin.",
      demoteSuccess: "An goge mai amfani daga admin.",
      setNameSuccess: "An sabunta sunan rukuni.",
      setDescSuccess: "An sabunta bayanin rukuni.",
      tagAllUsed: "Yana mallaka dukkan membobin...",
      leftGroup: "An bars rukuni.",
      selectQuality: "Zaɓi wani inganci:",
      selectEpisode: "Zaɓi wani kashi:",
      selectSeason: "Zaɓi wani lokaci:",
      noEpisodes: "Babu kashi da aka samu.",
      noSeasons: "Babu lokaci da aka samu.",
      noDownloadLinks: "Babu hanyoyin zazzagin da ake samu.",
      sendingMedia: "Yana tilasta media...",
      sentSuccessfully: "An iyo kaya!",
    },
    pashto: {
      adminOnly: "دا صرف admin کمانډ دی.",
      ownerOnly: "دا صرف مالک کمانډ دی.",
      groupOnly: "دا کمانډ یوازې د ګروپونو کې کار کوي.",
      privateOnly: "دا کمانډ یوازې په شخصي چیټ کې کار کوي.",
      notAdmins: "ما admin اختیارات نیست.",
      groupAdminsRequired: "تاسو د ګروپ admin تر ټولو کیدلو وي.",
      replyRequired: "براہ کرم پیغام ته ځواب ورکړئ.",
      userNotFound: "کارونده نه موندل شو.",
      invalidInput: "نامعتبر ان پٹ.",
      noResults: "کوم نتیجه نه موندل شوه.",
      searchFailed: "لټون ناکام شو. براہ کرم دوباره هڅه کوئ.",
      downloadFailed: "ډاونلوډ ناکام شو.",
      fetchFailed: "ډیټا حاصل کول ناکام شو.",
      processingWait: "پروسس جاري دي... براہ کرم انتظار کوئ.",
      kickSuccess: "کارونده لیږدول شوه.",
      kickFailed: "کارونده لیږدول ناکام شو.",
      addSuccess: "کارونده اضافه شوه.",
      addFailed: "کارونده اضافه کول ناکام شو.",
      deleteSuccess: "پیغام حذف شوه.",
      deleteFailed: "پیغام حذف کول ناکام شو.",
      muteOn: "ګروپ خاموش شوه.",
      muteOff: "ګروپ بیا فعال شوه.",
      promoteSuccess: "کارونده admin ته رفع شوه.",
      demoteSuccess: "کارونده له admin څخه لیږدول شوه.",
      setNameSuccess: "د ګروپ نوم اپډیٹ شو.",
      setDescSuccess: "د ګروپ توضیح اپډیٹ شو.",
      tagAllUsed: "د تمام غړو نښې کول...",
      leftGroup: "ګروپ پریښودل شو.",
      selectQuality: "کیفیت انتخاب کوئ:",
      selectEpisode: "قسط انتخاب کوئ:",
      selectSeason: "فصل انتخاب کوئ:",
      noEpisodes: "کوم قسط نه موندل شو.",
      noSeasons: "کوم فصل نه موندل شو.",
      noDownloadLinks: "کوم ډاونلوډ لنکس دستیاب نده.",
      sendingMedia: "میډیا لیږدول کیږي...",
      sentSuccessfully: "په کامیابۍ سره لیږدول شوه!",
    },
    hatian_creole: {
      adminOnly: "Sa se yon kòmandman admin sèlman.",
      ownerOnly: "Sa se yon kòmandman pwopryetè sèlman.",
      groupOnly: "Kòmandman sa a ap travay sèlman nan gwoup.",
      privateOnly: "Kòmandman sa a ap travay sèlman nan chat prive.",
      notAdmins: "Mwen pa gen izin admin.",
      groupAdminsRequired: "Ou dwe yon gwoup admin.",
      replyRequired: "Tanpri reponn yon mesaj.",
      userNotFound: "Itilizatè pa jwenn.",
      invalidInput: "Entwè envalid.",
      noResults: "Pa gen rezilta jwenn.",
      searchFailed: "Rechèch la fèk.",
      downloadFailed: "Download la echwe.",
      fetchFailed: "Fè done echwe.",
      processingWait: "Trete... Tanpri tann.",
      kickSuccess: "Itilizatè a te retire.",
      kickFailed: "Retire itilizatè a echwe.",
      addSuccess: "Itilizatè a te ajoute.",
      addFailed: "Ajoute itilizatè a echwe.",
      deleteSuccess: "Mesaj la te efase.",
      deleteFailed: "Efase mesaj la echwe.",
      muteOn: "Gwoup la te mete an silans.",
      muteOff: "Gwoup la te desilanse.",
      promoteSuccess: "Itilizatè a te promte admin.",
      demoteSuccess: "Itilizatè a te retiye admin.",
      setNameSuccess: "Non gwoup la te mete ajou.",
      setDescSuccess: "Deskripsyon gwoup la te mete ajou.",
      tagAllUsed: "Tage tout manm yo...",
      leftGroup: "Kite gwoup la.",
      selectQuality: "Chwazi yon kalite:",
      selectEpisode: "Chwazi yon epizod:",
      selectSeason: "Chwazi yon sezon:",
      noEpisodes: "Pa gen epizod jwenn.",
      noSeasons: "Pa gen sezon jwenn.",
      noDownloadLinks: "Pa gen lyen telechaje.",
      sendingMedia: "Voye media...",
      sentSuccessfully: "Voye ak sikse!",
    },
    shona: {
      adminOnly: "Ino command yenguva yenguva.",
      ownerOnly: "Ino command yemuridzi chete.",
      groupOnly: "Command ino inoshanda mubuku chete.",
      privateOnly: "Command ino inoshanda mu private chats chete.",
      notAdmins: "Handina admin permissions.",
      groupAdminsRequired: "Unofanira kuva buku admin.",
      replyRequired: "Nyora sakonin.",
      userNotFound: "Mushandi haashanzviki.",
      invalidInput: "Kurevererwa kwakaipa.",
      noResults: "Hakuna mibero.",
      searchFailed: "Kutsvaga kwakashanda.",
      downloadFailed: "Kurora kwakashanda.",
      fetchFailed: "Kutora data kwakashanda.",
      processingWait: "Kuronzwa... Kumirira.",
      kickSuccess: "Mushandi akatsanagudzwa.",
      kickFailed: "Kutsanagudza mushandi kwakashanda.",
      addSuccess: "Mushandi akwotsikirwa.",
      addFailed: "Kutsika mushandi kwakashanda.",
      deleteSuccess: "Sakonin rakadzimwa.",
      deleteFailed: "Kudzima sakonin kwakashanda.",
      muteOn: "Buku rakasungirirwa.",
      muteOff: "Buku rakabvumikirwa.",
      promoteSuccess: "Mushandi akakwirwirwa kuve admin.",
      demoteSuccess: "Mushandi akabvumikirwa kubva admin.",
      setNameSuccess: "Zita rebuku rakagadziriswa.",
      setDescSuccess: "Tsananguro yebuku yakagadziriswa.",
      tagAllUsed: "Kutakaisa memba ese...",
      leftGroup: "Akarasa buku.",
      selectQuality: "Sarudza hunhu:",
      selectEpisode: "Sarudza kashi:",
      selectSeason: "Sarudza nyaya:",
      noEpisodes: "Hakuna kashi kwakapatikana.",
      noSeasons: "Hakuna nyaya yakapatikana.",
      noDownloadLinks: "Hakuna hanyanyanya ye download.",
      sendingMedia: "Kutumira media...",
      sentSuccessfully: "Kutumira zvinobudirira!",
    },
    twi: {
      adminOnly: "Yei ne admin-only command.",
      ownerOnly: "Yei ne owner-only command.",
      groupOnly: "Command yei na guakari a kukuooo.",
      privateOnly: "Command yei na guakari a private chats.",
      notAdmins: "Minni admin permissions.",
      groupAdminsRequired: "Wohoho yoo guakuo admin.",
      replyRequired: "Tum mesaj no.",
      userNotFound: "User no hui.",
      invalidInput: "Invalid input.",
      noResults: "Nkrataa no hui.",
      searchFailed: "Asueyi apau.",
      downloadFailed: "Download apau.",
      fetchFailed: "Kyire ade apau.",
      processingWait: "Rekrom... Twatwe.",
      kickSuccess: "User ya asi ala.",
      kickFailed: "Asi user apau.",
      addSuccess: "User wa di.",
      addFailed: "Di user apau.",
      deleteSuccess: "Mesaj asi.",
      deleteFailed: "Asi mesaj apau.",
      muteOn: "Kuo asi kom.",
      muteOff: "Kuo asi buakye.",
      promoteSuccess: "User reko admin.",
      demoteSuccess: "User asi admin.",
      setNameSuccess: "Kuo din asesa.",
      setDescSuccess: "Kuo nkyerkyermu asesa.",
      tagAllUsed: "Nyinaa di...",
      leftGroup: "Kuo asi.",
      selectQuality: "Yi nea ɛte:",
      selectEpisode: "Yi kashi:",
      selectSeason: "Yi nyaya:",
      noEpisodes: "Nkashi no hui.",
      noSeasons: "Nyaya no hui.",
      noDownloadLinks: "Download links no.",
      sendingMedia: "Tuma media...",
      sentSuccessfully: "Tuma yei!",
    },
  };
  
  // Add to each language dictionary
  Object.keys(commandMessages).forEach(lang => {
    if (dictionary[lang]) {
      dictionary[lang] = { ...dictionary[lang], ...commandMessages[lang] };
    }
  });
};

addCommandMessagesToLanguages();

const addGeneralMessagesToLanguages = () => {
  const generalMessages = {
    english: {
      query: "Query", botInformation: "Bot Information", totalSettings: "Total Settings", size: "Size", fileName: "File Name", fileSize: "File Size", fileType: "File Type", sendingMedia: "Sending media...", enterMovieName: "Enter a movie name.", invalidRequest: "Invalid request.", invalidDownloadPayload: "Invalid download payload.", invalidDownloadUrl: "Invalid download URL.", telegramDownloadUnavailable: "Telegram download was not created. Try the next link.",
    },
    sinhala: {
      query: "සෙවීම", botInformation: "Bot තොරතුරු", totalSettings: "මුළු සැකසුම්", size: "ප්‍රමාණය", fileName: "ගොනු නම", fileSize: "ගොනු ප්‍රමාණය", fileType: "ගොනු වර්ගය", sendingMedia: "media යවමින්...", enterMovieName: "චිත්‍රපට නමක් ඇතුළත් කරන්න.", invalidRequest: "ඉල්ලීම වලංගු නැත.", invalidDownloadPayload: "බාගැනීමේ දත්ත වලංගු නැත.", invalidDownloadUrl: "බාගැනීමේ URL වලංගු නැත.", telegramDownloadUnavailable: "Telegram බාගැනීම සාදා නැත. ඊළඟ link එක උත්සාහ කරන්න.",
    },
    urdu: {
      query: "تلاش", botInformation: "بوٹ کی معلومات", totalSettings: "کل ترتیبات", size: "سائز", fileName: "فائل کا نام", fileSize: "فائل سائز", fileType: "فائل قسم", sendingMedia: "میڈیا بھیجا جا رہا ہے...", enterMovieName: "فلم کا نام درج کریں۔", invalidRequest: "درخواست درست نہیں۔", invalidDownloadPayload: "ڈاؤن لوڈ payload درست نہیں۔", invalidDownloadUrl: "ڈاؤن لوڈ URL درست نہیں۔", telegramDownloadUnavailable: "Telegram ڈاؤن لوڈ نہیں بنا۔ اگلا لنک آزمائیں۔",
    },
    swahili: {
      query: "Hoja", botInformation: "Taarifa za Bot", totalSettings: "Jumla ya mipangilio", size: "Ukubwa", fileName: "Jina la faili", fileSize: "Ukubwa wa faili", fileType: "Aina ya faili", sendingMedia: "Inatuma media...", enterMovieName: "Weka jina la filamu.", invalidRequest: "Ombi si sahihi.", invalidDownloadPayload: "Payload ya kupakua si sahihi.", invalidDownloadUrl: "URL ya kupakua si sahihi.", telegramDownloadUnavailable: "Upakuaji wa Telegram haukuundwa. Jaribu kiungo kinachofuata.",
    },
    hindi: {
      query: "क्वेरी", botInformation: "बॉट जानकारी", totalSettings: "कुल सेटिंग्स", size: "आकार", fileName: "फ़ाइल नाम", fileSize: "फ़ाइल आकार", fileType: "फ़ाइल प्रकार", sendingMedia: "मीडिया भेजा जा रहा है...", enterMovieName: "फिल्म का नाम दर्ज करें।", invalidRequest: "अनुरोध अमान्य है।", invalidDownloadPayload: "डाउनलोड payload अमान्य है।", invalidDownloadUrl: "डाउनलोड URL अमान्य है।", telegramDownloadUnavailable: "Telegram डाउनलोड नहीं बना। अगला लिंक आज़माएँ।",
    },
    hausa: {
      query: "Bincike", botInformation: "Bayanan Bot", totalSettings: "Jimillar saiti", size: "Girma", fileName: "Sunan fayil", fileSize: "Girman fayil", fileType: "Nau'in fayil", sendingMedia: "Ana aika media...", enterMovieName: "Shigar da sunan fim.", invalidRequest: "Buƙata ba ta da inganci.", invalidDownloadPayload: "Bayanan zazzagewa ba su da inganci.", invalidDownloadUrl: "URL ɗin zazzagewa ba shi da inganci.", telegramDownloadUnavailable: "Ba a ƙirƙiri zazzagewar Telegram ba. Gwada link na gaba.",
    },
    pashto: {
      query: "لټون", botInformation: "د بوټ مالومات", totalSettings: "ټول ترتیبات", size: "اندازه", fileName: "د فایل نوم", fileSize: "د فایل اندازه", fileType: "د فایل ډول", sendingMedia: "میډیا لېږل کېږي...", enterMovieName: "د فلم نوم ولیکئ.", invalidRequest: "غوښتنه سمه نه ده.", invalidDownloadPayload: "د ډاونلوډ معلومات سم نه دي.", invalidDownloadUrl: "د ډاونلوډ URL سم نه دی.", telegramDownloadUnavailable: "Telegram ډاونلوډ جوړ نه شو. بل لینک وازمویئ.",
    },
    hatian_creole: {
      query: "Rechèch", botInformation: "Enfòmasyon Bot", totalSettings: "Total anviwònman", size: "Gwosè", fileName: "Non fichye", fileSize: "Gwosè fichye", fileType: "Kalite fichye", sendingMedia: "Ap voye media...", enterMovieName: "Antre non fim nan.", invalidRequest: "Demann lan pa valid.", invalidDownloadPayload: "Done download yo pa valid.", invalidDownloadUrl: "URL download la pa valid.", telegramDownloadUnavailable: "Download Telegram pa kreye. Eseye pwochen lyen an.",
    },
    shona: {
      query: "Kutsvaga", botInformation: "Ruzivo rweBot", totalSettings: "Zvigadziriro zvese", size: "Saizi", fileName: "Zita refaira", fileSize: "Saizi yefaira", fileType: "Rudzi rwefaira", sendingMedia: "Kutumira media...", enterMovieName: "Isa zita removie.", invalidRequest: "Chikumbiro hachisi kushanda.", invalidDownloadPayload: "Mashoko ekudhawunirodha haasi kushanda.", invalidDownloadUrl: "URL yekudhawunirodha haisi kushanda.", telegramDownloadUnavailable: "Telegram download haina kugadzirwa. Edza link inotevera.",
    },
    twi: {
      query: "Hwehwɛ", botInformation: "Bot ho nsɛm", totalSettings: "Nsiesie nyinaa", size: "Kɛseɛ", fileName: "File din", fileSize: "File kɛseɛ", fileType: "File su", sendingMedia: "Retuma media...", enterMovieName: "Twerɛ movie din.", invalidRequest: "Abisadeɛ no nyɛ nokware.", invalidDownloadPayload: "Download data no nyɛ nokware.", invalidDownloadUrl: "Download URL no nyɛ nokware.", telegramDownloadUnavailable: "Telegram download no anyɛ. Sɔ link a edi hɔ no hwɛ.",
    },
  };
  Object.keys(generalMessages).forEach(lang => {
    if (dictionary[lang]) dictionary[lang] = { ...dictionary[lang], ...generalMessages[lang] };
  });
};

addGeneralMessagesToLanguages();

Object.entries(EASY_EDIT.messages).forEach(([language, overrides]) => {
  if (dictionary[language]) dictionary[language] = { ...dictionary[language], ...overrides };
});

const i18n = (configOrLang) => dictionary[normalizeLang(configOrLang)];
const languageName = (configOrLang) => {
  const lang = normalizeLang(configOrLang);
  const names = {
    english: "English",
    sinhala: "සිංහල (Sinhala)",
    urdu: "اردو (Urdu)",
    swahili: "Kiswahili (Swahili)",
    hindi: "हिन्दी (Hindi)",
    hausa: "Hausa",
    pashto: "پښتو (Pashto)",
    hatian_creole: "Kreyòl Ayisyen (Haitian Creole)",
    shona: "chiShona (Shona)",
    twi: "Twi",
  };
  return names[lang] || "English";
};

const supportedLanguages = () => [
  { code: "english", aliases: ["english", "en"], name: languageName("english") },
  { code: "sinhala", aliases: ["sinhala", "si"], name: languageName("sinhala") },
  { code: "urdu", aliases: ["urdu", "ur"], name: languageName("urdu") },
  { code: "swahili", aliases: ["swahili", "sw"], name: languageName("swahili") },
  { code: "hindi", aliases: ["hindi", "hi"], name: languageName("hindi") },
  { code: "hausa", aliases: ["hausa", "ha"], name: languageName("hausa") },
  { code: "pashto", aliases: ["pashto", "ps"], name: languageName("pashto") },
  { code: "hatian_creole", aliases: ["hatian_creole", "haitian", "ht"], name: languageName("hatian_creole") },
  { code: "shona", aliases: ["shona", "sn"], name: languageName("shona") },
  { code: "twi", aliases: ["twi", "tw"], name: languageName("twi") },
];

const memoryUsage = () => `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`;
const dateColombo = () => new Date().toLocaleDateString("en-GB", { timeZone: "Asia/Colombo" });
const timeColombo = () => new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Colombo" });
const mark = (value, oce = "") => `${oce}${clean(value)}${oce}`;

const header = (title, config = null) => {
  const resolvedConfig = config || activeConfig;
  const fallback = clean(botName(resolvedConfig), DESIGN_TITLE);
  return `• *╭─「 ${clean(title, fallback)} 」*`;
};
const footer = (config = null) => {
  const resolvedConfig = config || activeConfig;
  const custom = cleanBlock(resolveBrandValue(resolvedConfig, ["FOOTER"], ""), "");
  return custom || POWERED;
};
const isStyled = (text) => /• \*╭─「[\s\S]*• \*⛦\* xpro-verce\.site\s*$/m.test(text) || text.trim().startsWith("• *╭─「");

const stripLegacyChrome = (text) => cleanBlock(text, "")
  .split("\n")
  .map(line => line.replace(/^>\s?/, "").trimEnd())
  .filter(line => !/^[━═─\-=*_┃┏┓┗┛╔╗╚╝╭╮╰╯│┌┐└┘\s]{8,}$/.test(line.trim()))
  .join("\n")
  .replace(/\n{3,}/g, "\n\n")
  .trim();

const line = (text = "") => `*┆*✯ ${text}`.trimEnd();
const section = (rows = []) => [
  ...rows.filter(Boolean).map(row => line(row)),
  "• *╰──────────●●►*",
].join("\n");

const field = (label, value, icon = "•") => `${icon === "•" ? "" : `${icon} `}*\`${clean(label).toLowerCase()}\`*: *${clean(value)}*`;
const message = (title, bodyLines = [], sections = [], showFooter = true, config = null) => {
  const resolvedConfig = config || activeConfig;
  return [
    header(title, resolvedConfig),
    ...bodyLines.filter(item => item !== null && item !== undefined && item !== ""),
    ...sections.filter(Boolean),
    showFooter ? footer(resolvedConfig) : null,
  ].filter(item => item !== null && item !== undefined).join("\n").trim();
};

const botName = (config) => clean(
  resolveBrandValue(config || activeConfig, ["BOT_NAME", "BOTNAME", "NAME", "MNAME"], BOT_DISPLAY_NAME),
  BOT_DISPLAY_NAME
);
const ownerName = (config) => clean(
  resolveBrandValue(config || activeConfig, ["OWNER_NAME", "OWNERNAME", "MNAME"], OWNER_DISPLAY_NAME),
  OWNER_DISPLAY_NAME
);
const runtimeValue = (config, fallback = "Live") => clean(config?.RUNTIME || fallback, fallback);
const menuIntro = (pushname, config, runtimeText = runtimeValue(config)) => [
  `👋 *ʜɪ* ${clean(pushname, "there")}`,
  section([
    field("ʙᴏᴛ", botName(config)),
    field("ᴜꜱᴇʀ", clean(pushname, "there")),
    field("ᴏᴡɴᴇʀ", ownerName(config)),
    field("ᴜᴘᴛɪᴍᴇ", runtimeText),
    field("ʀᴀᴍ", memoryUsage()),
    field("ᴘʀᴇꜰɪx", config?.PREFIX || "."),
  ]),
];

const t = (configOrLang, key, fallback) => {
  const lang = i18n(configOrLang);
  return lang?.[key] || dictionary.english[key] || fallback || key;
};

const commandText = (command, configOrLang, args = "") => {
  const prefix = typeof configOrLang === "object" && configOrLang?.PREFIX ? configOrLang.PREFIX : ".";
  return `${prefix}${command}${args ? ` ${args}` : ""}`;
};

const usageExample = (command, args, configOrLang) => commandText(command, configOrLang, args);

const successMessage = (text, config) => message(i18n(config).success, [cleanBlock(text, i18n(config).done)], [], true, config);
const errorMessage = (reason, example, config) => {
  const lang = i18n(config);
  const body = [`${lang.reason}:`, cleanBlock(reason, "Invalid input.")];
  if (example) body.push("", `${lang.example}:`, cleanBlock(example));
  return message(lang.error, body, [], true, config);
};
const infoMessage = (title, text, config) => message(title || i18n(config).info, [cleanBlock(text, i18n(config).done)], [], true, config);
const processingMessage = (text, config) => message(i18n(config).processing, [`⏳ ${clean(text, "Processing your request...")}`], [], true, config);

// Edit these maps to control the bot's reaction and message emoji globally.
// Leave a value unchanged when that emoji should keep its current appearance.
const BOT_EMOJI_MAP = EASY_EDIT.messageEmoji;
const REACTION_EMOJI_MAP = EASY_EDIT.reactionEmoji;

const replaceBotEmojis = (value) => {
  if (typeof value !== "string") return value;
  const withTextReplacements = Object.entries(EASY_EDIT.textReplacements).reduce(
    (text, [from, to]) => text.split(from).join(String(to)),
    value
  );
  return Object.entries(BOT_EMOJI_MAP).reduce(
    (text, [from, to]) => text.split(from).join(String(to)),
    withTextReplacements
  );
};

const formatReactionEmoji = (emoji, config = activeConfig) => {
  if (typeof emoji !== "string") return emoji;
  return REACTION_EMOJI_MAP[emoji] || emoji;
};

// Customize media URLs, captions, filenames, mimetypes, or other metadata
// here. The media bytes themselves are intentionally left untouched.
const formatMediaContent = (content, type, config = activeConfig) => content;

// Final outgoing-message hook. Every bot send reaches this function, including
// text, captions, media metadata, reactions, and combined payloads.
const formatOutgoingContent = (content, config = activeConfig, options = {}) => {
  if (!content || typeof content !== "object") return content;
  const next = { ...content };
  if (options.edit || next.edit) return next;

  if (typeof next.text === "string" && next.text.trim()) {
    next.text = replaceBotEmojis(api.BOT_REPLY(next.text, "BOT RESPONSE", config));
  }
  if (typeof next.caption === "string" && next.caption.trim()) {
    next.caption = replaceBotEmojis(api.BOT_REPLY(next.caption, "BOT MESSAGE", config));
  }
  if (next.react && typeof next.react === "object") {
    next.react = { ...next.react, text: formatReactionEmoji(next.react.text, config) };
  }

  for (const type of ["image", "video", "audio", "document", "sticker"]) {
    if (next[type] !== undefined) {
      next[type] = formatMediaContent(next[type], type, config);
    }
  }
  return next;
};

const commandExample = (text, configOrLang) => {
  const source = cleanBlock(text, "");
  const lower = source.toLowerCase();
  const explicitUsage = source.match(/(?:usage|example)\s*:?\s*([.!#$%&?]?\w+[\w-]*(?:\s+[^\n]+)?)/i);
  if (explicitUsage?.[1]) {
    const usage = explicitUsage[1].trim();
    if (/^[.!#$%&?]/.test(usage)) return usage;
  }

  const examples = [
    { keys: ["past papers", "paper", " pp", "pp <"], value: usageExample("pp", "2017", configOrLang) },
    { keys: ["baiscope", "movie name", "film name"], value: usageExample("baiscope", "Avatar", configOrLang) },
    { keys: ["song", "music", "audio", "search query", "query"], value: usageExample("song", "Faded Alan Walker", configOrLang) },
    { keys: ["video", "youtube", "ytmp4"], value: usageExample("video", "https://youtu.be/dQw4w9WgXcQ", configOrLang) },
    { keys: ["facebook", "fb"], value: usageExample("fb", "https://www.facebook.com/share/v/example", configOrLang) },
    { keys: ["tiktok", "tik tok"], value: usageExample("tiktok", "https://www.tiktok.com/@user/video/123456789", configOrLang) },
    { keys: ["twitter", "x.com"], value: usageExample("twitter", "https://x.com/user/status/123456789", configOrLang) },
    { keys: ["instagram", "ig"], value: usageExample("ig", "https://www.instagram.com/reel/example", configOrLang) },
    { keys: ["mediafire"], value: usageExample("mediafire", "https://www.mediafire.com/file/example/file.zip", configOrLang) },
    { keys: ["google drive", "gdrive", "drive"], value: usageExample("gdrive", "https://drive.google.com/file/d/example/view", configOrLang) },
    { keys: ["apk", "app name"], value: usageExample("apk", "whatsapp", configOrLang) },
    { keys: ["spotify"], value: usageExample("spotify", "https://open.spotify.com/track/example", configOrLang) },
    { keys: ["reply to an image", "image", "sticker"], value: `${t(configOrLang, "replyRequired", "Reply to a message.")} ${commandText("tourl", configOrLang)}` },
  ];

  const match = examples.find(item => item.keys.some(key => lower.includes(key)));
  return match?.value || commandText("help", configOrLang);
};

const classifyTitle = (text, title, config) => {
  const lang = i18n(config);
  const lower = `${title || ""}\n${text}`.toLowerCase();
  const hasSuccessSignal = /✅|success|completed|updated|enabled|disabled|done|saved|reset|sent|ready|paired successfully/.test(lower);
  const hasErrorSignal = /❌|error|failed|invalid|missing|not found|denied|owner only|usage|required|can't|cannot/.test(lower);

  if (hasSuccessSignal) return lang.success;
  if (hasErrorSignal) return lang.error;
  if (/⏳|processing|please wait|loading|searching|sending/.test(lower)) return lang.processing;
  if (/search|result/.test(lower)) return lang.search;
  if (/download|ready|audio|video|song|media|file/.test(lower)) return lang.download;
  if (/group|antilink|antibad|welcome/.test(lower)) return lang.groupStatus;
  if (/owner|admin|broadcast|restart|ban|block/.test(lower)) return lang.ownerPanel;
  return title || lang.botResponse;
};

const formatPlainBody = (text) => {
  const cleaned = stripLegacyChrome(text);
  if (!cleaned) return [];
  return cleaned.split("\n").map(item => {
    const value = item.trim();
    if (!value) return "";
    if (/^[•➥📅🎬🎵📥👤⚙️🤖👥📢✅❌⏳🔎]/.test(value)) return value;
    return value.length > 90 || value.includes(":") ? value : `• ${value}`;
  });
};

const mediaTemplate = (title, pushname, rows) => message(title, [
  pushname ? `👋 ${i18n().hello} ${clean(pushname, "there")}` : null,
], [section(rows)]);

const movieTemplate = (title, rows, descriptionLabel, description, oce = "") => message(`🎬 ${CINEMA_BRAND}`, [], [
  section([`🎬 ${title}`, ...rows]),
  `${descriptionLabel}:\n${oce}${limit(description)}${oce}`,
]);

const searchHeader = (pushname, config) => {
  const lang = i18n(config);
  return message(lang.search, [
    `👋 ${lang.hello} ${clean(pushname, "there")}`,
    `🔎 Query : Select from the results below`,
    `💬 ${lang.replyNumber}`,
  ], [], false);
};

// ----------------------------------------------------------------------
// EXPORTED API (same as original but with full language integration)
// ----------------------------------------------------------------------
const api = {
  EASY_EDIT,
  BRAND,
  header,
  section,
  field,
  successMessage,
  errorMessage,
  infoMessage,
  processingMessage,
  formatOutgoingContent,
  formatMediaContent,
  formatReactionEmoji,

  MENUMSG(pushname, config) {
    const lang = i18n(config);
    return message(botName(config), menuIntro(pushname, config), [
      "• ✵ *ꜱᴇʟᴇᴄᴛ ᴀ ᴄᴏᴍᴍᴀɴᴅ ʟɪꜱᴛ* ✵",
      section([
        "🎵 Music",
        "🎬 Movies",
        "🤖 AI Tools",
        "📥 Downloaders",
        "👥 Group Tools",
        "📢 Group Status",
        "📺 Channel Songs",
        "👑 Owner Tools",
      ]),
      `• ${lang.choose}`,
    ]);
  },

  TIKTOK(datas, pushname, q) {
    return mediaTemplate("📥 TIKTOK DOWNLOAD", pushname, [
      field("Title", datas?.title, "🎬"),
      field("Author", datas?.author, "👤"),
      field("Source", q, "🔎"),
    ]);
  },
  TIKTOK_INFO(datas, pushname, q) { return this.TIKTOK(datas, pushname, q); },
  FACEBOOK(title, pushname, q) {
    return mediaTemplate("📥 FACEBOOK DOWNLOAD", pushname, [field("Title", title, "🎬"), field("Source", q, "🔎")]);
  },
  TWITTER(videoDescription, videoTitle, pushname) {
    return mediaTemplate("📥 TWITTER DOWNLOAD", pushname, [field("Title", videoTitle, "🎬"), field("Description", limit(videoDescription, 220), "•")]);
  },
  DIRECT(pushname, fileName, fileSize, fileType) {
    return mediaTemplate("📥 DIRECT DOWNLOAD", pushname, [field("File Name", fileName, "📥"), field("File Size", fileSize, "•"), field("File Type", fileType, "•")]);
  },
  MEDIAFIRE(pushname, data, fileSize) {
    return mediaTemplate("📥 MEDIAFIRE DOWNLOAD", pushname, [field("File Name", data?.title, "📥"), field("File Size", fileSize, "•")]);
  },
  APK(pushname, data, correctsize) {
    const app = data?.datalist?.list?.[0] || {};
    return mediaTemplate("📥 APK DOWNLOAD", pushname, [field("Name", app.name, "•"), field("Size", `${clean(correctsize)} MB`, "•"), field("Package", app.package, "•"), field("Last Update", app.updated, "📅"), field("Developer", app.developer?.name, "👤")]);
  },
  SPOTIFY(pushname, item) {
    return mediaTemplate("📥 SPOTIFY DOWNLOAD", pushname, [field("Title", item?.trackName, "🎵"), field("Artist", item?.artistName, "👤"), field("Album", item?.albumName, "•"), field("Duration", item?.duration, "⏱"), field("URL", item?.externalUrl, "🔎")]);
  },

  BOT_REPLY(messageText, title = "BOT RESPONSE", config) {
    const text = cleanBlock(messageText, i18n(config).done);
    if (isStyled(text)) return text;
    const resolvedTitle = classifyTitle(text, title, config);
    const lower = text.toLowerCase();
    const needsInput = ["please provide", "please specify", "missing", "invalid format", "enter ", "reply to", "required"].some(key => lower.includes(key));
    const hasUsageHint = /^\s*(usage|example)\s*:/i.test(text) && /please|enter|reply|required|invalid|missing/.test(lower);
    if (resolvedTitle === i18n(config).error || needsInput || hasUsageHint) {
      const example = needsInput || hasUsageHint ? commandExample(text, config) : null;
      return errorMessage(text.replace(/^❌\s*/, ""), example, config);
    }
    if (resolvedTitle === i18n(config).success) return successMessage(text.replace(/^✅\s*/, ""), config);
    if (resolvedTitle === i18n(config).processing) return processingMessage(text.replace(/^⏳\s*/, ""), config);
    return message(resolvedTitle, formatPlainBody(text));
  },

  PING(ping, config) {
    const lang = i18n(config);
    return message(lang.speedTitle, [lang.speedMessage], [section([field(lang.responseTime, `${clean(ping)} ms`, "⚡"), field(lang.status, lang.statusOnline, "✅")])]);
  },
  OWNERINFO(pushname, config) {
    const lang = i18n(config);
    return message(lang.ownerTitle, [`👋 ${lang.hello} ${clean(pushname, "there")}`], [section([field("Name", config?.OWNER_NAME || config?.OWNERNAME || "Owner", "👤"), field("WhatsApp", `+${clean(config?.OWNER_NUMBER, "94717775628")}`, "👤"), field("YouTube", "https://www.youtube.com/@Mr-RaShMikA-ME", "📢")])]);
  },
  SYSTEM_STATUS(config, pushname, runtimeText, hostName) {
    const lang = i18n(config);
    return message(lang.systemTitle, [`👋 ${lang.hello} ${clean(pushname, "there")}`, "✅ Everything looks good."], [section([field(lang.uptime, runtimeText, "⏳"), field(lang.memory, memoryUsage(), "⚙️"), field("Host", hostName, "•"), field(lang.owner, config?.OWNER_NAME, "👤"), field(lang.currentLanguage, languageName(config), "⚙️")])]);
  },
  MENU_HEADER(pushname, config, totalCategories, totalCommands) {
    const lang = i18n(config);
    return message(botName(config), menuIntro(pushname, config), [
      section([field(lang.commands, totalCommands), field(lang.categories, totalCategories)]),
      "• ✵ *ꜱᴇʟᴇᴄᴛ ᴀ ᴄᴏᴍᴍᴀɴᴅ ʟɪꜱᴛ* ✵",
      section(["🎵 Music", "🎬 Movies", "🤖 AI Tools", "📥 Downloaders", "👥 Group Tools", "📢 Group Status", "📺 Channel Songs", "👑 Owner Tools"]),
      `• ${lang.choose}`,
    ]);
  },
  SETTINGS_HEADER(pushname, config, totalSettings) {
    const lang = i18n(config);
    return message(lang.settingsTitle, [`👋 ${lang.hello} ${clean(pushname, "there")}`, `⚙️ ${lang.settingsHelp}`], [section([field(lang.mode, clean(config?.MODE, "public").toUpperCase(), "⚙️"), field("Total Settings", totalSettings, "•"), field(lang.prefix, config?.PREFIX || ".", "•"), field(lang.currentLanguage, languageName(config), "⚙️")])]);
  },
  LANGUAGE_CHANGED(config) { return successMessage(`${i18n(config).languageMessage}\n${field(i18n(config).currentLanguage, languageName(config), "⚙️")}`, config); },
  SETTING_CHANGED(setting, enabled, config) { return successMessage(`${field("Setting", clean(setting).replace(/_/g, " "), "⚙️")}\n${field("Status", enabled ? "ON" : "OFF", enabled ? "✅" : "❌")}`, config); },
  BOOLEAN_USAGE(setting, config) { return errorMessage(i18n(config).settingUsage, `${clean(setting).replace(/_/g, " ")} on`, config); },
  SEARCH_HEADER(pushname, config) { return searchHeader(pushname, config); },
  DOWNLOAD_CAPTION(label, config) { return message(i18n(config).download, [`📥 Title : ${clean(label)}`, "⏳ Sending media..."]); },
  DOWNLOAD_INFO(data, oce = "") { return mediaTemplate("📥 DOWNLOAD READY", null, [field("Title", mark(data?.title, oce), "🎵"), field("Duration", mark(data?.timestamp || data?.duration, oce), "⏱"), field("Link", mark(data?.url, oce), "🔎"), "⏳ Sending media..."]); },
  FACEBOOK_INFO(result, pushname, q) { return mediaTemplate("📥 FACEBOOK DOWNLOAD", pushname, [field("Title", result?.title, "🎬"), field("Source", q, "🔎")]); },
  TWITTER_INFO(videoTitle, videoDescription, pushname) { return mediaTemplate("📥 TWITTER DOWNLOAD", pushname, [field("Title", videoTitle, "🎬"), field("Description", limit(videoDescription, 220), "•")]); },
  DIRECT_DL_INFO(fileName, fileSize, fileType, pushname) { return this.DIRECT(pushname, fileName, fileSize, fileType); },
  MEDIAFIRE_INFO(title, fileSize, pushname) { return mediaTemplate("📥 MEDIAFIRE DOWNLOAD", pushname, [field("File Name", title, "📥"), field("File Size", fileSize, "•")]); },
  APK_INFO(app, correctsize, pushname) { return mediaTemplate("📥 APK DOWNLOAD", pushname, [field("Name", app?.name, "•"), field("Size", `${clean(correctsize)} MB`, "•"), field("Package", app?.package, "•"), field("Last Update", app?.updated, "📅"), field("Developer", app?.developer?.name, "👤")]); },
  SPOTIFY_INFO(item, pushname) { return this.SPOTIFY(pushname, item); },
  MOVIE_INFO(movieData, oce) { return this.SINHALASUB(movieData, oce); },
  PAIR_SUCCESS(pushname, code) { return successMessage(`${field("Status", "Paired successfully", "✅")}\n${field("Pairing Code", code, "⚙️")}`, null); },

  DEFAULT_IMG: EASY_EDIT.image,
  ALIVEVOICE: "./src/media/Auto_voice/alive.aac",
  MOVIETITLE: `*${CINEMA_BRAND}*`,

  ALIVEMSG(config, pushname, runtime) {
    const lang = i18n(config);
    return message(botName(config), menuIntro(pushname, config, runtime(process.uptime())), [
      section([field(lang.date, dateColombo(), "📅"), field(lang.time, timeColombo(), "⏳"), field(lang.mode, config?.MODE, "⚙️"), field(lang.status, lang.statusOnline, "✅")]),
    ]);
  },
  GROUP(groupName, config, oce) { return section([field("Shared In", mark(groupName, oce), "👥"), field("Admin", mark(config?.MNAME, oce), "👤")]); },
  SINHALASUB(movieData, oce) {
    const metadata = movieData?.metadata || {};
    return movieTemplate("Movie Information", [field("Title", mark(movieData?.title, oce), "🎬"), field("Tagline", mark(metadata.tagline, oce), "•"), field("IMDb", mark(metadata.imdbRating, oce), "•"), field("Year", mark(metadata.year, oce), "📅"), field("Country", mark(metadata.country, oce), "•"), field("Genres", mark((metadata.genres || []).join(", "), oce), "•"), field("Duration", mark(metadata.duration, oce), "⏱"), field("Language", mark(metadata.language, oce), "•"), field("Subtitle By", mark(metadata.subtitleAuthor, oce), "👤"), field("Subtitle Site", mark(metadata.subtitleSite, oce), "🔎")], "Description", movieData?.description, oce);
  },
  CINESUBZ(title, metadata, rating, tagline, genres, quality, description, oce) {
    return movieTemplate("Movie Information", [field("Title", mark(title, oce), "🎬"), field("Tagline", mark(tagline, oce), "•"), field("IMDb", mark(typeof rating === "object" ? rating?.value : rating, oce), "•"), field("Year", mark(metadata?.year, oce), "📅"), field("Country", mark(metadata?.country, oce), "•"), field("Genres", mark(genres, oce), "•"), field("Duration", mark(metadata?.runtime || metadata?.duration, oce), "⏱"), field("Language", mark(metadata?.language || "English", oce), "•"), field("Subtitle By", mark(metadata?.subtitleBy, oce), "👤"), field("Quality", mark(quality, oce), "📦")], "Description", description, oce);
  },
  CINETVSHOW(episodeInfo, quality, oce) {
    return movieTemplate("Episode Information", [field("Series", mark(episodeInfo?.series, oce), "🎬"), field("Episode", mark(episodeInfo?.seasonEpisode, oce), "•"), field("Title", mark(episodeInfo?.episodeTitle, oce), "🎬"), field("Date", mark(episodeInfo?.date, oce), "📅"), field("Rating", mark(`${clean(episodeInfo?.rating?.value)}/10`, oce), "•"), field("Quality", mark(quality || "480p", oce), "📦")], "Episode Info", episodeInfo?.title, oce);
  },
  CINETVSHOWALLDL(seriesTitle, rating, metadata, genres, movieData, oce) {
    return movieTemplate("Series Information", [field("Series", mark(seriesTitle, oce), "🎬"), field("IMDb", mark(rating, oce), "•"), field("Year", mark(metadata?.year, oce), "📅"), field("Genres", mark(genres, oce), "•"), field("Seasons", mark(movieData?.seasons?.length, oce), "•"), field("Language", mark(metadata?.language || "English", oce), "•")], "Series Description", movieData?.description, oce);
  },
  SONG(data, pushname, oce) { return mediaTemplate("📥 DOWNLOAD READY", pushname, [field("Title", mark(data?.title, oce), "🎵"), field("Duration", mark(data?.timestamp, oce), "⏱"), field("Views", mark(data?.views, oce), "•"), field("Uploaded", mark(data?.ago, oce), "📅"), field("Link", mark(data?.url, oce), "🔎"), "⏳ Sending media..."]); },
  SONG_DETAILS(data, pushname, oce) { return this.SONG(data, pushname, oce); },
  YTMP3(data) { return mediaTemplate("📥 DOWNLOAD READY", null, [field("Title", data?.title, "🎵"), field("Duration", data?.timestamp, "⏱"), field("Uploaded", data?.ago, "📅"), field("Link", data?.url, "🔎"), "⏳ Sending media..."]); },
  VIDEO(data, pushname, oce) { return mediaTemplate("📥 DOWNLOAD READY", pushname, [field("Title", mark(data?.title, oce), "🎬"), field("Duration", mark(data?.timestamp, oce), "⏱"), field("Views", mark(data?.views, oce), "•"), field("Uploaded", mark(data?.ago, oce), "📅"), field("Link", mark(data?.url, oce), "🔎"), "⏳ Sending media..."]); },
  VIDEODL_DETAILS(data, pushname, oce) { return this.VIDEO(data, pushname, oce); },
  YTMP4(data) { return mediaTemplate("📥 DOWNLOAD READY", null, [field("Title", data?.title, "🎬"), field("Duration", data?.timestamp, "⏱"), field("Uploaded", data?.ago, "📅"), field("Link", data?.url, "🔎"), "⏳ Sending media..."]); },

  GDRIVE_INFO(fileName, fileSize, pushname) {
    return mediaTemplate("📥 GOOGLE DRIVE DOWNLOAD", pushname, [field("File Name", fileName, "📥"), field("File Size", fileSize, "•"), "⏳ Sending media..."]);
  },
  MOVIE_HEADER(pushname) {
    return message("🎬 MOVIE DOWNLOAD", [`👋 ${i18n().hello} ${clean(pushname, "there")}`, "💬 Select download quality"]);
  },
  MOVIE_DETAILS(title, tagline, rating, metadata, genres, oce = "") {
    return movieTemplate("Movie Details", [field("Title", mark(title, oce), "🎬"), field("Tagline", mark(tagline, oce), "•"), field("IMDb", mark(rating?.value || rating, oce), "•"), field("Year", mark(metadata?.year, oce), "📅"), field("Country", mark(metadata?.country, oce), "•"), field("Genres", mark(Array.isArray(genres) ? genres.join(", ") : genres, oce), "•"), field("Duration", mark(metadata?.runtime || metadata?.duration, oce), "⏱"), field("Language", mark(metadata?.language, oce), "•"), field("Subtitle By", mark(metadata?.subtitleBy, oce), "👤")], "Status", "Available download links are ready.", oce);
  },
  TVSHOW_INFO(showData, oce = "") {
    const info = showData?.showInfo || {};
    const title = clean(info.title, "N/A").replace("Sinhala Subtitles | සිංහල උපසිරසි සමඟ", "").trim();
    return movieTemplate("TV Show Information", [field("Title", mark(title, oce), "🎬"), field("Rating", mark(info.rating?.value || "N/A", oce), "•"), field("Views", mark(info.views, oce), "•"), field("Genres", mark((info.genres || []).join(", "), oce), "•"), field("Country", mark(info.country, oce), "•"), field("Year", mark(info.year, oce), "📅"), field("Networks", mark((info.networks || []).join(", "), oce), "📢"), field("Seasons", mark(info.seasons || 1, oce), "•"), field("Episodes", mark(info.episodes, oce), "•")], "Description", info.description, oce);
  },
  TV_SERIES_INFO(title, rating, year, genres, seasons, metadata, oce = "") {
    const totalEpisodes = Array.isArray(seasons) ? seasons.reduce((total, season) => total + (season.episodes?.length || 0), 0) : 0;
    return movieTemplate("Series Information", [field("Title", mark(title, oce), "🎬"), field("IMDb", mark(rating, oce), "•"), field("Year", mark(year, oce), "📅"), field("Genres", mark(Array.isArray(genres) ? genres.join(", ") : genres, oce), "•"), field("Seasons", mark(seasons?.length, oce), "•"), field("Total Episodes", mark(totalEpisodes, oce), "•")], "Series Info", metadata?.seriesInfo, oce);
  },
  SEASON_INFO(title, seasonTitle, episodeCount, oce = "") {
    return movieTemplate("Season Information", [field("Series", mark(title, oce), "🎬"), field("Season", mark(seasonTitle, oce), "•"), field("Episodes", mark(episodeCount, oce), "•")], "Status", "Available episodes are ready.", oce);
  },
  EPISODE_INFO(episodeInfo, oce = "") {
    return movieTemplate("Episode Information", [field("Series", mark(episodeInfo?.series, oce), "🎬"), field("Episode", mark(episodeInfo?.seasonEpisode, oce), "•"), field("Title", mark(episodeInfo?.episodeTitle, oce), "🎬"), field("Date", mark(episodeInfo?.date, oce), "📅"), field("Rating", mark(`${clean(episodeInfo?.rating?.value)}/10`, oce), "•")], "Status", "Available download links are ready.", oce);
  },
  SEASON_ALL_INFO(seriesTitle, rating, metadata, genres, season, episodeCount, oce = "") {
    return movieTemplate("Season Download", [field("Series", mark(seriesTitle, oce), "🎬"), field("Season", mark(season?.seasonTitle, oce), "•"), field("IMDb", mark(rating, oce), "•"), field("Year", mark(metadata?.year, oce), "📅"), field("Genres", mark(genres, oce), "•"), field("Episodes", mark(episodeCount, oce), "•"), field("Language", mark(metadata?.language || "English", oce), "•")], "Download All Episodes", `Choose a quality and download type for ${season?.seasonTitle || "this season"}.`, oce);
  },
  DINCA_DOWNLOAD(title, movieData, quality, description, oce = "") {
    return movieTemplate("Download Ready", [field("Title", mark(title, oce), "🎬"), field("Quality", mark(quality, oce), "📦"), field("Year", mark(movieData?.year || movieData?.metadata?.year, oce), "📅"), field("Language", mark(movieData?.language || movieData?.metadata?.language, oce), "•")], "Description", description || movieData?.description, oce);
  },

  BAISCOPE_SEARCH_PROMPT: (config) => errorMessage(t(config, "enterMovieName", "Enter a movie name."), commandText("baiscope", config, "Avatar"), config),
  BAISCOPE_NO_RESULTS: (config) => errorMessage(t(config, "noResults", "No results found."), commandText("baiscope", config, "Avatar"), config),
  BAISCOPE_SEARCH_FAILED: (config) => errorMessage(t(config, "searchFailed", "Search failed. Please try again later."), null, config),
  BAISCOPE_INFO_FAILED: (config) => errorMessage(t(config, "fetchFailed", "Failed to fetch data."), null, config),
  BAISCOPE_INFO_NO_DOWNLOADS: (config) => errorMessage(t(config, "noDownloadLinks", "No download links available."), null, config),
  BAISCOPE_DOWNLOAD_FAILED: (config) => errorMessage(t(config, "downloadFailed", "Download failed."), null, config),
  BAISCOPE_DOWNLOAD_SUCCESS: (config) => successMessage(t(config, "sentSuccessfully", "Sent successfully!"), config),
  BAISCOPE_SEARCH_RESULTS(q, config) { const lang = i18n(config); return message(lang.search, [`🔎 Query : ${clean(q)}`, `💬 ${lang.replyNumber}`], [], false); },
  BAISCOPE_DIRECT_CAPTION(title, quality, size, config) { const lang = i18n(config); return message(lang.download, [field("Title", title, "🎬"), field("Quality", quality, "📦"), field("Size", size, "•"), "⏳ Sending media..."]); },
  COMMAND_EXAMPLE: commandExample,
  text: t,
};

// Export i18n for use in cmdhandler
api.setActiveConfig = setActiveConfig;

// IMG follows config (BOT_IMAGE / IMG / LOGO) and updates instantly when the
// config is changed with a command; falls back to the default image.
Object.defineProperty(api, "IMG", {
  get() {
    return clean(resolveBrandValue(activeConfig, ["BOT_IMAGE", "IMG", "LOGO"], ""), api.DEFAULT_IMG);
  },
});

api.i18n = i18n;
api.dictionary = dictionary;
api.normalizeLang = normalizeLang;
api.languageName = languageName;
api.supportedLanguages = supportedLanguages;

module.exports = api;
