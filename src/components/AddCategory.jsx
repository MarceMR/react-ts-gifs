import { useState } from "react"

export const AddCategory = ({onNewCategory}) => {

    const [inputValue, setValue] = useState('One punch')

    const onInputChange = (event) => {
        setValue(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if(inputValue.trim().length <=1) return;
        onNewCategory(inputValue)
        setValue("")
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Buscar gifs"
                    value={inputValue}
                    onChange={onInputChange}
                />
            </form>

        </>
    )
}