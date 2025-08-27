export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, language = 'en', topic = 'custom' } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  console.log(`[AI API] Generating lesson for prompt: "${prompt}" in language: ${language}`);

  try {
    let lessonContent;
    
    // Always try to use real AI if API key is available
    if (process.env.OPENAI_API_KEY) {
      try {
        lessonContent = await generateWithOpenAI(prompt, language, topic);
        console.log('[AI API] Successfully generated lesson with OpenAI');
      } catch (aiError) {
        console.error('[AI API] OpenAI failed, falling back to mock:', aiError);
        lessonContent = generateMockLesson(prompt, language, topic);
      }
    } else {
      console.log('[AI API] No OpenAI API key, using mock AI');
      lessonContent = generateMockLesson(prompt, language, topic);
    }
    
    console.log(`[AI API] Successfully generated lesson: "${lessonContent.lessonTitle}"`);
    res.status(200).json(lessonContent);
  } catch (error) {
    console.error('[AI API] Error generating lesson:', error);
    res.status(500).json({ error: 'Failed to generate lesson' });
  }
}

async function generateWithOpenAI(prompt, language, topic) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  
  // Map language codes to full names for better AI understanding
  const languageMap = {
    'en': 'English',
    'tw': 'Twi',
    'yo': 'Yoruba', 
    'sw': 'Swahili',
    'fr': 'French',
    'es': 'Spanish',
    'hi': 'Hindi',
    'ar': 'Arabic',
    'zh': 'Chinese',
    'pt': 'Portuguese'
  };

  const selectedLanguage = languageMap[language] || 'English';
  
  const systemPrompt = `You are an AI tutor creating educational content in ${selectedLanguage}. Generate lessons that are:
- Educational and informative for ${selectedLanguage} speakers
- Practical and applicable to real-world situations
- Include relevant examples and context
- Written entirely in ${selectedLanguage} (except for technical terms that may remain in English)
- Focus on skills that are valuable in today's world
- Specifically related to the topic: ${topic}
- Contextually relevant to the user's prompt within the ${topic} domain

Generate the response in the following JSON format:
{
  "lessonTitle": "Title of the lesson in ${selectedLanguage}",
  "lessonContent": "Full lesson content in ${selectedLanguage} with examples and explanations",
  "quiz": [
    {
      "question": "Question text in ${selectedLanguage}",
      "options": ["option1 in ${selectedLanguage}", "option2 in ${selectedLanguage}", "option3 in ${selectedLanguage}", "option4 in ${selectedLanguage}"],
      "correct": 0,
      "explanation": "Why this answer is correct in ${selectedLanguage}"
    }
  ]
}`;

  const userPrompt = `Create a lesson about: ${prompt}
Topic: ${topic}
Language: ${selectedLanguage}

The lesson should be specifically about ${prompt} within the context of ${topic}. For example, if the topic is "crypto wallet" and the prompt is "Bitcoin", create a lesson about Bitcoin specifically in the context of cryptocurrency wallets and blockchain technology.

Generate the entire lesson, including title, content, and quiz questions, in ${selectedLanguage}.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse the JSON response
    const lessonData = JSON.parse(content);
    
    return lessonData;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error; // Let the main handler deal with it
  }
}

function generateMockLesson(prompt, language, topic) {
  // Mock AI-generated content with African context
  const lessonTemplates = {
    python: {
      en: {
        title: "Introduction to Python Programming",
        content: `Python is a powerful, easy-to-learn programming language that's perfect for beginners and widely used in African tech companies.

**Why Python is Popular in Africa:**
• **Fintech**: Companies like Flutterwave use Python for payment processing
• **Agriculture**: AI-powered farming solutions using Python
• **Education**: Teaching programming in African universities
• **Mobile Money**: Backend systems for M-Pesa and similar services

**Basic Python Concepts:**

