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
              data instanceof FormData ? undefined : "application/json", 
          },
          body: data instanceof FormData ? data : JSON.stringify(data), 
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
      fetchData();
    }
  }, [url, method, JSON.stringify(data)]);
  const handlePost = async (newData) => {
    setData(newData);
  };
  const handlePut = async (newData) => {
    setData(newData);
  };
  const handleDelete = async () => {
    setData({});
  };
  return { data, isLoading, isError, handlePost, handlePut, handleDelete };
};
export default useFetch
