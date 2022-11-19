console.log("dari divion js...")


let table = null;


$(document).ready(function () {
    table = $('#divisionTable').DataTable({
        ajax: {
            url: 'https://localhost:7002/api/division',
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
                data: "id",
                render: (data) => {
                    return `
                    <a class="btn btn-primary text-light" data-bs-toggle="modal" data-bs-target="#divisionEditModal" onclick="showEdit(${data})">Edit</a> |
                    <a class="btn btn-info text-light" data-bs-toggle="modal" data-bs-target="#divisionDetailsModal" onclick="showDetail(${data})">Details</a> |
                    <a class="btn btn-danger text-light" data-bs-toggle="modal" data-bs-target="#divisionDeleteModal" onclick="showDelete(${data})">Delete</a>
                    <a class="btn btn-danger text-light" data-bs-toggle="modal" data-bs-target="#cobaModal" >coba</a>


        `;
                }
            }
        ],
        dom: 'Bfrtip',
        buttons: ['copy', 'pdf', 'colvis', 'excel']

    })
})


function showDetail(divisionId) {


    $.ajax({
        url: `https://localhost:7002/api/division/${divisionId}`,
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
          Division Name :
      </div>
      <div class="col-8 text-capitalize">
          <input class="form-control form-control-sm" type="text" value="${res.data.name}" aria-label="readonly input example" readonly>
      </div>
    </div>
    
    
                `)
    }).fail(err => {
        console.log(err)
    })
}



function showEdit(divisionId) {


    $.ajax({
        url: `https://localhost:7002/api/division/${divisionId}`,
        type: "GET"
    }).done(res => {
        document.querySelector('#divisionNameInput').value = res.data.name


        const submitButtonEl = document.querySelector('#modalEdit').parentElement.querySelector('button[type="submit"]');

        submitButtonEl.id = divisionId;

        submitButtonEl.addEventListener('click', sendEdit);


    })
}


function sendEdit() {
    //table.ajax.reload(json => {
    //    console.log(json)
    //}, false);



    const enteredDivisionName = document.querySelector('#divisionNameInput').value;
    const divisionId = document.querySelector('#modalEdit').parentElement.querySelector('button[type="submit"]').id;




    const data = {
        id: divisionId,
        name: enteredDivisionName
 
    }

    console.log(data);


    //update row table value
    let rowData = table.row((num, rowVal) => rowVal.id == divisionId).data()
 

    rowData.name = enteredDivisionName;
    table.row((num, rowVal) => rowVal.id == divisionId).data(rowData).draw()


    //console.log(table.row((num, rowVal) => rowVal.id == departementId))
    //console.log(rowData)


    $.ajax({
        url: 'https://localhost:7002/api/division',
        type: 'PUT',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(data)
    }).done(res => {
        console.log(res);



    })
}


function showDelete(divisionId) {

    const deleteButtonEl = document.querySelector('#divisionDeleteModal .modal-footer button:last-of-type')
    deleteButtonEl.id = divisionId
    deleteButtonEl.addEventListener('click', deleteData)


}

function deleteData() {

    const divisionId = document.querySelector('#divisionDeleteModal .modal-footer button:last-of-type').id

    table.row((num, rowVal) => rowVal.id == divisionId).remove().draw()

    $.ajax({
        url: `https://localhost:7002/api/division/?id=${divisionId}`,
        type: "DELETE"
    }).done(res => {
        console.log(res)

    })
}