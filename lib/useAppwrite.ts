import { useEffect, useState } from "react";
import { Alert } from "react-native";
interface Func {
  fn: () => Promise<any[]>;
}

const useAppwrite = ({ fn }: Func) => {
  const [videos, setVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response: any = await fn();
      setVideos(response);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const refetch = () => fetchData();
  return { videos, isLoading, refetch };
};

export default useAppwrite;
