
<script context="module">
    export async function load({page}) {
        const id = page.params.id;
        var url = `http://localhost:8080/listings/${id}/cars`;
        var res = await fetch(url);
        var cars = await res.json();
		 const loadedCars = cars.map((car) => {
            return {
                Vin: car.vin,
                Color: car.color,
                Id: car.stock_id,
            }
        });
		return {props: {cars: loadedCars, listing_id: id}}
    }
</script>

<script>
	import CustomTable from "../../components/customTable.svelte";
    import Modal from "../../components/modal.svelte"
    export let cars;
	export let listing_id;
    let headers = ["Vin", "Color", "Id"];

	let showModal = false;
	const toggleModal = () => {
		showModal = !showModal;
	};

    const createNewCar = async function () {
        const url = "http://localhost:8080/cars";
        const newCar = {
            vin: vin,
			color: color,
			listing_id: listing_id
        }
        
        const res = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(newCar),
        })
        const data = await res.json();
        const id = data.insertId;
        cars = [...cars, {
                Vin: vin,
				Color: color,
				Id: id
            }]
        toggleModal();

    }

    let vin, color;
    let validForm = false;

    $:{ 
        if(vin && color){
            validForm = true;
        }
        else{
            validForm = false;
        }
    }


</script>

<slot><!-- optional fallback --></slot>
<div class="wrapper">
    <main>
        <h1>Cars</h1>
        <div class="sub">
            <p>List of all currentlycars belonging to this listing</p>
            <button on:click={toggleModal}>Create new car</button>
        </div>
        {#if cars}
                <CustomTable {headers} entries={cars} resource="cars" clickable={false}/>
        {/if}
        <Modal {showModal} >
            <div class="header">
                <button class="cancel" on:click={toggleModal}>Cancel</button>
                <h1>New Appointment</h1>
                <button class="done" disabled={!validForm} on:click={createNewCar}>Done</button>
            </div>
            <form>
                <input type="text" placeholder="Vin" bind:value={vin} maxlength=16>
                <input type="text" placeholder="Color" bind:value={color} >
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
		text-transform: lowercase;
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