// Lesson Management Utility for ScholarForge
export class LessonManager {
  constructor() {
    this.storageKey = 'sf_lessons';
    this.quizStorageKey = 'sf_quizzes';
    this.userLessonsKey = 'sf_user_lessons';
  }

  createLesson(lessonData) {
    const lesson = {
      id: this.generateLessonId(),
      ...lessonData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      published: true,
      views: 0,
      likes: 0,
      shares: 0,
      completions: 0,
      averageScore: 0,
      totalAttempts: 0
    };

    this.saveLesson(lesson);
    this.addUserLesson(lessonData.creatorWallet, lesson.id);
    return lesson;
  }

  generateLessonId() {
    return `lesson_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  saveLesson(lesson) {
    try {
      const lessons = this.getAllLessons();
      lessons[lesson.id] = lesson;
      localStorage.setItem(this.storageKey, JSON.stringify(lessons));
    } catch (error) {
      console.error('Error saving lesson:', error);
    }
  }

  getAllLessons() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error getting all lessons:', error);
      return {};
    }
  }

  getLesson(lessonId) {
    const lessons = this.getAllLessons();
    return lessons[lessonId] || null;
  }

  getLessonsByLanguage(language) {
    const lessons = this.getAllLessons();
    return Object.values(lessons).filter(lesson => 
      lesson.language === language && lesson.published
    );
  }

  getLessonsByTopic(topic) {
    const lessons = this.getAllLessons();
    return Object.values(lessons).filter(lesson => 
      lesson.topic === topic && lesson.published
    );
  }

  updateLesson(lessonId, updates) {
    const lesson = this.getLesson(lessonId);
    if (!lesson) return null;

    const updatedLesson = {
      ...lesson,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.saveLesson(updatedLesson);
    return updatedLesson;
  }

  addUserLesson(walletAddress, lessonId) {
    try {
      const userLessons = this.getUserLessons(walletAddress);
      if (!userLessons.includes(lessonId)) {
        userLessons.push(lessonId);
        localStorage.setItem(`${this.userLessonsKey}_${walletAddress}`, JSON.stringify(userLessons));
      }
    } catch (error) {
      console.error('Error adding user lesson:', error);
    }
  }

  getUserLessons(walletAddress) {
    try {
      const stored = localStorage.getItem(`${this.userLessonsKey}_${walletAddress}`);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error getting user lessons:', error);
      return [];
    }
  }

  searchLessons(query, filters = {}) {
    const lessons = this.getAllLessons();
    let results = Object.values(lessons).filter(lesson => lesson.published);

    if (filters.language) {
      results = results.filter(lesson => lesson.language === filters.language);
    }
    if (filters.topic) {
      results = results.filter(lesson => lesson.topic === filters.topic);
    }

    if (query) {
      const searchTerm = query.toLowerCase();
      results = results.filter(lesson => 
        lesson.title.toLowerCase().includes(searchTerm) ||
        lesson.content.toLowerCase().includes(searchTerm)
      );
    }

    return results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  createQuizFromLesson(lessonId, quizData) {
    const lesson = this.getLesson(lessonId);
    if (!lesson) return null;

    const quiz = {
      id: this.generateQuizId(),
      lessonId,
      title: quizData.title || `Quiz: ${lesson.title}`,
      description: quizData.description || `Test your knowledge of ${lesson.title}`,
      questions: quizData.questions || [],
      language: lesson.language,
      topic: lesson.topic,
      creatorWallet: lesson.creatorWallet,
      timeLimit: quizData.timeLimit || 300,
      passingScore: quizData.passingScore || 70,
      maxAttempts: quizData.maxAttempts || 3,
      isPublic: quizData.isPublic !== false,
      shareableLink: this.generateShareableLink(lessonId),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      attempts: 0,
      averageScore: 0
    };

    this.saveQuiz(quiz);
    return quiz;
  }

  generateQuizId() {
    return `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  generateShareableLink(lessonId) {
    return `${window.location.origin}/quiz/${lessonId}`;
  }

  saveQuiz(quiz) {
    try {
      const quizzes = this.getAllQuizzes();
      quizzes[quiz.id] = quiz;
      localStorage.setItem(this.quizStorageKey, JSON.stringify(quizzes));
    } catch (error) {
      console.error('Error saving quiz:', error);
    }
  }

  getAllQuizzes() {
    try {
      const stored = localStorage.getItem(this.quizStorageKey);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error getting all quizzes:', error);
      return {};
    }
  }

  getQuiz(quizId) {
    const quizzes = this.getAllQuizzes();
    return quizzes[quizId] || null;
  }

  getQuizByLink(link) {
    const quizzes = this.getAllQuizzes();
    return Object.values(quizzes).find(quiz => quiz.shareableLink === link);
  }

  recordQuizAttempt(quizId, walletAddress, score, timeTaken) {
    const quiz = this.getQuiz(quizId);
    if (!quiz) return false;

    const attempt = {
      id: `attempt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      quizId,
      walletAddress,
      score,
      timeTaken,
      timestamp: new Date().toISOString(),
      passed: score >= quiz.passingScore
    };

    const attempts = quiz.attempts + 1;
    const totalScore = (quiz.averageScore * (attempts - 1)) + score;
    const newAverageScore = totalScore / attempts;

    this.updateQuiz(quizId, {
      attempts,
      averageScore: Math.round(newAverageScore * 100) / 100
    });

    this.saveQuizAttempt(attempt);
    return attempt;
  }

  saveQuizAttempt(attempt) {
    try {
      const attemptsKey = `sf_quiz_attempts_${attempt.quizId}`;
      const attempts = JSON.parse(localStorage.getItem(attemptsKey) || '[]');
      attempts.push(attempt);
      localStorage.setItem(attemptsKey, JSON.stringify(attempts));
    } catch (error) {
      console.error('Error saving quiz attempt:', error);
    }
  }

  getPopularLessons(limit = 10) {
    const lessons = this.getAllLessons();
    return Object.values(lessons)
      .filter(lesson => lesson.published)
      .sort((a, b) => (b.views + b.likes) - (a.views + a.likes))
      .slice(0, limit);
  }

  getRecentLessons(limit = 10) {
    const lessons = this.getAllLessons();
    return Object.values(lessons)
      .filter(lesson => lesson.published)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);
  }
}

export const lessonManager = new LessonManager();
