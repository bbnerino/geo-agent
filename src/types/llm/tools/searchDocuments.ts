import { VectorCollection } from "@/types/vectorCollection";

export const searchDocumentsFunctionData = (vectorCollections: VectorCollection[]) => {
  return {
    type: "function",
    function: {
      name: "searchDocuments",
      description: "Search documents in my location",
      parameters: {
        type: "object",
        properties: {
          vectorCollection: {
            type: "string",
            description: `The available vector collections are: ${JSON.stringify(
              vectorCollections
            )}. You must provide one of these names.`
          },
          query: {
            type: "string",
            description: "The query to search for"
          }
        },
        required: ["vectorCollection", "query"]
      }
    }
  };
};
