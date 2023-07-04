import PropTypes from 'prop-types'
export const CalendarioEvent = ({event}) => {
  const {title, notes} = event

  return (
    <>
      <strong>{title}</strong>
      <br/>
      <span>- {notes}</span>
    </>
  )
}

CalendarioEvent.propTypes = {
  event: PropTypes.object
}