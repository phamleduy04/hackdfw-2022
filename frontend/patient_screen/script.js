$(document).ready(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomID = urlParams.get('roomID');
    $.get(`http://localhost:3000/data?roomID=${roomID}`, (data) => {
        if (!data || data.length === 0) return;
        const firstDoc = data[0];
        $('body > #docdata > p').append(`Doctor name: ${firstDoc.name}`);
        $('body > #docdata> p1').append(`Doctor ID: ${firstDoc.id}`);
        $('#doctor-image').prepend(`<img src="${firstDoc.pictureURL}" alt="Doctor image" />`);
    });
    
    // setInterval(() => location.reload(), 5000);
})