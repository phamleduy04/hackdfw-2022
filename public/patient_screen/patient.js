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
        $('#docPic > div > div.col-md-8 > div > h5').text(firstDoc.name);
        $('#docPic > div > div.col-md-8 > div > p:nth-child(2)').append(`Doctor ID: ${firstDoc.id}`);
        // $('body > #docdata> p1').append(`Doctor ID: ${firstDoc.id}`);s
        $('#doctor-image').prepend(`<img src="/image?fileName=${firstDoc.pictureURL}" alt="Doctor image" />`);
        array.push(firstDoc);
        
    });
}