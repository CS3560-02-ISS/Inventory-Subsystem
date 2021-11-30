<script context="module">
    export async function load({page}) {
        const url = 'http://localhost:8080/appointments';
        const res = await fetch(url);
        const data = await res.json();
        const loadedAppointments= data.map((appointment) => {
            return {
                Date: appointment.date,
                Customer: appointment.customer_id,
                Employee: appointment.employee_id,
				Listing: appointment.listing_id,
				Id: appointment.appointment_id
            }
        });
        return {props: {appointments: loadedAppointments}}
    }
</script>

<script>
    import CustomTable from "../../components/customTable.svelte";
    import Modal from "../../components/modal.svelte"
    export let appointments;
    let headers = ["Date", "Customer", "Employee", "Listing", "Id"];

	let showModal = false;
	const toggleModal = () => {
		showModal = !showModal;
	};

    const createNewAppointment = async function () {
        const url = "http://localhost:8080/appointments";
        const newAppointment = {
            date: date,
            listing_id: listing_id,
            customer_id: customer_id,
            employee_id: employee_id
        }
        
        const res = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(newAppointment),
        })
        const data = await res.json();
        const id = data.insertId;
        appointments = [...appointments, {
                Date: date,
                Customer: customer_id,
                Employee: employee_id,
				Listing: listing_id,
				Id: id
            }]
        toggleModal();

    }

    let date, customer_id, employee_id, listing_id;
    let validForm = true;

    $:{ 

        if(date && customer_id && listing_id){
            validForm = false;
        }
        else{
            validForm = true;
        }
    }


</script>

<slot><!-- optional fallback --></slot>
<div class="wrapper">
    <main>
        <h1>Appointments</h1>
        <div class="sub">
            <p>List of all currently open appointments</p>
            <button on:click={toggleModal}>Create new appointment</button>
        </div>
        {#if appointments}
                <CustomTable {headers} entries={appointments} resource="appointments"/>
        {/if}
        <Modal {showModal} >
            <div class="header">
                <button class="cancel" on:click={toggleModal}>Cancel</button>
                <h1>New Appointment</h1>
                <button class="done" disabled={validForm} on:click={createNewAppointment}>Done</button>
            </div>
            <form>
                <input type="date" placeholder="Date" bind:value={date}>
                <input type="text" placeholder="Customer" bind:value={customer_id}>
                <input type="text" placeholder="Employee" bind:value={employee_id}> 
                <input type="text" placeholder="Listing" bind:value={listing_id}> 
            </form>
        </Modal>
        
    </main>
</div>



<style>
    main{
        width: 60%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding-top: 1rem;
        background-color: white;
    }
    .header{
        display: flex;
        justify-content: center;
        align-items: center;

    }
    .header h1{
        font-size: large;
    }

    .header button{
        background-color: transparent;
        border: none;
        color: var(--clr-primary-500);
        font-size: large;
        cursor: pointer;
    }

    .header button:disabled{
        color: var(--clr-neutral-700);
        cursor: default;
    }

    .cancel{
        margin-right: auto;
        margin-left: .5rem;
    }
    .done{
        margin-left: auto;
        margin-right: .5rem;
    }

    .matched{
        border-bottom: 1px solid var(--clr-secondary-500);
    }
    
    .mismatched{
        border-bottom: 1px solid var(--clr-accent-500);
    }

    form{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 40ch;
        padding: 1rem;

    }

    form input{
        height: 2rem;
        padding-left: .5rem;
        font-size: medium;
        outline: none;
        border: none;
        border-bottom: 1px solid var(--clr-neutral-700);
        transition: border 200ms ease;
    }

    form input:focus{
        border-bottom: 1px solid var(--clr-primary-500);
    }


    p{
        font-size: large;

    }
    .wrapper{
        display: flex;
        justify-content: center;
    }

    button{
        padding: .2rem;
        font-size: medium;
        margin-left: auto;
    }

    .sub{
        display: flex;
        align-items: center;
    }
</style>