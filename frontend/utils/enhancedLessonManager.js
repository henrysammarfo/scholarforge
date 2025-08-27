// Enhanced Lesson Manager for ScholarForge
// Integrates lessons with community feed and ensures immediate visibility

export class EnhancedLessonManager {
  constructor() {
    this.storageKey = 'sf_enhanced_lessons';
    this.quizStorageKey = 'sf_enhanced_quizzes';
    this.communityFeedKey = 'sf_community_feed';
    this.userLessonsKey = 'sf_user_lessons';
  }

  // Create lesson with immediate community integration
  createLesson(lessonData) {
    const lesson = {
      id: this.generateLessonId(),
      title: lessonData.title,
      content: lessonData.content,
      description: lessonData.description || lessonData.content.substring(0, 150) + '...',
      language: lessonData.language,
      topic: lessonData.topic,
      creatorWallet: lessonData.creatorWallet,
      creatorName: lessonData.creatorName || `Scholar_${lessonData.creatorWallet.slice(2, 8)}`,
      published: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      likes: 0,
      shares: 0,
      completions: 0,
      averageScore: 0,
      totalAttempts: 0,
      tags: lessonData.tags || [],
      difficulty: lessonData.difficulty || 'Beginner',
      estimatedDuration: lessonData.estimatedDuration || '10 minutes',
      quizId: null,
      lessonType: lessonData.lessonType || 'community', // 'personal' or 'community'
      isPublic: lessonData.isPublic !== false
    };

    this.saveLesson(lesson);
    
    // Only add to community feed if it's a community lesson
    if (lesson.isPublic) {
      this.addToCommunityFeed(lesson, 'lesson');
    }
    
    this.addUserLesson(lessonData.creatorWallet, lesson.id);
    
    return lesson;
  }

  // Create quiz from lesson with community integration
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
      creatorName: lesson.creatorName,
      timeLimit: quizData.timeLimit || 300,
      passingScore: quizData.passingScore || 70,
      maxAttempts: quizData.maxAttempts || 3,
      isPublic: quizData.isPublic !== false,
      shareableLink: this.generateShareableLink(quizData.id || 'temp'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      attempts: 0,
      averageScore: 0,
      xpReward: quizData.xpReward || 50
    };

    this.saveQuiz(quiz);
    this.addToCommunityFeed(quiz, 'quiz');
    
    // Update lesson with quiz reference
    this.updateLesson(lessonId, { quizId: quiz.id });
    
