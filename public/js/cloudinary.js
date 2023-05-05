//widget to upload images and append them to page
var myWidget = cloudinary.createUploadWidget({
    cloudName: 'denuaoe88', 
    uploadPreset: 'lvppdmx9'}, (error, result) => { 
      if (!error && result && result.event === "success") { 
        console.log('Done! Here is the image info: ', result.info); 
        // create element, img tag, src, add the url, and append to the page
        document.getElementById("uploadedimage").setAttribute("src", result.info.secure_url)

      }
    }
  )
  
  document.getElementById("upload_widget").addEventListener("click", function(){
      myWidget.open();
    }, false);
