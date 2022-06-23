import Dropdown from "./dropdown";

function Input(props){
  const inputProps = {...props};
  delete inputProps.data;
  delete inputProps.onSelectItem;

  return (
      <fieldset className="fieldset">
        <input className="input" {...props}/>
        <Dropdown data={props.data} onSelectItem={props.onSelectItem}/>
      </fieldset>
    );
}

export default Input;