import {useState, useEffect} from 'react';


const useFetch = (url, config) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
        
    if (!url) return;
        
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

    fetchData();
  }, [url]);

  return { isLoading, data, error };
};

export default useFetch;