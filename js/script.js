const form = document.getElementById('generate-form');
const qr=document.getElementById('qrcode');

const onGenerateSubmit = (e) => {
    e.preventDefault();
    clearUI();
    const url=document.getElementById('url').value;
    const size=document.getElementById('size').value;
    console.log(url,size);
    if(url==''){
        alert('Please enter a URL');
    }
    else{
        showSpinner();
        // Shows loader for only one second
        setTimeout(()=>{
        hideSpinner();
        generateQRCode(url,size);
        setTimeout(()=>{
            const saveUrl=qr.querySelector('img').src;
            createSaveBtn(saveUrl);
        },50)
        showScanner();
    },1000);

    }
};
const generateQRCode=(url,size)=> {
    const qrcode = new QRCode('qrcode',{
        text: url,
        width:size,
        height:size,
    });

};
const showSpinner =() => {
        document.getElementById('spinner').style.display='block';
};
const hideSpinner =() => {
    document.getElementById('spinner').style.display='none';
};
const showScanner = () => {
    const scanner = document.getElementById("qrCodeContainer");
    scanner.style.display = "block";
  };
const clearUI = () => {
    qr.innerHTML='';
    const saveLink=document.getElementById('save-link');
    if(saveLink)
    {
        saveLink.remove();
    }
}
const createSaveBtn = (saveUrl) => {
    const link=document.createElement('a');
    link.id='save-link';
    link.classList='bg-violet-600 hover:bg-green-700 text-white font-bold py-2 rounded w-1/3 m-auto mt-5';   
    link.href=saveUrl;
    link.download='qrcode';
    link.innerHTML='Save Image';
    document.getElementById('generated').appendChild(link);
}
hideSpinner();
form.addEventListener('submit',onGenerateSubmit);