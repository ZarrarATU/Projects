
export function Button({children = 'PROCEED',loadingText = null,...props}) {
  return (
    <>
    <button style={{cursor: `${ loadingText && 'not-allowed'}`}} {...props} >{loadingText ? loadingText : children}</button>
    </>
  )
}