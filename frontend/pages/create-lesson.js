import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { useNavigation } from './_app';

export default function CreateLesson() {
  const { isDark, setIsDark } = useNavigation();
  const [prompt, setPrompt] = useState('Intro to Python for beginners');
  const [language, setLanguage] = useState('en');
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState(null);

  const generate = async () => {
    setGenerating(true);
    try {
      const res = await fetch('/api/generateLesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, language })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate');
      setResult({
        lessonTitle: data.lessonTitle,
        lessonContent: data.lessonContent,
        quiz: (data.quiz || []).map(q => ({ q: q.question, a: q.answers, correct: q.correctIndex }))
      });
    } catch (e) {
      alert(e.message);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      <Head>
        <title>Create Lesson (AI) - ScholarForge</title>
      </Head>
      <Header onToggleTheme={() => setIsDark(!isDark)} isDark={isDark} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Create a Lesson with AI</h1>
          <div className="space-y-3">
            <input value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100" placeholder="Describe the lesson you want..." />
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              <option value="en">English</option>
              <option value="tw">Twi</option>
              <option value="yo">Yoruba</option>
              <option value="sw">Swahili</option>
              <option value="fr">French</option>
            </select>
            <button onClick={generate} disabled={generating} className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50">{generating ? 'Generating…' : 'Generate'}</button>
          </div>
        </motion.div>

        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{result.lessonTitle}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{result.lessonContent}</p>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Quiz</h3>
            <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300">
              {result.quiz.map((q, i) => (
                <li key={i}>{q.q}</li>
              ))}
            </ul>
            <div className="mt-4 text-xs text-gray-500">Save & publish (coming soon)</div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
