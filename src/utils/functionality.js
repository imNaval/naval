export function downloadResume(){
    fetch('./Naval-Resume.pdf').then(res =>{
      res.blob().then(blob => {
        const file = window.URL.createObjectURL(blob);
        let alink = document.createElement('a');
        alink.href = file;
        alink.download = './Naval-Resume.pdf';
        alink.click();
      })
    })
  }