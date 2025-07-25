interface CreateFileRequest {
  userId: number;
  name: string;
  fileAlias: string;
  fileDesc?: string;
}

export const uploadFile = async (data: CreateFileRequest) => {
  const response = await fetch("/api/files", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create file");
  }

  return response.json();
};

