<script>
    // your script goes here
    export let showModal = false;
</script>

{#if showModal}
    <div class="wrapper" on:click|self>
        <div class="modal" >
            <slot></slot>
        </div>
    </div>
{/if}


<style>
    .wrapper{

        height: 100vh;
        width: 100vw;
        position: absolute;
        top: 0;
        left: 0;
        display: grid;
        place-items: center;
    }

    .modal {
        -webkit-box-shadow: -2px 6px 22px 5px rgba(0,0,0,0.31); 
        box-shadow: -2px 6px 22px 5px rgba(0,0,0,0.31);
        background-color: white;
        border-radius: .5rem;
        padding: 1rem;
    }
</style>