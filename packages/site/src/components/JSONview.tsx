// import ReactJson from "react-json-view";
// let ReactJsonView;
// if (typeof window !== 'undefined') {
//   ReactJsonView = require('react-json-view').default;
// }

export const JSONview = (props) => {
  return (
    <div className="row m-0 p-1 rounded shadow-sm bg-secondary">
      {/* {ReactJsonView && <ReactJson src={props.json}
        theme="pop"
        iconStyle="circle"
        enableClipboard={true}
        displayDataTypes={false}
        displayObjectSize={true}
        indentWidth={8}
        collapsed={false}
      />
      } */}
      <pre className="text-white">{JSON.stringify(props.json, null, 2)}</pre>
    </div>
  )
}