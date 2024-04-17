export function Forminput({nomlabel, typeinput, value, inputchange}) {
    return (
      <div className="form-input">
        <label>{nomlabel}</label> <br />
        <input type={typeinput} value={value} onChange={inputchange} />
      </div>
    );


}