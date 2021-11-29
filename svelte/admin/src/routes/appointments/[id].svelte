
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
	
	
</script>

<div class="wrapper">
    <main>
		<header>
			<h1>Appointment</h1>
			<div class="actions">
				<button on:click = {() => { cancelModal = !cancelModal;}}>Cancel</button>
				<button on:click = {() => { editModal = !editModal;}}>Edit</button>
			</div>
			<Modal showModal={cancelModal}>
			</Modal>
			<Modal showModal={editModal}>
			</Modal>
		</header>

		<div class="info">
			<h2>Info</h2>
			<div><strong>Customer</strong><p>{appointment.customer_id}</p></div>
			<div><strong>Listing</strong><p>{appointment.listing_id}</p></div>
			<div><strong>Date</strong><p></p>{appointment.date}</div>
			<div><strong>Employee</strong><p>{appointment.employee_id}</p></div>
		</div>
	</main>
</div>

<style>
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
	
	.info {
		width: 50%;
		}
	
	.info  div{
		display: flex;
	}
	.info div p{
		margin-left: auto;
	}	
	
</style>