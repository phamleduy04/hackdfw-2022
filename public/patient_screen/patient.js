$(document).ready(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomID = urlParams.get('roomID');
    if (!roomID) return;
    const array = [];
    loadDoctor(roomID, array);
    setInterval(() => loadDoctor(roomID, array), 5000);
})

function loadDoctor(roomID, array) {
    $.get(`/data?roomID=${roomID}`, (data) => {
        if (!data || data.length === 0) return;
        if (data[0].id == array[0]?.id) return;
        const firstDoc = data[0];
        $('#docPic > div > div.col-md-8 > div > h5').text(`Name: ${firstDoc.name}`);
        $('#docPic > div > div.col-md-8 > div > p:nth-child(2)').text(`ID: ${firstDoc.id}`);
        $('#docPic > div > div.col-md-8 > div > p:nth-child(3)').text(`Department : ${firstDoc.department}`);
        $('#docPic > div > div.col-md-8 > div > p:nth-child(4)').text(`Postion : ${firstDoc.position}`);
        $('#doctor-image').prepend(`<img src="/image?fileName=${firstDoc.pictureURL}" alt="Doctor image" />`);
        array.push(firstDoc);
        
    });
}