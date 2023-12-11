export const TitleBar = (props) => {
  return (
    <div className="row m-0 p-2 mt-2 mb-2 bg-2 rounded shadow-sm">
      <h3 className="text-start p-0 m-0">
        {props.title}
      </h3>
    </div>
  )
}