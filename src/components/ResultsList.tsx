interface Result {
  collection: string;
  style_character: string;
  product_code: string;
}

interface ResultsListProps {
  results: Result[];
}

export default function ResultsList({ results }: ResultsListProps) {
  return (
    <div className="mt-6 bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-pink-500 px-6 py-3">
        <h2 className="text-xl font-semibold text-white">Scan Results</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {results.map((result, index) => (
          <div key={index} className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase">Collection</h3>
                <p className="mt-1 text-lg font-medium">{result.collection || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase">Character Style</h3>
                <p className="mt-1 text-lg font-medium">{result.style_character || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase">Product Code</h3>
                <p className="mt-1 text-lg font-medium">{result.product_code || 'N/A'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
