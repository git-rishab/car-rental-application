function widget() {
  const config = {
    accept: ['image/*'], // default empty array - all files
    //maxSize: 1024, // default 0 - no limit
    maxFiles: 3, // default 0 - no limit
    failOverMaxFiles: false,
  }
  
  const client = filestack.init('Az0PJPoS5QjWNxHxJsIYYz');
  const options = {
    ...config,
    onFileUploadFinished(file) {
      let images = JSON.parse(sessionStorage.getItem("images")) || [];
      images.push(file.url);
      sessionStorage.setItem('images',JSON.stringify(images));
    }
  }
  client.picker(options).open();
  client.on('error',(e)=>{
    console.log('error',e);
  })
}

export {
  widget
}