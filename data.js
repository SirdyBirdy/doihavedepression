// -----------------------------------------
//  DATA -- doihavedepression.com
// -----------------------------------------

// PHQ-9 questions (Patient Health Questionnaire)
// Kroenke K, Spitzer RL, Williams JB. The PHQ-9. J Gen Intern Med. 2001;16(9):606-613.
const PHQ9 = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself, or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed, or the opposite: being so fidgety or restless that you have moved around a lot more than usual",
  "Thoughts that you would be better off dead, or of hurting yourself in some way",
];

const PHQ9_OPTIONS = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day", value: 3 },
];

// Score bands per Kroenke et al. 2001
const PHQ9_RESULTS = [
  {
    min: 0,
    max: 4,
    zone: "zone-minimal",
    title: "Minimal or no depression",
    desc: "Your score suggests you're not experiencing significant depressive symptoms right now. That said, if something brought you here today, trust that instinct. How we feel can shift, and it's always okay to talk to someone.",
    guidance: "No action required based on score alone. If you've been feeling off in ways this questionnaire didn't quite capture, a conversation with your GP is always a reasonable step.",
    showResources: false,
    showCrisis: false,
  },
  {
    min: 5,
    max: 9,
    zone: "zone-mild",
    title: "Mild depression",
    desc: "Your score suggests you may be experiencing mild depressive symptoms. This level of distress is real and worth paying attention to. Many people notice these feelings come and go, but that doesn't make them less important.",
    guidance: "Consider speaking with your GP or a counsellor, especially if these feelings have been present for more than two weeks. Self-care strategies like regular sleep, movement, and social connection can help, but professional support is often more effective.",
    showResources: true,
    showCrisis: false,
  },
  {
    min: 10,
    max: 14,
    zone: "zone-moderate",
    title: "Moderate depression",
    desc: "Your score is in the moderate range. This level of depression can make daily life feel significantly harder, and it often doesn't lift on its own without some form of support.",
    guidance: "We'd encourage you to speak with a GP or mental health professional soon. Effective treatments exist, and many people find significant relief with therapy, medication, or both. You don't have to manage this alone.",
    showResources: true,
    showCrisis: false,
  },
  {
    min: 15,
    max: 19,
    zone: "zone-moderately-severe",
    title: "Moderately severe depression",
    desc: "Your score suggests moderately severe depression. Symptoms at this level typically have a significant impact on how you function day to day, in relationships, at work, and in how you feel about yourself.",
    guidance: "Please reach out to a GP or mental health professional as soon as you can. This level of depression responds well to treatment, but waiting usually makes things harder. If you're not sure where to start, the resources below can help.",
    showResources: true,
    showCrisis: true,
  },
  {
    min: 20,
    max: 27,
    zone: "zone-severe",
    title: "Severe depression",
    desc: "Your score indicates severe depression. If this is where you are right now, we want you to know that reaching this level doesn't mean something is permanently wrong with you. It means you need and deserve real support, soon.",
    guidance: "Please contact a GP, mental health professional, or crisis line today. Severe depression is a medical condition that responds to treatment. The crisis contacts below are available right now, at any hour, if you need to talk to someone immediately.",
    showResources: true,
    showCrisis: true,
  },
];

const CRISIS_LINES = [
  {
    name: "iCall (India)",
    number: "9152987821",
    desc: "Monday to Saturday, 8am to 10pm",
    url: "https://icallhelpline.org",
  },
  {
    name: "Vandrevala Foundation",
    number: "1860-2662-345",
    desc: "24/7, free, confidential",
    url: "https://www.vandrevalafoundation.com",
  },
  {
    name: "Snehi",
    number: "044-24640050",
    desc: "Monday to Saturday, 8am to 10pm",
    url: "https://www.snehiindia.org",
  },
  {
    name: "iMumz / Mann Talks",
    number: null,
    desc: "Chat-based support in Hindi and English",
    url: "https://manntalks.org",
  },
  {
    name: "Crisis Text Line (US)",
    number: "Text HOME to 741741",
    desc: "Free, 24/7 text-based support",
    url: "https://www.crisistextline.org",
  },
  {
    name: "Samaritans (UK)",
    number: "116 123",
    desc: "Free, 24/7, no judgement",
    url: "https://www.samaritans.org",
  },
];

const THERAPIST_DIRECTORIES = [
  {
    icon: "🔍",
    name: "iCall Therapist Finder",
    desc: "Trained counsellors across India, sliding scale fees available",
    url: "https://icallhelpline.org",
    region: "India",
  },
  {
    icon: "🌿",
    name: "The Minds Foundation",
    desc: "Mental health support and therapist referrals across India",
    url: "https://theminds.foundation",
    region: "India",
  },
  {
    icon: "💬",
    name: "Psychology Today Finder",
    desc: "Search by location, insurance, and specialty worldwide",
    url: "https://www.psychologytoday.com/us/therapists",
    region: "Global",
  },
  {
    icon: "📱",
    name: "BetterHelp",
    desc: "Online therapy, matched to a licensed therapist within 48 hours",
    url: "https://www.betterhelp.com",
    region: "Global",
  },
  {
    icon: "🧠",
    name: "Talkspace",
    desc: "Therapy by message, audio, or video at your own pace",
    url: "https://www.talkspace.com",
    region: "Global",
  },
  {
    icon: "📖",
    name: "7 Cups",
    desc: "Free peer support and low-cost therapy, available now",
    url: "https://www.7cups.com",
    region: "Global",
  },
];

const SELF_HELP_RESOURCES = [
  {
    title: "Understanding Depression",
    source: "NHS",
    url: "https://www.nhs.uk/mental-health/conditions/depression-in-adults/overview/",
    desc: "Clear, medically reviewed information about what depression is and how it is treated.",
  },
  {
    title: "Depression: What You Need To Know",
    source: "NIMH",
    url: "https://www.nimh.nih.gov/health/publications/depression",
    desc: "From the US National Institute of Mental Health. Evidence-based and written for general readers.",
  },
  {
    title: "Feeling Good: The New Mood Therapy",
    source: "Book by David D. Burns MD",
    url: "https://www.amazon.com/s?k=Feeling+Good+David+Burns",
    desc: "One of the most widely recommended self-help books for depression, based on cognitive behavioural therapy.",
  },
  {
    title: "MoodGym",
    source: "Online CBT programme",
    url: "https://www.moodgym.com.au",
    desc: "A free, interactive cognitive behavioural therapy programme with evidence behind it.",
  },
];
