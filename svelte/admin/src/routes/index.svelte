<script context="module">
    export async function load({page}) {
        const url = 'http://localhost:8080/employees';
        const res = await fetch(url);
        const data = await res.json();
        const loadedEmployees= data.map((employee) => {
            return {
                Name: employee.employeeName,
                Address: employee.employeeAddress,
                Id: employee.employee_id
            }
        });
        return {props: {employees: loadedEmployees}}
    }
</script>

<script>
    import CustomTable from "../components/customTable.svelte";
    import Modal from "../components/modal.svelte"
    export let employees;
    let headers = ["Name", "Address", "Id"];

	let showModal = false;
	const toggleModal = () => {
		showModal = !showModal;
	};

    const createNewEmployee = async function () {
        const url = "http://localhost:8080/employees";
        const body = {
            employeeName: fname,
            employeeAddress: address,
            employeeUsername: username,
            employeePassword: password
        }
        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
        })
        const data = await res.json();
        const id = data.insertId;
        employees = [...employees, {
            Name: fname,
            Address: address,
            Id: id,
        }]
        toggleModal();

    }

    let fname, address, username, password, confirm;
    let validForm = true;

    $:{ 

        if(fname && address && username && password && confirm && password == confirm){
            validForm = false;
        }
        else{
            validForm = true;
        }
    }


</script>

<slot><!-- optional fallback --></slot>
<div class="wrapper">
    <main>
        <h1>Employees</h1>
        <div class="sub">
            <p>List of all currently registered employees</p>
            <button on:click={toggleModal}>Create new employee</button>
        </div>
        {#if employees}
                <CustomTable {headers} entries={employees} resource="employees"/>
        {/if}
        <Modal {showModal} >
            <div class="header">
                <button class="cancel" on:click={toggleModal}>Cancel</button>
                <h1>New Employee</h1>
                <button class="done" disabled={validForm} on:click={createNewEmployee}>Done</button>
            </div>
            <form>
                <input type="text" placeholder="First Last" bind:value={fname}>
                <input type="text" placeholder="Address" bind:value={address}>
                <input type="text" placeholder="Username" bind:value={username}> 
                <input type="password" placeholder="Password" bind:value={password} class={password == confirm ? 'matched' : 'mismatched'}>
                <input type="password" placeholder="Confirm Password" bind:value={confirm} class={password == confirm ? 'matched' : 'mismatched'}>
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