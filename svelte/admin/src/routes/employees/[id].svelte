<script context="module">
    export async function load({page}) {
        const id = page.params.id;
        const url = `http://localhost:8080/employees/${id}`;
        const res = await fetch(url);
        const employee = await res.json();
        return {props: {employee: employee}}
    }
</script>

<script>
    export let employee;
</script>

<h1>Employee</h1>
{#if employee}
    <h2>Info</h2>
    <p>{employee}</p>
    <h2>Appointments</h2>
{/if}

<style>
    p{
        font-size: large;

    }
</style>