export const getPhotos = () => ({
    method: "GET",
    url: `/api/photos`
});

export const savePhoto = () => ({
    method: "POST",
    url: "/api/photos",
    headers: {
        "Content-Type": "multipart/form-data"
    }
})

export const deletePhotos = (id: string) => ({
    method: "DELETE",
    url: `/api/photos/${id}`
});