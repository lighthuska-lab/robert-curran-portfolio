const button = document.querySelector('#copy-email');
const status = document.querySelector('#copy-status');
button?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('robertmcurran0909@gmail.com');
    status.textContent = 'Email address copied.';
  } catch {
    status.textContent = 'Copy unavailable. Use the email link or select the address above.';
  }
});
