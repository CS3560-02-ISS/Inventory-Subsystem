<script context="module">
    export async function load({page}) {
        const id = page.params.id;
        var url = `http://localhost:8080/transactions/${id}`;
        var res = await fetch(url);
        var transaction = await res.json();
		return {props: {transaction: transaction[0]}}
    }
</script>


<script>
	import Modal from "../../components/modal.svelte";
	export let transaction;
	let cancelModal = false;
	let editModal = false;
	
	let c_id = transaction.customer_id;
	let date = transaction.transactionDate;
	let stock_id = transaction.stock_id;
	let e_id = transaction.employee_id;
	
	let canEdit = true;
	$: canEdit = c_id != "" && date != "" && stock_id != "" && e_id != "";
</script>

<div class="wrapper">
    <main>
		<header>
			<h1>Transaction</h1>
			<div class="actions">
				<button on:click = {() => { cancelModal = !cancelModal;}}>Delete</button>
				<button on:click = {() => { editModal = !editModal;}}>Edit</button>
			</div>
			<Modal showModal={cancelModal}>
				<div style="display: flex; flex-direction: column; gap: 1rem;">
					<a href="/employees/{transaction.employee_id}" class="accent text-none p1"
						
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
						<input type="text" placeholder="Stock Id" bind:value={stock_id} required/>
						<input type="date" placeholder="Date" bind:value={date} required/>
						<input type="text" placeholder="Emlpoyee Id" bind:value={e_id} required/>
					</div>
				</div>
			</Modal>
		</header>
			<div class="info">
			<h2>Info</h2>
			<div><strong>Customer</strong><p>{transaction.customer_id}</p></div>
			<div><strong>Stock</strong><p>{transaction.stock_id}</p></div>
			<div><strong>Date</strong><p></p>{transaction.transactionDate}</div>
			<div><strong>Employee</strong><p><a href="/employees/{transaction.employee_id}">{transaction.employee_id}</a></p></div>
		</div>
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
	.wrapper{
        display: flex;
        justify-content: center;
    }
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
	.actions{
		margin-left: auto;
		display: flex;
		gap: 1.5rem;
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
	
	header {
		display: flex;
		align-items: center;
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
	
</style>
