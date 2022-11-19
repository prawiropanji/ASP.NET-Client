console.log("Division Create...")


document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault()

    const formElement = event.target

    const formData = new FormData(formElement);

    const enteredDivisionName = formData.get('divisionName');

    const data = {
        id: 0,
        name: enteredDivisionName,
    }

    console.log(data);

    $.ajax({
        url: 'https://localhost:7002/api/division',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(data)
    }).done(res => {
        console.log(res);
        formElement.reset();


    })

})

