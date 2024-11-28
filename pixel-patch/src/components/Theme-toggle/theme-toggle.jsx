import './theme-toggle.css'

export const Toggle =({handleChange, isChecked}) => {
    return (
        <div className = 'toggle-container'>
            <input
                type = "checkbox"
                id = "check"
                className = "toggle"
                onChange = {handleChange}
                check = {isChecked}
            />
            <label htmlFor='check'> Dark Mode </label>
        </div>
    ); 
};