import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { useNavigation } from './_app';
import { 
  BookOpenIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ClockIcon,
  StarIcon
} from '@heroicons/react/24/outline';

function cleanMarkdown(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '$1');
}

export default function Course() {
  const { navigateToLearn, navigateToDashboard, isDark, setIsDark } = useNavigation();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [courseProgress, setCourseProgress] = useState(0);
  const [courseMeta, setCourseMeta] = useState({ languageName: '', topicName: '' });

  // Mock course data - would come from API
  // Build course content dynamically based on selected topic
  const selectedTopicId = typeof window !== 'undefined' ? (localStorage.getItem('sf_selected_topic_id') || 'culture') : 'culture';
  const topicTitleMap = { culture: 'African Culture & Traditions', food: 'African Cuisine', sports: 'Sports & Fitness', crypto: 'Crypto & Web3', science: 'Science & Tech', business: 'Business & Entrepreneurship', history: 'African History', arts: 'Arts & Music' };
  const courseData = {
    title: topicTitleMap[selectedTopicId] || 'Course',
    language: "",
    topic: selectedTopicId,
    description: "Learn about the rich cultural heritage of Ghana, including traditions, festivals, and social customs.",
    totalLessons: 5,
    estimatedTime: "45 minutes",
    difficulty: "Beginner",
    lessons: [
      { id: 1, title: "Introduction to Ghanaian Culture", content: `Ghana is a West African country with a rich cultural heritage spanning over 1000 years. The country is home to over 100 ethnic groups, each with their unique traditions, languages, and customs.

**Key Cultural Elements:**
• **Languages**: Over 80 languages spoken, with Twi, Ga, Ewe, and Dagbani being major ones
• **Traditional Clothing**: Kente cloth is the most famous, symbolizing royalty and honor
• **Music & Dance**: Traditional drumming, Adowa dance, and modern Highlife music
• **Social Structure**: Emphasis on community, respect for elders, and extended family

**Important Values:**
- Ubuntu philosophy: "I am because we are"
- Respect for ancestors and tradition
- Hospitality and community support
- Oral tradition and storytelling`, duration: "8 minutes", type: "text" },
      { id: 2, title: selectedTopicId === 'food' ? 'Staple Dishes Across Africa' : "Traditional Festivals", content: selectedTopicId === 'food' ? `Explore staple dishes like Jollof, Fufu, Injera, and Kelewele across regions, their ingredients, and cultural context.

Nutrition & Culture:
- Communal eating traditions
- Seasonal ingredients and sustainability
- Health perspectives and modern twists` : `Ghanaian festivals are vibrant celebrations that connect communities to their ancestral heritage and agricultural cycles.

**Major Festivals:**

**Homowo Festival (Ga People)**
- Meaning: "Hooting at hunger"
- Celebrates successful harvest
- Features traditional dancing and sprinkling of kpokpoi (special food)

**Aboakyir Festival (Effutu People)**
- Annual deer hunting festival
- Demonstrates bravery and community unity
- Held in Winneba during April/May

**Yam Festival (Northern Regions)**
- Celebrates the yam harvest
- Gives thanks to gods and ancestors
- Features traditional drumming and dancing

**Cultural Significance:**
- Strengthens community bonds
- Preserves oral traditions
- Educates younger generations
- Attracts tourism and economic benefits`, duration: "10 minutes", type: "text" },
      { id: 3, title: selectedTopicId === 'sports' ? 'Sports in African Communities' : "Traditional Greetings & Social Customs", content: selectedTopicId === 'sports' ? `A look at football, athletics, and community fitness practices.

Highlights:
- Football as a unifier
- Local games and their values
- Role of sports in youth development` : `Understanding Ghanaian greetings and social customs is essential for respectful cultural interaction.

**Common Greetings in Twi:**
- "Akwaaba" - Welcome
- "Wo ho te sɛn?" - How are you?
- "Ɛyɛ" - I'm fine
- "Me da wo ase" - Thank you

**Social Customs:**
- **Respect for Elders**: Always greet elders first, use both hands when receiving items
- **Community Meals**: Sharing food is a sign of unity and hospitality
- **Gift Giving**: Bringing small gifts when visiting is customary
- **Religious Respect**: Ghana is religious (Christian, Muslim, Traditional) - respect all beliefs

**Taboos to Avoid:**
- Pointing with left hand
- Stepping over someone lying down
- Wearing shoes in certain traditional spaces
- Refusing offered food or drink without polite explanation`, duration: "7 minutes", type: "text" },
      { id: 4, title: "Traditional Arts & Crafts", content: `Ghanaian arts and crafts reflect the country's rich cultural diversity and skilled craftsmanship.

**Kente Cloth:**
- Hand-woven by master weavers
- Each pattern has symbolic meaning
- Originally worn by royalty
- Colors represent different values (gold=wealth, green=growth, red=sacrifice)

**Wood Carving:**
- Akan stools represent spiritual connection
- Masks used in traditional ceremonies
- Fertility dolls (Akuaba) for blessing children

**Pottery & Ceramics:**
- Traditional water vessels and cooking pots
- Decorative items for ceremonies
- Skills passed down through generations

**Beadmaking:**
- Krobo beads are world-famous
- Each color and pattern has meaning
- Used for ceremonies and decoration

**Modern Applications:**
- Tourism and export industries
- Fashion and interior design
- Cultural education and preservation`, duration: "12 minutes", type: "text" },
      { id: 5, title: "Food Culture & Culinary Traditions", content: `Ghanaian cuisine reflects the country's agricultural abundance and cultural diversity.

**Staple Foods:**
- **Rice**: Often served with stews and sauces
- **Yam, Plantain, Cassava**: Root vegetables forming meal foundations
- **Maize**: Used for kenkey and banku

**Popular Dishes:**
- **Jollof Rice**: Spiced rice dish (friendly rivalry with Nigeria!)
- **Fufu**: Pounded cassava/plantain served with soup
- **Kelewele**: Spiced fried plantains
- **Banku**: Fermented corn and cassava dough

**Cultural Significance:**
- **Communal Eating**: Sharing from one bowl strengthens bonds
- **Hospitality**: Offering food to guests is mandatory
- **Ceremonial Foods**: Special dishes for festivals and celebrations
- **Seasonal Eating**: Diet follows agricultural seasons

**Cooking Methods:**
- Open fire cooking in rural areas
- Palm oil as primary cooking fat
- Extensive use of spices and peppers
- Preservation through drying and smoking`, duration: "8 minutes", type: "text" }
    ]
  };

  useEffect(() => {
    const progress = (completedLessons.length / courseData.totalLessons) * 100;
    setCourseProgress(progress);
  }, [completedLessons]);

  useEffect(() => {
    try {
      const langName = localStorage.getItem('sf_selected_language_name') || ''
      const topicName = localStorage.getItem('sf_selected_topic_name') || ''
      setCourseMeta({ languageName: langName, topicName })
    } catch {}
  }, [])

  const markLessonComplete = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const goToNextLesson = () => {
    if (currentLesson < courseData.lessons.length - 1) {
      markLessonComplete(courseData.lessons[currentLesson].id);
      setCurrentLesson(currentLesson + 1);
    }
  };

  const goToPreviousLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  const goToQuiz = () => {
    markLessonComplete(courseData.lessons[currentLesson].id);
    window.location.href = '/quiz';
  };

  const currentLessonData = courseData.lessons[currentLesson];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      <Head>
        <title>Course: {courseMeta.topicName || courseData.title} - ScholarForge</title>
        <meta name="description" content={courseData.description} />
      </Head>

      <Header onToggleTheme={() => setIsDark(!isDark)} isDark={isDark} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Course Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 sticky top-24"
            >
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{courseMeta.topicName || courseData.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Language: {courseMeta.languageName || courseData.language}</p>

              {/* Course Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <ClockIcon className="h-4 w-4 mr-2" />
                  {courseData.estimatedTime}
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <BookOpenIcon className="h-4 w-4 mr-2" />
                  {courseData.totalLessons} lessons
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <StarIcon className="h-4 w-4 mr-2" />
                  {courseData.difficulty}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <span>Progress</span>
                  <span>{Math.round(courseProgress)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${courseProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Lesson List */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Lessons</h3>
                {courseData.lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => setCurrentLesson(index)}
                    className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${
                      index === currentLesson
                        ? 'bg-primary-100 text-primary-900 border-l-4 border-primary-600'
                        : completedLessons.includes(lesson.id)
                        ? 'bg-success-50 text-success-900'
                        : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{lesson.title}</span>
                      {completedLessons.includes(lesson.id) && (
                        <CheckCircleIcon className="h-4 w-4 text-success-600" />
                      )}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{lesson.duration}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={currentLesson}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8"
            >
              {/* Lesson Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs mr-3">
                      Lesson {currentLesson + 1} of {courseData.totalLessons}
                    </span>
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {currentLessonData.duration}
                  </div>
                  {completedLessons.includes(currentLessonData.id) && (
                    <div className="flex items-center text-success-600">
                      <CheckCircleIcon className="h-5 w-5 mr-1" />
                      <span className="text-sm">Completed</span>
                    </div>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {currentLessonData.title}
                </h1>
              </div>

              {/* Lesson Content */}
              <div className="prose prose-lg max-w-none mb-8">
                <div className="whitespace-pre-line text-gray-700 dark:text-gray-200 leading-relaxed">
                  {cleanMarkdown(currentLessonData.content)}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-800">
                <button
                  onClick={goToPreviousLesson}
                  disabled={currentLesson === 0}
                  className="flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Previous Lesson
                </button>

                <div className="flex space-x-4">
                  <button
                    onClick={() => markLessonComplete(currentLessonData.id)}
                    className="bg-success-600 text-white px-6 py-3 rounded-lg hover:bg-success-700 transition-colors"
                  >
                    Mark Complete
                  </button>
                  
                  {currentLesson < courseData.lessons.length - 1 ? (
                    <button
                      onClick={goToNextLesson}
                      className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center"
                    >
                      Next Lesson
                      <ArrowRightIcon className="h-5 w-5 ml-2" />
                    </button>
                  ) : (
                    <button
                      onClick={goToQuiz}
                      className="bg-secondary-600 text-white px-6 py-3 rounded-lg hover:bg-secondary-700 transition-colors flex items-center"
                    >
                      Take Quiz
                      <ArrowRightIcon className="h-5 w-5 ml-2" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
