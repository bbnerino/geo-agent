// API 호출 함수 분리
export const fetchVectorCollections = async () => {
  const response = await fetch("/api/vectorStore/searchDocuments/all");
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch vector collections");
  }
  return data.collections || [];
};
