// Dynamic course content based on topic and language selection
export const courseContent = {
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
- Preserves traditional customs

**Cultural Significance:**
- Strengthens community bonds
- Preserves oral traditions
- Educates younger generations
- Attracts cultural tourism`,
          duration: "10 minutes",
          type: "text"
        },
        {
          id: 3,
          title: "Art and Craftsmanship",
          content: `African arts and crafts reflect the continent's diverse cultures and skilled craftsmanship traditions.

**Traditional Arts:**

**Sculpture & Carving:**
- Masks for ceremonies and rituals
- Fertility symbols and spiritual artifacts
- Decorative stools and furniture

**Textiles:**
- Kente cloth weaving (Ghana)
- Mudcloth (Mali)
- Batik printing techniques

**Beadwork:**
- Maasai beaded jewelry
- Zulu ceremonial attire
- Trade bead traditions

**Modern Applications:**
- Contemporary African art movements
- Fashion and interior design
- Cultural preservation programs
- International art markets`,
          duration: "12 minutes",
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
• **Muziki na Ngoma**: Ngoma za jadi, densi za ibada, na aina za kisasa
• **Muundo wa Kijamii**: Msisitizo wa jamii, heshima kwa wazee, na falsafa ya ubuntu

**Maadili Muhimu:**
- Falsafa ya Ubuntu: "Mimi nipo kwa sababu sisi tupo"
- Heshima kwa mababu na utamaduni
- Ukarimu na msaada wa kijamii
- Utamaduni wa mdomo na hadithi`,
          duration: "dakika 8",
          type: "text"
        },
        {
          id: 2,
          title: "Sikukuu za Jadi",
          content: `Sikukuu za Kiafrika ni sherehe za rangi mbalimbali zinazounganisha jamii na utamaduni wa mababu.

**Sikukuu Muhimu:**

**Sikukuu ya Homowo (Watu wa Ga)**
- Maana: "Kudharau njaa"
- Inasherehekea mavuno mazuri
- Ina dansi za jadi na kuweka kpokpoi (chakula maalum)

**Sikukuu ya Timkat (Ethiopia)**
- Sherehe ya Kikristo ya Orthodox
- Maandamano ya rangi na ibada za maji
- Inasherehekea ubatizo wa Yesu

**Sikukuu ya Umhlanga (Swaziland)**
- Sherehe ya dansi ya mianzi
- Inasherehekea vijana wa kike na maadili ya kitamaduni
- Inahifadhi desturi za jadi

**Umuhimu wa Kitamaduni:**
- Kuimarisha uhusiano wa kijamii
- Kuhifadhi utamaduni wa mdomo
- Kuelimisha kizazi kipya
- Kuvuta utalii na faida za kiuchumi`,
          duration: "dakika 10",
          type: "text"
        },
        {
          id: 3,
          title: "Sanaa na Ufundi wa Jadi",
          content: `Sanaa na ufundi wa Kiafrika zinaonyesha utofauti wa kitamaduni na ujuzi wa kufundi.

**Sanaa za Jadi:**

**Uchongaji na Uchoraji:**
- Barakoa za ibada na sherehe
- Viumbe vya uzazi na vitu vya kiroho
- Mapambo ya viti na fanicha

**Nguo:**
- Ufumba wa nguo za Kente (Ghana)
- Nguo za udongo (Mali)
- Mbinu za kuchapa rangi za Batik

**Ushanga:**
- Mapambo ya ushanga ya Maasai
- Mavazi ya sherehe ya Zulu
- Utamaduni wa ushanga wa biashara

**Matumizi ya Kisasa:**
- Mzunguko wa sanaa ya Kiafrika ya kisasa
- Mtindo na mapambo ya ndani
- Programu za kuhifadhi utamaduni
- Masoko ya kimataifa ya sanaa`,
          duration: "dakika 12",
          type: "text"
        }
      ]
    }
  },
  crypto: {
    en: {
      title: "Cryptocurrency & Web3 Fundamentals",
      description: "Master the basics of blockchain technology, cryptocurrencies, and decentralized finance for the African market.",
      lessons: [
        {
          id: 1,
          title: "Introduction to Blockchain",
          content: `Blockchain is a revolutionary technology that enables secure, transparent, and decentralized transactions.

**What is Blockchain?**
• **Distributed Ledger**: A shared database across multiple computers
• **Immutability**: Records cannot be easily changed once written
• **Transparency**: All transactions are visible to network participants
• **Decentralization**: No single point of control or failure

**Key Components:**
- Blocks: Containers for transaction data
- Hashing: Cryptographic security mechanism
- Consensus: Agreement mechanism for network validation
- Miners/Validators: Network participants who verify transactions

**Real-World Applications:**
- Cryptocurrency transactions
- Supply chain tracking
- Digital identity verification
- Smart contracts and DeFi`,
          duration: "10 minutes",
          type: "text"
        },
        {
          id: 2,
          title: "Understanding Cryptocurrency",
          content: `Cryptocurrency is digital money secured by cryptography and powered by blockchain technology.

**Popular Cryptocurrencies:**

**Bitcoin (BTC)**
- First and most famous cryptocurrency
- Digital gold and store of value
- Limited supply of 21 million coins

**Ethereum (ETH)**
- Platform for smart contracts and DApps
- Powers most DeFi applications
- Enables programmable money

**Stablecoins (USDC, USDT)**
- Pegged to stable assets like USD
- Reduce volatility for payments
- Bridge between crypto and traditional finance

**African Context:**
- Mobile money integration potential
- Cross-border remittances
- Financial inclusion opportunities
- Protection against currency instability`,
          duration: "8 minutes",
          type: "text"
        },
        {
          id: 3,
          title: "DeFi and Financial Services",
          content: `Decentralized Finance (DeFi) recreates traditional financial services using blockchain technology.

**DeFi Services:**

**Lending & Borrowing:**
- Earn interest on crypto deposits
- Borrow against crypto collateral
- No traditional credit checks required

**Decentralized Exchanges (DEXs):**
- Trade cryptocurrencies directly
- No intermediaries or central authority
- Automated market makers (AMMs)

**Yield Farming:**
- Provide liquidity to earn rewards
- Multiple income streams
- Risk management considerations

**African Opportunities:**
- Access to global financial markets
- Lower barriers to entry
- Programmable financial products
- Integration with mobile money systems`,
          duration: "12 minutes",
          type: "text"
        }
      ]
    }
  },
  food: {
    en: {
      title: "African Cuisine & Culinary Traditions",
      description: "Explore the diverse and flavorful world of African cooking, from traditional recipes to modern fusion cuisine.",
      lessons: [
        {
          id: 1,
          title: "Staple Foods Across Africa",
          content: `African cuisine is incredibly diverse, with each region offering unique flavors and cooking techniques.

**Staple Grains & Carbohydrates:**
• **Rice**: Jollof rice, rice and beans, coconut rice
• **Cassava**: Fufu, garri, cassava bread
• **Plantains**: Fried plantains, plantain chips, kelewele
• **Yams**: Pounded yam, roasted yam, yam porridge
• **Millet & Sorghum**: Traditional porridges and beverages

**Regional Specialties:**
- **West Africa**: Palm oil-based stews, spicy peppers
- **East Africa**: Injera bread, berbere spice blends
- **North Africa**: Couscous, tagines, preserved lemons
- **Southern Africa**: Biltong, pap, boerewors

**Cooking Methods:**
- Open fire and clay pot cooking
- Fermentation techniques
- Smoking and preservation
- Communal preparation traditions`,
          duration: "10 minutes",
          type: "text"
        },
        {
          id: 2,
          title: "Popular African Dishes",
          content: `Discover iconic dishes that represent the rich culinary heritage of African cuisine.

**West African Classics:**

**Jollof Rice**
- Spiced rice dish with tomatoes and peppers
- National dish rivalry between Nigeria and Ghana
- Variations across the region

**Egusi Soup**
- Ground melon seed stew
- Rich in protein and vegetables
- Served with fufu or rice

**Kelewele**
- Spiced fried plantains
- Popular street food in Ghana
- Perfect balance of sweet and spicy

**East African Favorites:**

**Injera with Doro Wat**
- Spongy sourdough flatbread
- Spicy Ethiopian chicken stew
- Communal eating tradition

**Ugali**
- Cornmeal staple food
- Served with vegetables and meat
- Popular across East Africa`,
          duration: "8 minutes",
          type: "text"
        },
        {
          id: 3,
          title: "Modern African Cuisine",
          content: `Contemporary African chefs are revolutionizing traditional cuisine with modern techniques and global influences.

**Modern Trends:**

**Farm-to-Table Movement:**
- Emphasis on local, organic ingredients
- Sustainable farming practices
- Seasonal menu planning

**Fusion Cuisine:**
- African-Asian fusion dishes
- Continental influences on traditional recipes
- Modern presentation techniques

**Health-Conscious Adaptations:**
- Reducing oil content in traditional dishes
- Incorporating superfoods like baobab and moringa
- Vegetarian and vegan alternatives

**Restaurant Culture:**
- Fine dining African restaurants globally
- Food trucks and casual dining
- Cooking shows and culinary education
- Social media food culture

**Preservation Efforts:**
- Documenting traditional recipes
- Teaching younger generations
- Cultural food festivals
- Cookbook publications`,
          duration: "12 minutes",
          type: "text"
        }
      ]
    }
  },
  sports: {
    en: {
      title: "African Sports & Fitness",
      description: "Learn about traditional and modern sports culture across Africa, from athletics to football.",
      lessons: [
        {
          id: 1,
          title: "Traditional African Sports",
          content: `Africa has a rich tradition of sports and physical activities that predate modern organized sports.

**Traditional Games & Sports:**
• **Wrestling**: Popular across West and East Africa
• **Running**: Long-distance running traditions in East Africa
• **Stick Fighting**: Ceremonial combat sports
• **Swimming**: Traditional water sports in coastal regions
• **Archery**: Hunting and ceremonial archery

**Cultural Significance:**
- Rites of passage for young men and women
- Community bonding and celebration
- Physical fitness and warrior training
- Seasonal festivals and competitions

**Regional Variations:**
- **Senegalese Wrestling (Lutte)**: National sport with huge following
- **Ethiopian Running**: Highland training traditions
- **South African Rugby**: Cultural integration through sport
- **Nigerian Boxing**: Rich boxing heritage

**Modern Preservation:**
- Cultural sports festivals
- Integration into school curricula
- Tourist attractions and experiences
- International cultural exchanges`,
          duration: "8 minutes",
          type: "text"
        },
        {
          id: 2,
          title: "Football (Soccer) Culture",
          content: `Football is the most popular sport across Africa, uniting communities and creating global superstars.

**African Football Excellence:**

**Major Competitions:**
- Africa Cup of Nations (AFCON)
- CAF Champions League
- FIFA World Cup participation
- Olympic football tournaments

**Legendary Players:**
- **Pelé** (honorary mention for Brazilian-African heritage)
- **Samuel Eto'o** (Cameroon)
- **Didier Drogba** (Ivory Coast)
- **Mohamed Salah** (Egypt)
- **Sadio Mané** (Senegal)

**Development Programs:**
- Youth academies across the continent
- Grassroots football initiatives
- Women's football growth
- Infrastructure development

**Cultural Impact:**
- Community gathering and celebration
- Economic opportunities for youth
- National pride and identity
- Pan-African unity through sport`,
          duration: "10 minutes",
          type: "text"
        },
        {
          id: 3,
          title: "Athletics & Olympic Sports",
          content: `African athletes dominate middle and long-distance running, setting world records and inspiring generations.

**Running Powerhouses:**

**Kenya:**
- Rift Valley training grounds
- Altitude training advantages
- Marathon and steeplechase dominance
- Community running culture

**Ethiopia:**
- High-altitude training benefits
- Long-distance running tradition
- Legendary athletes like Haile Gebrselassie
- Women's running excellence

**Training Methods:**
- High-altitude conditioning
- Natural terrain training
- Group training systems
- Minimal equipment approach

**Other Olympic Sports:**
- **Swimming**: South African excellence
- **Boxing**: Rich tradition across the continent
- **Tennis**: Emerging talent development
- **Cycling**: Growing participation

**Sports Development:**
- Government investment in facilities
- International coaching exchanges
- Scholarship programs
- Sports science research`,
          duration: "12 minutes",
          type: "text"
        }
      ]
    }
  },
  science: {
    en: {
      title: "Science & Technology in Africa",
      description: "Explore scientific innovations, technology developments, and STEM education across the African continent.",
      lessons: [
        {
          id: 1,
          title: "Ancient African Science",
          content: `Africa has a rich history of scientific and technological innovations dating back thousands of years.

**Ancient Achievements:**
• **Mathematics**: Number systems and geometric principles
• **Astronomy**: Star charts and calendar systems
• **Medicine**: Traditional healing and surgical techniques
• **Metallurgy**: Iron working and bronze casting
• **Engineering**: Pyramid construction and irrigation systems

**Notable Civilizations:**
- **Ancient Egypt**: Medical papyri, architectural marvels
- **Kingdom of Kush**: Iron technology advancement
- **Great Zimbabwe**: Sophisticated stone construction
- **Timbuktu**: Centers of learning and scholarship

**Traditional Knowledge Systems:**
- Medicinal plant knowledge
- Agricultural techniques
- Weather prediction methods
- Sustainable resource management

**Modern Recognition:**
- UNESCO World Heritage sites
- Archaeological discoveries
- Academic research programs
- Cultural preservation efforts`,
          duration: "10 minutes",
          type: "text"
        },
        {
          id: 2,
          title: "Modern Technology Innovation",
          content: `Contemporary Africa is experiencing a technological revolution with innovative solutions to local challenges.

**Mobile Technology:**
- **M-Pesa**: Revolutionary mobile money system
- **Mobile Banking**: Financial inclusion through phones
- **E-Health**: Telemedicine and health apps
- **Digital Agriculture**: Farming apps and IoT sensors

**Renewable Energy:**
- **Solar Power**: Off-grid solar solutions
- **Hydroelectric**: Sustainable energy projects
- **Wind Energy**: Growing wind farm installations
- **Biogas**: Waste-to-energy innovations

**Tech Hubs:**
- **Silicon Savannah** (Kenya): Nairobi tech ecosystem
- **Yabacon Valley** (Nigeria): Lagos startup scene
- **Cape Town** (South Africa): Software development
- **Kigali** (Rwanda): Digital transformation

**Innovation Examples:**
- Drones for medical delivery
- AI-powered agricultural solutions
- Blockchain for supply chain tracking
- 3D printing for manufacturing`,
          duration: "8 minutes",
          type: "text"
        },
        {
          id: 3,
          title: "STEM Education & Future",
          content: `Investing in Science, Technology, Engineering, and Mathematics education is crucial for Africa's development.

**Educational Initiatives:**

**Government Programs:**
- STEM curriculum development
- Teacher training programs
- Laboratory equipment provision
- University partnerships

**Private Sector Involvement:**
- Corporate-sponsored schools
- Scholarship programs
- Internship opportunities
- Mentorship programs

**International Partnerships:**
- University exchange programs
- Research collaborations
- Technology transfer initiatives
- Development aid projects

**Challenges & Solutions:**
- **Infrastructure**: Building labs and internet connectivity
- **Brain Drain**: Retaining talent through opportunities
- **Gender Gap**: Encouraging girls in STEM
- **Rural Access**: Mobile learning solutions

**Future Opportunities:**
- Space technology development
- Biotechnology research
- Climate change solutions
- Digital transformation leadership`,
          duration: "12 minutes",
          type: "text"
        }
      ]
    }
  },
  business: {
    en: {
      title: "African Business & Entrepreneurship",
      description: "Learn about business opportunities, entrepreneurship culture, and economic development across Africa.",
      lessons: [
        {
          id: 1,
          title: "Traditional Trade & Commerce",
          content: `Africa has a long history of trade and commerce, with sophisticated trading networks spanning the continent.

**Historical Trade Routes:**
• **Trans-Saharan Trade**: Gold, salt, and ivory routes
• **Indian Ocean Trade**: Coastal trading posts and maritime commerce
• **Intra-African Trade**: Regional markets and barter systems
• **European Trade**: Colonial and post-colonial commerce

**Traditional Business Practices:**
- Market systems and trading posts
- Barter and early currency systems
- Craft guilds and specializations
- Seasonal trading patterns

**Cultural Business Values:**
- Ubuntu philosophy in business relationships
- Community-based enterprises
- Extended family business networks
- Reputation-based trust systems

**Modern Adaptations:**
- Informal sector entrepreneurship
- Microfinance and rotating credit
- Digital payment systems
- Cross-border trade facilitation`,
          duration: "8 minutes",
          type: "text"
        },
        {
          id: 2,
          title: "Modern Entrepreneurship",
          content: `Contemporary African entrepreneurs are creating innovative solutions and building successful businesses.

**Startup Ecosystem:**

**Tech Entrepreneurs:**
- Fintech solutions for financial inclusion
- AgTech innovations for farming
- HealthTech for medical access
- EdTech for education delivery

**Success Stories:**
- **Jumia**: African e-commerce giant
- **Flutterwave**: Payment processing platform
- **Andela**: Tech talent development
- **Zipline**: Medical drone delivery

**Business Models:**
- Mobile-first solutions
- Leapfrog technology adoption
- Social impact enterprises
- Circular economy businesses

**Support Systems:**
- Incubators and accelerators
- Angel investors and VC funds
- Government startup programs
- International development partners

**Challenges:**
- Access to capital and funding
- Regulatory and legal frameworks
- Infrastructure limitations
- Skilled talent availability`,
          duration: "10 minutes",
          type: "text"
        },
        {
          id: 3,
          title: "Economic Development",
          content: `African economies are diversifying and growing, with new opportunities emerging across sectors.

**Economic Sectors:**

**Agriculture:**
- Modernization and value addition
- Organic and sustainable farming
- Export market development
- Food processing industries

**Manufacturing:**
- Textile and garment production
- Automotive assembly
- Food and beverage processing
- Pharmaceutical manufacturing

**Services:**
- Tourism and hospitality
- Financial services expansion
- Creative industries growth
- Professional services development

**Regional Integration:**
- **African Continental Free Trade Area (AfCFTA)**
- Regional economic communities
- Infrastructure development projects
- Harmonized trade policies

**Investment Opportunities:**
- Renewable energy projects
- Infrastructure development
- Digital transformation
- Healthcare system improvement

**Future Trends:**
- Youth demographic dividend
- Urbanization opportunities
- Technology adoption acceleration
- Sustainable development focus`,
          duration: "12 minutes",
          type: "text"
        }
      ]
    }
  },
  history: {
    en: {
      title: "African History & Civilizations",
      description: "Discover the rich history of African civilizations, from ancient kingdoms to modern nations.",
      lessons: [
        {
          id: 1,
          title: "Ancient African Civilizations",
          content: `Africa is home to some of the world's oldest and most sophisticated civilizations.

**Major Ancient Civilizations:**
• **Ancient Egypt (3100-30 BCE)**: Pyramids, hieroglyphics, advanced medicine
• **Kingdom of Kush (1070 BCE-350 CE)**: Nubian pharaohs, iron technology
• **Kingdom of Aksum (100-960 CE)**: Trade empire, early Christianity
• **Great Zimbabwe (1220-1450 CE)**: Stone architecture, gold trade

**Achievements:**
- **Architecture**: Pyramids, Great Zimbabwe, rock churches
- **Writing Systems**: Hieroglyphics, Meroitic script, Ge'ez
- **Technology**: Iron working, astronomy, mathematics
- **Trade Networks**: Saharan, Indian Ocean, Mediterranean

**Cultural Contributions:**
- Religious and philosophical systems
- Artistic traditions and craftsmanship
- Agricultural innovations
- Social and political organization

**Archaeological Evidence:**
- UNESCO World Heritage Sites
- Museum collections worldwide
- Ongoing excavations and discoveries
- Digital preservation projects`,
          duration: "10 minutes",
          type: "text"
        },
        {
          id: 2,
          title: "Medieval African Kingdoms",
          content: `Medieval Africa saw the rise of powerful kingdoms and empires that controlled vast territories and trade routes.

**West African Empires:**

**Ghana Empire (300-1200 CE)**
- Controlled gold and salt trade
- Advanced taxation and military systems
- Islamic influence and cultural exchange

**Mali Empire (1235-1670 CE)**
- Founded by Sundiata Keita
- Mansa Musa's legendary pilgrimage
- Timbuktu as center of learning

**Songhai Empire (1464-1591 CE)**
- Largest empire in African history
- Advanced administration and military
- Islamic scholarship and trade

**East African Kingdoms:**
- **Kingdom of Ethiopia**: Christian kingdom, unique architecture
- **Swahili City-States**: Coastal trading centers
- **Kingdom of Buganda**: Complex political system

**Achievements:**
- Sophisticated governance systems
- International trade and diplomacy
- Educational and religious centers
- Cultural and artistic flowering`,
          duration: "8 minutes",
          type: "text"
        },
        {
          id: 3,
          title: "Colonial Period & Independence",
          content: `The colonial period profoundly impacted Africa, but independence movements restored African sovereignty.

**Colonial Era (1880s-1960s):**
- **Scramble for Africa**: European partition
- **Colonial Administration**: Different colonial systems
- **Economic Exploitation**: Resource extraction
- **Cultural Impact**: Education, religion, language

**Resistance Movements:**
- **Battle of Adwa (1896)**: Ethiopian victory
- **Mau Mau Uprising**: Kenyan resistance
- **Algerian War**: North African independence
- **Cultural Resistance**: Preservation of traditions

**Independence Era (1950s-1990s):**
- **Ghana (1957)**: First sub-Saharan independence
- **Year of Africa (1960)**: Multiple independences
- **Liberation Movements**: Armed and peaceful struggles
- **Pan-Africanism**: Continental unity movements

**Post-Independence Challenges:**
- Nation-building and governance
- Economic development priorities
- Cultural renaissance movements
- Regional integration efforts

**Modern Africa:**
- Democratic transitions
- Economic growth and development
- Cultural pride and identity
- Global partnership and leadership`,
          duration: "12 minutes",
          type: "text"
        }
      ]
    }
  },
  arts: {
    en: {
      title: "African Arts & Creative Expression",
      description: "Explore the vibrant world of African arts, from traditional crafts to contemporary creative expressions.",
      lessons: [
        {
          id: 1,
          title: "Traditional African Arts",
          content: `African traditional arts are deeply connected to spiritual, social, and cultural practices.

**Visual Arts:**
• **Sculpture**: Masks, statues, and ceremonial objects
• **Painting**: Rock art, body painting, decorative arts
• **Textiles**: Weaving, dyeing, and embroidery techniques
• **Pottery**: Functional and ceremonial ceramics
• **Jewelry**: Beadwork, metalwork, and adornment

**Spiritual & Ceremonial Art:**
- Masks for rituals and festivals
- Ancestral figures and shrines
- Religious symbols and totems
- Healing and protective objects

**Regional Styles:**
- **West Africa**: Bronze casting, wood carving
- **East Africa**: Makonde sculptures, Maasai beadwork
- **Central Africa**: Kuba textiles, Chokwe masks
- **Southern Africa**: Rock paintings, San art

**Materials & Techniques:**
- Natural materials: wood, clay, fiber, stone
- Traditional tools and methods
- Natural dyes and pigments
- Sustainable practices`,
          duration: "8 minutes",
          type: "text"
        },
        {
          id: 2,
          title: "Music & Performance Arts",
          content: `Music and performance are integral to African culture, serving social, spiritual, and entertainment purposes.

**Traditional Music:**

**Instruments:**
- **Drums**: Djembe, talking drums, ceremonial drums
- **String Instruments**: Kora, mbira, musical bow
- **Wind Instruments**: Flutes, horns, whistles
- **Percussion**: Shakers, bells, xylophones

**Musical Traditions:**
- **Griot Tradition**: West African storytelling through music
- **Call and Response**: Interactive musical conversations
- **Polyrhythms**: Complex rhythmic patterns
- **Praise Songs**: Honoring leaders and ancestors

**Dance Traditions:**
- Ceremonial and ritual dances
- Seasonal and harvest celebrations
- Rites of passage performances
- Storytelling through movement

**Modern Evolution:**
- **Highlife**: Ghana and Nigeria popular music
- **Soukous**: Central African dance music
- **Mbaqanga**: South African jazz fusion
- **Afrobeats**: Contemporary global phenomenon

**Global Influence:**
- Jazz and blues foundations
- Rock and pop music elements
- World music collaborations
- Cultural exchange programs`,
          duration: "10 minutes",
          type: "text"
        },
        {
          id: 3,
          title: "Contemporary African Arts",
          content: `Modern African artists are creating innovative works that bridge traditional and contemporary expressions.

**Visual Arts Movement:**

**Contemporary Painters:**
- **El Anatsui** (Ghana): Bottle cap installations
- **Kehinde Wiley** (Nigerian-American): Portrait paintings
- **William Kentridge** (South Africa): Animation and drawing
- **Marlene Dumas** (South Africa): Expressive paintings

**Sculpture & Installation:**
- Large-scale public artworks
- Environmental and recycled materials
- Interactive and digital installations
- Community-based art projects

**Photography & Digital Arts:**
- Documentary photography movements
- Digital art and multimedia
- Fashion and lifestyle photography
- Social media art platforms

**Literature & Film:**
- **Nobel Prize Winners**: Wole Soyinka, Nadine Gordimer, J.M. Coetzee
- **Film Industry Growth**: Nollywood, South African cinema
- **Literary Festivals**: Continental and international recognition
- **Digital Publishing**: Online platforms and e-books

**Fashion & Design:**
- **African Fashion Week**: Global fashion recognition
- **Contemporary Designers**: Modern interpretations of traditional styles
- **Sustainable Fashion**: Ethical and eco-friendly practices
- **Cultural Fusion**: Afrofuturism and global influences

**Art Market Development:**
- African art fairs and galleries
- International museum acquisitions
- Art investment and collecting
- Cultural tourism and creative industries`,
          duration: "12 minutes",
          type: "text"
        }
      ]
    }
  }
};

