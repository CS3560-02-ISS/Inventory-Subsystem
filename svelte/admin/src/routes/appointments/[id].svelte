
<script context="module">
    export async function load({page}) {
        const id = page.params.id;
        var url = `http://localhost:8080/appointments/${id}`;
        var res = await fetch(url);
        var appointment = await res.json();
		return {props: {appointment: appointment[0]}}
    }
</script>

<script>
	import Modal from "../../components/modal.svelte";
	export let appointment;
	let cancelModal = false;
	let editModal = false;
	let c_id = appointment.customer_id;
	let date = appointment.date;
	let l_id = appointment.listing_id;
	let e_id = appointment.employee_id;
	
	let canEdit = true;
	$: canEdit = c_id != "" && date != "" && l_id != "" && e_id != "";
	
	const deleteAppointment = async function () {
		const url = `http://localhost:8080/appointments/${appointment.appointment_id}`;
		const res = await fetch(url, { method: "DELETE" } );
	}
	
	const editAppointment = async function () {
		const url = `http://localhost:8080/appointments/${appointment.appointment_id}`;
		const msg = {
			employee_id: e_id,
			listing_id: l_id,
			date: date,
			customer_id: c_id
		};
		const res = await fetch(url, {
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			method: "PUT",
			body: JSON.stringify(msg)
		});
		appointment.customer_id = c_id;
		appointment.date = date;
		appointment.listing_id = l_id;
		appointment.employee_id = e_id;
	}
</script>

<div class="wrapper">
    <main>
		<header>
			<h1>Appointment</h1>
			<div class="actions">
				<button on:click = {() => { cancelModal = !cancelModal;}}>Delete</button>
				<button on:click = {() => { editModal = !editModal;}}>Edit</button>
			</div>
			<Modal showModal={cancelModal}>
				<div style="display: flex; flex-direction: column; gap: 1rem;">
					<a href="/employees/{appointment.employee_id}" class="accent text-none p1"
						on:click={deleteAppointment}
					>Delete</a>
					<div class="divider"></div>
					<a href="" class="black text-none dark p1" on:click={() => { cancelModal = !cancelModal;}}>Cancel</a>
				</div>
			</Modal>
			<Modal showModal={editModal}>
				<div class="modal-edit">
					<div class="modal-edit-header">
						<button class="edit-cancel" on:click={() => { editModal = !editModal;}}> Cancel </button>
						<h1> Edit Employee </h1>
						<button class="edit-done" 
						disabled={!canEdit}
						style={canEdit ? "color: var(--clr-primary-500); cursor: pointer" : "color: black; cursor: default;"}
						on:click={() => {
							if(canEdit){
								editModal = !editModal;
								editAppointment();
							}
						}}
						> Done </button>
					</div>
					<div class="modal-edit-body">
						<input type="text" placeholder="Customer Id" bind:value={c_id} required/>
						<input type="text" placeholder="Listing Id" bind:value={l_id} required/>
						<input type="date" placeholder="Date" bind:value={date} required/>
						<input type="text" placeholder="Emlpoyee Id" bind:value={e_id} required/>
					</div>
				</div>
			</Modal>
		</header>

		<div class="info">
			<h2>Info</h2>
			<div><strong>Customer</strong><p>{appointment.customer_id}</p></div>
			<div><strong>Listing</strong><p><a href="/listings/{appointment.listing_id}">{appointment.listing_id}</a></p></div>
			<div><strong>Date</strong><p></p>{appointment.date}</div>
			<div><strong>Employee</strong><p><a href="/employees/{appointment.employee_id}">{appointment.employee_id}</a></p></div>
		</div>
	</main>
</div>

<style>
	.modal-edit {
		display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 16em;
	}
	
	.modal-edit-header{
		display: flex;
		flex-direction: row;
		width: 100%;
	}
	
	.modal-edit-header h1{
		font-size: larger;	
	}
	
	.modal-edit-header button {
		background-color: transparent;
		border: none;
		cursor: pointer;
		font-size: large;
	}
	
	.modal-edit-header .edit-cancel {
		background: transparent;
		border: none;
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
		flex-direction: column;
		gap: 2rem;
	}
	
	.modal-edit-body input{
		
		padding: .5rem;
		padding-left: .8rem;
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
	.info a {
		text-decoration: none;
		color: var(--clr-primary-500);
		cursor: pointer;
	}
	.info {
		width: 50%;
		}
	
	.info  div{
		display: flex;
	}
	.info div p{
		margin-left: auto;
	}	
	
	header {
		display: flex;
		align-items: center;
	}
	
	.actions{
		margin-left: auto;
		display: flex;
		gap: 1rem;
	}
	
	.actions button {
		background-color: transparent;
		color: var(--clr-primary-500);
		border: none;
		font-size: larger;
		cursor: pointer;
	}
	
	.accent {
		color: var(--clr-accent-500);
	}
	
	.primary {
		color: var(--clr-primary-500);
	}
	
	.dark {
		color: black;
	}
	
	.text-none{
		text-decoration: none;
	}
	
	.divider {
		border-bottom: 1px solid var(--clr-neutral-700);
		width: 100%;
	}
	
	.p1 {
		padding-left: 2rem;
		padding-right: 2rem;
		
	}
	
	.h2 {
		height: 2rem;
	}
	
</style>