"use client";

import { useState } from "react";

type Quiz = {
  id: number;
  question: string;
  answer: string;
  acceptableAnswers?: string[];
  hint: string;
};

const quizzes: Quiz[] = [
  {
    id: 1,
    question:
      "青色が大好きな女の子の目の前に、茶色のクマとピンクのクマのぬいぐるみがあります。女の子はどっちを取りましたか？",
    answer: "取らない",
    acceptableAnswers: ["取らない", "とらない", "選ばない", "どちらも取らない", "選ばなかった", "取りませんでした", "取らなかった"],
    hint: "女の子は『青色』のクマにしか目がありません",
  },
  {
    id: 2,
    question: "『た』を左折、『は』を直進、『な』の下を直進",
    answer: "ちはや",
    acceptableAnswers: ["ちはや", "チハヤ", "智駿"],
    hint: "スマホのキーボードを見るといいかもしれない。",
  },
  {
    id: 3,
    question: "A = 1, B = 2, D = 4, H = 8, AH = 9 では LOVE = ?",
    answer: "54",
    acceptableAnswers: ["54"],
    hint: "パターンを見つけたら勝ち",
  },
  {
    id: 4,
    question:
      "①「結果」をひらがなで書いたとき、最初の文字\n②小さい「つ」をひらがなで書く\n③「子供」をひらがなで書いたとき、最初の文字\n④ひらがなの最後の一文字\n⑤「信号」をひらがなで書いたとき、最初の文字\n⑥一日の終わりの時間帯をひらがなで書く\n⑦「海」をひらがなで書いたとき、最初の文字\n\nすべての文字を順番に並べると、ある言葉になる。それは何か？",
    answer: "結婚しよう",
    acceptableAnswers: ["結婚しよう", "けっこんしよう", "ケッコンシヨウ", "けつこんしよう", "けっこんしよう"],
    hint: "",
  },
];