export const getQuizQuestions = (topicId, languageCode = 'en') => {
  const quizData = {
    culture: {
      en: [
        {
          question: "What does Ubuntu philosophy mean?",
          options: ["I am because we are", "Individual success", "Modern technology", "Western values"],
          correct: 0,
          explanation: "Ubuntu is an African philosophy emphasizing interconnectedness and community."
        },
        {
          question: "Which festival celebrates 'hooting at hunger'?",
          options: ["Timkat", "Homowo", "Umhlanga", "Yam Festival"],
          correct: 1,
          explanation: "Homowo festival in Ghana celebrates successful harvest and abundance."
        },
        {
          question: "Kente cloth originally represented what?",
          options: ["Common clothing", "Royalty and honor", "Work uniforms", "Foreign influence"],
          correct: 1,
          explanation: "Kente cloth was traditionally worn by royalty and symbolized honor and status."
        }
      ],
      sw: [
        {
          question: "Falsafa ya Ubuntu inamaanisha nini?",
          options: ["Mimi nipo kwa sababu sisi tupo", "Mafanikio ya kibinafsi", "Teknolojia ya kisasa", "Maadili ya Kizungu"],
          correct: 0,
          explanation: "Ubuntu ni falsafa ya Kiafrika inayosisitiza uhusiano na ujamaa."
        },
        {
          question: "Sikukuu gani inasherehekea 'kudharau njaa'?",
          options: ["Timkat", "Homowo", "Umhlanga", "Sikukuu ya Ndizi"],
          correct: 1,
          explanation: "Sikukuu ya Homowo nchini Ghana inasherehekea mavuno mazuri na wingi."
        },
        {
          question: "Nguo za Kente asili ziliwakilisha nini?",
          options: ["Nguo za kawaida", "Ufalme na heshima", "Sare za kazi", "Ushawishi wa kigeni"],
          correct: 1,
          explanation: "Nguo za Kente zilivaliwak na wafalme na kuwakilisha heshima na hadhi."
        }
      ]
    },
    crypto: {
      en: [
        {
          question: "What is the key feature of blockchain technology?",
          options: ["Centralized control", "Immutability", "High fees", "Slow transactions"],
          correct: 1,
          explanation: "Blockchain's immutability means records cannot be easily changed once written."
        },
        {
          question: "What does DeFi stand for?",
          options: ["Digital Finance", "Decentralized Finance", "Distributed Finance", "Direct Finance"],
          correct: 1,
          explanation: "DeFi stands for Decentralized Finance, recreating traditional financial services on blockchain."
        },
        {
          question: "What is a stablecoin?",
          options: ["Volatile cryptocurrency", "Cryptocurrency pegged to stable assets", "Mining reward", "Blockchain protocol"],
          correct: 1,
          explanation: "Stablecoins are cryptocurrencies pegged to stable assets like USD to reduce volatility."
        }
      ]
    },
    food: {
      en: [
        {
          question: "Which dish has a friendly rivalry between Nigeria and Ghana?",
          options: ["Fufu", "Jollof Rice", "Kelewele", "Egusi"],
          correct: 1,
          explanation: "Jollof Rice is claimed as a national dish by both Nigeria and Ghana, creating a friendly rivalry."
        },
        {
          question: "What is Injera?",
          options: ["Spicy stew", "Spongy flatbread", "Fried plantains", "Rice dish"],
          correct: 1,
          explanation: "Injera is a spongy sourdough flatbread from Ethiopia, eaten with various stews."
        },
        {
          question: "What is the main ingredient in Egusi soup?",
          options: ["Cassava", "Ground melon seeds", "Rice", "Plantains"],
          correct: 1,
          explanation: "Egusi soup is made primarily from ground melon seeds and is rich in protein."
        }
      ]
    },
    sports: {
      en: [
        {
          question: "What is Senegal's national sport?",
          options: ["Football", "Wrestling (Lutte)", "Running", "Boxing"],
          correct: 1,
          explanation: "Senegalese Wrestling (Lutte) is the national sport with a huge cultural following."
        },
        {
          question: "Which region is famous for producing world-class distance runners?",
          options: ["West Africa", "Rift Valley (East Africa)", "North Africa", "Central Africa"],
          correct: 1,
          explanation: "The Rift Valley region in East Africa, particularly Kenya and Ethiopia, is renowned for distance running."
        },
        {
          question: "Who is considered one of Africa's greatest football players from Ivory Coast?",
          options: ["Samuel Eto'o", "Mohamed Salah", "Didier Drogba", "Sadio Mané"],
          correct: 2,
          explanation: "Didier Drogba from Ivory Coast is considered one of Africa's greatest footballers."
        }
      ]
    },
    science: {
      en: [
        {
          question: "Which ancient African civilization is known for pyramid construction?",
          options: ["Kingdom of Kush", "Ancient Egypt", "Great Zimbabwe", "Kingdom of Aksum"],
          correct: 1,
          explanation: "Ancient Egypt is famous for its pyramid construction and architectural marvels."
        },
        {
          question: "What does M-Pesa represent in African technology?",
          options: ["Social media platform", "Mobile money system", "E-commerce site", "Gaming app"],
          correct: 1,
          explanation: "M-Pesa is a revolutionary mobile money system that transformed financial inclusion in Africa."
        },
        {
          question: "Which city is known as 'Silicon Savannah'?",
          options: ["Lagos", "Cape Town", "Nairobi", "Kigali"],
          correct: 2,
          explanation: "Nairobi, Kenya is known as 'Silicon Savannah' due to its thriving tech ecosystem."
        }
      ]
    },
    business: {
      en: [
        {
          question: "What does AfCFTA stand for?",
          options: ["African Continental Free Trade Area", "African Commercial Finance Trade Agreement", "African Cultural Free Trade Alliance", "African Continental Finance Trade Area"],
          correct: 0,
          explanation: "AfCFTA stands for African Continental Free Trade Area, promoting intra-African trade."
        },
        {
          question: "Which African e-commerce company is considered a continental giant?",
          options: ["Konga", "Takealot", "Jumia", "Kilimall"],
          correct: 2,
          explanation: "Jumia is considered Africa's e-commerce giant, operating across multiple African countries."
        },
        {
          question: "What business philosophy emphasizes community relationships in African business?",
          options: ["Capitalism", "Ubuntu", "Socialism", "Individualism"],
          correct: 1,
          explanation: "Ubuntu philosophy emphasizes community relationships and interconnectedness in business."
        }
      ]
    },
    history: {
      en: [
        {
          question: "Who was the famous ruler of Mali Empire known for his wealth?",
          options: ["Sundiata Keita", "Mansa Musa", "Askia Mohammed", "Hannibal"],
          correct: 1,
          explanation: "Mansa Musa of Mali Empire was known for his legendary wealth and pilgrimage to Mecca."
        },
        {
          question: "Which was the first sub-Saharan African country to gain independence?",
          options: ["Nigeria", "Kenya", "Ghana", "Senegal"],
          correct: 2,
          explanation: "Ghana was the first sub-Saharan African country to gain independence in 1957."
        },
        {
          question: "What was significant about the Battle of Adwa in 1896?",
          options: ["Colonial victory", "Ethiopian victory over Italy", "Trade agreement", "Religious conversion"],
          correct: 1,
          explanation: "The Battle of Adwa was a significant Ethiopian victory over Italian colonial forces."
        }
      ]
    },
    arts: {
      en: [
        {
          question: "What is a Griot in West African culture?",
          options: ["Warrior", "Storyteller through music", "Trader", "Farmer"],
          correct: 1,
          explanation: "A Griot is a traditional West African storyteller who preserves history through music and oral tradition."
        },
        {
          question: "Which musical instrument is known as the African 'talking drum'?",
          options: ["Djembe", "Kora", "Talking drum", "Mbira"],
          correct: 2,
          explanation: "The talking drum can mimic human speech patterns and is used for communication across distances."
        },
        {
          question: "What is Nollywood?",
          options: ["South African music", "Nigerian film industry", "Ghanaian fashion", "Kenyan art movement"],
          correct: 1,
          explanation: "Nollywood refers to Nigeria's film industry, one of the largest in the world."
        }
      ]
    }
  };

  return quizData[topicId]?.[languageCode] || quizData[topicId]?.en || [];
};
