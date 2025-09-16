import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export default function usePolling(url, interval = 5000) {
  const [data, setData] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        if (mounted) setData(res.data);
      } catch (e) {
        console.error('Polling error:', e);
      }
    };

    fetchData(); // first fetch
    timerRef.current = setInterval(fetchData, interval);

    return () => {
      mounted = false;
      clearInterval(timerRef.current);
    };
  }, [url, interval]);

  return data;
}
