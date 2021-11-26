<script>
    export let name;
    export let address;
    export let id;
</script>


<div class="card">
    <div><span>Employee Id:</span> {id} </div>
    <div><span>Name:</span> {name}</div>
    <div><span>Address:</span> {address}</div>
</div>

<style>
    .card{
        font-family: 'Roboto', sans-serif;
        background-color: white;
        border: 1px solid var(--clr-neutral-300);
        padding: 1rem;
        position: relative;
    }
    .card::after{
        content: '';
        position: absolute;
        left: -.3rem;
        top: -1px;
        height: calc(100% + 2px);
        width: .3rem;
        background-color: var(--clr-primary-500);
    }

    .card span{
        font-weight: bold;
    }

</style>