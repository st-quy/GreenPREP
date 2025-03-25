// use hooks in useTestData
import { useEffect, useState } from "react";
import { fetchTestData } from "@features/navigation/services/api";

const TestData = ({ topicId }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchTestData(topicId);
        setData(result);
      } catch (error) {
        console.error("Error loading test data:", error);
      }
    };

    fetchData();
  }, [topicId]);

  return (
  <div>
    <pre style={{ display: "none" }}>{JSON.stringify(data, null, 2)}</pre> 
  </div>);
};

export default TestData;