    return quiz;
  }

  // Add to community feed for immediate visibility
  addToCommunityFeed(item, type) {
    try {
      // Check if we're in browser environment
      if (typeof window === 'undefined' || !window.localStorage) {
        return;
      }
      
      const feed = this.getCommunityFeed();
      const feedItem = {
        id: item.id,
        type: type, // 'lesson' or 'quiz'
        title: item.title,
        description: item.description,
        creatorWallet: item.creatorWallet,
        creatorName: item.creatorName,
        language: item.language,
        topic: item.topic,
        createdAt: item.createdAt,
        views: item.views || 0,
        likes: item.likes || 0,
        shares: item.shares || 0,
        completions: item.completions || 0,
        xpReward: item.xpReward || 0,
        difficulty: item.difficulty || 'Beginner'
      };

      feed.unshift(feedItem); // Add to beginning for newest first
      
      // Keep only last 100 items for performance
      if (feed.length > 100) {
        feed.splice(100);
      }

      localStorage.setItem(this.communityFeedKey, JSON.stringify(feed));
    } catch (error) {
      console.error('Error adding to community feed:', error);
    }
  }

  // Get community feed (public content only)
  getCommunityFeed() {
    try {
      // Check if we're in browser environment
      if (typeof window === 'undefined' || !window.localStorage) {
        return [];
      }
      
      const stored = localStorage.getItem(this.communityFeedKey);
      const allItems = stored ? JSON.parse(stored) : [];
      
      // Filter to only show public content
      return allItems.filter(item => item.isPublic !== false);
    } catch (error) {
      console.error('Error getting community feed:', error);
      return [];
    }
  }

  // Get community feed by type
  getCommunityFeedByType(type) {
    const feed = this.getCommunityFeed();
    return feed.filter(item => item.type === type);
  }

  // Get community feed by language
  getCommunityFeedByLanguage(language) {
    const feed = this.getCommunityFeed();
    return feed.filter(item => item.language === language);
  }

  // Get community feed by topic
  getCommunityFeedByTopic(topic) {
    const feed = this.getCommunityFeed();
    return feed.filter(item => item.topic === topic);
  }

  // Get personal lessons for a specific user (private content)
  getPersonalLessons(walletAddress) {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return [];
      }
      
      const stored = localStorage.getItem(this.storageKey);
      const allLessons = stored ? JSON.parse(stored) : [];
      
      // Return lessons created by this user (both public and private)
      return allLessons.filter(lesson => lesson.creatorWallet === walletAddress);
    } catch (error) {
      console.error('Error getting personal lessons:', error);
      return [];
    }
  }

  // Get personal quizzes for a specific user (private content)
  getPersonalQuizzes(walletAddress) {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return [];
      }
      
      const stored = localStorage.getItem(this.quizStorageKey);
      const allQuizzes = stored ? JSON.parse(stored) : [];
      
      // Return quizzes created by this user (both public and private)
      return allQuizzes.filter(quiz => quiz.creatorWallet === walletAddress);
    } catch (error) {
      console.error('Error getting personal quizzes:', error);
      return [];
    }
  }

  // Search community feed
  searchCommunityFeed(query, filters = {}) {
    let feed = this.getCommunityFeed();

    if (filters.type) {
      feed = feed.filter(item => item.type === filters.type);
    }
    if (filters.language) {
      feed = feed.filter(item => item.language === filters.language);
    }
    if (filters.topic) {
      feed = feed.filter(item => item.topic === filters.topic);
    }

    if (query) {
      const searchTerm = query.toLowerCase();
      feed = feed.filter(item => 
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.creatorName.toLowerCase().includes(searchTerm)
      );
    }

    return feed.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  // Update community feed item
  updateCommunityFeedItem(itemId, updates) {
    try {
      // Check if we're in browser environment
      if (typeof window === 'undefined' || !window.localStorage) {
        return false;
      }
      
      const feed = this.getCommunityFeed();
      const itemIndex = feed.findIndex(item => item.id === itemId);
      
      if (itemIndex !== -1) {
        feed[itemIndex] = { ...feed[itemIndex], ...updates };
        localStorage.setItem(this.communityFeedKey, JSON.stringify(feed));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating community feed item:', error);
      return false;
    }
  }

  // Record quiz attempt and update community stats
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

    // Update quiz
    this.updateQuiz(quizId, {
      attempts,
      averageScore: Math.round(newAverageScore * 100) / 100
    });

    // Update community feed
    this.updateCommunityFeedItem(quizId, {
      attempts,
      averageScore: Math.round(newAverageScore * 100) / 100
    });

    this.saveQuizAttempt(attempt);
    return attempt;
  }

  // Generate unique IDs
  generateLessonId() {
    return `lesson_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  generateQuizId() {
    return `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  generateShareableLink(quizId) {
    return `${window.location.origin}/quiz/${quizId}`;
  }

  // Save/retrieve methods
  saveLesson(lesson) {
    try {
      // Check if we're in browser environment
      if (typeof window === 'undefined' || !window.localStorage) {
        return;
      }
      
      const lessons = this.getAllLessons();
      lessons[lesson.id] = lesson;
      localStorage.setItem(this.storageKey, JSON.stringify(lessons));
    } catch (error) {
      console.error('Error saving lesson:', error);
    }
  }

  saveQuiz(quiz) {
    try {
      // Check if we're in browser environment
      if (typeof window === 'undefined' || !window.localStorage) {
        return;
      }
      
      const quizzes = this.getAllQuizzes();
      quizzes[quiz.id] = quiz;
      localStorage.setItem(this.quizStorageKey, JSON.stringify(quizzes));
    } catch (error) {
      console.error('Error saving quiz:', error);
    }
  }

  getAllLessons() {
    try {
      // Check if we're in browser environment
      if (typeof window === 'undefined' || !window.localStorage) {
        return {};
      }
      
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error getting all lessons:', error);
      return {};
    }
  }

  getAllQuizzes() {
    try {
      // Check if we're in browser environment
      if (typeof window === 'undefined' || !window.localStorage) {
        return {};
      }
      
      const stored = localStorage.getItem(this.quizStorageKey);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error getting all quizzes:', error);
      return {};
    }
  }

  getLesson(lessonId) {
    const lessons = this.getAllLessons();
    return lessons[lessonId] || null;
  }

  getQuiz(quizId) {
    const quizzes = this.getAllQuizzes();
    return quizzes[quizId] || null;
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

  updateQuiz(quizId, updates) {
    const quiz = this.getQuiz(quizId);
    if (!quiz) return null;

    const updatedQuiz = {
      ...quiz,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.saveQuiz(updatedQuiz);
    return updatedQuiz;
  }

  addUserLesson(walletAddress, lessonId) {
    try {
      // Check if we're in browser environment
      if (typeof window === 'undefined' || !window.localStorage) {
        return;
      }
      
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
      // Check if we're in browser environment
      if (typeof window === 'undefined' || !window.localStorage) {
        return [];
      }
      
      const stored = localStorage.getItem(`${this.userLessonsKey}_${walletAddress}`);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error getting user lessons:', error);
      return [];
    }
  }

  // Get personal lessons for a user (not in community feed)
  getPersonalLessons(walletAddress) {
    try {
      // Check if we're in browser environment
      if (typeof window === 'undefined' || !window.localStorage) {
        return [];
      }
      
      const lessons = this.getAllLessons();
      return Object.values(lessons).filter(lesson => 
        lesson.creatorWallet === walletAddress && lesson.lessonType === 'personal'
      );
    } catch (error) {
      console.error('Error getting personal lessons:', error);
      return [];
    }
  }

  // Get community lessons for a user
  getCommunityLessons(walletAddress) {
    try {
      // Check if we're in browser environment
      if (typeof window === 'undefined' || !window.localStorage) {
        return [];
      }
      
      const lessons = this.getAllLessons();
      return Object.values(lessons).filter(lesson => 
        lesson.creatorWallet === walletAddress && lesson.lessonType === 'community'
      );
    } catch (error) {
      console.error('Error getting community lessons:', error);
      return [];
    }
  }

  // Get lessons by topic and language
  getLessonsByTopicAndLanguage(topic, language) {
    try {
      const lessons = this.getAllLessons();
      return Object.values(lessons).filter(lesson => 
        lesson.topic === topic && lesson.language === language
      );
    } catch (error) {
      console.error('Error getting lessons by topic and language:', error);
      return [];
    }
  }

  // Get lessons by topic (any language)
  getLessonsByTopic(topic) {
    try {
      const lessons = this.getAllLessons();
      return Object.values(lessons).filter(lesson => lesson.topic === topic);
    } catch (error) {
      console.error('Error getting lessons by topic:', error);
      return [];
    }
  }

  // Get lessons by language (any topic)
  getLessonsByLanguage(language) {
    try {
      const lessons = this.getAllLessons();
      return Object.values(lessons).filter(lesson => lesson.language === language);
    } catch (error) {
      console.error('Error getting lessons by language:', error);
      return [];
    }
  }

  saveQuizAttempt(attempt) {
    try {
      // Check if we're in browser environment
      if (typeof window === 'undefined' || !window.localStorage) {
        return;
      }
      
      const attemptsKey = `sf_quiz_attempts_${attempt.quizId}`;
      const attempts = JSON.parse(localStorage.getItem(attemptsKey) || '[]');
      attempts.push(attempt);
      localStorage.setItem(attemptsKey, JSON.stringify(attempts));
    } catch (error) {
      console.error('Error saving quiz attempt:', error);
    }
  }

  // Get popular and recent items
  getPopularItems(limit = 10) {
    const feed = this.getCommunityFeed();
    return feed
      .sort((a, b) => (b.views + b.likes + b.completions) - (a.views + a.likes + a.completions))
      .slice(0, limit);
  }

  getRecentItems(limit = 10) {
    const feed = this.getCommunityFeed();
    return feed
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);
  }
}

export const enhancedLessonManager = new EnhancedLessonManager();
