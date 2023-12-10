import ReactJson from "react-json-view";

export const JSONview = (props) => {
  return (
    <div className="row m-0 p-1 rounded shadow-sm bg-secondary">
      <ReactJson src={props.json}
        theme="pop"
        iconStyle="circle"
        enableClipboard={true}
        displayDataTypes={false}
        displayObjectSize={true}
        indentWidth={8}
        collapsed={false}
      />
    </div>
  )
}