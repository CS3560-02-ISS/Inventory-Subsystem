<script context="module">
    export async function load({page}) {
        const id = page.params.id;
        var url = `http://localhost:8080/employees/${id}`;
        var res = await fetch(url);
        var employee = await res.json();
        url = `http://localhost:8080/appointments/?employee_id=${id}`;
        res = await fetch(url);
        var appointments = await res.json();
        var loadedAppointments = appointments.map((appointment) =>{
            return {
                Date: appointment.date,
                "Customer Id": appointment.customer_id,
                Listing: appointment.listing_id,
                Id: appointment.appointment_id
            }
        })

        url = `http://localhost:8080/transactions/?employee_id=${id}`;
        res = await fetch(url);
        var transactions = await res.json();
        var loadedTransactions = transactions.map((transaction) =>{
            return {
                Date: transaction.transactionDate,
                "Customer Id": transaction.customer_id,
                "Stock Id": transaction.stock_id,
                Id: transaction.transaction_id
            }
        })
        return {props: {employee: employee[0], appointments: loadedAppointments, transactions: loadedTransactions}}
    }
</script>

<script>
    import CustomTable from "../../components/customTable.svelte";
    import Modal from "../../components/modal.svelte";

    export let employee;
    export let appointments;
    export let transactions;
	let appointmentHeaders = ["Date", "Listing", "Customer Id", "Id"];
    let transactionHeaders = ["Date", "Customer Id", "Stock Id", "Id"];
	let showModal = false;
	let showModalEdit = false;
	let name, address, id;
	name = employee.employeeName;
	address = employee.employeeAddress;
	id = employee.employee_id;
	
	
	const toggleModal = () => {
		showModal = !showModal;
	};
	
	const toggleModalEdit = () => {
		showModalEdit =!showModalEdit;
	};

    const deleteEmployee = async function() {
        const id = employee.employee_id;
        var url = `http://localhost:8080/employees/${id}`;
        var res = await fetch(url, {
            method: "DELETE"
        });
    }
	
	const editEmployee = async function() {
		var url = `http://localhost:8080/employees/${id}`;
		var msg = {
				employeeName: name,
				employeeAddress: address
			}
		var res = await fetch(url, {
		    headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			method: "PUT",
			body: JSON.stringify(msg)
		});
		employee.employeeName = name;
		employee.employeeAddress = address;
		
	}
	

</script>

<slot></slot>

<div class="wrapper">
    <main>
		<header>
			<Modal {showModal}>
				<div class="modal">
					<button class="delete"><a href="/" on:click={deleteEmployee}>Delete</a> </button>
					<button on:click={toggleModal} class="cancel">Cancel</button>
				</div>
			</Modal>
			<Modal showModal={showModalEdit}>
				<div class="modal-edit">
					<div class="modal-edit-header">
						<button class="edit-cancel" on:click={toggleModalEdit}> Cancel </button>
						<h1> Edit Employee </h1>
						<button class="edit-done" on:click={() => {
							toggleModalEdit();
							editEmployee();
						}}> Done </button>
					</div>
					<div class="modal-edit-body">
						<input type="text" placeholder="Name" bind:value={name}/>
						<input type="text" placeholder="Address" bind:value={address}/>
					</div>
				</div>
			</Modal>
			<div style="display: flex; position: relative;">
				<h1>Employee</h1>
				<div style="margin-left: auto; display : flex; gap: 2rem;">
					<button on:click={toggleModalEdit}>Edit</button>
					<button on:click={toggleModal} >Delete</button>
				</div>
			</div>
		</header>
        
        {#if employee}
        <div>
            <div class="infoBlock">
                <h2>Info</h2>
                <div class="info-line">
                    <strong>Id</strong> <p class="info-line-val">{employee.employee_id} </p>
                </div>
                <div class="info-line">
                    <strong>Name</strong> <p class="info-line-val">{employee.employeeName}</p>
                </div>
                <div class="info-line">
                    <strong>Address</strong> <p class="info-line-val">{employee.employeeAddress} </p>
                </div>
            </div>
        </div>
			{#if appointments}
            <h2>Appointments</h2>
                <CustomTable headers={appointmentHeaders} entries={appointments} resource="appointments"/>
            {/if}
			{#if transactions}
            <h2>Transactions</h2>
                <CustomTable headers={transactionHeaders} entries={transactions} resource="transactions"/>
            {/if}
        {/if}
    </main>
</div>
<style>
	.modal-edit {
		display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
	}
	
	.modal-edit-header{
		display: flex;
		flex-direction: row;
		width: 100%;
		
	}
	
	.modal-edit-header h1{
		font-size: larger;
	}
	
	.modal-edit-header .edit-cancel {
		color: var(--clr-accent-500);
	}
	
	.modal-edit-header .edit-done {
		color: var(--clr-primary-500);
	}
	
	.modal-edit-header .edit-cancel{
		margin-right: auto;
	}
	
	.modal-edit-header .edit-done {
		margin-left: auto;
	}
	
	.modal-edit-body {
		display: flex;
		gap: 2rem;
	}
	
	.modal-edit-body input{
		
		padding: .5rem;
		padding-left: .8rem;
	}
	
    .modal{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 10rem;
    }
    .infoBlock{
        width: 50%;
    }
    .info-line{
        display: flex;
        justify-content: start;
        align-items: center;

    }
    .info-line-val{
        margin-left: auto;
    }

    .delete {
        cursor: default;
        border-bottom: 1px solid var(--clr-neutral-700);
        padding-bottom: 1rem;
    }
    
    .delete a{
        text-decoration: none;
        color: var(--clr-accent-500);
    }
    .cancel {
        color: black;
    }

    h2{
        margin-bottom: .5rem;
    }
    p{
        font-size: large;
    }
    strong{
        font-size: large;
    }
    main{
        width: 60%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding-top: 1rem;
        background-color: white;
    }
    .wrapper{
        display: flex;
        justify-content: center;
    }
    button{
        background-color: transparent;
        border: none;
        color: var(--clr-primary-500);
        font-size: large;
        cursor: pointer;
    }
</style>