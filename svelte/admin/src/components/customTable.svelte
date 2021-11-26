<script>
    export let headers;
    export let entries;
    export let resource;
</script>

<table>
    <tr>
        {#each headers as header}
            <th>{header}</th>
        {/each}
    </tr>

    {#each entries as entry}
        <tr>
            {#each headers as header}
                <td><a sveltekit:prefetch href="/{resource}/{entry["Id"]}">{entry[header]}</a></td>
            {/each}
        </tr>
    {/each}

</table>

<style>
    table {
        width: 100%;
        border-collapse: collapse;
        border: 1px solid var(--clr-neutral-200);
        
    }

    a{
        text-decoration: none;
        color: black;
    }

    th{
        text-align: left;
        padding-left: .3rem;
    }

    td {
        text-align: left;
        padding-left: .3rem;
    }

    tr:nth-child(even){
        background-color: var(--clr-neutral-100);
    }
</style>