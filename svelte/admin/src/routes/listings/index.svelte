<script context="module">
    export async function load({page}) {
        const url = 'http://localhost:8080/listings';
        const res = await fetch(url);
        const data = await res.json();
        const loadedListings = data.map((listing) => {
            return {
                Make: listing.make,
                Model: listing.model,
                Year: listing.year,
				Price: listing.price,
				Id: listing.listing_id
            }
        });
        return {props: {listings: loadedListings}}
    }
</script>

<script>
    import CustomTable from "../../components/customTable.svelte";
    import Modal from "../../components/modal.svelte"
    export let listings;
    let headers = ["Make", "Model", "Year", "Price", "Id"];

	let showModal = false;
	const toggleModal = () => {
		showModal = !showModal;
	};
	
    const createNewListing = async function () {
        const url = "http://localhost:8080/listings";
        const newListing = {
				make: make,
                model: model,
                year: year,
				price: price
        }
        
        const res = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(newListing),
        })
        const data = await res.json();
        const id = data.insertId;
        listings = [...listings, {
                Make: make,
                Model: model,
                Year: year,
				Price: price,
				Id: id
            }]
        toggleModal();

    }

    let make, model, year, price;
    let validForm = false;

    $:{ 
        if(make && model && year  && price ){
            validForm = true;
        }
        else{
            validForm = false;
        }
		console.log(validForm);
    }


</script>

<slot><!-- optional fallback --></slot>
<div class="wrapper">
    <main>
        <h1>Listings</h1>
        <div class="sub">
            <p>List of all currently listings</p>
            <button on:click={toggleModal}>Create new listing</button>
        </div>
        {#if listings}
                <CustomTable {headers} entries={listings} resource="listings"/>
        {/if}
        <Modal {showModal} >
            <div class="header">
                <button class="cancel" on:click={toggleModal}>Cancel</button>
                <h1>New Transaction</h1>
                <button class="done" disabled={!validForm} on:click={createNewListing}>Done</button>
            </div>
            <form>
                <input type="text" placeholder="Make" bind:value={make}>
                <input type="text" placeholder="Model" bind:value={model}>
                <input type="text" placeholder="Year" bind:value={year}> 
                <input type="number" placeholder="Price" bind:value={price}> 
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