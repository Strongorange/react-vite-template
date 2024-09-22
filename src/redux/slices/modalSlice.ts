import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ModalState {
  modals: Array<{ id: string; isOpen: boolean }>
}

const initialState: ModalState = {
  modals: [],
}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      state.modals.push({ id: action.payload, isOpen: true })
    },
    closeModal: (state, action: PayloadAction<string>) => {
      const index = state.modals.findIndex(
        (modal) => modal.id === action.payload,
      )
      if (index !== -1) {
        state.modals.splice(index, 1)
      }
    },
    closeAllModals: (state) => {
      state.modals = []
    },
    closeLastModal: (state) => {
      if (state.modals.length > 0) {
        state.modals.pop()
      }
    },
  },
})

export const { openModal, closeModal, closeAllModals, closeLastModal } =
  modalSlice.actions
export default modalSlice.reducer
