<script>
    // You can pass a size prop if you want to customize the spinner size
    export let size = '4rem';
  </script>
  
  <style>
    .spinner {
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-left-color: #3b82f6; /* Blue color for spinner */
      border-radius: 50%;
      width: var(--spinner-size, 4rem);
      height: var(--spinner-size, 4rem);
      animation: spin 1s linear infinite;
    }
  
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  </style>
  
  <div class="spinner" style="--spinner-size: {size};"></div>
  