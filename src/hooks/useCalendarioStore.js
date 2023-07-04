import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store"
import { calendarApi } from "../api"
import { convertEventsToDateEvents } from "../helpers"
import Swal from "sweetalert2"

export const useCalendarioStore = () => {
  const dispatch = useDispatch()
  const {events, activeEvent} = useSelector(state => state.calendario)
  const {user} = useSelector(state => state.auth)

  const SetActiveEvent = (calendarioEvent) => {
    dispatch(onSetActiveEvent(calendarioEvent))
  }

  const startSavingEvent = async(calendarioEvent) => {
    // TODO: llegar al backend

    // todo bien
    try {
      if( calendarioEvent.id ) {
        // Actualizando
         await calendarApi.put(`/events/${calendarioEvent.id}`, calendarioEvent)
        dispatch(onUpdateEvent({...calendarioEvent, user}))
        return;
      }
  
      //Creando
      const {data} = await calendarApi.post('/events', calendarioEvent)
      dispatch(onAddNewEvent({...calendarioEvent, id: data.evento.id, user }))
    } catch (error) {
      console.log(error)
      Swal.fire('Error al  guardar', error.response.data?.msg, 'error');
    }

  }

  const startDeletingEvent = async() => {
    
    try {
      
      await calendarApi.delete(`/events/${activeEvent.id}`)
      dispatch(onDeleteEvent())
      
    } catch (error) {
      console.log(error)
      Swal.fire('Error al  eliminar', error.response.data?.msg, 'error');
    }
  }

  const startLoadingEvents = async() => {
    try {
      const {data} = await calendarApi.get('/events')
      const events = convertEventsToDateEvents(data.eventos)
      dispatch(onLoadEvents(events))
      console.log(events)
    } catch (error) {
      console.log(error)
      console.log('Error cargando eventos')
    }
  }

  return {
   //* Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
   //* Methodos
   SetActiveEvent,
   startSavingEvent,
   startDeletingEvent,
   startLoadingEvents
   
  }
}
