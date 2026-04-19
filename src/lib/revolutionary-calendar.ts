/**
 * Revolutionary Calendar Service
 * Provides historical data about communist and socialist struggles
 * for "This Day in Resistance" feature
 */

export interface HistoricalEvent {
  id: string;
  date: string;
  year: number;
  title: string;
  description: string;
  location: 'kerala' | 'india' | 'world';
  significance: string;
  organizations?: string[];
  image?: string;
  learnMoreUrl?: string;
}

export interface TodayInStruggle {
  kerala: HistoricalEvent[];
  india: HistoricalEvent[];
  world: HistoricalEvent[];
}

/**
 * Revolutionary Calendar Database
 * Historical events organized by month and day
 */
const REVOLUTIONARY_CALENDAR: { [key: string]: HistoricalEvent[] } = {
  // January
  '1-1': [
    {
      id: 'world-1-1-1917',
      date: 'January 1',
      year: 1917,
      title: 'Bolshevik Victory in Petrograd',
      description: 'The Bolsheviks, led by Vladimir Lenin, consolidated power in Petrograd, marking the beginning of the Russian Revolution.',
      location: 'world',
      significance: 'Foundation of the first socialist state in the world',
      organizations: ['Bolshevik Party', 'Communist International'],
      learnMoreUrl: '/subject/history?type=question_paper'
    },
    {
      id: 'india-1-1-1950',
      date: 'January 1',
      year: 1950,
      title: 'India Becomes Republic',
      description: 'India adopted its constitution and became a sovereign democratic republic, with socialist principles enshrined in the Directive Principles.',
      location: 'india',
      significance: 'Democratic socialist framework established in independent India',
      organizations: ['Constituent Assembly', 'Socialist Party'],
      learnMoreUrl: '/subject/political-science?type=textbook'
    }
  ],
  '1-26': [
    {
      id: 'india-1-26-1950',
      date: 'January 26',
      year: 1950,
      title: 'Republic Day of India',
      description: 'Celebration of India\'s constitution and democratic values, with socialist commitments to equality and justice.',
      location: 'india',
      significance: 'Annual reaffirmation of socialist democratic principles',
      organizations: ['Government of India', 'CPI', 'Socialist Party'],
      learnMoreUrl: '/subject/political-science?type=question_paper'
    }
  ],
  '1-30': [
    {
      id: 'india-1-30-1948',
      date: 'January 30',
      year: 1948,
      title: 'Martyrdom of Mahatma Gandhi',
      description: 'Gandhi assassinated by Hindu nationalist forces, remembered for his commitment to secular socialism and workers\' rights.',
      location: 'india',
      significance: 'Loss of a key socialist leader in the independence movement',
      organizations: ['Indian National Congress', 'All India Trade Union Congress'],
      learnMoreUrl: '/subject/history?type=textbook'
    }
  ],

  // April
  '4-7': [
    {
      id: 'world-4-7-1917',
      date: 'April 7',
      year: 1917,
      title: 'Lenin Returns to Russia',
      description: 'Vladimir Lenin returned to Russia from exile in Switzerland, bringing revolutionary socialist ideas that would transform the world.',
      location: 'world',
      significance: 'Catalyst for the Bolshevik Revolution and global socialist movement',
      organizations: ['Bolshevik Party', 'Communist International'],
      learnMoreUrl: '/subject/history?type=textbook'
    }
  ],
  '4-16': [
    {
      id: 'world-4-16-1917',
      date: 'April 16',
      year: 1917,
      title: 'Lenin\'s April Theses',
      description: 'Lenin presented his April Theses, calling for socialist revolution and workers\' control of production.',
      location: 'world',
      significance: 'Foundation document of socialist revolution theory',
      organizations: ['Bolshevik Party', 'Petrograd Soviet'],
      learnMoreUrl: '/subject/political-science?type=question_paper'
    },
    {
      id: 'india-4-16-1919',
      date: 'April 16',
      year: 1919,
      title: 'Rowlatt Satyagraha',
      description: 'Nationwide protests against the Rowlatt Act, uniting socialist and nationalist forces against colonial repression.',
      location: 'india',
      significance: 'Early collaboration between socialist and nationalist movements',
      organizations: ['Indian National Congress', 'Socialist groups'],
      learnMoreUrl: '/subject/history?type=textbook'
    }
  ],
  '4-17': [
    {
      id: 'kerala-4-17-1940',
      date: 'April 17',
      year: 1940,
      title: 'Formation of CPI Kerala',
      description: 'The Communist Party of India established its Kerala unit, beginning organized socialist movement in the region.',
      location: 'kerala',
      significance: 'Birth of communist movement in Kerala',
      organizations: ['Communist Party of India (CPI)'],
      learnMoreUrl: '/subject/political-science?type=textbook'
    }
  ],

  // May
  '5-1': [
    {
      id: 'world-5-1-1886',
      date: 'May 1',
      year: 1886,
      title: 'International Workers\' Day',
      description: 'Chicago workers strike for 8-hour workday, establishing May Day as international labor holiday.',
      location: 'world',
      significance: 'Global celebration of workers\' rights and socialist struggle',
      organizations: ['International Workingmen\'s Association', 'Trade Unions'],
      learnMoreUrl: '/subject/sociology?type=textbook'
    },
    {
      id: 'india-5-1-1923',
      date: 'May 1',
      year: 1923,
      title: 'First May Day in India',
      description: 'Communist and socialist groups organized India\'s first May Day celebrations in major cities.',
      location: 'india',
      significance: 'Introduction of international labor day to Indian workers',
      organizations: ['Communist Party of India', 'Trade Unions'],
      learnMoreUrl: '/subject/history?type=question_paper'
    }
  ],

  // July
  '7-4': [
    {
      id: 'world-7-4-1776',
      date: 'July 4',
      year: 1776,
      title: 'American Declaration of Independence',
      description: 'While bourgeois democratic, this event influenced socialist thinking on rights and equality.',
      location: 'world',
      significance: 'Early democratic principles that influenced socialist ideology',
      organizations: ['Continental Congress'],
      learnMoreUrl: '/subject/political-science?type=textbook'
    }
  ],

  // October
  '10-7': [
    {
      id: 'world-10-7-1917',
      date: 'October 7',
      year: 1917,
      title: 'Bolshevik Revolution Begins',
      description: 'The Bolshevik Revolution began with the storming of the Winter Palace, establishing workers\' power.',
      location: 'world',
      significance: 'Most significant socialist revolution in history',
      organizations: ['Bolshevik Party', 'Petrograd Soviet'],
      learnMoreUrl: '/subject/history?type=textbook'
    }
  ],
  '10-25': [
    {
      id: 'world-10-25-1917',
      date: 'October 25',
      year: 1917,
      title: 'October Revolution Victory',
      description: 'The Bolsheviks consolidated power, creating the world\'s first socialist state.',
      location: 'world',
      significance: 'Establishment of Soviet Union and global socialist movement',
      organizations: ['Bolshevik Party', 'Communist International'],
      learnMoreUrl: '/subject/political-science?type=textbook'
    }
  ],

  // November
  '11-7': [
    {
      id: 'world-11-7-1917',
      date: 'November 7',
      year: 1917,
      title: 'October Revolution (Gregorian Calendar)',
      description: 'Victory of the Bolshevik Revolution, celebrated worldwide as a triumph of socialist principles.',
      location: 'world',
      significance: 'Foundation of modern socialist state and ideology',
      organizations: ['Bolshevik Party', 'Communist International'],
      learnMoreUrl: '/subject/history?type=textbook'
    }
  ]
};

/**
 * Get historical events for today's date
 * @param currentDate - The current date (defaults to today)
 * @returns Historical events organized by geographic scope
 */
export function getTodayInStruggle(currentDate: Date = new Date()): TodayInStruggle {
  const month = currentDate.getMonth() + 1; // 1-12
  const day = currentDate.getDate();
  const dateKey = `${month}-${day}`;

  const events = REVOLUTIONARY_CALENDAR[dateKey] || [];

  return {
    kerala: events.filter(event => event.location === 'kerala'),
    india: events.filter(event => event.location === 'india'),
    world: events.filter(event => event.location === 'world')
  };
}

/**
 * Get a random historical event for fallback/display
 */
export function getRandomHistoricalEvent(): HistoricalEvent {
  const allEvents = Object.values(REVOLUTIONARY_CALENDAR).flat();
  return allEvents[Math.floor(Math.random() * allEvents.length)];
}

/**
 * Get events for a specific date
 * @param month - Month (1-12)
 * @param day - Day of month
 */
export function getEventsForDate(month: number, day: number): HistoricalEvent[] {
  const dateKey = `${month}-${day}`;
  return REVOLUTIONARY_CALENDAR[dateKey] || [];
}