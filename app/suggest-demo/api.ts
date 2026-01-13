
// This is a mock API that simulates fetching suggestions from a server.
// It has an intentional delay to demonstrate the effect of useTransition.

const ALL_FRUITS = [
  "Apple", "Apricot", "Avocado",
  "Banana", "Blueberry", "Blackberry",
  "Cherry", "Cranberry",
  "Dragonfruit", "Durian",
  "Grape", "Grapefruit", "Guava",
  "Kiwi",
  "Lemon", "Lime", "Lychee",
  "Mango", "Melon", "Mulberry",
  "Nectarine",
  "Orange",
  "Papaya", "Peach", "Pear", "Pineapple", "Plum", "Pomegranate",
  "Raspberry", "Strawberry",
];

export const fetchSuggestions = async (query: string): Promise<string[]> => {
  console.log(`Fetching suggestions for: ${query}`);
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 1500));

  if (!query) {
    return [];
  }

  const suggestions = ALL_FRUITS.filter(fruit =>
    fruit.toLowerCase().includes(query.toLowerCase())
  );
  
  console.log(`Found ${suggestions.length} suggestions.`);
  return suggestions;
};
