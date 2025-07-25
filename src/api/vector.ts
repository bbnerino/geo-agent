// API 호출 함수 분리
export const fetchVectorCollections = async (): Promise<VectorCollectionFile[]> => {
  const userId = 1;

  const [documentsResponse, filesResponse] = await Promise.all([
    fetch(`/api/vectorStore/searchDocuments/all`),
    fetch(`/api/files?userId=${userId}`)
  ]);

  if (!documentsResponse.ok || !filesResponse.ok) throw new Error("Failed to fetch vector collections or files");

  const [_documents, _files] = await Promise.all([documentsResponse.json(), filesResponse.json()]);
  const documents = _documents.collections;
  const files = _files.files;

  const mapDocuments = documents.map((document: { name: string }) => {
    const file = files.find((file: { name: string }) => file.name === document.name);
    return {
      ...document,
      ...file
    };
  });

  return mapDocuments;
};

interface VectorCollectionFile {
  name: string; // key
  fileName: string;
  description: string;
}
