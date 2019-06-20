const updatePicture = (request, response, cloudinary) => {
    let file = request.body.formData;
    console.log(file);

    cloudinary.v2.uploader.upload(file,
        {
            public_id: publicID,
            folder: "/profile_picture/" + publicID,
            transformation: [{"width": 360, "height": 360, "crop": "fit"}]
        },
        function(error, result) {console.log(result, error); });
    response.send({one:file});

}

module.exports = {
    updatePicture,
}