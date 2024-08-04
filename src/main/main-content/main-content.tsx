import axios from "axios";
import { useEffect, useState } from "react";

const MainContentComponent = () => {

  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/data');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div>
    </div>
  );
};

export default MainContentComponent;