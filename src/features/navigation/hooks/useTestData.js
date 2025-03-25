// create hooks
import { useQuery } from "@tanstack/react-query";
import { fetchTestData } from "../services/api";  

const useTestData = (topicId) => {
  return useQuery({
    queryKey: ["testData", topicId],  // cache by topicId
    queryFn: () => fetchTestData(topicId), 
    staleTime: 1000 * 60 * 5, // cache intro 5 minutes
    retry: 2, // if have error try again 2 time
  });
};

export default useTestData;
