
<div>
    <nav class="navigation"> 
        <ul>
            <li>
                <a href="/">Employees</a>
            </li>
            <li>
                <a href="/listings">Listings</a>
            </li>
            <li>
                <a href="/appointments">Appointments</a>
            </li>
            <li>
                <a href="/transactions">Transactions</a>
            </li>
            <li>
                <a href="/customers">Customers</a>
            </li>
        </ul>
    </nav>
    <slot></slot>
</div>

<style>

    :global(*),
    :global(*::after),
    :global(*::before){
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        font-family: 'Roboto', sans-serif;
    }

    :root{
    --clr-neutral-100: rgba(243, 243, 243, 0.979);
    --clr-neutral-200: rgba(214, 212, 212, 0.959);
    --clr-neutral-300: rgba(179, 179, 180, 0.952);
    --clr-neutral-700: rgba(43, 43, 44, 0.952);
    --clr-neutral-900: rgba(14, 14, 14, 0.952);
    --clr-accent-500: rgba(235, 64, 52, 1);
    --clr-secondary-500: rgb(38, 175, 61);
    --clr-primary-500: rgb(52, 110, 235);
    }

    .navigation{
        display: flex;
        justify-content: center;
        background-color: var(--clr-neutral-900);
    }

    .navigation ul{
        display: flex;
        gap: 2rem;
    }

    .navigation li {
        text-decoration: none;
        list-style-type: none;
        padding: 1rem;
    }

    .navigation li a{
        text-decoration: none;
        color: var(--clr-neutral-100);
    }

    .navigation li a:hover{
        color: var(--clr-neutral-200);
        transition: color 200ms ease;
    }

    

</style>