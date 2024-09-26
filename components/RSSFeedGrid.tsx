import React, { useState, useEffect } from 'react';
import { parseString } from 'xml2js';
import { Search } from 'lucide-react';
import Image from 'next/image';

// Define the structure of an RSS item
interface RSSItem {
  TITLE?: string[];
  DESCRIPTION?: string[];
  LINK?: string[];
  PUBDATE?: string[];
  CATEGORY?: string[];
  'MEDIA:CONTENT'?: Array<{
    $: {
      url: string;
    };
  }>;
  IMAGE_URL?: string;
}

const RSSFeedGrid = () => {
  const [items, setItems] = useState<RSSItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // New state for loading
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchRSS = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch('/api/rss');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();

        const cleanedData = data.trim().replace(/^\uFEFF/, '');

        parseString(cleanedData, { strict: false, explicitArray: false }, (err, result) => {
          if (err) {
            console.error('Error parsing RSS:', err);
            setError('Failed to parse RSS feed. Please try again later.');
            setLoading(false); // Stop loading on error
            return;
          }

          console.log('Parsed RSS structure:', JSON.stringify(result, null, 2));

          let feedItems: RSSItem[] = [];

          if (result && result.RSS && result.RSS.CHANNEL) {
            feedItems = Array.isArray(result.RSS.CHANNEL.ITEM)
              ? result.RSS.CHANNEL.ITEM
              : result.RSS.CHANNEL.ITEM
              ? [result.RSS.CHANNEL.ITEM]
              : [];

            feedItems = feedItems.map(item => ({
              ...item,
              IMAGE_URL: extractImageUrl(item),
            }));
          }

          if (feedItems.length > 0) {
            setItems(feedItems);
          } else {
            setError('No RSS items found in the feed.');
          }

          setLoading(false); // Stop loading when feed items are fetched
        });
      } catch (error) {
        console.error('Error fetching RSS:', error);
        setError('Failed to fetch RSS feed. Please check your internet connection and try again.');
        setLoading(false); // Stop loading on error
      }
    };

    fetchRSS();
  }, []);

  const extractImageUrl = (item: RSSItem): string => {
    if (item['MEDIA:CONTENT'] && item['MEDIA:CONTENT'][0]?.$.url) {
      return item['MEDIA:CONTENT'][0].$.url;
    }

    if (item.DESCRIPTION && item.DESCRIPTION[0]) {
      const match = item.DESCRIPTION[0].match(/<img[^>]+src="?([^"\s]+)"?\s*\/>/i);
      if (match) {
        return match[1];
      }
    }

    return '/no-image.png';
  };

  const filteredItems = items.filter(item =>
    (item.TITLE && item.TITLE[0]?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.DESCRIPTION && item.DESCRIPTION[0]?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const getTitle = (item: RSSItem) => {
    return Array.isArray(item.TITLE) ? item.TITLE[0] : item.TITLE || 'No Title';
  };

  const getDescription = (item: RSSItem) => {
    const desc = Array.isArray(item.DESCRIPTION) ? item.DESCRIPTION[0] : item.DESCRIPTION || '';
    return desc.replace(/<\/?[^>]+(>|$)/g, '');
  };

  const getLink = (item: RSSItem) => {
    return Array.isArray(item.LINK) ? item.LINK[0] : item.LINK || '#';
  };

  const getPubDate = (item: RSSItem) => {
    const date = Array.isArray(item.PUBDATE) ? item.PUBDATE[0] : item.PUBDATE;
    return date ? new Date(date).toLocaleDateString() : 'Unknown Date';
  };

  const getCategories = (item: RSSItem) => {
    if (!item.CATEGORY) return [];
    return Array.isArray(item.CATEGORY) ? item.CATEGORY : [item.CATEGORY];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-center">TechCrunch IT News</h1>

      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search articles..."
          className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center flex-col">
            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-blue-500"></div>
            <p className="mt-4">Loading RSS feed...</p>
          </div>
        </div>
      ) : error ? (
        <div className="flex justify-center flex-col w-full">
          <h4 className="text-[26px] font-bold">Error Occurred</h4>
          <div>{error}</div>
        </div>
      ) : items.length === 0 ? (
        <div className="flex justify-center flex-col w-full">
          <h4 className="text-[26px] font-bold">No Items</h4>
          <div>No RSS items found. The feed might be empty or still loading.</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentItems.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="relative w-full h-48">
                <Image 
                  src={extractImageUrl(item)} 
                  alt={getTitle(item)}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-3 line-clamp-2">{getTitle(item)}</h2>
                <p className="text-gray-600 mb-4 text-sm">{getPubDate(item)}</p>
                <p className="text-gray-700 mb-4 line-clamp-3" dangerouslySetInnerHTML={{ __html: getDescription(item) }} />
                <a 
                  href={getLink(item)} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-500 hover:underline inline-block mt-2 transition-colors duration-300 hover:text-blue-700"
                >
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-8">
        {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === i + 1 ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RSSFeedGrid;
