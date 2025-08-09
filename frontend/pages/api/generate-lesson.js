export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, language = 'en' } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    // For demo purposes, we'll use a mock AI response
    // In production, you would integrate with OpenAI, Gemini, or other AI providers
    
    const lessonContent = generateMockLesson(prompt, language);
    
    res.status(200).json(lessonContent);
  } catch (error) {
    console.error('Error generating lesson:', error);
    res.status(500).json({ error: 'Failed to generate lesson' });
  }
}

function generateMockLesson(prompt, language) {
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
        title: `Learning About: ${prompt}`,
        content: `This lesson covers the fundamentals of ${prompt} with a focus on African contexts and applications.

**Introduction:**
Understanding ${prompt} is important for developing skills relevant to African markets and opportunities.

**Key Concepts:**
- Foundational principles of ${prompt}
- Applications in African contexts
- Real-world examples from across the continent
- Practical skills you can apply immediately

**African Perspective:**
Many concepts in ${prompt} have unique applications in African settings, from mobile-first solutions to community-based approaches.

**Next Steps:**
After completing this lesson, you'll have a solid foundation to explore ${prompt} further and apply it in your local context.`,
        quiz: [
          {
            question: `What is the main focus of this lesson on ${prompt}?`,
            options: ["African applications", "General theory", "History only", "Technical details"],
            correct: 0,
            explanation: `This lesson emphasizes African applications and contexts for ${prompt}.`
          },
          {
            question: "Why is local context important when learning new skills?",
            options: ["It's not important", "Makes learning more relevant", "Only for entertainment", "Reduces difficulty"],
            correct: 1,
            explanation: "Local context makes learning more relevant and applicable to real-world situations in your environment."
          }
        ]
      }
    }
  };

  // Determine which template to use based on prompt
  let template;
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('python') || lowerPrompt.includes('programming')) {
    template = lessonTemplates.python[language] || lessonTemplates.python.en;
  } else if (lowerPrompt.includes('blockchain') || lowerPrompt.includes('crypto') || lowerPrompt.includes('web3')) {
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
