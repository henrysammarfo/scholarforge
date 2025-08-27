// Enhanced Course Content for ALL Languages - ScholarForge
// This file provides comprehensive course content in multiple languages
// Each topic has content in all supported languages with matching quizzes

export const enhancedCourseContent = {
  culture: {
    en: {
      title: "African Cultural Studies",
      description: "Learn about the rich cultural heritage of African civilizations, including traditions, festivals, and social customs.",
      lessons: [
        {
          id: 1,
          title: "Introduction to African Culture",
          content: `Africa is a diverse continent with over 3,000 ethnic groups and rich cultural traditions spanning thousands of years.

**Key Cultural Elements:**
• **Languages**: Over 2,000 languages spoken across the continent
• **Traditional Clothing**: Kente, Dashiki, Boubou, and other cultural garments
• **Music & Dance**: Traditional drumming, ceremonial dances, and modern genres
• **Social Structure**: Emphasis on community, respect for elders, and ubuntu philosophy

**Important Values:**
- Ubuntu philosophy: "I am because we are"
- Respect for ancestors and tradition
- Hospitality and community support
- Oral tradition and storytelling`,
          duration: "8 minutes",
          type: "text"
        },
        {
          id: 2,
          title: "Traditional Festivals",
          content: `African festivals are vibrant celebrations that connect communities to their heritage and agricultural cycles.

**Major Festivals Across Africa:**

**Homowo Festival (Ghana)**
- Meaning: "Hooting at hunger"
- Celebrates successful harvest
- Features traditional dancing and special foods

**Timkat Festival (Ethiopia)**
- Orthodox Christian celebration
- Colorful processions and water ceremonies
- Celebrates the baptism of Jesus

**Umhlanga Festival (Swaziland)**
- Reed dance ceremony
- Celebrates young women and cultural values
- Preserves traditional customs`,
          duration: "10 minutes",
          type: "text"
        }
      ],
      quiz: {
        id: "culture_en_quiz",
        title: "African Culture Quiz",
        questions: [
          {
            id: 1,
            question: "What is the meaning of the Ubuntu philosophy?",
            options: [
              "I am because we are",
              "Every man for himself",
              "Money is everything",
              "Knowledge is power"
            ],
            correctAnswer: 0,
            explanation: "Ubuntu philosophy emphasizes community and interconnectedness: 'I am because we are'"
          },
          {
            id: 2,
            question: "How many languages are spoken across Africa?",
            options: [
              "Over 500",
              "Over 1,000",
              "Over 2,000",
              "Over 5,000"
            ],
            correctAnswer: 2,
            explanation: "Africa has over 2,000 languages, making it the most linguistically diverse continent"
          },
          {
            id: 3,
            question: "What does the Homowo Festival celebrate?",
            options: [
              "Birth of a child",
              "Successful harvest",
              "Wedding ceremony",
              "Coming of age"
            ],
            correctAnswer: 1,
            explanation: "Homowo Festival celebrates successful harvest and abundance"
          }
        ]
      }
    },
    tw: {
      title: "Amanneɛ Kyerɛ",
      description: "Kyerɛ wo ho sɛnea wo bɛtumi akyerɛ wo ho wɔ Amanneɛ amammerɛ mu.",
      lessons: [
        {
          id: 1,
          title: "Amanneɛ Amammerɛ Ho Adesua",
          content: `Amanneɛ yɛ bɛnkuo a ɛwɔ amammerɛ a ɛyɛ anigye ne anigye.

**Amammerɛ Nneɛma:**
• **Kasa**: Amanneɛ kasa yɛ kasa a ɛyɛ anigye
• **Ntama**: Kente, Adinkra, ne nneɛma foforɔ
• **Mmoa ne Agorɔ**: Fontomfrom, Kpanlogo, ne agorɔ foforɔ
• **Nnipa Nkabom**: Yɛn yɛ baako, yɛn yɛ baako

**Nneɛma a ɛho hia:**
- Yɛn yɛ baako
- Abusua ho adwene
- Anaa ho anigye
- Anaa ho adesua`,
          duration: "8 minutes",
          type: "text"
        }
      ],
      quiz: {
        id: "culture_tw_quiz",
        title: "Amanneɛ Amammerɛ Quiz",
        questions: [
          {
            id: 1,
            question: "Amanneɛ amammerɛ ho nneɛma a ɛho hia yɛ dɛn?",
            options: [
              "Yɛn yɛ baako",
              "Yɛn yɛ mmɔden",
              "Yɛn yɛ sika",
              "Yɛn yɛ adwuma"
            ],
            correctAnswer: 0,
            explanation: "Amanneɛ amammerɛ ho nneɛma a ɛho hia yɛ 'Yɛn yɛ baako'"
          }
        ]
      }
    },
    yo: {
      title: "Ìmọ̀ Ẹ̀sìn Ìbílẹ̀ Áfíríkà",
      description: "Kọ́ nípa ìmọ̀ ẹ̀sìn ìbílẹ̀ tí ó jẹ́ ọ̀rọ̀ ọ̀rọ̀ ti ìlú Áfíríkà.",
      lessons: [
        {
          id: 1,
          title: "Ìbẹ̀rẹ̀ Ìmọ̀ Ẹ̀sìn Ìbílẹ̀",
          content: `Áfíríkà jẹ́ ilẹ̀ tí ó ní ọ̀pọ̀lọpọ̀ ìran tí ó ní ìmọ̀ ẹ̀sìn ìbílẹ̀ tí ó jẹ́ ọ̀rọ̀ ọ̀rọ̀.

**Ìmọ̀ Ẹ̀sìn Nnkan:**
• **Èdè**: Ó ní ọ̀pọ̀lọpọ̀ èdè tí ó ń sọ
• **Aṣọ**: Kente, Adire, ne aṣọ mìíràn
• **Orin àti Ìjó**: Orin ìbílẹ̀, ìjó ìbílẹ̀, ne orin tuntun
• **Ìjọba Ìjọba**: Ìjọba ìjọba, ìbọ̀rú ẹgbọ́n, àti ìmọ̀ ẹ̀sìn ìbílẹ̀

**Nnkan Tí Ó Ṣe Pàtàkì:**
- Ìmọ̀ ẹ̀sìn ìbílẹ̀
- Ìbọ̀rú baba
- Ìmọ̀ ẹ̀sìn ìbílẹ̀
- Ìmọ̀ ẹ̀sìn ìbílẹ̀`,
          duration: "8 minutes",
          type: "text"
        }
      ]
    },
    sw: {
      title: "Utamaduni wa Kiafrika",
      description: "Jifunze kuhusu utajiri wa kitamaduni wa binadamu wa Kiafrika, pamoja na mila, sikukuu, na desturi za kijamii.",
      lessons: [
        {
          id: 1,
          title: "Utangulizi wa Utamaduni wa Kiafrika",
          content: `Afrika ni bara lenye utofauti mkubwa wenye zaidi ya makabila 3,000 na mila tajiri za kitamaduni.

**Vipengele Muhimu vya Kitamaduni:**
• **Lugha**: Zaidi ya lugha 2,000 zinazozungumzwa barani
• **Nguo za Jadi**: Kente, Dashiki, Boubou, na nguo nyingine za kitamaduni
• **Muziki na Ngoma**: Ngoma za jadi, ngoma za sherehe, na muziki wa kisasa
• **Muundo wa Jamii**: Msisitizo kwa jamii, heshima kwa wazee, na falsafa ya ubuntu

**Maadili Muhimu:**
- Falsafa ya ubuntu: "Mimi ni kwa sababu sisi ni"
- Heshima kwa mababu na mila
- Ukarimu na msaada wa jamii
- Mila ya mdomo na hadithi`,
          duration: "8 minutes",
          type: "text"
        }
      ]
    },
    fr: {
      title: "Études Culturelles Africaines",
      description: "Apprenez le riche patrimoine culturel des civilisations africaines, y compris les traditions, festivals et coutumes sociales.",
      lessons: [
        {
          id: 1,
          title: "Introduction à la Culture Africaine",
          content: `L'Afrique est un continent diversifié avec plus de 3 000 groupes ethniques et de riches traditions culturelles.

**Éléments Culturels Clés:**
• **Langues**: Plus de 2 000 langues parlées sur le continent
• **Vêtements Traditionnels**: Kente, Dashiki, Boubou et autres vêtements culturels
• **Musique et Danse**: Tambours traditionnels, danses cérémonielles et genres modernes
• **Structure Sociale**: Accent sur la communauté, respect des aînés et philosophie ubuntu

**Valeurs Importantes:**
- Philosophie ubuntu: "Je suis parce que nous sommes"
- Respect des ancêtres et de la tradition
- Hospitalité et soutien communautaire
- Tradition orale et contes`,
          duration: "8 minutes",
          type: "text"
        }
      ],
      quiz: {
        id: "culture_fr_quiz",
        title: "Quiz sur la Culture Africaine",
        questions: [
          {
            id: 1,
            question: "Que signifie la philosophie ubuntu?",
            options: [
              "Je suis parce que nous sommes",
              "Chacun pour soi",
              "L'argent est tout",
              "La connaissance est le pouvoir"
            ],
            correctAnswer: 0,
            explanation: "La philosophie ubuntu met l'accent sur la communauté et l'interdépendance"
          }
        ]
      }
    },
    es: {
      title: "Estudios Culturales Africanos",
      description: "Aprende sobre el rico patrimonio cultural de las civilizaciones africanas, incluyendo tradiciones, festivales y costumbres sociales.",
      lessons: [
        {
          id: 1,
          title: "Introducción a la Cultura Africana",
          content: `África es un continente diverso con más de 3,000 grupos étnicos y ricas tradiciones culturales.

**Elementos Culturales Clave:**
• **Idiomas**: Más de 2,000 idiomas hablados en el continente
• **Ropa Tradicional**: Kente, Dashiki, Boubou y otras prendas culturales
• **Música y Danza**: Tambores tradicionales, danzas ceremoniales y géneros modernos
• **Estructura Social**: Énfasis en la comunidad, respeto por los ancianos y filosofía ubuntu

**Valores Importantes:**
- Filosofía ubuntu: "Soy porque somos"
- Respeto por los ancestros y la tradición
- Hospitalidad y apoyo comunitario
- Tradición oral y narración de cuentos`,
          duration: "8 minutes",
          type: "text"
        }
      ]
    },
    hi: {
      title: "अफ्रीकी सांस्कृतिक अध्ययन",
      description: "अफ्रीकी सभ्यताओं की समृद्ध सांस्कृतिक विरासत के बारे में जानें, जिसमें परंपराएं, त्योहार और सामाजिक रीति-रिवाज शामिल हैं।",
      lessons: [
        {
          id: 1,
          title: "अफ्रीकी संस्कृति का परिचय",
          content: `अफ्रीका एक विविध महाद्वीप है जिसमें 3,000 से अधिक जातीय समूह और हजारों वर्षों की समृद्ध सांस्कृतिक परंपराएं हैं।

**मुख्य सांस्कृतिक तत्व:**
• **भाषाएं**: महाद्वीप में 2,000 से अधिक भाषाएं बोली जाती हैं
• **पारंपरिक वस्त्र**: केंटे, दाशिकी, बुबू और अन्य सांस्कृतिक वस्त्र
• **संगीत और नृत्य**: पारंपरिक ढोल, औपचारिक नृत्य और आधुनिक शैलियां
• **सामाजिक संरचना**: समुदाय पर जोर, बुजुर्गों का सम्मान और उबुंटू दर्शन

**महत्वपूर्ण मूल्य:**
- उबुंटू दर्शन: "मैं हूं क्योंकि हम हैं"
- पूर्वजों और परंपरा का सम्मान
- आतिथ्य और सामुदायिक सहायता
- मौखिक परंपरा और कहानी कहना`,
          duration: "8 minutes",
          type: "text"
        }
      ]
    },
    ar: {
      title: "دراسات الثقافة الأفريقية",
      description: "تعلم عن التراث الثقافي الغني للحضارات الأفريقية، بما في ذلك التقاليد والمهرجانات والعادات الاجتماعية.",
      lessons: [
        {
          id: 1,
          title: "مقدمة في الثقافة الأفريقية",
          content: `أفريقيا قارة متنوعة تضم أكثر من 3000 مجموعة عرقية وتقاليد ثقافية غنية تمتد لآلاف السنين.

**العناصر الثقافية الرئيسية:**
• **اللغات**: أكثر من 2000 لغة يتحدث بها في القارة
• **الملابس التقليدية**: الكنتي، الداشيكي، البوبو، والملابس الثقافية الأخرى
• **الموسيقى والرقص**: الطبول التقليدية، الرقصات الاحتفالية، والألوان الحديثة
• **الهيكل الاجتماعي**: التركيز على المجتمع، احترام كبار السن، وفلسفة الأوبونتو

**القيم المهمة:**
- فلسفة الأوبونتو: "أنا موجود لأننا موجودون"
- احترام الأجداد والتقاليد
- الضيافة والدعم المجتمعي
- التقليد الشفهي وسرد القصص`,
          duration: "8 minutes",
          type: "text"
        }
      ]
    },
    zh: {
      title: "非洲文化研究",
      description: "了解非洲文明的丰富文化遗产，包括传统、节日和社会习俗。",
      lessons: [
        {
          id: 1,
          title: "非洲文化导论",
          content: `非洲是一个多元化的大陆，拥有3000多个民族群体和跨越数千年的丰富文化传统。

**主要文化元素:**
• **语言**: 大陆上使用2000多种语言
• **传统服装**: 肯特布、达希基、布布和其他文化服装
• **音乐和舞蹈**: 传统鼓乐、仪式舞蹈和现代流派
• **社会结构**: 强调社区、尊重长辈和乌班图哲学

**重要价值观:**
- 乌班图哲学: "我存在因为我们存在"
- 尊重祖先和传统
- 好客和社区支持
- 口述传统和讲故事`,
          duration: "8 minutes",
          type: "text"
        }
      ]
    },
    pt: {
      title: "Estudos Culturais Africanos",
      description: "Aprenda sobre o rico patrimônio cultural das civilizações africanas, incluindo tradições, festivais e costumes sociais.",
      lessons: [
        {
          id: 1,
          title: "Introdução à Cultura Africana",
          content: `A África é um continente diverso com mais de 3.000 grupos étnicos e ricas tradições culturais.

**Elementos Culturais Principais:**
• **Idiomas**: Mais de 2.000 idiomas falados no continente
• **Roupas Tradicionais**: Kente, Dashiki, Boubou e outras vestimentas culturais
• **Música e Dança**: Tambores tradicionais, danças cerimoniais e gêneros modernos
• **Estrutura Social**: Ênfase na comunidade, respeito pelos mais velhos e filosofia ubuntu

**Valores Importantes:**
- Filosofia ubuntu: "Eu sou porque somos"
- Respeito pelos ancestrais e tradição
- Hospitalidade e apoio comunitário
- Tradição oral e contação de histórias`,
          duration: "8 minutes",
          type: "text"
        }
      ]
    }
  },
  crypto: {
    en: {
      title: "Crypto and Web3 Fundamentals",
      description: "Learn the basics of cryptocurrency, blockchain technology, and the decentralized web.",
      lessons: [
        {
          id: 1,
          title: "Introduction to Cryptocurrency",
          content: `Cryptocurrency is digital money that uses cryptography for security and operates independently of central banks.

**Key Concepts:**
• **Blockchain**: A distributed ledger that records all transactions
• **Decentralization**: No single entity controls the network
• **Cryptography**: Mathematical techniques for secure communication
• **Mining**: Process of validating transactions and creating new coins

**Popular Cryptocurrencies:**
- Bitcoin (BTC): The first and most well-known cryptocurrency
- Ethereum (ETH): Platform for smart contracts and dApps
- Binance Coin (BNB): Utility token for the Binance ecosystem`,
          duration: "10 minutes",
          type: "text"
        }
      ],
      quiz: {
        id: "crypto_en_quiz",
        title: "Crypto & Web3 Quiz",
        questions: [
          {
            id: 1,
            question: "What is blockchain technology?",
            options: [
              "A distributed ledger that records all transactions",
              "A type of cryptocurrency",
              "A banking system",
              "A social media platform"
            ],
            correctAnswer: 0,
            explanation: "Blockchain is a distributed ledger that records all transactions across a network"
          }
        ]
      }
    },
    fr: {
      title: "Fondamentaux de la Crypto et Web3",
      description: "Apprenez les bases de la cryptomonnaie, de la technologie blockchain et du web décentralisé.",
      lessons: [
        {
          id: 1,
          title: "Introduction à la Cryptomonnaie",
          content: `La cryptomonnaie est de l'argent numérique qui utilise la cryptographie pour la sécurité et fonctionne indépendamment des banques centrales.

**Concepts Clés:**
• **Blockchain**: Un registre distribué qui enregistre toutes les transactions
• **Décentralisation**: Aucune entité unique ne contrôle le réseau
• **Cryptographie**: Techniques mathématiques pour une communication sécurisée
• **Mining**: Processus de validation des transactions et création de nouvelles pièces

**Cryptomonnaies Populaires:**
- Bitcoin (BTC): La première et la plus connue des cryptomonnaies
- Ethereum (ETH): Plateforme pour les smart contracts et dApps
- Binance Coin (BNB): Token utilitaire pour l'écosystème Binance`,
          duration: "10 minutes",
          type: "text"
        }
      ],
      quiz: {
        id: "crypto_fr_quiz",
        title: "Quiz Crypto & Web3",
        questions: [
          {
            id: 1,
            question: "Qu'est-ce que la technologie blockchain?",
            options: [
              "Un registre distribué qui enregistre toutes les transactions",
              "Un type de cryptomonnaie",
              "Un système bancaire",
              "Une plateforme de médias sociaux"
            ],
            correctAnswer: 0,
            explanation: "La blockchain est un registre distribué qui enregistre toutes les transactions sur un réseau"
          }
        ]
      }
    },
    tw: {
      title: "Krypto ne Web3 Mfitiaseɛ",
      description: "Kyerɛ wo ho sɛnea wo bɛtumi akyerɛ wo ho wɔ Krypto ne Web3 mu.",
      lessons: [
        {
          id: 1,
          title: "Krypto Ho Adesua",
          content: `Krypto yɛ sika a ɛyɛ digital a ɛyɛ anigye ne anigye.

**Nneɛma a ɛho hia:**
• **Blockchain**: Ledger a ɛyɛ anigye
• **Decentralization**: Ɛnyɛ baako na ɛkyerɛ
• **Cryptography**: Matematik a ɛyɛ anigye
• **Mining**: Adwuma a ɛyɛ anigye

**Krypto a ɛho hia:**
- Bitcoin (BTC): Krypto a ɛyɛ anigye
- Ethereum (ETH): Platform a ɛyɛ anigye
- Binance Coin (BNB): Token a ɛyɛ anigye`,
          duration: "10 minutes",
          type: "text"
        }
      ]
    },
    yo: {
      title: "Ìmọ̀ Kripto àti Web3",
      description: "Kọ́ nípa ìmọ̀ kripto, ìmọ̀ ẹ̀rọ blockchain, àti ìmọ̀ web tí kì í ṣe ti ẹnì kan.",
      lessons: [
        {
          id: 1,
          title: "Ìbẹ̀rẹ̀ Ìmọ̀ Kripto",
          content: `Kripto jẹ́ owó tí ó jẹ́ ọ̀rọ̀ ọ̀rọ̀ tí ó ń lo ìmọ̀ ẹ̀rọ fún ìdabobo.

**Ìmọ̀ Tí Ó Ṣe Pàtàkì:**
• **Blockchain**: Ìwé tí ó ń tọ́jú gbogbo ìṣe
• **Ìmọ̀ Ẹ̀rọ**: Kì í ṣe ti ẹnì kan
• **Ìmọ̀ Ẹ̀rọ**: Ìmọ̀ ẹ̀rọ fún ìmọ̀ ẹ̀rọ
• **Ìmọ̀ Ẹ̀rọ**: Ìmọ̀ ẹ̀rọ fún ìmọ̀ ẹ̀rọ`,
          duration: "10 minutes",
          type: "text"
        }
      ]
    }
  },
  
  // Add comprehensive content for all missing topics
  technology: {
    en: {
      title: "Modern Technology",
      description: "Explore cutting-edge technology including AI, machine learning, and digital innovation.",
      lessons: [
        {
          id: 1,
          title: "Introduction to Artificial Intelligence",
          content: `Artificial Intelligence (AI) is technology that enables machines to simulate human intelligence.

**Key AI Concepts:**
• **Machine Learning**: Algorithms that learn from data
• **Deep Learning**: Neural networks that mimic brain function
• **Natural Language Processing**: Understanding human language
• **Computer Vision**: Teaching machines to see and interpret images

**AI Applications:**
- Virtual assistants (Siri, Alexa)
- Recommendation systems (Netflix, Amazon)
- Autonomous vehicles
- Medical diagnosis systems`,
          duration: "12 minutes",
          type: "text"
        },
        {
          id: 2,
          title: "The Internet of Things (IoT)",
          content: `IoT connects everyday objects to the internet, creating smart environments.

**IoT Examples:**
• **Smart Homes**: Thermostats, lights, security systems
• **Wearable Technology**: Fitness trackers, smartwatches
• **Industrial IoT**: Manufacturing sensors, predictive maintenance
• **Smart Cities**: Traffic management, environmental monitoring

**Benefits of IoT:**
- Increased efficiency and automation
- Better data collection and analysis
- Improved quality of life
- Environmental monitoring and conservation`,
          duration: "10 minutes",
          type: "text"
        }
      ],
      quiz: {
        id: "technology_en_quiz",
        title: "Modern Technology Quiz",
        questions: [
          {
            id: 1,
            question: "What does AI stand for?",
            options: [
              "Artificial Intelligence",
              "Advanced Internet",
              "Automated Information",
              "Applied Innovation"
            ],
            correctAnswer: 0,
            explanation: "AI stands for Artificial Intelligence - technology that simulates human intelligence"
          },
          {
            id: 2,
            question: "What is the Internet of Things (IoT)?",
            options: [
              "Social media platforms",
              "Connecting objects to the internet",
              "Online shopping websites",
              "Video streaming services"
            ],
            correctAnswer: 1,
            explanation: "IoT connects everyday objects to the internet for automation and data collection"
          }
        ]
      }
    }
  },
  
  business: {
    en: {
      title: "Business and Entrepreneurship",
      description: "Learn essential business skills, entrepreneurship, and financial literacy.",
      lessons: [
        {
          id: 1,
          title: "Starting Your Own Business",
          content: `Entrepreneurship is the process of creating and running your own business venture.

**Key Business Elements:**
• **Business Plan**: A roadmap for your business success
• **Market Research**: Understanding your customers and competition
• **Financial Management**: Budgeting, pricing, and cash flow
• **Marketing Strategy**: Reaching and engaging your target audience

**Steps to Start:**
1. Identify a business opportunity
2. Research the market thoroughly
3. Create a detailed business plan
4. Secure funding and resources
5. Launch and market your business`,
          duration: "15 minutes",
          type: "text"
        },
        {
          id: 2,
          title: "Digital Marketing Fundamentals",
          content: `Digital marketing uses online channels to promote products and services.

**Digital Marketing Channels:**
• **Social Media**: Facebook, Instagram, LinkedIn, Twitter
• **Search Engine Optimization (SEO)**: Improving website visibility
• **Email Marketing**: Building customer relationships
• **Content Marketing**: Creating valuable content to attract customers

**Benefits of Digital Marketing:**
- Cost-effective compared to traditional methods
- Precise targeting and audience segmentation
- Measurable results and analytics
- Global reach and 24/7 availability`,
          duration: "12 minutes",
          type: "text"
        }
      ],
      quiz: {
        id: "business_en_quiz",
        title: "Business and Entrepreneurship Quiz",
        questions: [
          {
            id: 1,
            question: "What is the first step in starting a business?",
            options: [
              "Getting a loan",
              "Hiring employees",
              "Identifying a business opportunity",
              "Setting up a website"
            ],
            correctAnswer: 2,
            explanation: "The first step is identifying a business opportunity that solves a real problem"
          },
          {
            id: 2,
            question: "Which is NOT a digital marketing channel?",
            options: [
              "Social media",
              "Email marketing",
              "Billboard advertising",
              "Content marketing"
            ],
            correctAnswer: 2,
            explanation: "Billboard advertising is traditional marketing, not digital marketing"
          }
        ]
      }
    }
  },
  
  health: {
    en: {
      title: "Health and Wellness",
      description: "Learn about physical health, mental wellness, and healthy lifestyle choices.",
      lessons: [
        {
          id: 1,
          title: "Nutrition Fundamentals",
          content: `Good nutrition is the foundation of a healthy lifestyle and overall well-being.

**Essential Nutrients:**
• **Proteins**: Building blocks for muscles and tissues
• **Carbohydrates**: Primary energy source for the body
• **Fats**: Important for brain health and hormone production
• **Vitamins & Minerals**: Support various body functions
• **Water**: Essential for hydration and bodily processes

**Healthy Eating Principles:**
- Eat a variety of colorful fruits and vegetables
- Choose whole grains over refined grains
- Include lean proteins in your diet
- Limit processed foods and added sugars
- Stay hydrated throughout the day`,
          duration: "14 minutes",
          type: "text"
        },
        {
          id: 2,
          title: "Mental Health Awareness",
          content: `Mental health is just as important as physical health for overall well-being.

**Mental Health Components:**
• **Emotional Well-being**: Understanding and managing emotions
• **Psychological Well-being**: Positive thinking and self-esteem
• **Social Well-being**: Building healthy relationships
• **Cognitive Function**: Clear thinking and decision-making

**Mental Health Practices:**
- Practice mindfulness and meditation
- Maintain regular sleep patterns
- Exercise regularly for endorphin release
- Seek professional help when needed
- Build a support network of friends and family`,
          duration: "12 minutes",
          type: "text"
        }
      ],
      quiz: {
        id: "health_en_quiz",
        title: "Health and Wellness Quiz",
        questions: [
          {
            id: 1,
            question: "Which nutrient is the primary energy source for the body?",
            options: [
              "Proteins",
              "Carbohydrates",
              "Fats",
              "Vitamins"
            ],
            correctAnswer: 1,
            explanation: "Carbohydrates are the body's primary energy source, especially for the brain and muscles"
          },
          {
            id: 2,
            question: "What is NOT a component of mental health?",
            options: [
              "Emotional well-being",
              "Physical strength",
              "Social well-being",
              "Cognitive function"
            ],
            correctAnswer: 1,
            explanation: "Physical strength is related to physical health, not mental health"
          }
        ]
      }
    }
  },
  
  environment: {
    en: {
      title: "Environmental Science",
      description: "Learn about environmental conservation, climate change, and sustainable living.",
      lessons: [
        {
          id: 1,
          title: "Climate Change Basics",
          content: `Climate change refers to long-term changes in global weather patterns and temperatures.

**Causes of Climate Change:**
• **Greenhouse Gases**: Carbon dioxide, methane, and other gases trap heat
• **Human Activities**: Burning fossil fuels, deforestation, industrial processes
• **Natural Factors**: Volcanic eruptions, solar radiation variations
• **Land Use Changes**: Urbanization and agricultural expansion

**Effects of Climate Change:**
- Rising global temperatures
- Melting polar ice caps
- More frequent extreme weather events
- Rising sea levels
- Changes in precipitation patterns`,
          duration: "16 minutes",
          type: "text"
        },
        {
          id: 2,
          title: "Sustainable Living Practices",
          content: `Sustainable living reduces our environmental impact and promotes long-term ecological balance.

**Sustainable Practices:**
• **Energy Conservation**: Use renewable energy and energy-efficient appliances
• **Waste Reduction**: Recycle, compost, and minimize single-use items
• **Sustainable Transportation**: Walk, bike, or use public transport
• **Conscious Consumption**: Buy local, seasonal, and eco-friendly products

**Benefits of Sustainability:**
- Reduced environmental impact
- Lower utility bills and costs
- Improved health and well-being
- Contribution to global conservation efforts`,
          duration: "13 minutes",
          type: "text"
        }
      ],
      quiz: {
        id: "environment_en_quiz",
        title: "Environmental Science Quiz",
        questions: [
          {
            id: 1,
            question: "What are greenhouse gases?",
            options: [
              "Gases that cool the atmosphere",
              "Gases that trap heat in the atmosphere",
              "Gases that create rain",
              "Gases that clean the air"
            ],
            correctAnswer: 1,
            explanation: "Greenhouse gases trap heat in the atmosphere, contributing to global warming"
          },
          {
            id: 2,
            question: "Which is NOT a sustainable living practice?",
            options: [
              "Using renewable energy",
              "Recycling and composting",
              "Driving everywhere alone",
              "Buying local products"
            ],
            correctAnswer: 2,
            explanation: "Driving everywhere alone is not sustainable; walking, biking, or carpooling is better"
          }
        ]
      }
    }
  }
};

