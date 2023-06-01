export default function MyComponent({ children }) {

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div> yo</div>
      {children}

      <div> yo</div>
    </div>
  )

}