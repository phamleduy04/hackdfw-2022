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
        $('body > #docdata > p').append(`Doctor name: ${firstDoc.name}`);
        $('body > #docdata> p1').append(`Doctor ID: ${firstDoc.id}`);
        $('#doctor-image').prepend(`<img src="/image?fileName=${firstDoc.pictureURL}" alt="Doctor image" />`);
        array.push(firstDoc);
        
    });
}