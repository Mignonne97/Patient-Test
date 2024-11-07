<script lang="ts">
    import logo from './logo.svg';
    import { launchToast } from '../../lib/toaster';
    import { goto } from '$app/navigation';
    import { writable } from 'svelte/store';

    let username = '';
    let password = '';
    let errors = writable<{ username: string; password: string; general: string }>({
        username: '',
        password: '',
        general: ''
    });
    let loading: boolean = false;

    const handleSubmit = async () => {
        errors.set({
            username: '',
            password: '',
            general: ''
        });

        let hasErrors = false;

        if (username === '') {
            errors.update(e => ({ ...e, username: 'Username is invalid' }));
            launchToast('Username required', 'error');
            hasErrors = true;
        }

        if (password === '') {
            errors.update(e => ({ ...e, password: 'Password is invalid' }));
            launchToast('Password required', 'error');
            hasErrors = true;
        }

        if (username === 'admin' && password === 'admin') {
            loading = true;
            try {
                launchToast('Successfully logged in', 'success');
                goto('/diary');
                // Reset form
                username = '';
                password = '';
            } catch (error) {
                console.error(error);
            } finally {
                loading = false;
            }
        } else if (!hasErrors) {
            errors.update(e => ({ ...e, general: 'Something went wrong. Please check your username and password.' }));
            launchToast('Invalid username or password', 'error');
        }
    };
</script>

<div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div class="mb-8">
        <img src={logo} alt="goodxcapture" class="w-80" />
    </div>

    <form class="w-80 text-center" on:submit|preventDefault={handleSubmit}>
        <div class="relative mb-4">
            <i class="fa-solid fa-user absolute left-3 top-3 text-gray-500"></i>
            <input type="text" bind:value={username} placeholder="Username"
                class="input input-bordered w-full pl-10"/>
            {#if $errors.username}
                <span class="text-red-500 text-sm"><i class="fa-solid fa-circle-exclamation text-red mr-2"></i>{$errors.username}</span>
            {/if}
        </div>

        <div class="relative mb-6">
            <i class="fa-solid fa-lock absolute left-3 top-3 text-gray-500"></i>
            <input type="password" bind:value={password} placeholder="Password" 
                class="input input-bordered w-full pl-10"/>
            {#if $errors.password}
                <span class="text-red-500 text-sm"><i class="fa-solid fa-circle-exclamation text-red mr-2"></i>{$errors.password}</span>
            {/if}
        </div>

        {#if $errors.general}
            <span class="text-red-500 text-sm mb-4 mt-2"><i class="fa-solid fa-circle-exclamation text-red mr-2"></i>{$errors.general}</span>
        {/if}
    
        <button type="submit" class="btn bg-[#009688] text-white w-full mb-4 mt-2">Login</button>
    </form>

    <div class="divider mb-4 text-gray-500">or</div>

    <button class="btn btn-outline bg-transparent border-[#009688] w-4/5 text-gray-500">Face Recognition</button>
</div>

<style>
    .input {
        padding-left: 2.5rem;
    }
</style>
