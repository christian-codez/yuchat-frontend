import M from 'materialize-css';

export const toastMessage = message => {
  M.toast({ html: message });
};
