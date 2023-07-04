import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store";

export const useUiStore = () => {
  const dispatch = useDispatch()

  const { isDateModelOpen } = useSelector(state => state.ui);

  const openDateModal = () => {
    dispatch(onOpenDateModal())
  }

  const closeDateModel = () => {
    dispatch(onCloseDateModal()) 
  }

  return {
    //* propiedades
    isDateModelOpen,
    //* metodos
    openDateModal,
    closeDateModel

  }

}