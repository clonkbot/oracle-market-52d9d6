import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Market {
  id: string;
  question: string;
  category: string;
  yesOdds: number;
  volume: string;
  endDate: string;
  trending: boolean;
  change: number;
}

const markets: Market[] = [
  {
    id: '1',
    question: 'Will Bitcoin exceed $100K by end of 2025?',
    category: 'Crypto',
    yesOdds: 67,
    volume: '$2.4M',
    endDate: 'Dec 31, 2025',
    trending: true,
    change: 5.2,
  },
  {
    id: '2',
    question: 'Will AI pass the Turing test convincingly by 2026?',
    category: 'Technology',
    yesOdds: 42,
    volume: '$890K',
    endDate: 'Dec 31, 2026',
    trending: false,
    change: -2.1,
  },
  {
    id: '3',
    question: 'Will humans land on Mars before 2030?',
    category: 'Space',
    yesOdds: 23,
    volume: '$1.8M',
    endDate: 'Dec 31, 2029',
    trending: true,
    change: 1.8,
  },
  {
    id: '4',
    question: 'Will global EV sales surpass gas cars by 2030?',
    category: 'Climate',
    yesOdds: 31,
    volume: '$560K',
    endDate: 'Dec 31, 2030',
    trending: false,
    change: 0.4,
  },
  {
    id: '5',
    question: 'Will a new social platform overtake Twitter/X in 2025?',
    category: 'Tech',
    yesOdds: 19,
    volume: '$340K',
    endDate: 'Dec 31, 2025',
    trending: true,
    change: 8.7,
  },
  {
    id: '6',
    question: 'Will fusion energy achieve net positive output by 2028?',
    category: 'Energy',
    yesOdds: 55,
    volume: '$1.2M',
    endDate: 'Dec 31, 2028',
    trending: false,
    change: 3.2,
  },
];

const categories = ['All', 'Crypto', 'Technology', 'Space', 'Climate', 'Energy', 'Tech'];

