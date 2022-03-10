import {useState, useEffect} from 'react';


const useFetch = (url, config) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url, config);
      const data = await response.json();
      setData(data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  };
  
  useEffect(() => {
    if (!url) return;   
    fetchData();
    return () => {
      setData([]);
      setIsLoading(false);
      setError(null);
    };
  }, [url]);

  return { isLoading, data, error };
};

export default useFetch;