export const getPhotos = () => ({
    method: "GET",
    url: `/api/photos`
});

export const deletePhotos = (id: string) => ({
    method: "DELETE",
    url: `/api/photos/${id}`
});