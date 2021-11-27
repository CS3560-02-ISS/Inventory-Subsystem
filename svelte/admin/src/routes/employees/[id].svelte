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
    export let employee;
    export let appointments;
    export let transactions;
    import CustomTable from "../../components/customTable.svelte";
    import Modal from "../../components/modal.svelte";
    let appointmentHeaders = ["Date", "Listing", "Customer Id", "Id"];
    let transactionHeaders = ["Date", "Customer Id", "Stock Id", "Id"];

    let showModal = false;
	const toggleModal = () => {
		showModal = !showModal;
	};

    const deleteEmployee = async function() {
        const id = employee.employee_id;
        var url = `http://localhost:8080/employees/${id}`;
        var res = await fetch(url, {
            method: "DELETE"
        });
    }

    $: console.log(transactions);
</script>

<div class="wrapper">
    <main>
        <Modal {showModal}>
            <div class="modal">
                <button class="delete"><a href="/" on:click={deleteEmployee}>Delete</a> </button>
                <button on:click={toggleModal} class="cancel">Cancel</button>
            </div>
        </Modal>
        <div style="display: flex; position: relative;">
            <h1>Employee</h1>
            <div style="margin-left: auto; display : flex; gap: 2rem;">
                <button >Edit</button>
                <button  on:click={toggleModal} >Delete</button>
            </div>
        </div>
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
        <div>
            <h2>Appointments</h2>
            {#if appointments}
                <CustomTable {appointmentHeaders} entries={appointments} resource="appointments"/>
            {/if}
        </div>
        <div>
            <h2>Transactions</h2>
            {#if transactions}
                <CustomTable {transactionHeaders} entries={transactions} resource="transactions"/>
            {/if}
        </div>
        {/if}
    </main>
</div>
<style>
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
        margin-bottom: 1rem;
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