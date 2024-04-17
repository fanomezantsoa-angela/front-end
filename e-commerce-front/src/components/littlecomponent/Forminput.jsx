export function Forminput({nomlabel, typeinput, value, inputchange}) {
    return (
      <>
        <label>{nomlabel}</label> <br />
        <input type={typeinput} value={value} onChange={inputchange} />
      </>
    );


}