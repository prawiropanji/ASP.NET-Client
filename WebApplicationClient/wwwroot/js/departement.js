let table = null;

$(document).ready(function () {
    table = $('#departementTable').DataTable({
        ajax: {
            url: 'https://localhost:7002/api/departement',
            dataSrc: 'data'

        },
        columns: [
            {
                data: "name",
                render: (data, type, row, meta) => {
                    return data;
                }
            },
            {
                data: 'divisionId',
                render: (data) => {
                    return data;
                }
            },
            {
                data: "id",
                render: (data) => {
                    return `
                    <a class="btn btn-primary text-light" data-bs-toggle="modal" data-bs-target="#departementEditModal" onclick="showEdit(${data})" >Edit</a> |
                    <a class="btn btn-info text-light" data-bs-toggle="modal" data-bs-target="#departementDetailsModal" onclick="showDetail(${data})">Details</a> |
                    <a class="btn btn-danger text-light" data-bs-toggle="modal" data-bs-target="#departementDeleteModal" onclick="showDelete(${data})">Delete</a>

        `;
                }
            }
        ],
        dom: 'Bfrtip',
        buttons: ['copy', 'pdf', 'colvis', 'excel']

    })


    //setInterval(function () {
    //    table.ajax.reload(null, false); // user paging is not reset on reload
    //}, 3000);

})


function showDetail(departementId) {


    $.ajax({
        url: `https://localhost:7002/api/departement/${departementId}`,
        type: "GET"
    }).done(res => {
        console.log(res)

        let temp = '';


        $('#modalDetail').html(`
    
    <div class=" row my-2">
      <div class="col-4 text-end text-dark fw-semibold">
          ID :
      </div>
      <div class="col-8">
           <input class="form-control form-control-sm" type="text" value="${res.data.id}" aria-label="readonly input example" readonly>
      </div>
    </div>
    
    <div class="row my-2">
      <div class="col-4 text-end text-dark fw-semibold">
          Nama :
      </div>
      <div class="col-8 text-capitalize">
          <input class="form-control form-control-sm" type="text" value="${res.data.name}" aria-label="readonly input example" readonly>
      </div>
    </div>
    
    <div class="row my-2">
      <div class="col-4 text-end text-dark fw-semibold">
          Division ID :
      </div>
      <div class="col">
           <input class="form-control form-control-sm" type="text" value="${res.data.divisionId}" aria-label="readonly input example" readonly>
      </div>
    </div>
    
                `)
    }).fail(err => {
        console.log(err)
    })
}

function showEdit(departementId) {

    

    //populated division options
    $.ajax({
        url: "https://localhost:7002/api/division",
        type: "GET"
    }).done(res => {
        console.log(res.data.length);

        let temp = '';


        res.data.forEach(data => {
            temp += `<option id="option-${data.id}" value="${data.id}">${data.name}</option>`;
        })

        $('#divisionSelect').html(temp)

    }).fail(err => {
        console.log(err)
    })

    //get detail departement name and selectd appropriate option
    $.ajax({
        url: `https://localhost:7002/api/departement/${departementId}`,
        type: "GET"
    }).done(res => {
        document.querySelector('#departNameInput').value = res.data.name



        let selectedOption = document.querySelector(`#option-${res.data.divisionId}`)


        selectedOption.selected = true;


        const submitButtonEl = document.querySelector('#modalEdit').parentElement.querySelector('button[type="submit"]');

        submitButtonEl.id = departementId;

        submitButtonEl.addEventListener('click', sendEdit);


    })
}


function sendEdit() {
    console.log(table)

    //table.ajax.reload(json => {
    //    console.log(json)
    //}, false);



    const enteredDepartName = document.querySelector('#departNameInput').value;
    const enteredDivisionId = document.querySelector('#divisionSelect').value
    const departementId = document.querySelector('#modalEdit').parentElement.querySelector('button[type="submit"]').id;




    const data = {
        id: departementId,
        name: enteredDepartName,
        divisionId: enteredDivisionId
    }

    console.log(data);


    //update row table value
    let rowData = table.row((num, rowVal) => rowVal.id == departementId).data()
    rowData.name = enteredDepartName;
    rowData.divisionId = enteredDivisionId
    table.row((num, rowVal) => rowVal.id == departementId).data(rowData).draw()


    console.log(table.row((num, rowVal) => rowVal.id == departementId))
    console.log(rowData)


    $.ajax({
        url: 'https://localhost:7002/api/departement',
        type: 'PUT',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(data)
    }).done(res => {
        console.log(res);
 


    })
}


function showDelete(departementId) {

    const deletButtonEl = document.querySelector('#departementDeleteModal .modal-footer button:last-of-type')
    deletButtonEl.id = departementId
    deletButtonEl.addEventListener('click', deleteData)


}

function deleteData() {

    const departementId = document.querySelector('#departementDeleteModal .modal-footer button:last-of-type').id

    table.row((num, rowVal) => rowVal.id == departementId).remove().draw()

    $.ajax({
        url: `https://localhost:7002/api/departement/?id=${departementId}`,
        type: "DELETE"
    }).done(res => {
        console.log(res)

    })
}