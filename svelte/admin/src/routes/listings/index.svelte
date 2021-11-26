<script context="module">
    export async function load({page}) {
        const url = 'http://localhost:8080/listings';
        const res = await fetch(url);
        const data = await res.json();
        const loadedListings= data.map((listing) => {
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
    import CustomTable from "../../components/customTable.svelte"
    export let listings;
    let headers = ["Make", "Model", "Year", "Price", "Id"];

</script>

<slot><!-- optional fallback --></slot>
<div class="wrapper">
    <main>
        <h1>Listings</h1>
        <p>List of all current listings</p>
        {#if listings}
                <CustomTable {headers} entries={listings} resource="listings"/>
        {/if}
    </main>
</div>



<style>
    main{
        width: 60%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding-top: 1rem;
    }
    h1{

    }
    p{
        font-size: large;

    }
    .wrapper{
        display: flex;
        justify-content: center;
    }
</style>