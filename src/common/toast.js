import Swal from 'sweetalert2'

export const toastConfig = () => {
  return Swal.mixin({
    toast: true,
    icon: 'success',
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    confirmButtonText: 'close',
    confirmButtonColor: 'white',
    timerProgressBar: true,
    showCloseButton: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
  })
}

export const toastConfirm = (text, subText, html = '') => {
  return Swal.mixin({
    title: text ? text : 'Are you sure?',
    text: subText ? subText : 'You want to proceed?',
    html: html,
    showCancelButton: true,
    confirmButtonText: 'Yes',
    denyButtonText: 'No',
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
  })
}

export const fireToast = (icon, title) => {
  toastConfig().fire({
    icon,
    title,
  })
}

export const fireToastSuccess = (title) => {
  return fireToast('success', title)
}
export const fireToastError = (title) => {
  return fireToast('error', title)
}