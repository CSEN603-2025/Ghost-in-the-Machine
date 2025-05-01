function InputField({type, placeholder, value, onChange}){
    return ( <input
        type = {type}
        placeholder = {placeholder}
        value = {value}
        onChange = {onChange}
        required
        style = {styles.input}
        />
     );
}

const styles = {
    input: {
        padding: '10px',
        marginBottom: '10px',
        fontSize: '16px',
        borderRadiues: '16px',
        border: '1px solid #ccc',
    },
};

export default InputField;