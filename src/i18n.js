const translations = {
  en: {
    title: 'Nutty Does Math!',
    subtitle: 'Help Nutty collect walnuts before winter!',
    play: 'Play!',
    level: 'Level',
    score: 'Score',
    walnuts: 'walnuts',
    checkAnswer: 'Check!',
    nextLevel: 'Next Level →',
    levelComplete: 'Level Complete! 🎉',
    levelCompleteMsg: "Nutty collected all the walnuts! Time for the next challenge!",
    victory: 'You Won! 🏆',
    victoryMsg: "Nutty has enough walnuts for the whole winter! You're a math superstar!",
    playAgain: 'Play Again',
    typeAnswer: 'Your answer...',
    correct: ['Amazing! 🎉', 'Great job! ⭐', 'Fantastic! 🌟', 'Keep it up! 🏆', 'Brilliant! 💫', 'Super! 🎊', 'Wow! 🤩'],
    wrong: ['Try again! 💪', 'Almost there! 🤔', 'You can do it! 😊', 'Keep trying! 🌟'],
    levelNames: [
      'Easy Addition', 'Addition to 10', 'Addition to 20',
      'Easy Subtraction', 'Subtraction to 10', 'Subtraction to 20',
      'Mixed Practice', 'Times 2', 'Times 5', 'Times 10',
      'Multiplication', 'Math Master!',
    ],
    levelIntro: [
      'Add small numbers!', 'Add up to 10!', 'Add up to 20!',
      'Subtract small numbers!', 'Subtract to 10!', 'Subtract to 20!',
      'Mix of + and −!', 'Multiply by 2!', 'Multiply by 5!', 'Multiply by 10!',
      'Multiply anything!', 'Use everything you know!',
    ],
  },
  he: {
    title: 'אגוזי עושה חשבון!',
    subtitle: '!עזור לאגוזי לאסוף אגוזיים לפני החורף',
    play: '!בואו נשחק',
    level: 'שלב',
    score: 'ניקוד',
    walnuts: 'אגוזיים',
    checkAnswer: '!בדוק',
    nextLevel: '← שלב הבא',
    levelComplete: '!סיימת את השלב 🎉',
    levelCompleteMsg: '!אגוזי אסף את כל האגוזיים! הגיע הזמן לאתגר הבא',
    victory: '!ניצחת 🏆',
    victoryMsg: '!לאגוזי יש מספיק אגוזיים לכל החורף! אתה גאון במתמטיקה',
    playAgain: 'שחק שוב',
    typeAnswer: 'הקלד את התשובה...',
    correct: ['מדהים! 🎉', '!כל הכבוד ⭐', 'פנטסטי! 🌟', 'המשך כך! 🏆', 'מבריק! 💫', 'סופר! 🎊', 'וואו! 🤩'],
    wrong: ['!נסה שוב 💪', '!כמעט 🤔', '!אתה יכול 😊', '!תמשיך לנסות 🌟'],
    levelNames: [
      'חיבור קל', 'חיבור עד 10', 'חיבור עד 20',
      'חיסור קל', 'חיסור עד 10', 'חיסור עד 20',
      'תרגול מעורב', 'כפל ב־2', 'כפל ב־5', 'כפל ב־10',
      'כפל', '!אלוף החשבון',
    ],
    levelIntro: [
      '!חבר מספרים קטנים', '!חבר עד 10', '!חבר עד 20',
      '!חסר מספרים קטנים', '!חסר עד 10', '!חסר עד 20',
      '!תרגול של + ו−', '!כפול ב־2', '!כפול ב־5', '!כפול ב־10',
      '!כפול כל מספר', '!השתמש בכל מה שלמדת',
    ],
  },
};

export const t = (lang, key, index) => {
  const val = (translations[lang] ?? translations.en)[key];
  if (Array.isArray(val)) return index !== undefined ? val[index] : val[0];
  return val ?? translations.en[key] ?? key;
};

export const randomMsg = (lang, key) => {
  const msgs = (translations[lang] ?? translations.en)[key];
  return msgs[Math.floor(Math.random() * msgs.length)];
};
