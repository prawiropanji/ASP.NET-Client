console.log("Departement Create...")
$.ajax({
    url: "https://localhost:7002/api/division",
    type: "GET"
}).done(res => {
    console.log(res.data.length);

    let temp = '';


    res.data.forEach(data => {
        temp += `<option value="${data.id}">${data.name}</option>`;
    })

    $('.form-select').html(temp)

}).fail(err => {
    console.log(err)
})


document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault()

    const formElement = event.target

    const formData = new FormData(formElement);

    const enteredDepartementName = formData.get('departementName');
    const enteredDivisionId = formData.get('divisionId');

    const data = {
        id: 0,
        name: enteredDepartementName,
        divisionId: enteredDivisionId
    }

    console.log(data);

    $.ajax({
        url: 'https://localhost:7002/api/departement',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(data)
    }).done(res => {
        console.log(res);
        formElement.reset();


    })

})

