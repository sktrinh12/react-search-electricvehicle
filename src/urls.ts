export const AZURE_BLOB_SAS_URL = (image: string) =>
  `${process.env.REACT_APP_AZURE_STORAGE_URL}${image}?${process.env.REACT_APP_AZURE_SAS_TOKEN_CO}`;

