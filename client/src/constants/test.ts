const coffee = [
  {
    position: 1,
    title: "Coffee",
    snippet:
      "Coffee is a beverage brewed from roasted, ground coffee beans. Darkly colored, bitter, and slightly acidic, coffee has a stimulating effect on humans, primarily due to its caffeine content, but decaffeinated coffee is also commercially available. There are also various coffee substitutes.",
    source: "Wikipedia",
  },
  {
    position: 2,
    title: "Specialty Coffee Beans",
    snippet:
      "Shop our specialty coffee collection online. Stock up on your favorite single origin coffee, espresso, decaf, coffee blends, and more at Blue Bottle Coffee.",
    source: "Blue Bottle Coffee",
  },
  {
    position: 3,
    title: "coffee.",
    snippet:
      "Coffee that has been sourced, imported, roasted, and curated by us. From light to dark, single-origins to blends, we have a responsibly sourced coffee for ...",
    source: "Think Coffee NYC",
  },
  {
    position: 4,
    title: "Starbucks Coffee Company",
    snippet:
      "More than just great coffee. Explore the menu, sign up for Starbucks® Rewards, manage your gift card and more.",
    source: "Starbucks Coffee",
  },
  {
    position: 5,
    title: "r/Coffee",
    snippet:
      "thread where you can share what you are brewing or ask for bean recommendations. This is a place to share and talk about your favorite coffee roasters or beans.",
    source: "Reddit · r/Coffee",
  },
  {
    position: 6,
    title: "Buy Coffee, Tea, Powders Online | The Coffee Bean & Tea ...",
    snippet:
      "Buy exceptional coffee, tea, powders, equipment and drinkware at The Coffee Bean & Tea Leaf® online store to enjoy our globally sourced products at home.",
    source: "The Coffee Bean & Tea Leaf",
  },
  {
    position: 7,
    title: "Baronet Coffee Roasters: Baronet Coffee Home",
    snippet:
      "Baronet Coffee has been importing and roasting high quality coffee since 1930. For four generations, Baronet Coffee has never lost focus on what has made us ...",
    source: "Baronet Coffee Roasters",
  },
  {
    position: 8,
    title: "9 Reasons Why (the Right Amount of) Coffee Is Good for You",
    snippet:
      "Drinking one to two cups of coffee a day may help ward off heart failure, when a weakened heart has difficulty pumping enough blood to the body. You ...",
    source: "Johns Hopkins Medicine",
  },
  {
    position: 9,
    title: "COFFEE Definition & Meaning",
    snippet:
      "The meaning of COFFEE is a beverage made by percolation, infusion, or decoction from the roasted and ground seeds of a coffee plant.",
    source: "Merriam-Webster",
  },
  {
    position: 10,
    title: "Black Rifle Coffee",
    snippet:
      "Black Rifle Coffee Company is a SOF veteran-owned coffee company, serving premium coffee and culture to people who love America.",
    source: "Black Rifle Coffee",
  },
  {
    position: 11,
    title: "Community Coffee | #1 Family-Owned Retail Coffee Brand ...",
    snippet:
      "From responsible sourcing to expert roasting, we make our premium coffee with over 105 years of experience.",
    source: "Community Coffee",
  },
  {
    position: 12,
    title: "Scooter's Coffee | Be Amazing",
    snippet:
      "Wake up to the ahhh-mazing aroma of quality. Subscribe to Scooter's Coffee® delivery and enjoy 100% Arabica beans, sourced directly from farmers.",
    source: "Scooter's Coffee",
  },
  {
    position: 13,
    title: "Coffee Geek",
    snippet:
      "CoffeeGeek is the most read coffee and espresso resource online today. Launched in 2001, the website has over 10000 pages of coffee content.",
    source: "CoffeeGeek",
  },
  {
    position: 14,
    title: "What is coffee? - NCA",
    snippet:
      "What is coffee made of? Learn about the coffee tree, its lifespan, how it produces coffee beans, and the two most common coffee species, arabica and robusta.",
    source: "aboutcoffee.org",
  },
  {
    position: 15,
    title: "THE BEST Coffee & Tea in New York City",
    snippet:
      "Coffee & Tea in New York City, New York: Find Tripadvisor traveler reviews of New York City Coffee & Tea and search by price, location, ...",
    source: "Tripadvisor",
  },
  {
    position: 16,
    title: "Counter Culture Coffee",
    snippet:
      "The highest-quality coffee from our global network of producers, roasted to perfection, and conveniently auto-shipped on your schedule.",
    source: "Counter Culture Coffee",
  },
  {
    position: 17,
    title: "Elixr Coffee - Philadelphia",
    snippet:
      "We are on a mission to deliver transformative coffee experiences through the sourcing, roasting, brewing and serving of the planet's most unique coffees.",
    source: "Elixr Coffee",
  },
  {
    position: 18,
    title: "Coffee health benefits: Diabetes, heart health, liver cancer, ...",
    snippet:
      "Coffee contains a number of useful nutrients, including riboflavin (vitamin B2), niacin (vitamin B3), magnesium, potassium, and various phenolic compounds, or ...",
    source: "Medical News Today",
  },
  {
    position: 19,
    title: "The Top 5 Things You NEED To Know About Coffee ...",
    snippet:
      "Today we’re going to talk about five things you should know about coffee. These tips are focused a little bit more towards folks who are just starting their coffee journey.",
    source: "YouTube · Seattle Coffee Gear",
  },
  {
    position: 20,
    title: "About Coffee",
    snippet:
      "About Coffee. It has always been about coffee! Home · Story · Gallery ... Coffee · Pastries.",
    source: "aboutcoffee.nyc",
  },
  {
    position: 21,
    title: "Coffee - Price - Chart - Historical Data - News",
    snippet:
      "Coffee fell to 296.50 USd/Lbs on July 29, 2025, down 1.72% from the previous day. Over the past month, Coffee's price has fallen 2.32%, but it is still 28.65% ...",
    source: "Trading Economics",
  },
  {
    position: 22,
    title: "Coffee Beanery | Flavored Coffees & Coffee Gift Baskets",
    snippet:
      "40+ Flavored Coffees & Coffee Pods | Gourmet Coffee Gift Baskets | Swiss Water Process Decaf Coffee | 100% Specialty Arabica Coffee Roasts | Since 1976.",
    source: "Coffee Beanery",
  },
  {
    position: 23,
    title: "Coffee | Ground Coffee | Delicious Coffee | Coffee.org",
    snippet:
      "Shop by categories of coffee, tea, condiments, k-cups and Fresh Roast Coffee Beans - Fresh Coffee subscriptions of fresh roasted coffee to order.",
    source: "Coffee.org",
  },
  {
    position: 24,
    title: "Coffee Quality Institute (CQI)",
    snippet:
      "Coffee Quality Institute (CQI) is a non-profit organization working internationally to improve the quality of coffee and the lives of people who produce it. Learn more. 1.. CQI will cease administration of the Q Grader Course on September 30, 2025. Please see FAQs for details.",
    source: "Coffee Quality Institute",
  },
  {
    position: 25,
    title: "Brewing - NCA - About Coffee",
    snippet:
      "In these pages, you can explore how to brew coffee using some of the most popular methods: drip, pour-over, espresso, French press, and cold brew.",
    source: "aboutcoffee.org",
  },
  {
    position: 26,
    title: "Coffee - The Strategist",
    snippet:
      "The best coffee recommendations on the Strategist, from coffee grinders and makers to expert-recommended coffee beans.",
    source: "New York Magazine",
  },
  {
    position: 27,
    title: "9 Health Benefits of Coffee: What the Science Says",
    snippet:
      "Coffee does more than boost your energy. A few daily cups of coffee may also lower your risk of type 2 diabetes and depression, support weight management,",
    source: "Healthline",
  },
  {
    position: 28,
    title: "About Coffee",
    snippet:
      "A guide to our consumer website all about coffee—from its origins to the different types of coffee, brewing methods, independent research on coffee and health, ...",
    source: "National Coffee Association",
  },
  {
    position: 29,
    title: "10 Chefs From 10 Countries Make Coffee | Epicurious",
    snippet:
      "What does a cup of coffee look like around the world? Epicurious brings together 10 chefs from 10 different countries to share their take on this universally loved drink. From a classic French press to a rich Turkish roast, explore how each culture reinvents the humble cup of coffee in their own ...",
    source: "YouTube · Epicurious",
  },
  {
    position: 30,
    title: "Caribou Coffee® | Life Is Short. Stay Awake For It®",
    snippet:
      "Caribou Coffee® is more than a premium coffeehouse featuring high-quality, handcrafted beverages and food. Explore our menu, sign up for Caribou Coffee® ...",
    source: "Caribou Coffee",
  },
  {
    position: 31,
    title: "Climate change has sent coffee prices soaring. Tariffs will ...",
    snippet:
      "From drought-stricken farms to rising trade barriers, the global coffee industry is facing unprecedented strain.",
    source: "Grist.org",
  },
  {
    position: 32,
    title: "Health Benefits of Coffee",
    snippet:
      "What health benefits does coffee offer? · 1. Improve overall health. · 2. Protect against Type 2 diabetes. · 3. Control Parkinson's disease symptoms. · 4. Slow ...",
    source: "Rush University Medical Center",
  },
  {
    position: 33,
    title: "Cartel Roasting Co. | The go-to destination for coffee ...",
    snippet:
      "At Cartel Roasting Co., we source excellent beans from around the world and roast them to perfection. Shop our selection of single origin and blend offerings ...",
    source: "Cartel Roasting Co",
  },
  {
    position: 34,
    title: 'Tanner Colson on Instagram: "Making coffee with no gear ...',
    snippet:
      "They get coffee from some of the best roasters in the world, brew it at 10x strength, and flash freeze it after brewing to lock in the flavors.",
    source: "Instagram · tannercolsoncoffee",
  },
  {
    position: 35,
    title: "Coffee - Walmart.com",
    snippet:
      "Shop for Coffee at Walmart.com. Buy Ground coffee, coffee pods, instant coffee, and whole bean coffee. Save money. Live better.",
    source: "Walmart",
  },
  {
    position: 36,
    title: "Coffee Champions Share No BS Tips That Actually Work",
    snippet:
      "Find the ratio the grind size the recipe the temperature all that stuff that just works for you and then just play around with just one variability time.",
    source: "YouTube · The Coffee Chronicler",
  },
  {
    position: 37,
    title: "Make my morning coffee with me 😌☕️",
    snippet:
      "And then the water that I put in this chamber ends up bubbling up through the coffee and into this chamber and then my coffee will be ready.",
    source: "Instagram",
  },
  {
    position: 38,
    title: "Kona Coffee Purveyors — 100% Kona Coffee from craft ...",
    snippet:
      "100% Kona Coffee from Hawaii's most celebrated craft roaster, Kona Coffee Purveyors. Buy incredible Hawaiian coffee like Kona Coffee, Ka'u coffee and Maui ...",
    source: "Kona Coffee Purveyors",
  },
  {
    position: 39,
    title: "Best Iced Coffee Recipe - How to Make Perfect ...",
    snippet:
      "To make iced coffee, pack a glass full of ice cubes. Fill the glass 2/3 full with coffee liquid. Add a healthy splash of half-and-half. Add 2 to 3 tablespoons ...",
    source: "The Pioneer Woman",
  },
  {
    position: 40,
    title: "Got a cold brew as my second coffee today and I was ...",
    snippet:
      "Got a cold brew as my second coffee today and I was bouncing off the walls #my40somethinglife #over40 #vlog ... Sooo cute! I love it!!!",
    source: "Instagram · itsmejenwhite",
  },
];
