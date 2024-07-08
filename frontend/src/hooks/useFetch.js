const useFetch = (url, method, initialData = {}) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(null);
      try {
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type":
              data instanceof FormData ? undefined : "application/json", // Set for JSON
          },
          body: data instanceof FormData ? data : JSON.stringify(data), // Send data based on type
        });
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (url) {
      // Only fetch if a URL is provided
      fetchData();
    }
  }, [url, method, JSON.stringify(data)]); // Re-fetch on URL, method, or data changes
  const handlePost = async (newData) => {
    setData(newData);
  };
  const handlePut = async (newData) => {
    setData(newData);
  };
  const handleDelete = async () => {
    setData({}); // Clear data on delete
  };
  return { data, isLoading, isError, handlePost, handlePut, handleDelete };
};
export default useFetch;
