
export const fileUpload = async (file) => {
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dpp07uuh5/upload';

    const formData = new FormData();

    formData.append('upload_preset','react-journal');
    formData.append('file', file);

    try {
        
        const res = await fetch(cloudUrl,{
            method: 'POST',
            body: formData
        })

        if(res.ok){
            const cloudRest = await res.json();
            return cloudRest.secure_url;
        }
        else{
            throw await res.json();
        }
    } catch (error) {
        throw error;
    }

}