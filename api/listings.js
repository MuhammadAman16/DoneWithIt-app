import client from './client';

const endpoint = '/listings';

const getListings = () => client.get(endpoint);

const addListing = (listing, onUploadProgress) => {
  const data = new FormData();
  data.append('title', listing.title);
  data.append('price', listing.price);
  data.append('categoryId', listing.category.value);
  data.append('description', listing.description);

  //Image goes to (=>)
  listing.images.forEach((image, index) =>
    data.append('images', {
      name: 'images' + index,
      type: 'image/jpeg',
      uri: image,
    }),
  );
  if (listing.location)
    data.append('location', JSON.stringify(listing.location));
  //returns a promise
  return client.post(endpoint, data, {
    onUploadProgress: progress =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  getListings,
  addListing,
};