**Variables and Data Types:**
\`\`\`python
# Storing information about African countries
country = "Nigeria"
population = 220_000_000
languages = ["English", "Hausa", "Yoruba", "Igbo"]
is_developing = True
\`\`\`

**Functions:**
\`\`\`python
def calculate_rainfall(monthly_data):
    """Calculate average rainfall for farming predictions"""
    return sum(monthly_data) / len(monthly_data)

# Example usage for farming in Kenya
nairobi_rainfall = [45, 62, 78, 156, 89, 45, 23, 34, 67, 134, 178, 89]
average = calculate_rainfall(nairobi_rainfall)
print(f"Average monthly rainfall: {average:.1f}mm")
\`\`\`

**Real-World Applications:**
- Building mobile apps for education
- Creating websites for local businesses
- Analyzing agricultural data
- Developing fintech solutions`,
        quiz: [
          {
            question: "Which African fintech company commonly uses Python?",
            options: ["Flutterwave", "Microsoft", "Apple", "Samsung"],
            correct: 0,
            explanation: "Flutterwave, a major African fintech company, uses Python for their payment processing systems."
          },
          {
            question: "What data type is best for storing multiple African languages?",
            options: ["string", "list", "boolean", "integer"],
            correct: 1,
            explanation: "A list is perfect for storing multiple items like languages: ['English', 'Swahili', 'French']"
          },
          {
            question: "What does the following code print? print('Karibu Kenya')",
            options: ["Welcome Kenya", "Karibu Kenya", "Hello World", "Error"],
            correct: 1,
            explanation: "The print() function displays exactly what's in quotes: 'Karibu Kenya' (Welcome to Kenya in Swahili)"
          }
        ]
      },
      sw: {
        title: "Utangulizi wa Programu ya Python",
        content: `Python ni lugha ya programu yenye nguvu na rahisi kujifunza, inayotumika sana katika makampuni ya teknolojia ya Kiafrika.

**Kwa nini Python ni maarufu Afrika:**
• **Teknolojia ya Kifedha**: Makampuni kama Flutterwave yanatumia Python
• **Kilimo**: Suluhisho za AI kwa wakulima
• **Elimu**: Kufundisha programu katika vyuo vikuu vya Afrika
• **Pesa za Simu**: Mifumo ya nyuma kwa M-Pesa na mengine

**Misingi ya Python:**

**Vigeuzi na Aina za Data:**
\`\`\`python
# Kuhifadhi taarifa kuhusu nchi za Afrika
nchi = "Kenya"
idadi_ya_watu = 54_000_000
lugha = ["Kiswahili", "Kiingereza", "Kikuyu", "Kiluo"]
inaendelea = True
\`\`\``
      }
    },
    blockchain: {
      en: {
        title: "Blockchain Technology for African Development",
        content: `Blockchain technology has immense potential to solve key challenges across Africa, from financial inclusion to supply chain transparency.

**African Blockchain Use Cases:**
• **Financial Inclusion**: Providing banking to the unbanked
• **Supply Chain**: Tracking agricultural products from farm to market
• **Identity**: Digital identity for refugees and displaced persons
• **Remittances**: Cheaper cross-border money transfers

**Key Concepts:**

**What is Blockchain?**
A blockchain is like a digital ledger that's shared across many computers, making it very difficult to hack or cheat.

**Smart Contracts:**
Think of smart contracts as automated agreements. For example, a farmer could automatically receive payment when their crop quality is verified.

**Cryptocurrency:**
Digital money that works without traditional banks. In Africa, this could help people who don't have access to banking services.

**Real Examples in Africa:**
- **Akon City**: Planned cryptocurrency-based city in Senegal
- **Grassroots Economics**: Community currencies in Kenya
- **BitPesa**: Blockchain-based remittances across Africa
- **Supply Chain Tracking**: Verifying authentic African products for export`,
        quiz: [
          {
            question: "What is the main benefit of blockchain for the unbanked in Africa?",
            options: ["Entertainment", "Financial inclusion", "Gaming", "Social media"],
            correct: 1,
            explanation: "Blockchain enables financial services without traditional banks, helping the unbanked access financial services."
          },
          {
            question: "Which African country is planning Akon City with cryptocurrency?",
            options: ["Nigeria", "Ghana", "Senegal", "Kenya"],
            correct: 2,
            explanation: "Akon City is planned in Senegal and will use its own cryptocurrency called AKoin."
          },
          {
            question: "What can smart contracts help African farmers with?",
            options: ["Weather prediction", "Automatic payments", "Planting crops", "Selling land"],
            correct: 1,
            explanation: "Smart contracts can automatically execute payments when certain conditions are met, like crop quality verification."
          }
        ]
      }
    },
    default: {
      en: {
        title: `Learning About: ${prompt} in ${topic}`,
        content: `This lesson covers the fundamentals of ${prompt} within the context of ${topic}, with a focus on African contexts and applications.

**Introduction:**
Understanding ${prompt} in the context of ${topic} is important for developing skills relevant to African markets and opportunities.

**Key Concepts:**
- Foundational principles of ${prompt} as they relate to ${topic}
- Applications of ${prompt} in ${topic} contexts
- Real-world examples from across the continent
- Practical skills you can apply immediately in ${topic}

**African Perspective:**
Many concepts in ${prompt} and ${topic} have unique applications in African settings, from mobile-first solutions to community-based approaches.

**Next Steps:**
After completing this lesson, you'll have a solid foundation to explore ${prompt} within ${topic} further and apply it in your local context.`,
        quiz: [
          {
            question: `What is the main focus of this lesson on ${prompt} in ${topic}?`,
            options: ["African applications", "General theory", "History only", "Technical details"],
            correct: 0,
            explanation: `This lesson emphasizes African applications and contexts for ${prompt} within ${topic}.`
          },
          {
            question: `Why is understanding ${prompt} in the context of ${topic} important?`,
            options: ["It's not important", "Makes learning more relevant", "Only for entertainment", "Reduces difficulty"],
            correct: 1,
            explanation: `Understanding ${prompt} within ${topic} makes learning more relevant and applicable to real-world situations in your environment.`
          }
        ]
      }
    }
  };

  // Determine which template to use based on prompt and topic
  let template;
  const lowerPrompt = prompt.toLowerCase();
  const lowerTopic = topic.toLowerCase();
  
  // First check if topic matches any specific templates
  if (lowerTopic.includes('technology') || lowerTopic.includes('programming') || lowerPrompt.includes('python') || lowerPrompt.includes('programming')) {
    template = lessonTemplates.python[language] || lessonTemplates.python.en;
  } else if (lowerTopic.includes('crypto') || lowerTopic.includes('blockchain') || lowerPrompt.includes('blockchain') || lowerPrompt.includes('crypto') || lowerPrompt.includes('web3')) {
    template = lessonTemplates.blockchain[language] || lessonTemplates.blockchain.en;
  } else {
    template = lessonTemplates.default[language] || lessonTemplates.default.en;
  }

  return {
    lessonTitle: template.title,
    lessonContent: template.content,
    quiz: template.quiz || [
      {
        question: "What did you learn from this lesson?",
        options: ["Important concepts", "Nothing", "Random facts", "Unclear information"],
        correct: 0,
        explanation: "This lesson covered important concepts relevant to African contexts."
      }
    ]
  };
}
