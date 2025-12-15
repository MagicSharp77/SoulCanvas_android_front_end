// Mock data for word cards
export const wordCards = [
  {
    id: 1,
    word: "Ambition",
    phonetic: "/æmˈbɪʃ.ən/",
    translation: "雄心；抱负；志向",
    example: "Her ambition is to become a successful entrepreneur and make a positive impact on society.",
    imageUrl: "/static/word-images/ambition.png",
    audioUrl: "/static/audio/ambition.mp3",
    isAIGenerated: true
  },
  {
    id: 2,
    word: "Perseverance",
    phonetic: "/ˌpɜː.sɪˈvɪə.rəns/",
    translation: "毅力；坚持不懈",
    example: "Through perseverance and hard work, she achieved her dream of becoming a doctor.",
    imageUrl: "/static/word-images/perseverance.png",
    audioUrl: "/static/audio/perseverance.mp3",
    isAIGenerated: true
  },
  {
    id: 3,
    word: "Innovation",
    phonetic: "/ˌɪn.əˈveɪ.ʃən/",
    translation: "创新；革新",
    example: "Innovation is the key to staying competitive in today's fast-paced business world.",
    imageUrl: "/static/word-images/innovation.png",
    audioUrl: "/static/audio/innovation.mp3",
    isAIGenerated: true
  },
  {
    id: 4,
    word: "Resilience",
    phonetic: "/rɪˈzɪl.i.əns/",
    translation: "韧性；恢复力",
    example: "The team showed great resilience in overcoming the challenges they faced.",
    imageUrl: "/static/word-images/resilience.png",
    audioUrl: "/static/audio/resilience.mp3",
    isAIGenerated: true
  },
  {
    id: 5,
    word: "Empathy",
    phonetic: "/ˈem.pə.θi/",
    translation: "同理心；共鸣",
    example: "Empathy is essential for building strong relationships and understanding others.",
    imageUrl: "/static/word-images/empathy.png",
    audioUrl: "/static/audio/empathy.mp3",
    isAIGenerated: true
  }
];

// Get a random word card
export function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * wordCards.length);
  return wordCards[randomIndex];
}

// Get word by ID
export function getWordById(id) {
  return wordCards.find(word => word.id === id);
}