export default function Home() {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [isFinished, setIsFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showFlowers, setShowFlowers] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const currentQuiz = quizzes[currentQuizIndex];
  
  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[ぁ-ゝ]/g, (char) => {
        const map: { [key: string]: string } = {
          ぁ: "あ", ぃ: "い", ぅ: "う", ぇ: "え", ぉ: "お",
          ゃ: "や", ゅ: "ゆ", ょ: "よ", ゎ: "わ", ん: "ん",
          ゝ: "ゝ"
        };
        return map[char] || char;
      });
  };

  const isAnswerMatching = (userAnswer: string, quiz: Quiz): boolean => {
    const normalized = normalizeText(userAnswer);
    const acceptableAnswers = quiz.acceptableAnswers || [quiz.answer];
    
    return acceptableAnswers.some((ans) => normalizeText(ans) === normalized);
  };

  const isAnswerCorrect = isAnswerMatching(currentAnswer, currentQuiz);

  const handleAnswerChange = (value: string) => {
    setCurrentAnswer(value);
  };

  const handleNext = () => {
    if (!showResult) {
      // First click: show result
      setShowResult(true);
      return;
    }

    // Second click: move to next question
    setAnswers((prev) => ({
      ...prev,
      [currentQuiz.id]: currentAnswer,
    }));

    if (currentQuizIndex === quizzes.length - 1 && isAnswerCorrect) {
      setShowFlowers(true);
      setTimeout(() => {
        setIsFinished(true);
      }, 1500);
    } else if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setCurrentAnswer("");
      setShowHint(false);
      setShowResult(false);
    } else {
      setIsFinished(true);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    quizzes.forEach((quiz) => {
      if (isAnswerMatching(answers[quiz.id] || "", quiz)) {
        correctCount++;
      }
    });
    return correctCount;
  };

  const handleReset = () => {
    setCurrentQuizIndex(0);
    setCurrentAnswer("");
    setAnswers({});
    setIsFinished(false);
    setShowHint(false);
    setShowFlowers(false);
    setShowResult(false);
    setShowLetter(false);
  };

  const score = calculateScore();
  const totalQuizzes = quizzes.length;
  const percentage = Math.round((score / totalQuizzes) * 100);

  return (
    <div className="min-h-screen bg-white py-8 px-4 relative overflow-hidden">
      {/* Flower Animation for Last Question */}
      {showFlowers && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(150)].map((_, i) => {
            const swingDirection = Math.random() > 0.5 ? 1 : -1;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: `${Math.random() * 100}%`,
                  top: "-30px",
                  animation: `fall${swingDirection > 0 ? 'Left' : 'Right'} ${1 + Math.random() * 0.8}s linear forwards`,
                  animationDelay: `${i * 0.02}s`,
                  fontSize: `${1.5 + Math.random() * 1.5}em`,
                  opacity: 0.9,
                }}
              >
                🌹
              </div>
            );
          })}
          <style>{`
            @keyframes fallLeft {
              0% {
                transform: translateY(0) rotate(0deg) translateX(0);
                opacity: 1;
              }
              50% {
                transform: translateY(50vh) rotate(180deg) translateX(80px);
              }
              100% {
                transform: translateY(100vh) rotate(720deg) translateX(0);
                opacity: 0;
              }
            }
            @keyframes fallRight {
              0% {
                transform: translateY(0) rotate(0deg) translateX(0);
                opacity: 1;
              }
              50% {
                transform: translateY(50vh) rotate(180deg) translateX(-80px);
              }
              100% {
                transform: translateY(100vh) rotate(720deg) translateX(0);
                opacity: 0;
              }
            }
          `}</style>
        </div>
      )}

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-2">
            かえでなら全部正解できるよね。
          </h1>
        </div>

        {/* Progress */}
        {!isFinished && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-600">
                問題 {currentQuizIndex + 1}/{totalQuizzes}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(((currentQuizIndex + 1) / totalQuizzes) * 100)}%
              </span>
            </div>
            <div className="w-full h-2 bg-pink-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-pink-400 transition-all duration-300"
                style={{
                  width: `${((currentQuizIndex + 1) / totalQuizzes) * 100}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Result Screen */}
        {isFinished ? (
          <div className="bg-pink-50 rounded-xl px-8 py-12 text-center border-2 border-pink-200">
            <div className="mb-6">
              <p className="text-gray-600 text-sm mb-2">スコア</p>
              <p className="text-6xl font-bold text-pink-600 mb-2">{score}/{totalQuizzes}</p>
              <p className="text-3xl font-semibold text-pink-500">{percentage}%</p>
            </div>

            {percentage === 100 && (
              <p className="text-lg text-pink-600 mb-8">
                完ぺきだよ。
                顔とお金以外何でもする。
              </p>
            )}
            {percentage >= 70 && percentage < 100 && (
              <p className="text-lg text-pink-600 mb-8">
                まぁまぁやるやん。
              </p>
            )}
            {percentage >= 60 && percentage < 70 && (
              <p className="text-lg text-pink-600 mb-8">
                かえでには難しかったかｗｗｗ
              </p>
            )}
            {percentage < 60 && (
              <p className="text-lg text-pink-600 mb-8">
                アホ乙ｗｗｗｗｗｗｗｗ
              </p>
            )}

            <button
              onClick={handleReset}
              className="px-8 py-3 bg-pink-400 hover:bg-pink-500 text-white font-bold rounded-lg transition-colors"
            >
              もう一度挑戦する
            </button>
          </div>
        ) : (
          <>
            {/* Question Card */}
            <div className="bg-pink-50 rounded-xl px-8 py-8 border-2 border-pink-200 mb-8">
              <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-8 whitespace-pre-wrap leading-relaxed">
                {currentQuiz.question}
              </h2>

              {/* Input Field */}
              <input
                type="text"
                value={currentAnswer}
                onChange={(e) => handleAnswerChange(e.target.value)}
                placeholder="答えを入力..."
                className="w-full px-4 py-3 border-2 border-pink-300 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-colors mb-6 text-gray-800 placeholder-gray-400"
              />

              {/* Hint Button */}
              <button
                onClick={() => setShowHint(!showHint)}
                className={`text-sm ${
                  currentQuiz.hint
                    ? "text-pink-500 hover:text-pink-600 underline mb-4 block"
                    : "hidden"
                }`}
              >
                💡 ヒント
              </button>

              {/* Hint Display */}
              {showHint && currentQuiz.hint && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 px-4 py-3 rounded mb-6">
                  <p className="text-sm text-yellow-800">
                    ヒント：{currentQuiz.hint}
                  </p>
                </div>
              )}

              {/* Result Display */}
              {showResult && (
                <div
                  className={`px-4 py-4 rounded-lg mb-6 text-center ${
                    isAnswerCorrect
                      ? "bg-green-100 border-2 border-green-500"
                      : "bg-red-100 border-2 border-red-500"
                  }`}
                >
                  <p
                    className={`text-lg font-bold mb-2 ${
                      isAnswerCorrect
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {isAnswerCorrect ? "✅ 正解！" : "❌ 不正解"}
                  </p>
                  <p className="text-sm text-gray-700">
                    答え：<span className="font-bold">{currentQuiz.answer}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Next Button (Arrow) */}
            <div className="flex justify-center">
              <button
                onClick={handleNext}
                disabled={!currentAnswer}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all ${
                  currentAnswer
                    ? "bg-pink-400 hover:bg-pink-500 text-white cursor-pointer shadow-lg hover:shadow-xl"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
                title={showResult ? (currentQuizIndex === quizzes.length - 1 ? "完了" : "次へ") : "結果を表示"}
              >
                {showResult ? "→" : "✓"}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Secret Letter Button */}
      <button
        onClick={() => setShowLetter(true)}
        className="fixed bottom-2 right-2 text-xs px-1 py-0.5 bg-pink-200 hover:bg-pink-300 text-pink-600 rounded opacity-30 hover:opacity-50 transition-opacity"
        title="テガミダヨ"
      >
        テガミダヨ
      </button>

      {/* Letter Modal */}
      {showLetter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 border-2 border-pink-300 relative">
            <button
              onClick={() => setShowLetter(false)}
              className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-pink-600 text-center mb-8">💌 君へ 💌</h2>

              <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                <p>かえでへ</p>

                <p>
                  三回目？の手紙だけどまた書きます。
                </p>

                <p>
                  僕はかえでのことがほんとに好きで、何を見てもかわいいと思うし、何話してても楽しくて一緒に居れて幸せです。
                </p>

                <p>
                  顔も好きだし、声も好きだし、性格も好きだし、話し方とか笑い方とかも全部好き
                </p>

                <p>
                  かえでがイライラした話を聞くと僕も正直イライラします。僕的にはかえでにはずっと笑っててほしいし、一緒にわらいたい。だからこそ僕もイライラするんだろうなって思う。
                  イライラしたときはどんな些細なことでもいいから話してほしいし、僕がかえでのイライラを消化できる気もしないけどなんとか頑張ってかえでを笑顔にさせたいなって思ってる。
                </p>

                <p>
                  なんか、かえでのためって思うとほんとになんでもやれる気がする。大げさかもしれないけど、それぐらいかえでのことが好き。
                </p>

                <p>
                  だから、これからも仲良くカップルやっていきたいなって思ってる。もしカップルじゃなくて夫婦になったら僕はもっと幸せだろうな。っていうか、なりたい。
                </p>

                <p>
                  かえでが僕のことをどう思ってるのかはわからないけど、僕はかえでのことがほんとに好きだし、これからもずっと好きでいたいなって思ってる。
                </p>

                <p>
                  めっちゃ長くなったけど言いたいことはほんとにかえでが好きってこと。これからもよろしくね。
                </p>


                <p className="text-right mt-8 text-2xl">ちはやより</p>
              </div>
            </div>

            <button
              onClick={() => setShowLetter(false)}
              className="mt-8 w-full px-6 py-3 bg-pink-400 hover:bg-pink-500 text-white font-bold rounded-lg transition-colors"
            >
              もう一度挑戦する
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