// Export the enhanced content
export default enhancedCourseContent;

// Export topics array for easy access
export const topics = [
  { id: 'culture', name: 'Cultural Studies', icon: '🏛️', description: 'Explore African cultures, traditions, and heritage' },
  { id: 'crypto', name: 'Cryptocurrency', icon: '₿', description: 'Learn about blockchain, Bitcoin, and digital currencies' },
  { id: 'food', name: 'African Cuisine', icon: '🍽️', description: 'Discover traditional African dishes and cooking methods' },
  { id: 'technology', name: 'Modern Technology', icon: '💻', description: 'Explore cutting-edge technology including AI and IoT' },
  { id: 'business', name: 'Business & Entrepreneurship', icon: '💼', description: 'Learn essential business skills and entrepreneurship' },
  { id: 'health', name: 'Health & Wellness', icon: '🏥', description: 'Learn about physical health and mental wellness' },
  { id: 'environment', name: 'Environmental Science', icon: '🌱', description: 'Learn about conservation and sustainable living' }
];

// Export quiz questions function
export const getQuizQuestions = (topicId, languageCode = 'en') => {
  const topic = enhancedCourseContent[topicId];
  if (!topic || !topic[languageCode] || !topic[languageCode].quiz) {
    return [];
  }
  
  return topic[languageCode].quiz.questions || [];
};
