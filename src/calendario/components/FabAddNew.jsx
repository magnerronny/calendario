import { addHours } from "date-fns";
import { useCalendarioStore, useUiStore } from "../../hooks"

export const FabAddNew = () => {
  const { openDateModal } =  useUiStore();
  const { SetActiveEvent } = useCalendarioStore();

  const handleClickNew = () => {
    SetActiveEvent({
      // _id: new Date().getTime(),
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor:'#fafafa',
      user: {
        _id: '123',
        name: 'fernando'
      }
    })
    openDateModal();
  }

  return (
    <button
      className="btn btn-primary fab"
      onClick={ handleClickNew }
    >
      <i className="fas fa-plus"></i>
    </button>
  )
}
