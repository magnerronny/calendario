import { CalendarioEvent, CalendarioModal, FabAddNew, FabDelete, NavBar } from "../"

import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

// import { addHours } from "date-fns"
import { localizer, getMessagesES } from "../../helpers"
import { useEffect, useState } from "react"
import { useAuthStore, useCalendarioStore, useUiStore } from "../../hooks"



export const CalendarioPage = () => {
   const { user } = useAuthStore();
   const {openDateModal} = useUiStore();
   const {events, SetActiveEvent, startLoadingEvents} = useCalendarioStore()
  
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')
  
  const eventStyleGetter = (event) => {

    const isMyEvent = ( user.uid === event.user.id ) || ( user.uid === event.user.uid )


    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = () => {
    // console.log({onDoubleClick:event})
    openDateModal()
  }

  const onSelect = (event) => {
    // console.log({click: event})
    SetActiveEvent(event)
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event)
    setLastView(event)
  }


useEffect(() => {
  startLoadingEvents()

}, [])


  return (
    <>
      <NavBar/>

      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarioEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarioModal/>
      <FabAddNew/>
      <FabDelete/>
    </>
  )
}
