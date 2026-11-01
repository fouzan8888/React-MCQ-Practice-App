import { useEffect, useMemo, useState } from 'react';
import { BookOpen, CheckCircle2, Clock3, RotateCcw, Trophy, ChevronRight, Home } from 'lucide-react';
import { questionSets } from './questions';

const STORE = 'quizforge-history-v1';

export default function App() {
  const [category, setCategory] = useState('Java');
  const [screen, setScreen] = useState('home');
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [seconds, setSeconds] = useState(0);
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORE) || '[]'); } catch { return []; }
  });

  const questions = questionSets[category];
  const current = questions[index];
  const selected = answers[index];
  const completed = Object.keys(answers).length;
  const score = useMemo(() => questions.reduce((sum, q, i) => sum + (answers[i] === q.answer ? 1 : 0), 0), [answers, questions]);

  useEffect(() => {
    if (screen !== 'quiz') return;
    const timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, [screen]);

  const start = (subject = category) => {
    setCategory(subject);
    setIndex(0);
    setAnswers({});
    setSeconds(0);
    setScreen('quiz');
  };

  const finish = () => {
    const result = { category, score, total: questions.length, seconds, date: new Date().toISOString() };
    const next = [result, ...history].slice(0, 10);
    setHistory(next);
    localStorage.setItem(STORE, JSON.stringify(next));
    setScreen('result');
  };

  const formatTime = n => `${String(Math.floor(n / 60)).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`;

  if (screen === 'home') return (
    <main className="shell">
      <header className="topbar"><div className="brand"><span className="brand-mark"><BookOpen size={19}/></span> QuizForge</div><span className="top-note">PRACTICE • LEARN • IMPROVE</span></header>
      <section className="hero"><div className="eyebrow">YOUR PERSONAL PRACTICE SPACE</div><h1>Build confidence,<br/><em>one question at a time.</em></h1><p>Choose a subject, test your knowledge, and review your progress.</p></section>
      <section className="section-head"><div><div className="eyebrow">PICK A SUBJECT</div><h2>Practice categories</h2></div><span className="muted">3 subjects · 5 questions each</span></section>
      <div className="subjects">{Object.keys(questionSets).map((name, i) => <button className={`subject ${category === name ? 'active' : ''}`} key={name} onClick={() => setCategory(name)}><span className="subject-number">0{i + 1}</span><strong>{name}</strong><span className="muted">5 practice questions</span><span className="subject-arrow"><ChevronRight size={18}/></span></button>)}</div>
      <div className="start-row"><div><strong>Ready when you are.</strong><p className="muted">Your latest results are saved on this device.</p></div><button className="primary" onClick={() => start()}>Start {category} quiz <ChevronRight size={17}/></button></div>
      {history.length > 0 && <section className="history"><div className="section-head"><div><div className="eyebrow">YOUR ACTIVITY</div><h2>Recent attempts</h2></div></div>{history.slice(0, 4).map((h, i) => <div className="history-row" key={i}><span>{h.category}</span><strong>{h.score}/{h.total}</strong><span className="muted">{new Date(h.date).toLocaleDateString()}</span></div>)}</section>}
      <footer>QuizForge · A simple space to keep learning.</footer>
    </main>
  );

  if (screen === 'quiz') return (
    <main className="shell quiz-shell">
      <header className="topbar"><button className="text-button" onClick={() => setScreen('home')}><Home size={16}/> Exit quiz</button><div className="brand">QuizForge</div><span className="timer"><Clock3 size={16}/> {formatTime(seconds)}</span></header>
      <div className="quiz-meta"><span className="pill">{category}</span><span className="muted">QUESTION {index + 1} OF {questions.length}</span></div>
      <div className="progress"><span style={{ width: `${((index + 1) / questions.length) * 100}%` }}/></div>
      <section className="question-card"><div className="eyebrow">THINK IT THROUGH</div><h1>{current.q}</h1><div className="options">{current.options.map((option, i) => <button key={option} className={`option ${selected === i ? 'chosen' : ''}`} onClick={() => setAnswers(a => ({ ...a, [index]: i }))}><span className="option-letter">{String.fromCharCode(65 + i)}</span>{option}{selected === i && <CheckCircle2 className="option-check" size={19}/>}</button>)}</div></section>
      <div className="quiz-footer"><span className="muted">{completed} of {questions.length} answered</span><div>{index > 0 && <button className="secondary" onClick={() => setIndex(i => i - 1)}>Previous</button>}{index < questions.length - 1 ? <button className="primary" disabled={selected === undefined} onClick={() => setIndex(i => i + 1)}>Next question <ChevronRight size={17}/></button> : <button className="primary" disabled={selected === undefined} onClick={finish}>Finish quiz <Trophy size={17}/></button>}</div></div>
    </main>
  );

  return (
    <main className="shell result-shell">
      <header className="topbar"><div className="brand">QuizForge</div><span className="pill">QUIZ COMPLETE</span></header>
      <section className="result-card"><div className="result-icon"><Trophy size={30}/></div><div className="eyebrow">YOUR {category.toUpperCase()} RESULT</div><h1>{score} <span>/ {questions.length}</span></h1><p>{score === questions.length ? 'Perfect score. Excellent work!' : score >= 3 ? 'Good effort. Keep building on what you know.' : 'Every attempt is progress. Review and try again.'}</p><div className="result-stats"><div><strong>{Math.round(score / questions.length * 100)}%</strong><span>Accuracy</span></div><div><strong>{formatTime(seconds)}</strong><span>Time taken</span></div><div><strong>{completed}</strong><span>Answered</span></div></div></section>
      <section className="review"><h2>Answer review</h2>{questions.map((q, i) => <article className="review-item" key={i}><div className="review-q"><span className={`review-status ${answers[i] === q.answer ? 'correct' : 'incorrect'}`}>{answers[i] === q.answer ? 'Correct' : 'Review'}</span><strong>{q.q}</strong></div><p>Your answer: {answers[i] === undefined ? 'Not answered' : q.options[answers[i]]}</p><p>Correct answer: <strong>{q.options[q.answer]}</strong></p><small>{q.explanation}</small></article>)}</section>
      <div className="result-actions"><button className="secondary" onClick={() => setScreen('home')}><Home size={16}/> Home</button><button className="primary" onClick={() => start(category)}><RotateCcw size={16}/> Try again</button></div>
      <footer>Results are stored locally in your browser.</footer>
    </main>
  );
}