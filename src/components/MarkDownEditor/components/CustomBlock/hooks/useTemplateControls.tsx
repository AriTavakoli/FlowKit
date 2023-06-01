

function useTemplateControls() {

  const handleBlockMoveEvent = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleInputEvent = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }


  return {
    handleInputEvent,
    handleBlockMoveEvent,
  }


}

export default useTemplateControls