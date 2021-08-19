import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: 'e5mb4tjm',
  dataset: 'production',
  apiVersion: '2021-08-13', 
  useCdn: false,
});