function OddsBar({ yesOdds, animated = true }: { yesOdds: number; animated?: boolean }) {
  return (
    <div className="relative h-2 bg-[#1a1a24] rounded-full overflow-hidden">
      <motion.div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00d9ff] to-[#00d9ff]/60 rounded-full"
        initial={animated ? { width: 0 } : { width: `${yesOdds}%` }}
        animate={{ width: `${yesOdds}%` }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
      />
      <motion.div
        className="absolute inset-y-0 right-0 bg-gradient-to-l from-[#ff4757] to-[#ff4757]/60 rounded-full"
        initial={animated ? { width: 0 } : { width: `${100 - yesOdds}%` }}
        animate={{ width: `${100 - yesOdds}%` }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
      />
    </div>
  );
}

function MarketCard({ market, index }: { market: Market; index: number }) {
  const [selectedSide, setSelectedSide] = useState<'yes' | 'no' | null>(null);
  const [amount, setAmount] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-gradient-to-br from-[#12121a] to-[#0d0d14] border border-[#2a2a3a] rounded-xl p-4 md:p-6 hover:border-[#d4a574]/50 transition-all duration-500"
    >
      {/* Diamond accent */}
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#d4a574] rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Category & Trending */}
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <span className="text-[10px] md:text-xs font-mono tracking-widest text-[#d4a574] uppercase">
          {market.category}
        </span>
        {market.trending && (
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-1 text-[10px] md:text-xs font-mono text-[#00d9ff]"
          >
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#00d9ff] rounded-full" />
            TRENDING
          </motion.span>
        )}
      </div>

      {/* Question */}
      <h3 className="text-base md:text-lg lg:text-xl font-display text-white mb-3 md:mb-4 leading-tight">
        {market.question}
      </h3>

      {/* Odds Bar */}
      <OddsBar yesOdds={market.yesOdds} />

      {/* Odds Labels */}
      <div className="flex justify-between mt-2 mb-4 md:mb-6">
        <span className="font-mono text-xs md:text-sm text-[#00d9ff]">
          YES {market.yesOdds}%
        </span>
        <span className="font-mono text-xs md:text-sm text-[#ff4757]">
          NO {100 - market.yesOdds}%
        </span>
      </div>

      {/* Trade Buttons */}
      <div className="flex gap-2 md:gap-3 mb-4 md:mb-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedSide(selectedSide === 'yes' ? null : 'yes')}
          className={`flex-1 py-2.5 md:py-3 px-3 md:px-4 rounded-lg font-mono text-xs md:text-sm tracking-wide transition-all duration-300 ${
            selectedSide === 'yes'
              ? 'bg-[#00d9ff] text-[#0a0a0f]'
              : 'bg-[#00d9ff]/10 text-[#00d9ff] border border-[#00d9ff]/30 hover:bg-[#00d9ff]/20'
          }`}
        >
          BUY YES
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedSide(selectedSide === 'no' ? null : 'no')}
          className={`flex-1 py-2.5 md:py-3 px-3 md:px-4 rounded-lg font-mono text-xs md:text-sm tracking-wide transition-all duration-300 ${
            selectedSide === 'no'
              ? 'bg-[#ff4757] text-white'
              : 'bg-[#ff4757]/10 text-[#ff4757] border border-[#ff4757]/30 hover:bg-[#ff4757]/20'
          }`}
        >
          BUY NO
        </motion.button>
      </div>

      {/* Amount Input (when side selected) */}
      <AnimatePresence>
        {selectedSide && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 overflow-hidden"
          >
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#d4a574] font-mono text-sm">$</span>
              <input
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-[#1a1a24] border border-[#2a2a3a] rounded-lg py-2.5 md:py-3 pl-8 pr-4 font-mono text-white text-sm focus:border-[#d4a574] focus:outline-none transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#d4a574] text-[#0a0a0f] px-3 py-1.5 rounded text-xs font-mono font-bold"
              >
                PLACE
              </motion.button>
            </div>
            <p className="text-[10px] md:text-xs text-[#6a6a7a] font-mono mt-2">
              Potential return: ${amount ? (parseFloat(amount) * (100 / (selectedSide === 'yes' ? market.yesOdds : 100 - market.yesOdds))).toFixed(2) : '0.00'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Meta Info */}
      <div className="flex items-center justify-between pt-4 border-t border-[#2a2a3a]/50">
        <div className="flex items-center gap-2 md:gap-4">
          <span className="text-[10px] md:text-xs font-mono text-[#6a6a7a]">
            VOL {market.volume}
          </span>
          <span className="text-[10px] md:text-xs font-mono text-[#6a6a7a]">
            ENDS {market.endDate}
          </span>
        </div>
        <span className={`text-xs md:text-sm font-mono font-bold ${market.change >= 0 ? 'text-[#00d9ff]' : 'text-[#ff4757]'}`}>
          {market.change >= 0 ? '+' : ''}{market.change}%
        </span>
      </div>
    </motion.div>
  );
}

function DiamondPattern() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="diamonds" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <polygon points="30,0 60,30 30,60 0,30" fill="none" stroke="#d4a574" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diamonds)" />
      </svg>
    </div>
  );
}

function StatsBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-12 py-4 md:py-6 px-4 border-b border-[#2a2a3a]/50 mb-6 md:mb-8"
    >
      {[
        { label: 'TOTAL VOLUME', value: '$12.4M' },
        { label: 'ACTIVE MARKETS', value: '247' },
        { label: 'TRADERS', value: '8,432' },
        { label: '24H CHANGE', value: '+4.2%', isPositive: true },
      ].map((stat) => (
        <div key={stat.label} className="text-center">
          <p className="text-[10px] md:text-xs font-mono tracking-widest text-[#6a6a7a] mb-1">{stat.label}</p>
          <p className={`text-lg md:text-xl lg:text-2xl font-display ${stat.isPositive ? 'text-[#00d9ff]' : 'text-white'}`}>
            {stat.value}
          </p>
        </div>
      ))}
    </motion.div>
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMarkets = markets.filter((market) => {
    const matchesCategory = activeCategory === 'All' || market.category === activeCategory;
    const matchesSearch = market.question.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative">
      <DiamondPattern />

      {/* Header */}
      <header className="relative z-10 border-b border-[#2a2a3a]/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3 md:gap-4"
            >
              {/* Logo - Diamond */}
              <div className="relative w-10 h-10 md:w-12 md:h-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 border-2 border-[#d4a574] rotate-45"
                />
                <div className="absolute inset-2 bg-[#d4a574]/20 rotate-45" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-display tracking-tight">
                  ORACLE<span className="text-[#d4a574]">.</span>MARKET
                </h1>
                <p className="text-[10px] md:text-xs font-mono text-[#6a6a7a] tracking-widest">
                  PREDICT THE FUTURE
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3 md:gap-4"
            >
              <div className="relative flex-1 md:flex-none">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search markets..."
                  className="w-full md:w-64 bg-[#12121a] border border-[#2a2a3a] rounded-lg py-2.5 md:py-3 px-4 font-mono text-sm text-white placeholder-[#6a6a7a] focus:border-[#d4a574] focus:outline-none transition-colors"
                />
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6a6a7a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#d4a574] to-[#c49464] text-[#0a0a0f] px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-mono text-xs md:text-sm font-bold tracking-wide whitespace-nowrap"
              >
                CONNECT
              </motion.button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <StatsBar />

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-8 md:pb-12">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex gap-2 overflow-x-auto pb-4 mb-6 md:mb-8 scrollbar-hide"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 md:px-5 py-2 md:py-2.5 rounded-lg font-mono text-xs md:text-sm tracking-wide whitespace-nowrap transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-[#d4a574] text-[#0a0a0f]'
                  : 'bg-[#1a1a24] text-[#6a6a7a] hover:text-white hover:bg-[#2a2a3a]'
              }`}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </motion.div>

        {/* Markets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {filteredMarkets.map((market, index) => (
            <MarketCard key={market.id} market={market} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {filteredMarkets.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 md:py-20"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 border-2 border-[#2a2a3a] rotate-45" />
            <p className="font-mono text-[#6a6a7a] text-sm md:text-base">No markets found</p>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#2a2a3a]/50 py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <p className="font-mono text-[10px] md:text-xs text-[#4a4a5a] tracking-wide">
            Requested by @web-user · Built by @clonkbot
          </p>
        </div>
      </footer>
    </div>
  );
}
