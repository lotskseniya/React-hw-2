import { useEffect, useState } from "react";

export const useFetchData = (
    url="", 
    options = { method: "GET" }, 
    defaultDataValue = null
    ) => {
  const [data, setData] = useState({ data: defaultDataValue, error: null });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true); 
      setTimeout(async () => {
        try {
            const jsonData = await fetch(url, options);
            const parsedData = await jsonData.json();
            setData({data: parsedData, error: null})
        } catch (error) {
          setData({data: null, error});
        } finally {
            setIsLoading(false);  
        }
    }, 5000);
    })();
  }, [url]);

  return [data, isLoading];
};
