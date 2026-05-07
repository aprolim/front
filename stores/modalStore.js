// stores/modalStore.js
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    activeModal: null,
    modalProps: null
  }),
  
  actions: {
    openModal(modalName, props = {}) {
      this.activeModal = modalName
      this.modalProps = props
      document.body.style.overflow = 'hidden'
      document.body.classList.add('modal-open')
    },
    
    closeModal() {
      this.activeModal = null
      this.modalProps = null
      document.body.style.overflow = ''
      document.body.classList.remove('modal-open')
    }
  }
})